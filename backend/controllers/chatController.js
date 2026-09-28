import { OpenAIService } from "../services/openaiService.js";
import { captureLeadFromChatMessages } from "../services/chatLeadService.js";

let openAIService = null;

const getOpenAIService = () => {
  if (!openAIService) {
    openAIService = new OpenAIService();
  }
  return openAIService;
};

function asOptionalString(value, max) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) return undefined;
  return trimmed;
}

export const chatController = {
  async sendMessage(request, reply) {
    try {
      const { messages, captureLead = true, tracking = {} } = request.body || {};

      if (!messages || !Array.isArray(messages)) {
        return reply.code(400).send({
          error: "Messages array is required",
        });
      }

      if (messages.length === 0) {
        return reply.code(400).send({
          error: "Messages array cannot be empty",
        });
      }

      if (messages.length > 40) {
        return reply.code(400).send({
          error: "Too many messages",
        });
      }

      const sanitizedMessages = messages
        .filter((m) => m && typeof m.text === "string" && m.text.trim())
        .slice(-30)
        .map((m) => ({
          sender: m.sender === "user" ? "user" : "bot",
          text: String(m.text).slice(0, 4000),
        }));

      if (sanitizedMessages.length === 0) {
        return reply.code(400).send({ error: "Messages array cannot be empty" });
      }

      const service = getOpenAIService();
      const response = await service.sendMessage(sanitizedMessages);

      let lead = null;
      if (captureLead) {
        const landingPage = asOptionalString(tracking.landingPage, 500);
        const referrer = asOptionalString(tracking.referrer, 500);
        if (landingPage !== undefined && referrer !== undefined) {
          try {
            const capture = await captureLeadFromChatMessages(
              sanitizedMessages,
              {
                source: "chatbot",
                utmSource: "chatbot",
                utmMedium: "portfolio",
                utmCampaign: "conversation",
                landingPage: landingPage || undefined,
                referrer: referrer || undefined,
              },
            );
            if (capture.created) {
              lead = capture.lead;
            }
          } catch (captureError) {
            request.log.error(captureError);
          }
        }
      }

      return reply.code(200).send({
        message: response,
        leadCreated: Boolean(lead),
        lead,
      });
    } catch (error) {
      request.log.error(error);

      if (error.message.includes("API key")) {
        return reply.code(500).send({
          error: "OpenAI API key not configured",
        });
      }

      return reply.code(500).send({
        error: "Internal server error",
      });
    }
  },
};

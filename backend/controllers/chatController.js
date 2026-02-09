import { OpenAIService } from "../services/openaiService.js";

let openAIService = null;

const getOpenAIService = () => {
  if (!openAIService) {
    openAIService = new OpenAIService();
  }
  return openAIService;
};

export const chatController = {
  async sendMessage(request, reply) {
    try {
      const { messages } = request.body;

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

      const service = getOpenAIService();
      const response = await service.sendMessage(messages);

      return reply.code(200).send({
        message: response,
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


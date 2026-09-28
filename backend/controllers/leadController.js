import { validatePublicLeadPayload } from "../services/leadValidation.js";
import { createValidatedLead } from "../services/chatLeadService.js";

export const leadController = {
  async create(request, reply) {
    const parsed = validatePublicLeadPayload(request.body);
    if (parsed.error) {
      return reply.code(400).send({ error: parsed.error });
    }

    try {
      const lead = await createValidatedLead(parsed.value);

      return reply.code(201).send(lead);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: "Unable to create lead" });
    }
  },
};

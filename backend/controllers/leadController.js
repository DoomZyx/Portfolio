import { leadModel } from "../models/leadModel.js";
import { computeEcommerceRecommendation } from "../domain/ecommerce/recommendation.js";
import { validatePublicLeadPayload } from "../services/leadValidation.js";

export const leadController = {
  async create(request, reply) {
    const parsed = validatePublicLeadPayload(request.body);
    if (parsed.error) {
      return reply.code(400).send({ error: parsed.error });
    }

    const payload = parsed.value;
    // Never trust client-computed recommendation
    const recommendation = computeEcommerceRecommendation(payload.diagnostic);

    try {
      const lead = await leadModel.create({
        ...payload,
        recommendationTechnical: recommendation.technical,
        strategicSupportRecommended: recommendation.strategicSupportRecommended,
      });

      return reply.code(201).send({
        id: lead.id,
        recommendation: {
          technical: lead.recommendation_technical,
          strategicSupportRecommended: lead.strategic_support_recommended,
        },
      });
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({ error: "Unable to create lead" });
    }
  },
};

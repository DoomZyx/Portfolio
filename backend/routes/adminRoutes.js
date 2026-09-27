import { requireAdmin } from "../middleware/auth.js";
import { adminAuthController } from "../controllers/adminAuthController.js";
import { adminLeadController } from "../controllers/adminLeadController.js";
import { adminDashboardController } from "../controllers/adminDashboardController.js";
import { adminDocumentController } from "../controllers/adminDocumentController.js";

export const adminRoutes = async (fastify) => {
  fastify.post("/api/admin/login", adminAuthController.login);

  fastify.register(async (secured) => {
    secured.addHook("preHandler", requireAdmin);

    secured.post("/api/admin/logout", adminAuthController.logout);
    secured.get("/api/admin/me", adminAuthController.me);
    secured.get("/api/admin/dashboard", adminDashboardController.getStats);
    secured.get("/api/admin/leads", adminLeadController.list);
    secured.get("/api/admin/leads/:id", adminLeadController.getById);
    secured.patch("/api/admin/leads/:id", adminLeadController.update);
    secured.post("/api/admin/leads/:id/notes", adminLeadController.addNote);
    secured.post("/api/admin/leads/:id/email", adminLeadController.sendEmail);

    secured.get("/api/admin/documents/export.csv", adminDocumentController.exportCsv);
    secured.get("/api/admin/documents", adminDocumentController.list);
    secured.post("/api/admin/documents", adminDocumentController.create);
    secured.get("/api/admin/documents/:id", adminDocumentController.getById);
    secured.patch("/api/admin/documents/:id", adminDocumentController.update);
    secured.post("/api/admin/documents/:id/convert", adminDocumentController.convert);
    secured.get("/api/admin/documents/:id/pdf", adminDocumentController.pdf);
    secured.post("/api/admin/documents/:id/send", adminDocumentController.send);
  });
};

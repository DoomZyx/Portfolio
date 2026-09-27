import bcrypt from "bcryptjs";
import { adminUserModel } from "../models/adminUserModel.js";

const COOKIE_NAME = "admin_token";

export const adminAuthController = {
  async login(request, reply) {
    const email = typeof request.body?.email === "string" ? request.body.email : "";
    const password =
      typeof request.body?.password === "string" ? request.body.password : "";

    if (!email || !password) {
      return reply.code(400).send({ error: "email and password are required" });
    }

    const user = await adminUserModel.findByEmail(email);
    if (!user) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      return reply.code(401).send({ error: "Invalid credentials" });
    }

    const token = await reply.jwtSign(
      { sub: user.id, email: user.email },
      { expiresIn: "7d" },
    );

    reply.setCookie(COOKIE_NAME, token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return reply.code(200).send({ email: user.email });
  },

  async logout(_request, reply) {
    reply.clearCookie(COOKIE_NAME, { path: "/" });
    return reply.code(200).send({ ok: true });
  },

  async me(request, reply) {
    return reply.code(200).send({
      id: request.user.sub,
      email: request.user.email,
    });
  },
};

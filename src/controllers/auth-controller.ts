import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";
import { AuthService } from "../services/auth-service";
import { AuthRequest } from "../types/types";

const authService = new AuthService();

export const authController = async (fastify: FastifyInstance) => {
    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const loginData = await authService.login(request.body as AuthRequest);
            if (!loginData) {
                return reply.status(401).send({
                    success: false,
                    data: null,
                    error: { code: "INVALID_CREDENTIALS", message: "Invalid credentials" },
                });
            }

            const token = request.server.jwt.sign({ sub: 0 }, {
                expiresIn: '10min'
            });

            reply.setCookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite:"none",
                path: "/",
                maxAge: 60 * 15 //15 minutes
            })

            loginData.token = token;

            return reply.send({ success: true, data: loginData, error: null });
        } catch (err: any) {
            return reply.status(500).send({
                success: false,
                data: null,
                error: { code: "LOGIN_ERROR", message: err.message },
            });
        }
    });
};

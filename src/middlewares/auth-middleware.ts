import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

export async function isLogged(request: FastifyRequest, reply: FastifyReply) {
    console.log("isLogged")

    try {
        const token = request.cookies.token;
        if (!token) throw new Error("No token");

        const decoded = request.server.jwt.verify(token);
        request.user = decoded;
    } catch (error) {

        console.log(error)

        return reply.status(401).send({
            success: false,
            data: null,
            error: { code: "UNAUTHORIZED", message: "Invalid credentials no token" },
        });
    }
}
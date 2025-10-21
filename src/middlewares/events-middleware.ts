import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { EventsService } from "../services/events-sevice";

const eventService = new EventsService();

export async function canEventBeEditedOrDeleted(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as { id: string };
        if (!id) throw new Error("No id on url");

        const event = await eventService.findById(Number(id));
        if (!event) throw new Error("event not found");

        if (new Date(event.date).getTime() < Date.now()) throw new Error("past event cant be edited");
    } catch (error: any) {
        return reply.status(403).send({ success: false, data: null, error: { code: "CHANGE_FAILED", message: "Event not found or could not be updated or deleted" } });
    }
}
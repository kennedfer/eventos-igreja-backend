import { FastifyInstance, FastifyReply, FastifyRequest, FastifyServerOptions } from "fastify";
import { Period } from "../types/types";
import { ChurchEvent } from "../models/church-events";
import { EventsService } from "../services/events-sevice";
import { canEventBeEditedOrDeleted } from "../middlewares/events-middleware";
import { isLogged } from "../middlewares/auth-middleware";

const eventsService = new EventsService();

export async function eventsController(fastify: FastifyInstance): Promise<void> {

    fastify.get("/events", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { year, month, day } = request.query as Period;

            let events: ChurchEvent[];
            if (year && month) {
                events = await eventsService.getByPeriod(month, year, day);
            } else {
                events = await eventsService.getAll();
            }

            return reply.status(200).send({ success: true, data: events, error: null });
        } catch (err: any) {
            return reply.status(500).send({
                success: false,
                data: null,
                error: { code: "EVENTS_FETCH_ERROR", message: err.message },
            });
        }
    });

    fastify.post("/events", { preHandler: isLogged }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const eventData = request.body as ChurchEvent;
            const success = await eventsService.create(eventData);

            if (!success) {
                return reply.status(400).send({
                    success: false,
                    data: null,
                    error: { code: "CREATE_FAILED", message: "Could not create event" },
                });
            }

            return reply.status(201).send({ success: true, data: null, error: null });
        } catch (err: any) {
            return reply.status(500).send({
                success: false,
                data: null,
                error: { code: "CREATE_ERROR", message: err.message },
            });
        }
    });

    fastify.get("/events/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };
        const event = await eventsService.findById(id);

        if (!event) {
            return reply.status(404).send({
                success: false,
                data: null,
                error: { code: "UPDATE_FAILED", message: "Event not found or could not be updated" },
            });
        }

        return reply.send({
            success: true,
            data: event,
            error: null,
        });
    });

    fastify.put("/events/:id", { preHandler: [isLogged, canEventBeEditedOrDeleted] }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            console.log("cheguei no service");

            const eventData = request.body as ChurchEvent;
            const { id } = request.params as { id: number };

            const success = await eventsService.update(id, eventData);

            if (!success) {
                return reply.status(404).send({
                    success: false,
                    data: null,
                    error: { code: "UPDATE_FAILED", message: "Event not found or could not be updated" },
                });
            }

            return reply.status(200).send({ success: true, data: null, error: null });
        } catch (err: any) {
            return reply.status(500).send({
                success: false,
                data: null,
                error: { code: "UPDATE_ERROR", message: err.message },
            });
        }
    });

    fastify.delete("/events/:id", { preHandler: [isLogged, canEventBeEditedOrDeleted] }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { id } = request.params as { id: number };
            const success = await eventsService.delete(id);

            if (!success) {
                return reply.status(404).send({
                    success: false,
                    data: null,
                    error: { code: "DELETE_FAILED", message: "Event not found" },
                });
            }

            return reply.status(200).send({ success: true, data: null, error: null });
        } catch (err: any) {
            return reply.status(500).send({
                success: false,
                data: null,
                error: { code: "DELETE_ERROR", message: err.message },
            });
        }
    });
}

import Fastify, { FastifyInstance } from "fastify";
import { eventsController } from "./controllers/events-controller";
import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { authController } from "./controllers/auth-controller";
import fastifyCookie from "@fastify/cookie";
import { configDotenv } from "dotenv";
import { isLogged } from "./middlewares/auth-middleware";
import bcrypt from 'bcryptjs';
import { sequelize } from "./db/db";

import { Admin } from "./models/admin";
import { ChurchEvent } from "./models/church-events";

async function seedAdmin() {
    await sequelize.authenticate();
    await sequelize.sync();
    
    const hashedPassword = await bcrypt.hash('admin123', 10);

   const [admin] = await Admin.findOrCreate({
    where: {username: "admin"},
    defaults: {password: hashedPassword}
   })
}


const initialize = async () => {
    try {
        await server.listen({
            host: "0.0.0.0",
            port: 8080,
        })
        
        console.log("Server is Running")
        seedAdmin();
    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
}

configDotenv();
const PREFIX = "/api/v1";

const server: FastifyInstance = Fastify({ logger: false });

server.register(fastifyCors, {
    origin: process.env.CLIENT_URL, //JUST IN ENV DEV 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization','Set-Cookie', 'Cookie', "Access-Control-Allow-Credentials"],
    exposedHeaders: ['Set-Cookie'],
    credentials: true
})

server.register(fastifyCookie, { secret: process.env.COOKIE_SECRET || "secret" })
server.register(fastifyJwt, { secret: process.env.JWT_SECRET || "secret" })

server.register(authController, { prefix: PREFIX })
server.register(eventsController, { prefix: PREFIX });

initialize();
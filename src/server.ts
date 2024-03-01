import fastify from "fastify";
import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";


const server: FastifyInstance = fastify();
const port = 3333;

server.register(cors);

try {
    server.listen({port});
    console.log(`Server is running on port http://localhost:${port}`);
}
catch (err) {
    console.log(err);
}

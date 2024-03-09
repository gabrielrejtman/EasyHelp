import fastify from "fastify";
import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { CreateProblemUseCase } from "./usecases/CreateProblem/CreateProblemUseCase";
import CreateProblemController from "./controllers/Problem/CreateProblemController";
import DeleteProblemController from "./controllers/Problem/DeleteProblemController";
import PrismaProblemRepository from "./prisma/PrismaProblemRepository";
import { DeleteProblemUseCase } from "./usecases/DeleteProblem/DeleteProblemUseCase";


const server: FastifyInstance = fastify();
const port = 3333;

server.register(cors);


const problemRepository = new PrismaProblemRepository();
const deleteProblem = new DeleteProblemUseCase(problemRepository);
const createProblem = new CreateProblemUseCase(problemRepository);
new DeleteProblemController(server, deleteProblem);
new CreateProblemController(server, createProblem);


try {
    server.listen({port});
    console.log(`Server is running on port http://localhost:${port}`);
}
catch (err) {
    console.log(err);
}

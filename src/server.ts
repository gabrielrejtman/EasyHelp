import fastify from "fastify";
import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { CreateProblemUseCase } from "./domain/usecases/Problem/CreateProblem/CreateProblemUseCase";
import CreateProblemController from "./api/controllers/Problem/CreateProblemController";
import DeleteProblemController from "./api/controllers/Problem/DeleteProblemController";
import PrismaProblemRepository from "./api/prisma/PrismaProblemRepository";
import { DeleteProblemUseCase } from "./domain/usecases/Problem/DeleteProblem/DeleteProblemUseCase";
import PrismaUserRepository from "./api/prisma/PrismaUserRepository";
import { DeleteUserUseCase } from "./domain/usecases/User/DeleteUser/DeleteUserUseCase";
import { CreateUserUseCase } from "./domain/usecases/User/CreateUser/CreateUserUseCase";
import DeleteUserController from "./api/controllers/User/DeleteUserController";
import CreateUserController from "./api/controllers/User/CreateUserController";


const server: FastifyInstance = fastify();
const port = 3333;


server.register(cors);


const problemRepository = new PrismaProblemRepository();
const deleteProblem = new DeleteProblemUseCase(problemRepository);
const createProblem = new CreateProblemUseCase(problemRepository);
new DeleteProblemController(server, deleteProblem);
new CreateProblemController(server, createProblem);


const userRepository = new PrismaUserRepository();
const deleteUser = new DeleteUserUseCase(userRepository);
const createUser = new CreateUserUseCase(userRepository);
new DeleteUserController(server, deleteUser);
new CreateUserController(server, createUser);


try {
    server.listen({port});
    console.log(`Server is running on port http://localhost:${port}`);
}
catch (err) {
    console.log(err);
}

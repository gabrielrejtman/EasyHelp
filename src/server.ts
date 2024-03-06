import fastify from "fastify";
import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { CreateProblemUseCase } from "./domain/usecases/Problem/CreateProblemUseCase";
import CreateProblemController from "./api/controllers/Problem/CreateProblemController";
import DeleteProblemController from "./api/controllers/Problem/DeleteProblemController";
import PrismaProblemRepository from "./api/prisma/PrismaProblemRepository";
import { DeleteProblemUseCase } from "./domain/usecases/Problem/DeleteProblemUseCase";
import PrismaUserRepository from "./api/prisma/PrismaUserRepository";
import { DeleteUserUseCase } from "./domain/usecases/User/DeleteUserUseCase";
import { CreateUserUseCase } from "./domain/usecases/User/CreateUserUseCase";
import DeleteUserController from "./api/controllers/User/DeleteUserController";
import CreateUserController from "./api/controllers/User/CreateUserController";
import { ShowProblemsUseCase } from "./domain/usecases/Problem/ShowProblemsUseCase";
import ShowProblemsController from "./api/controllers/Problem/ShowProblemsController";
import { UpdateProblemUseCase } from "./domain/usecases/Problem/UpdateProblemUseCase";
import UpdateProblemController from "./api/controllers/Problem/UpdateProblemController";
import UpdateUserController from "./api/controllers/User/UpdateUserController";
import { UpdateUserUseCase } from "./domain/usecases/User/UpdateUserUseCase";
import { ShowUsersUseCase } from "./domain/usecases/User/ShowUsersUseCase";
import ShowUsersController from "./api/controllers/User/ShowUsersController";


const server: FastifyInstance = fastify();
const port = 3333;


server.register(cors);


const problemRepository = new PrismaProblemRepository();
const deleteProblem = new DeleteProblemUseCase(problemRepository);
const createProblem = new CreateProblemUseCase(problemRepository);
const showProblems = new ShowProblemsUseCase(problemRepository);
const updateProblems = new UpdateProblemUseCase(problemRepository);
new DeleteProblemController(server, deleteProblem);
new CreateProblemController(server, createProblem);
new ShowProblemsController(server, showProblems);
new UpdateProblemController(server, updateProblems);


const userRepository = new PrismaUserRepository();
const deleteUser = new DeleteUserUseCase(userRepository);
const createUser = new CreateUserUseCase(userRepository);
const updateUser = new UpdateUserUseCase(userRepository);
const showUsers = new ShowUsersUseCase(userRepository);
new CreateUserController(server, createUser);
new ShowUsersController(server, showUsers);
new UpdateUserController(server, updateUser);
new DeleteUserController(server, deleteUser);




try {
    server.listen({port});
    console.log(`Server is running on port http://localhost:${port}`);
}
catch (err) {
    console.log(err);
}

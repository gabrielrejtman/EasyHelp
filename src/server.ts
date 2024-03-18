import fastify from "fastify";
import { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { CreateProblemUseCase } from "./domain/usecases/Problem/CreateProblemUseCase";
import CreateProblemController from "./api/controllers/Problem/CreateProblemController";
import DeleteProblemController from "./api/controllers/Problem/DeleteProblemController";
import PrismaProblemRepository from "./api/prisma/PrismaProblemRepository";
import { DeleteProblemUseCase } from "./domain/usecases/Problem/DeleteProblemUseCase";
import { ShowProblemsUseCase } from "./domain/usecases/Problem/ShowProblemsUseCase";
import ShowProblemsController from "./api/controllers/Problem/ShowProblemsController";
import { UpdateProblemUseCase } from "./domain/usecases/Problem/UpdateProblemUseCase";
import UpdateProblemController from "./api/controllers/Problem/UpdateProblemController";
import PrismaUserRepository from "./api/prisma/PrismaUserRepository";
import { DeleteUserUseCase } from "./domain/usecases/User/DeleteUserUseCase";
import { CreateUserUseCase } from "./domain/usecases/User/CreateUserUseCase";
import { UpdateUserUseCase } from "./domain/usecases/User/UpdateUserUseCase";
import { ShowUsersUseCase } from "./domain/usecases/User/ShowUsersUseCase";
import CreateUserController from "./api/controllers/User/CreateUserController";
import ShowUsersController from "./api/controllers/User/ShowUsersController";
import UpdateUserController from "./api/controllers/User/UpdateUserController";
import DeleteUserController from "./api/controllers/User/DeleteUserController";
import { VerifySessionUseCase } from "./domain/usecases/VerifySessionUseCase";
import SessionController from "./api/controllers/SessionController";
import PrismaOrderRepository from "./api/prisma/PrismaOrderRepository";
import { CreateOrderUseCase } from "./domain/usecases/Order/CreateOrderUseCase";
import CreateOrderController from "./api/controllers/Order/CreateOrderController";
import { Client } from "@opensearch-project/opensearch";
import { CreateProblemOpenSearchUseCase } from "./domain/usecases/OpenSearch/CreateProblemOpenSearchUseCase";
import { SearchProblemOpenSearchUseCase } from "./domain/usecases/OpenSearch/SearchProblemOpenSearchUseCase";
import { DeleteProblemOpenSearchUseCase } from "./domain/usecases/OpenSearch/DeleteProblemOpenSearchUseCase";
import SearchProblemController from "./api/controllers/Problem/SearchProblemController";
import { GetAllOrdersUseCase } from "./domain/usecases/Order/GetAllOrdersUseCase";
import { UpdateOrderUseCase } from "./domain/usecases/Order/UpdateOrderUseCase";
import GetAllOrdersController from "./api/controllers/Order/GetAllOrdersController";
import UpdateOrderController from "./api/controllers/Order/UpdateOrderController";
import { SearchsProblemsUseCase } from "./domain/usecases/Problem/SearchProblemUseCase";
import { SearchUsersUseCase } from "./domain/usecases/User/SearchUserUseCase";
import SearchUsersController from "./api/controllers/User/SearchUserController";

const server: FastifyInstance = fastify();
const port = 3333;


server.register(cors);

const clientOpenSearch = new Client({
    node: "https://localhost:9200",
    auth: {
        username: "admin",
        password: "EHOSp@ul0",
    },
    ssl: {
        rejectUnauthorized: false
    },
});

// open search
const searchProblemOpenSearchUseCase = new SearchProblemOpenSearchUseCase(clientOpenSearch);
const createProblemOpenSearchUseCase = new CreateProblemOpenSearchUseCase(clientOpenSearch);
const deleteProblemOpenSearchUseCase = new DeleteProblemOpenSearchUseCase(clientOpenSearch);


// problems
const problemRepository = new PrismaProblemRepository();
const deleteProblem = new DeleteProblemUseCase(problemRepository);
const createProblem = new CreateProblemUseCase(problemRepository);
const showProblems = new ShowProblemsUseCase(problemRepository);
const updateProblems = new UpdateProblemUseCase(problemRepository);
const searchProblems = new SearchsProblemsUseCase(problemRepository);
new DeleteProblemController(server, deleteProblem, deleteProblemOpenSearchUseCase);
new CreateProblemController(server, createProblem, createProblemOpenSearchUseCase);
new ShowProblemsController(server, showProblems);
new UpdateProblemController(server, updateProblems);
new SearchProblemController(server, searchProblems, searchProblemOpenSearchUseCase);


// order
const orderRepository = new PrismaOrderRepository();
const createOrder = new CreateOrderUseCase(orderRepository);
const getAllOrders = new GetAllOrdersUseCase(orderRepository);
const updateOrder = new UpdateOrderUseCase(orderRepository);
new CreateOrderController(server, createOrder);
new GetAllOrdersController(server, getAllOrders);
new UpdateOrderController(server, updateOrder);


// user
const userRepository = new PrismaUserRepository();
const deleteUser = new DeleteUserUseCase(userRepository);
const createUser = new CreateUserUseCase(userRepository);
const updateUser = new UpdateUserUseCase(userRepository);
const showUsers = new ShowUsersUseCase(userRepository);
const searchUser = new SearchUsersUseCase(userRepository);
const authUser = new VerifySessionUseCase(userRepository);
new SessionController(server, authUser);
new CreateUserController(server, createUser);
new ShowUsersController(server, showUsers);
new SearchUsersController(server, searchUser);
new UpdateUserController(server, updateUser);
new DeleteUserController(server, deleteUser);




try {
    server.listen({port});
    console.log(`Server is running on port http://localhost:${port}`);
}
catch (err) {
    console.log(err);
}
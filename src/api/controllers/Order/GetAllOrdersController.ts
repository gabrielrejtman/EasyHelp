import { FastifyInstance } from "fastify";
import { GetAllOrdersUseCase } from "../../../domain/usecases/Order/GetAllOrdersUseCase";


export default class GetAllOrdersController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: GetAllOrdersUseCase 
    ) {
        server.get('/order', async () => {
            const result = await useCase.execute();

            return result;
        })
    }

}
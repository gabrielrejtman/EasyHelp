import { FastifyInstance } from "fastify";
import { CreateOrderUseCase } from "../../usecases/CreateOrder/CreateOrderUseCase";


export default class CreateOrderController {

    constructor(
        readonly server: FastifyInstance,
        readonly useCase: CreateOrderUseCase 
    ) {
        server.post('/order', async ({body}) => {
            const { id, createdAt, finalUpdatedAt, description, status, rating, priority, id_supervisor, id_prob } = body as any;
            await useCase.execute({ id, createdAt, finalUpdatedAt, description, status, rating, priority, id_supervisor, id_prob });

            return {
                status: 201,
                body: {
                    message: "The order has been requested"
                }
            }
        })
    }

}
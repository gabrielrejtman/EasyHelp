import { FastifyInstance } from "fastify";
import { UpdateOrderUseCase } from "../../../domain/usecases/Order/UpdateOrderUseCase";


export default class UpdateOrderController {
    constructor(
        readonly server: FastifyInstance,
        readonly useCase: UpdateOrderUseCase 
    ) {
        server.put('/order/:id', async ({body, params}) => { 
            const { status } = body as any;
            const { id } = params as any
            const result = await useCase.execute(id, { status });

            return result;
        })
    }

}
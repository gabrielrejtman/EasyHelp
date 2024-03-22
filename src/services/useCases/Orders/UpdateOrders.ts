import Order from "../../../domain/entities/Order";
import UseCase from "../../../domain/shared/usecase";
import { Api } from "../../Api";

export class UpdateOrder {

    async execute(id: string, status: string): Promise<Order> {
        return await Api.put('/order', { id, status })
    }
}
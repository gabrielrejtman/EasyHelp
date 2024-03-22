import Order from "../../entities/Order";
import OrderRepository from "../../repositories/OrderRepository";


export interface IUpdateOrder {
    status: string;
}

export class UpdateOrderUseCase {

    constructor(private readonly OrderRepository: OrderRepository) {}

    async execute(id: string, status: string): Promise<Order> {
        return await this.OrderRepository.updateOrder(id, status);
    }
}
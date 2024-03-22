import OrderRepository from "../../repositories/OrderRepository";
import { Order } from "@prisma/client";

export class GetAllOrdersUseCase {

    constructor(private readonly OrderRepository: OrderRepository) {}

    async execute(): Promise<Order[]> {

        const result = await this.OrderRepository.getAllOrders();
        return result;
    }
}
import OrderRepository from "../../repositories/OrderRepository";
import Order from "../../entities/Order";

export class GetAllOrdersUseCase {

    constructor(private readonly OrderRepository: OrderRepository) {}

    async execute(): Promise<Order[]> {

        return await this.OrderRepository.getAllOrders()
    }
}
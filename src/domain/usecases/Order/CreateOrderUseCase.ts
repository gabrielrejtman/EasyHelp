import Order from "../../entities/Order";
import OrderRepository from "../../repositories/OrderRepository";


export interface ICreateOrder {
    description: string;
    status: string;
    sector: string;
    rating: number;
    priority: string;
    supervisorId: string;
    problemId: string;
}

export class CreateOrderUseCase {

    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(data: ICreateOrder): Promise<Order> {
        const { description, status, sector, rating, priority, supervisorId, problemId } = data;

        return await this.orderRepository.create({ description, status, sector, rating, priority, supervisorId, problemId })
    }
}
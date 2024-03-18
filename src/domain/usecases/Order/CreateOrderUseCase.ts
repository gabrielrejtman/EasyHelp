import Order from "../../entities/Order";
import OrderRepository from "../../repositories/OrderRepository";


export interface ICreateOrder {
    description: string;
    status: string;
    sector: string;
    rating: number;
    priority: string;
}

export class CreateOrderUseCase {

    constructor(private readonly OrderRepository: OrderRepository) {}

    async execute(data: ICreateOrder): Promise<Order> {
        const { description, status, sector, rating, priority } = data;

        return await this.OrderRepository.create({ description, status, sector, rating, priority })
    }
}
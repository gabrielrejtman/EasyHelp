import UseCase from "../../shared/usecase";
import { ICreateOrder } from "./ICreateOrder";
import Order from "../../entities/Order";
import OrderRepository from "../../repositories/OrderRepository";


export class CreateOrderUseCase implements UseCase<ICreateOrder, Order> {

    constructor(private readonly OrderRepository: OrderRepository) {}

    async execute(data: ICreateOrder): Promise<Order> {
        const { id, createdAt, finalUpdatedAt, description, status, rating, priority, id_supervisor, id_prob } = data;

        const OrderAlreadyExists = await this.OrderRepository.getOrdersCreatedBy(id);
        if (OrderAlreadyExists) {
            throw new Error("Order already exists!");
        }

        return await this.OrderRepository.create({ id, createdAt, finalUpdatedAt, description, status, rating, priority, id_supervisor, id_prob })
    }
}
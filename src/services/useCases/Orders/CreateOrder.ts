import Order from "../../../domain/entities/Order";
import UseCase from "../../../domain/shared/usecase";
import { ICreateOrder } from "../../../domain/usecases/Order/CreateOrderUseCase";
import { Api } from "../../Api";

export class CreateOrder implements UseCase<ICreateOrder, Order> {

    async execute(data: ICreateOrder): Promise<Order> {
        const { description, status, sector, rating, priority, userId, problemId } = data;

        return await Api.post('/order',{ description, status, sector, rating, priority, userId, problemId })
    }
}
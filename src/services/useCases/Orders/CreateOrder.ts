import Order from "../../../domain/entities/Order";
import UseCase from "../../../domain/shared/usecase";
import { ICreateOrder } from "../../../domain/usecases/CreateOrder/ICreateOrder";
import { Api } from "../../Api";

export class CreateOrder implements UseCase<ICreateOrder, Order> {

    async execute(data: ICreateOrder): Promise<Order> {
        const { description, status, sector, rating, priority } = data;

        return await Api.post('/orders',{ description, status, sector, rating, priority })
    }
}
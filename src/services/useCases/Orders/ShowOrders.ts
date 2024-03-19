import Order from "../../../domain/entities/Order";
import UseCase from "../../../domain/shared/usecase";
import { Api } from "../../Api";

export class ShowOrders implements UseCase<void, Order[]> {
    
    async execute() {
        const response = await Api.get<Order[]>('/order');
        return response.data;
    }
}
import { Order } from "@prisma/client";
import { ICreateOrder } from "../usecases/Order/CreateOrderUseCase";
import { IUpdateOrder } from "../usecases/Order/UpdateOrderUseCase";


export default interface OrderRepository {
    create(Order: ICreateOrder): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    updateOrder(id: string, status: string): Promise<Order>;
}
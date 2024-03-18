import Order from "../entities/Order"
import { ICreateOrder } from "../usecases/Order/CreateOrderUseCase";
import { IUpdateOrder } from "../usecases/Order/UpdateOrderUseCase";


export default interface OrderRepository {
    create(Order: ICreateOrder): Promise<Order>;
    getAllOrders(): Promise<Order[]>;
    updateOrder(id: string, Order: IUpdateOrder): Promise<Order>;
}
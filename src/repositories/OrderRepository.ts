import Order from "../entities/Order"
import { ICreateOrder } from "../usecases/CreateOrder/ICreateOrder";

// getOrders is using id_supervisor as a parameter so it only shows
// Orders created by the due supervisor.
export default interface OrderRepository {
    getOrdersCreatedBy(id_supervisor: string): Promise<Order | null>;
    getAllOrders(id: string): Promise<Order | null>;
    create(Order: ICreateOrder): Promise<Order>;
}
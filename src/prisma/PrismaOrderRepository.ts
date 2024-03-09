
import { PrismaClient } from "@prisma/client";
import OrderRepository from "../repositories/OrderRepository";
import Order from "../entities/Order";
import { ICreateOrder } from "../usecases/CreateOrder/ICreateOrder";


export default class PrismaOrderRepository implements OrderRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    create(Order: ICreateOrder): Promise<Order> {
        return this.prisma.Order.create({ data: Order });
    }

    getOrdersCreatedBy(id_supervisor: string): Promise<Order | null> {
        return this.prisma.Order.findFirst({
            where: {
                id_supervisor
            }
        });
    }

    getAllOrders(id: string): Promise<Order | null> {
        return this.prisma.Order.findFirst({
            where: {
                id
            }
        });
    }

}


import { PrismaClient } from "@prisma/client";
import OrderRepository from "../../domain/repositories/OrderRepository";
import Order from "../../domain/entities/Order";
import { ICreateOrder } from "../../domain/usecases/CreateOrder/ICreateOrder";


export default class PrismaOrderRepository implements OrderRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    create(order: ICreateOrder): Promise<Order> {
        return this.prisma.order.create({ data: order });
    }

    getOrdersCreatedBy(id_supervisor: string): Promise<Order | null> {
        return this.prisma.order.findFirst({
            where: {
                id_supervisor
            }
        });
    }

    getAllOrders(id: string): Promise<Order | null> {
        return this.prisma.order.findFirst({
            where: {
                id
            }
        });
    }

}

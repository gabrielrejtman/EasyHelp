
import { PrismaClient } from "@prisma/client";
import OrderRepository from "../../domain/repositories/OrderRepository";
import Order from "../../domain/entities/Order";
import { ICreateOrder } from "../../domain/usecases/CreateOrder/ICreateOrder";


export default class PrismaOrderRepository implements OrderRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    create(Order: ICreateOrder): Promise<Order> {
        return this.prisma.order.create({data: Order});
    }

    getAllOrders(): Promise<Order[]> {
        return this.prisma.order.findMany();
    }
}

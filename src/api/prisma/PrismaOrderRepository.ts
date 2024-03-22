import { PrismaClient } from "@prisma/client";
import OrderRepository from "../../domain/repositories/OrderRepository";
import { Order } from "@prisma/client";
import { ICreateOrder } from "../../domain/usecases/Order/CreateOrderUseCase";
import { IUpdateOrder } from "../../domain/usecases/Order/UpdateOrderUseCase";


export default class PrismaOrderRepository implements OrderRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    
    create(Order: ICreateOrder): Promise<Order> {
        return this.prisma.order.create({data: Order});
    }
    
    async getAllOrders(): Promise<Order[]> {
        return await this.prisma.order.findMany({
            include: {
                supervisor: true
            }
        });
    }

    async updateOrder(id: string, status: string): Promise<Order> {
        return await this.prisma.order.update({
            where: {
                id,
            },
            data: {
                status
            }
        })
    }
}

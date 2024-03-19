import { PrismaClient } from "@prisma/client";
import User from "../../domain/entities/User";
import UserRepository from "../../domain/repositories/UserRepository";
import { ICreateUser } from "../../domain/usecases/User/CreateUserUseCase";
import { IUpdateUser } from "../../domain/usecases/User/UpdateUserUseCase";


export default class PrismaUserRepository implements UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(user: ICreateUser): Promise<User> {
        return await this.prisma.user.create({data: user})
    }

    async getAllUsers(): Promise<User[]> {
        return await this.prisma.user.findMany({
            include: {
                supervisorOrders: {
                    include: {
                        problem: true,
                    },
                },
            },
        });
    }

    async getUser(registration: string): Promise<User | null> {
      return await this.prisma.user.findFirst({
        where: {
            registration,
        },
      })
    }
    async getUserByName(name: string): Promise<User[]> {
        return await this.prisma.user.findMany({
            where: {
                name: {contains: name}
            }
        })
    }

    async updateUser(id: string, user: IUpdateUser): Promise<User> {
        return await this.prisma.user.update({
            where: {
                id
            },
            data: user
        })
    }

    async delete(id: string): Promise<User | null> {
        const result = await this.prisma.user.delete({
            where: {
                id,
            },
        })
        return result;
    }

}
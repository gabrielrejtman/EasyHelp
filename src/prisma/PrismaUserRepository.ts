import { PrismaClient } from "@prisma/client";
import User from "../entities/User";
import UserRepository from "../repositories/UserRepository";
import { ICreateUser } from "../usecases/CreateUser/ICreateUser";


export default class PrismaUserRepository implements UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    create(user: ICreateUser): Promise<User> {
        return this.prisma.user.create({data: user})
    }

    getUsers(id: string): Promise<User | null> {
      return this.prisma.user.findFirst({
        where: {
            id
        }
      })
    }

    delete(id: string): Promise<User | null> {
        const result = this.prisma.user.delete({
            where: {
                id,
            },
        })
        return result;
    }
}
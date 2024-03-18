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

    create(user: ICreateUser): Promise<User> {
        return this.prisma.user.create({data: user})
    }

    getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    getUser(registration: string): Promise<User | null> {
      return this.prisma.user.findFirst({
        where: {
            registration
        }
      })
    }
    getUserByName(name: string): Promise<User[]> {
        return this.prisma.user.findMany({
            where: {
                name: {contains: name}
            }
        })
    }

    updateUser(id: string, user: IUpdateUser): Promise<User> {
        return this.prisma.user.update({
            where: {
                id
            },
            data: user
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
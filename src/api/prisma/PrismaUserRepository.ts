import { PrismaClient } from "@prisma/client";
import User from "../../domain/entities/User";
import UserRepository from "../../domain/repositories/UserRepository";
<<<<<<< HEAD
import { ICreateUser } from "../../domain/usecases/User/CreateUser/ICreateUser";
=======
import { ICreateUser } from "../../domain/usecases/User/CreateUserUseCase";
import { IUpdateUser } from "../../domain/usecases/User/UpdateUserUseCase";
>>>>>>> 21fec1d4 (user and problem cruds have been done)


export default class PrismaUserRepository implements UserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    create(user: ICreateUser): Promise<User> {
        return this.prisma.user.create({data: user})
    }

<<<<<<< HEAD
=======
    getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

>>>>>>> 21fec1d4 (user and problem cruds have been done)
    getUsers(id: string): Promise<User | null> {
      return this.prisma.user.findFirst({
        where: {
            id
        }
      })
    }

<<<<<<< HEAD
=======
    updateUser(id: string, user: IUpdateUser): Promise<User> {
        return this.prisma.user.update({
            where: {
                id
            },
            data: user
        })
    }

>>>>>>> 21fec1d4 (user and problem cruds have been done)
    delete(id: string): Promise<User | null> {
        const result = this.prisma.user.delete({
            where: {
                id,
            },
        })
        return result;
    }
}
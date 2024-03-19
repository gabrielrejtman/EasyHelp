
import { User } from "@prisma/client";
import UseCase from "../../../domain/shared/usecase";
import { ICreateUserUseCase } from "../../../domain/shared/ICreateUserUseCase";
import { Api } from "../../Api";

export class CreateUser implements UseCase<ICreateUserUseCase, User> {

    async execute(data: ICreateUserUseCase): Promise<User> {
        const { registration, name, role } = data;

        return await Api.post('/users',{registration, name, role })
    }
}

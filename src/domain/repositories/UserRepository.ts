import User from "../entities/User";
import { ICreateUser } from "../usecases/User/CreateUserUseCase";
import { IUpdateUser } from "../usecases/User/UpdateUserUseCase";


export default interface UserRepository {
    create(user: ICreateUser): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUser(registration: string): Promise<User | null>;
    getUserByName(name: string): Promise<User[]>;
    updateUser(id: string, user: IUpdateUser): Promise<User>;
    delete(id: string): Promise<User | null>;
}
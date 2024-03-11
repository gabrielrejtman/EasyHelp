import User from "../entities/User";
import { ICreateUser } from "../usecases/User/CreateUserUseCase";
import { IUpdateUser } from "../usecases/User/UpdateUserUseCase";


export default interface UserRepository {
    create(user: ICreateUser): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUsers(id: string): Promise<User | null>;
    updateUser(id: string, user: IUpdateUser): Promise<User>;
    delete(id: string): Promise<User | null>;
}
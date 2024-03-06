import User from "../entities/User";
<<<<<<< HEAD
import { ICreateUser } from "../usecases/User/CreateUser/ICreateUser";


export default interface UserRepository {
    getUsers(id: string): Promise<User | null>;
    create(problem: ICreateUser): Promise<User>;
=======
import { ICreateUser } from "../usecases/User/CreateUserUseCase";
import { IUpdateUser } from "../usecases/User/UpdateUserUseCase";


export default interface UserRepository {
    create(user: ICreateUser): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUsers(id: string): Promise<User | null>;
    updateUser(id: string, user: IUpdateUser): Promise<User>;
>>>>>>> 21fec1d4 (user and problem cruds have been done)
    delete(id: string): Promise<User | null>;
}
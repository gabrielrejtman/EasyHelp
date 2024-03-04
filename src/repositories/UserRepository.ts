import User from "../entities/User";
import { ICreateUser } from "../usecases/CreateUser/ICreateUser";


export default interface UserRepository {
    getUsers(id: string): Promise<User | null>;
    create(problem: ICreateUser): Promise<User>;
    delete(id: string): Promise<User | null>;
}
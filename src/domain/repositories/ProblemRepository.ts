import Problem from "../entities/Problem"
<<<<<<< HEAD
import { ICreateProblem } from "../usecases/Problem/CreateProblem/ICreateProblem";


export default interface ProblemRepository {
    getProblems(title: string): Promise<Problem | null>;
    create(problem: ICreateProblem): Promise<Problem>;
=======
import { ICreateProblem } from "../usecases/Problem/CreateProblemUseCase";
import { IUpdateProblem } from "../usecases/Problem/UpdateProblemUseCase";


export default interface ProblemRepository {
    create(problem: ICreateProblem): Promise<Problem>;
    getAllProblems(): Promise<Problem[]>;
    getProblemsByTitle(title: string): Promise<Problem | null>;
    updateProblem(id: string, problem: IUpdateProblem): Promise<Problem>;
>>>>>>> 21fec1d4 (user and problem cruds have been done)
    delete(id: string): Promise<Problem | null>;
}
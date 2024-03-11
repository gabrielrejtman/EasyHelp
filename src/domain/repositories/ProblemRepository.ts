import Problem from "../entities/Problem"
import { ICreateProblem } from "../usecases/Problem/CreateProblemUseCase";
import { IUpdateProblem } from "../usecases/Problem/UpdateProblemUseCase";


export default interface ProblemRepository {
    create(problem: ICreateProblem): Promise<Problem>;
    getAllProblems(): Promise<Problem[]>;
    getProblemsByTitle(title: string): Promise<Problem | null>;
    updateProblem(id: string, problem: IUpdateProblem): Promise<Problem>;
    delete(id: string): Promise<Problem | null>;
}
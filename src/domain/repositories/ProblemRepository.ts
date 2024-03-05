import Problem from "../entities/Problem"
import { ICreateProblem } from "../usecases/Problem/CreateProblem/ICreateProblem";


export default interface ProblemRepository {
    getProblems(title: string): Promise<Problem | null>;
    create(problem: ICreateProblem): Promise<Problem>;
    delete(id: string): Promise<Problem | null>;
}
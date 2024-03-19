import Problem from "../entities/Problem"
import { ICreateProblem } from "../usecases/Problem/CreateProblemUseCase";
import { IUpdateProblem } from "../usecases/Problem/UpdateProblemUseCase";


export default interface ProblemRepository {
    create(problem: ICreateProblem): Promise<Problem>;
    getAllProblems(): Promise<Problem[]>;
    getProblemsByTitle(title: string): Promise<Problem[] | null>;
    getProblemByTitle(title: string): Promise<Problem | null>;
    getReportProblemsbyCategory(): Promise<{ category: string; _count: number }[]>;
    getReportProblemsbyTitle(): Promise<{ title: string; _count: number }[]>;
    getReportOrdersBySector(): Promise<{ sector: string; _count: number }[]>;
    updateProblem(id: string, problem: IUpdateProblem): Promise<Problem>;
    delete(id: string): Promise<Problem | null>;
}
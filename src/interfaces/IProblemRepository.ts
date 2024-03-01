import { Problem } from "../entities/Problem";

export interface IProblem {
    id_problema: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    date: Date;
}


export interface IProblemRepository {
    createProblem(problem: IProblem): Promise<IProblem>;
}
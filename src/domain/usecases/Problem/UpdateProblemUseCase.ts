import Problem from "../../entities/Problem";
import ProblemRepository from "../../repositories/ProblemRepository";


export interface IUpdateProblem {
    title: string;
    description: string;
    category: string;
    difficulty: string;
}

export class UpdateProblemUseCase {
    constructor(private readonly problemRepository: ProblemRepository) {}

    async execute(id: string, data: IUpdateProblem): Promise<Problem> {
        const { title, description, category, difficulty } = data;

        return await this.problemRepository.updateProblem(id, { title, description, category, difficulty });
    }
}
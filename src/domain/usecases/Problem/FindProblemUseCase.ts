import ProblemRepository from "../../repositories/ProblemRepository";
import Problem from "../../entities/Problem";


export class FindProblemUseCase {
    constructor(private readonly problemRepository: ProblemRepository) { }

    async execute(title: string): Promise<Problem | null> {
        return await this.problemRepository.getProblemByTitle(title);
    }
}
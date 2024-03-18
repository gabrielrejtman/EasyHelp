import ProblemRepository from "../../repositories/ProblemRepository";
import Problem from "../../entities/Problem";


export class SearchsProblemsUseCase {
    constructor(private readonly problemRepository: ProblemRepository) {}  

    async execute(title: string): Promise<Problem[] | null> {
        return this.problemRepository.getProblemsByTitle(title);
    }
}
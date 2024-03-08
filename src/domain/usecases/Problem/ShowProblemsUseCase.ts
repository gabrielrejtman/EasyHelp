import ProblemRepository from "../../repositories/ProblemRepository";
import Problem from "../../entities/Problem";
import UseCase from "../../shared/usecase";


export class ShowProblemsUseCase implements UseCase<void, Problem[]> {
    constructor(private readonly problemRepository: ProblemRepository) {}  

    async execute() {
        return this.problemRepository.getAllProblems();
    }
}
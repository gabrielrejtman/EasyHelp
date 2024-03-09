import ProblemRepository from "../../repositories/ProblemRepository";
import UseCase from "../../shared/usecase";
import Problem from "../../entities/Problem";


export class DeleteProblemUseCase implements UseCase<string, Problem | null> {

    constructor(private readonly problemRepository: ProblemRepository) {}

    async execute(data: string): Promise<Problem | null> {
        const id = data;
        const result = await this.problemRepository.delete(id);

        return result;
    }
}
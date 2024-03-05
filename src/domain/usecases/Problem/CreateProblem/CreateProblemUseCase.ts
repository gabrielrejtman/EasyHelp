import UseCase from "../../../shared/usecase";
import { ICreateProblem } from "./ICreateProblem";
import Problem from "../../../entities/Problem";
import ProblemRepository from "../../../repositories/ProblemRepository";


export class CreateProblemUseCase implements UseCase<ICreateProblem, Problem> {

    constructor(private readonly problemRepository: ProblemRepository) {}

    async execute(data: ICreateProblem): Promise<Problem> {
        const { title, description, category, difficulty } = data;

        const problemAlreadyExists = await this.problemRepository.getProblems(title);
        if (problemAlreadyExists) {
            throw new Error("Problem already exists!");
        }

        return await this.problemRepository.create({ title, description, category, difficulty })
    }
}
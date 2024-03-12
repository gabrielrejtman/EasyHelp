import Problem from "../../entities/Problem";
import ProblemRepository from "../../repositories/ProblemRepository";

export interface ICreateProblem {
    id?: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
}

export class CreateProblemUseCase{

    constructor(
        private readonly problemRepository: ProblemRepository,
    ) {}

    async execute(data: ICreateProblem): Promise<Problem> {
        const { title, description, category, difficulty } = data;

        const problemAlreadyExists = await this.problemRepository.getProblemsByTitle(title);
        
        if (problemAlreadyExists) {
            throw new Error("Problem already exists!");
        }
        
        return await this.problemRepository.create({ title, description, category, difficulty }); 
    }
}
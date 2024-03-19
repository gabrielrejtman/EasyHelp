import ProblemRepository from "../repositories/ProblemRepository";


export interface ICreateProblem {
    id?: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
}

export class HandleReportProblemsUseCase{

    constructor(
        private readonly problemRepository: ProblemRepository,
    ) {}

    async execute() {
        const result = [];
        const getReportProblemsbyCategory = await this.problemRepository.getReportProblemsbyCategory();
        const getReportProblemsbyTitle = await this.problemRepository.getReportProblemsbyTitle();
        const getReportOrdersBySector = await this.problemRepository.getReportOrdersBySector();

        result.push(getReportProblemsbyCategory, getReportProblemsbyTitle, getReportOrdersBySector);

        return result;
    }
}
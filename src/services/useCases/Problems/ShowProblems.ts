import Problem from "../../../domain/entities/Problem";
import UseCase from "../../../domain/shared/usecase";
import { Api } from "../../Api";

export class ShowProblems implements UseCase<void, Problem[]> {
    
    async execute() {
        const response = await Api.get<Problem[]>('/problems');
        return response.data;
    }
}
import Problem from "../../../domain/entities/Problem";
import { Api } from "../../Api";

export class FindProblem {

    async execute(data: { title: string }): Promise<Problem> {
        const { title } = data;
        const response = await Api.post('/search_problem', { title })
        return response.data
    }
}
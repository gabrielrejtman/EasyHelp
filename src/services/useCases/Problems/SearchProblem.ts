import Problem from "../../../domain/entities/Problem";
import { Api } from "../../Api";

export class SearchProblemUseCase {

    async execute(data: {title:string} ): Promise<Problem[]> {
        const { title } = data;
        const response = await Api.post('/search',{title})
        return response.data
    }
}

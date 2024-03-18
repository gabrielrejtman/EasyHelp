import Problem from "../../../domain/entities/Problem";
import { Api } from "../../Api";
import { ICreateSearch } from "../../../domain/usecases/Problem/ICreateSearch";

export class SearchProblemUseCase {

    async execute(data: ICreateSearch ): Promise<Problem[]> {
        const { title } = data;
        const response = await Api.post('/search',{title})
        return response.data
    }
}

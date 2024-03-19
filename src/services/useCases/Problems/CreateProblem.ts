import { ICreateProblem } from "../../../domain/usecases/Problem/CreateProblemUseCase";
import { Api } from "../../Api";

export class CreateProblem{

    async execute(data: ICreateProblem) {
        const { title, description, category, difficulty } = data;
        const res = await Api.post('/problems',{ title, description, category, difficulty })
        return res.data
    }
}
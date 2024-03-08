import { Problem } from "@prisma/client";
import UseCase from "../../domain/shared/usecase";
import { ICreateProblem } from "../../domain/usecases/Problem/CreateProblemUseCase";
import {Api} from "../api";

export class CreateProblem implements UseCase<ICreateProblem, Problem> {

    async execute(data: ICreateProblem): Promise<Problem> {
        const { title, description, category, difficulty } = data;

        return await Api.post('/problems',{ title, description, category, difficulty })
    }
}
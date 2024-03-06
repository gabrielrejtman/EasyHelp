import { Problem } from "@prisma/client";
import UseCase from "../../domain/shared/usecase";
<<<<<<< HEAD
import { ICreateProblem } from "../../domain/usecases/Problem/CreateProblem/ICreateProblem";
=======
import { ICreateProblem } from "../../domain/usecases/Problem/CreateProblemUseCase";
>>>>>>> 21fec1d4 (user and problem cruds have been done)
import { Api } from "../Api";

export class CreateProblem implements UseCase<ICreateProblem, Problem> {

    async execute(data: ICreateProblem): Promise<Problem> {
        const { title, description, category, difficulty } = data;

        return await Api.post('/problems',{ title, description, category, difficulty })
    }
}
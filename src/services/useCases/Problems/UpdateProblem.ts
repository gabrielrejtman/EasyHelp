import Problem from "../../../domain/entities/Problem";
import { Api } from "../../Api";

export class UpdateProblem{

    async execute(data: Problem) {
        const { id, title, description, category, difficulty } = data;
        const res = await Api.put(`/problems${id}`,{ title, description, category, difficulty })
        return res.data
    }
}
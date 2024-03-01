import { Problem } from "../entities/Problem";
import { IProblem, IProblemRepository } from "../interfaces/IProblemRepository";
import { prisma } from "../database/prisma-client";

export class ProblemRepository implements IProblemRepository {
    constructor() {}

    async createProblem(data: IProblem): Promise<IProblem> {
        const result = await prisma.problema.create({
            data: {
                id_problema: data.id_problema,
                descricao: data.description,
                categoria: data.category,
                dificuldade: data.difficulty,
                createdAt: data.date,
                titulo:data.title
            }
        })

        return result;
    }
}
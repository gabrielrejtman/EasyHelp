import { PrismaClient } from "@prisma/client";
import ProblemRepository from "../../domain/repositories/ProblemRepository";
import Problem from "../../domain/entities/Problem";
import { ICreateProblem } from "../../domain/usecases/Problem/CreateProblemUseCase";
import { IUpdateProblem } from "../../domain/usecases/Problem/UpdateProblemUseCase";


export default class PrismaProblemRepository implements ProblemRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(problem: ICreateProblem): Promise<Problem> {
        return await this.prisma.problem.create({data: problem});
    }

    async getAllProblems(): Promise<Problem[]> {
        return await this.prisma.problem.findMany();
    }

    async getProblemsByTitle(title: string): Promise<Problem[] | null> {
        return await this.prisma.problem.findMany({
            where: {
                title: {contains: title},
            },
        })
    }

    async getProblemByTitle(title: string): Promise<Problem | null> {
        return await this.prisma.problem.findFirst({
            where: {
                title,
            },
        })
    }

    async updateProblem(id: string, problem: IUpdateProblem): Promise<Problem> {
        return await this.prisma.problem.update({
            where:{
                id
            },
            data: problem
        })
    }

    async delete(id: string): Promise<Problem | null> {
        const result = await this.prisma.problem.delete({
            where: {
                id,
            },
        })
        return result;
    }
}
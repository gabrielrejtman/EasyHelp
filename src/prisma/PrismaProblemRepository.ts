import { PrismaClient } from "@prisma/client";
import ProblemRepository from "../repositories/ProblemRepository";
import Problem from "../entities/Problem";
import { ICreateProblem } from "../usecases/CreateProblem/ICreateProblem";

export default class PrismaProblemRepository implements ProblemRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    create(problem: ICreateProblem): Promise<Problem> {
        return this.prisma.problem.create({data: problem})
    }

    getProblems(title: string): Promise<Problem | null> {
      return this.prisma.problem.findFirst({
        where: {
            title
        }
      })
    }

    delete(id: string): Promise<Problem | null> {
        const result = this.prisma.problem.delete({
            where: {
                id,
            },
        })
        return result;
    }
}
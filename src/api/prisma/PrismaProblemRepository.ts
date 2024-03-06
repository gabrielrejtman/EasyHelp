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

    create(problem: ICreateProblem): Promise<Problem> {
        return this.prisma.problem.create({data: problem})
    }

    getAllProblems(): Promise<Problem[]> {
        return this.prisma.problem.findMany();
    }

    getProblemsByTitle(title: string): Promise<Problem | null> {
      return this.prisma.problem.findFirst({
        where: {
            title
        }
      })
    }

    updateProblem(id: string, problem: IUpdateProblem): Promise<Problem> {
        return this.prisma.problem.update({
            where:{
                id
            },
            data: problem
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
import { PrismaClient } from "@prisma/client";
import ProblemRepository from "../../domain/repositories/ProblemRepository";
import Problem from "../../domain/entities/Problem";
<<<<<<< HEAD
import { ICreateProblem } from "../../domain/usecases/Problem/CreateProblem/ICreateProblem";
=======
import { ICreateProblem } from "../../domain/usecases/Problem/CreateProblemUseCase";
import { IUpdateProblem } from "../../domain/usecases/Problem/UpdateProblemUseCase";
>>>>>>> 21fec1d4 (user and problem cruds have been done)


export default class PrismaProblemRepository implements ProblemRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    create(problem: ICreateProblem): Promise<Problem> {
        return this.prisma.problem.create({data: problem})
    }

<<<<<<< HEAD
    getProblems(title: string): Promise<Problem | null> {
=======
    getAllProblems(): Promise<Problem[]> {
        return this.prisma.problem.findMany();
    }

    getProblemsByTitle(title: string): Promise<Problem | null> {
>>>>>>> 21fec1d4 (user and problem cruds have been done)
      return this.prisma.problem.findFirst({
        where: {
            title
        }
      })
    }

<<<<<<< HEAD
=======
    updateProblem(id: string, problem: IUpdateProblem): Promise<Problem> {
        return this.prisma.problem.update({
            where:{
                id
            },
            data: problem
        })
    }

>>>>>>> 21fec1d4 (user and problem cruds have been done)
    delete(id: string): Promise<Problem | null> {
        const result = this.prisma.problem.delete({
            where: {
                id,
            },
        })
        return result;
    }
}
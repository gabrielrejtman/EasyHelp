import { Specialist } from "../../entities/Specialist";
import AdminRepository from "../../repositories/AdminRepository";


export class CreateSpecialistUseCase {

    constructor(private readonly adminRepository: AdminRepository) {}

    async execute(data: Specialist): Promise<Specialist> {
        const { id, name, category, password } = data;
        
        const supervisorAlreadyExists = await this.adminRepository.getSpecialistByName(name);
        if (supervisorAlreadyExists) {
            throw new Error("Specialist Already Exists");
        }

        return await this.adminRepository.createSpecialist({ id, name, category, password });
    }
}
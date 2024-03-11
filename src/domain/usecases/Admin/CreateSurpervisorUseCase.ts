import { Supervisor } from "../../entities/Supervisor";
import AdminRepository from "../../repositories/AdminRepository";


export class CreateSupervisorUseCase {

    constructor(private readonly adminRepository: AdminRepository) {}

    async execute(data: Supervisor): Promise<Supervisor> {
        const { id, name, password } = data;
        
        const supervisorAlreadyExists = await this.adminRepository.getSupervisorByName(name);
        if (supervisorAlreadyExists) {
            throw new Error("Supervisor Already Exists");
        }

        return await this.adminRepository.createSupervisor({ id, name, password });
    }
}
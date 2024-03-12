import { Specialist } from "../entities/Specialist";
import { Supervisor } from "../entities/Supervisor";


export default interface AdminRepository {
    createSupervisor(supervisor: Supervisor): Promise<Supervisor>;
    getAllSupervisors(): Promise<Supervisor[]>;
    getSupervisorByName(name: string): Promise<Supervisor | null>;
    updateSupervisor(id: string, name: string): Promise<Supervisor>;
    deleteSupervisor(id: string): Promise<Supervisor>;

    createSpecialist(specialist: Specialist): Promise<Specialist>;
    getAllSpecialists(): Promise<Specialist[]>;
    getSpecialistByName(name: string): Promise<Specialist | null>;
    updateSpecialist(id: string, name: string): Promise<Specialist>;
    deleteSpecialist(id: string): Promise<Specialist>;
}
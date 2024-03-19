export default interface Order {
    id?: string;
    createdAt?: Date;
    finalUpdatedAt?: Date;
    description: string;
    status: string;
    sector: string;
    rating: number;
    priority: string;
    supervisorId: string;
    specialistId?: string;
    problemId: string;
}

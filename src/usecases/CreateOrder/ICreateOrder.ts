export interface ICreateOrder {
    id: string;
    createdAt: string;
    finalUpdatedAt: string;
    description: string;
    status: string;
    rating: number;
    priority: string;
    id_supervisor: string;
    id_prob: string;
}

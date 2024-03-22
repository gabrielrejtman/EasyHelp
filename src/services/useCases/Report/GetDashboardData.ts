import Problem from "../../../domain/entities/Problem";
import { Api } from "../../Api";


export type ResultType = ({
    category: string;
    _count: number;
}[] | {
    title: string;
    _count: number;
}[] | {
    sector: string;
    _count: number;
}[])[];

 
// interface ResultItemCategory {
//     category: string;
//     _count: number;
// }

// interface ResultItemTitle {
//     title: string;
//     _count: number;
// }

// interface ResultItemSector {
//     sector: string;
//     _count: number;
// }

// export interface ResultType {
//     resultItemCategory: ResultItemCategory[];
//     resultItemTitle: ResultItemTitle[];
//     resultItemSector: ResultItemSector[];
// }


export class GetDashboardData {
    
    async execute(): Promise<ResultType> {
        const response = await Api.get<ResultType>('/report');
        return response.data;
    }
}
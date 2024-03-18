import { Client } from "@opensearch-project/opensearch";


export interface ICreateProblemOpenSearch {
    id?: string;
    title: string;
    description: string;
    category: string;
    difficulty: string;
}

export class CreateProblemOpenSearchUseCase {
    constructor(private readonly openSearchClient: Client) {}

    async execute(data: ICreateProblemOpenSearch) {
        const { id, title, description, category, difficulty } = data;

        const result = await this.openSearchClient.index({
            index: 'teste5',
            id: id,
            body: {   
                title: title,
                description: description,
                category: category,
                difficulty: difficulty   
            },
            refresh: true

        });
    
        return result;
    }
}
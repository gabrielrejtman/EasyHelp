import { Client } from "@opensearch-project/opensearch";


export class DeleteProblemOpenSearchUseCase {
    constructor(private readonly openSearchClient: Client) {}

    async execute(id: string) {
        await this.openSearchClient.delete({
            index: 'teste5',
            id
        });
    }
}
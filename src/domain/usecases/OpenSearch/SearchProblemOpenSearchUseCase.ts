import { Client } from "@opensearch-project/opensearch";


export class SearchProblemOpenSearchUseCase {
    constructor(private readonly openSearchClient: Client) {}

    async execute() {
        const queries = [
            {},
            {query: { match: { title: "maquina nao"} } },
            {},
            {query: { match: { description: "dificil pra"} } }
        ]

        const result = await this.openSearchClient.msearch({
            index: "teste4",
            body: queries
        });


        await result.body.responses.map((res: any) =>
            res.hits.hits.map((problem: any) => {
                console.log(problem);
            })
        );
        
    }
}
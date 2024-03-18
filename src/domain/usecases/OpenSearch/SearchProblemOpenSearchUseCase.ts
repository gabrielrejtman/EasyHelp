import { Client } from "@opensearch-project/opensearch";


export class SearchProblemOpenSearchUseCase {
    constructor(private readonly openSearchClient: Client) {}

    async execute(searchTerm: string) {
        const queries = [
            {},
            {query: { match: { title: searchTerm} } },
            {},
            {query: { match: { description: searchTerm} } }
        ]

        const result = await this.openSearchClient.msearch({
            index: "teste5",
            body: queries
        });


        const allResults = await Promise.all(result.body.responses.map(async (res: any) => {
            const problems = await Promise.all(res.hits.hits.map(async (problem: any) => {
                return problem._source;
            }));
            return problems;
        }));
        
        const flattenedResults = allResults.flat();

        return flattenedResults;
        
    }
}
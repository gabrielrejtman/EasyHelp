export class Problem {
    public readonly id: string;

    public title: string;
    public description: string;
    public category: string;
    public difficulty: string;
    public createdAt = Date;

    constructor(props: Omit<Problem, "id">) {
        this.title = props.title;
        this.description = props.description;
        this.category = props.category;
        this.difficulty = props.difficulty;
    }
}


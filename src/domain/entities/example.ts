interface Problem {
    title: string
    category: string
    difficulty: string
    description: string
}

interface Supervisor {
    id: string
    name: string
    role: string
}

interface Technician{
    id: string
    name: string
    role: string
}
export interface Order{
    id: string
    timeStart: string
    timeEnd: string
    description: string
    status: string
    note: number
    sector: string
    problem: Problem
    supervisor: Supervisor
    technician: Technician

}

export const ex1: Order = {
    id: "123",
    timeStart: "9:00",
    timeEnd: "17:00",
    description: "Example order description",
    status: 'Concluida',
    note: 3,
    sector: '12',
    problem: {
        title: 'maquina não liga',
        category: 'eletrico',
        difficulty: 'facil',
        description: 'A maquina apresenta sinais de...'
    },
    supervisor: {
        id: "789",
        name: "Luis da Silva",
        role: "Supervisor"
    },

    technician: {
        id: "101",
        name: "Osvaldo Ferreira",
        role: "Técnico"
    },
};
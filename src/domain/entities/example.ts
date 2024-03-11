interface Problem {
    title: string
    category: string
    difficulty: string
    description: string
}

interface Supervisor {
    id: string
    name: string
}

interface Technician{
    id: string
    name: string
}
export interface Order{
    id: string
    timeStart: string
    timeEnd: string
    description: string
    status: string
    note: number
    problem: Problem
    supervisor: Supervisor
    technician: Technician
}

export const exampleOrder: Order = {
    id: "123",
    timeStart: "2024-03-03T09:00:00",
    timeEnd: "2024-03-03T17:00:00",
    description: "Example order description",
    status: 'Concluida',
    note: 4,

    problem: {
        title: 'maquina não liga',
        category: 'eletrico',
        difficulty: 'facil',
        description: 'A maquina apresenta sinais de...'
    },

    supervisor: {
        id: "789",
        name: "Luis da Silva",
    },

    technician: {
        id: "101",
        name: "Osvaldo",
    },
};
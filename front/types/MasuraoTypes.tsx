export type ShortEmployee = {
    id: number;
    email: string;
    name: string;
    surname: string;
};

export type Employee = {
    id: number;
    email: string;
    name: string;
    surname: string;
    birth_date: string;
    gender: string;
    work: string;
    subordinates: {
        Items: number;
    };
};

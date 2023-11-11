interface Item{
    id:number;
    startDate:string;
    endDate: string;
    childs:Item[];
}

export type {Item}
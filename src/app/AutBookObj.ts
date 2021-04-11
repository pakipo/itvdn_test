export class AutBookObj{
   
    id: number;
    surname: string;
    name: string;
    patronymic: string;
    birthDate:string;
       listBooks: {
        title:string,
        pageCount: number,
        style: string
    } []
   
   
   
}
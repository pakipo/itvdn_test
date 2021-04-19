export class AutBookObj {
    static styleBooks = ['фантастика', 'приключения', 'детектив'];
    id: number;
    surname: string;
    name: string;
    patronymic?: string;
    birthDate: string;
    listBooks: {
        title: string,
        pageCount: number,
        style: string
    }[] = [];

    constructor(id: number, surname: string, name: string, patronymic: string, birthDate: string, ...listBooks: {
        title: string, pageCount: number, style: number
    }[]) {
        this.id = id;
        this.surname = surname;
        this.name = name;
        if (patronymic) {
            this.patronymic = patronymic;
        }
        this.birthDate = birthDate;

        for (let index = 0; index < listBooks.length; index++) {
            this.listBooks.push({
                title: listBooks[index].title,
                pageCount: listBooks[index].pageCount,
                style: AutBookObj.styleBooks[listBooks[index].style]
            })

        }
    }
}

export class Book {
    id: number;
    book: {
        title: string,
        pageCount: number,
        style: string
    };
    surname: string
    constructor(id, book, surname) {
        this.id = id;
        this.book = book;
        this.surname = surname;
    }
}


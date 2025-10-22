export interface Contact {
    id: string,
    firstName:string,
    lastName: string,
    address: string,
    number: string,
    email: string,
    company: string,
    image: string,
    isFavourite: boolean 
}
export type NewContact= Omit<Contact,"id">;
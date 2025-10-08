import { inject, Injectable } from '@angular/core';
import { Contact, NewContact } from '../interfaces/contact';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  aleatorio = Math.random();
  authService = inject(AuthService);
  readonly URL_BASE = "https://agenda-api.somee.com/api/contacts";

  contacts: Contact[] = []

  /** Obtiene los contactos del backend */
  async getContacts() {
    const res = await fetch(this.URL_BASE,
      {
        headers:{
          Authorization: "Bearer "+this.authService.token,
        }
      }
    )
    const resJson: Contact[] = await res.json()
    this.contacts = resJson;
  }

  /** Devuelve un contato en particular segun su ID */
  async getContactById(id: string | number) {
      const res = await fetch("https://agenda-api.somee.com/api/Contacts" + "/" + id,
      {
        headers: {
          Authorization: "Bearer " + this.authService.token,
        },
      })
    if (!res.ok) {
      return
    }
    const resJson: Contact = await res.json()
    this.contacts.push(resJson);
    return resJson
   }

  /** Crea un contacto */
  async createContact(nuevoContacto:NewContact) {
    const res = await fetch(this.URL_BASE, 
      {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+this.authService.token,
        },
        body: JSON.stringify(nuevoContacto)
      });
    if(!res.ok) return;
    const resContact:Contact = await res.json();
    this.contacts.push(resContact);
    return resContact;
  }

 async editContact(contactoEditado:Contact) { 
  const res = await fetch("https://agenda-api.somee.com/api/Contacts" + "/" + contactoEditado,
    {
      method: "PUT",
      headers : {
        "Content-Type": "application/json",
        Authorization: "Bearer" + this.authService.token,
      },
      body: JSON.stringify(contactoEditado)
    });
    if(!res.ok)return;
    const resContact:Contact = await res.json()
    this.contacts=this.contacts.map(contact => {
      if(contact.id === resContact.id) return resContact;
        return contact
    })
};

  /** Borra un contacto */
 async deleteContact(id:string) {
    const res =await fetch ("https://agenda-api.somee.com/api/Contacts/"+id,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer"+ this.authService.token,
        },
      });
  if (!res.ok) return;
  if (!res.ok) {
    this.contacts=this.contacts.filter(contact=>contact.id!== id)
  }
  return true;
 }
}
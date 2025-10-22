
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

  
  async getContactById(id: string | number) {
    const res = await fetch(this.URL_BASE+"/"+id, 
      {
        headers: {
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if(!res.ok) return;
    const resContact:Contact = await res.json();
    return resContact;
  }

 
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
    const res = await fetch(this.URL_BASE+"/"+contactoEditado.id, 
      {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer "+this.authService.token,
        },
        body: JSON.stringify(contactoEditado)
      });
    if(!res.ok) return;
    
    this.contacts = this.contacts.map(contact => {
      if(contact.id === contactoEditado.id) 
        return contactoEditado;
        return contact;
      }); 
    return contactoEditado;
  }

  
  async deleteContact(id:string | number) {
    const res = await fetch(this.URL_BASE+"/"+id, 
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if(!res.ok) return;
    if(res.ok) {
      this.contacts = this.contacts.filter(contact => contact.id !== id); 
    }
    return true;
  }

  
  async setFavourite(id:string | number ) {
    const res = await fetch(this.URL_BASE+"/"+id+"/favourite", 
      {
        method: "POST",
        headers: {
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if(!res.ok) return;
    
    this.contacts = this.contacts.map(contact => {
      if(contact.id === id) {
        return {...contact, isFavourite: !contact.isFavourite};
      };
      return contact;
    });
    return true;
  }
}
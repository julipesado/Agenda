import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, NewContact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contacts-services';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Spinner } from "../../components/contact-list-item/spinner/spinner";


@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule, Spinner],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact implements OnInit {
   contactsService = inject(ContactsService);
   router = inject(Router)
  errorEnBack = false;
   idContacto = input<number>();
  contactoOriginal:Contact|undefined = undefined;
   form = viewChild<NgForm>('newContactForm');
  isLoading= false;
  authService=inject(AuthService);
  contact: Contact | undefined;
  
  async ngOnInit() {
    if(this.idContacto()){
      this.contactoOriginal = await this.contactsService.getContactById(this.idContacto()!);
      
      this.form()?.setValue({
        firstName: this.contactoOriginal!.firstName,
        lastName: this.contactoOriginal!.lastName,
        address: this.contactoOriginal!.address,
        email: this.contactoOriginal!.email,
        image: this.contactoOriginal!.image,
        number: this.contactoOriginal!.number,
        company: this.contactoOriginal!.company,
        isFavourite: this.contactoOriginal!.isFavourite
      })
    }
  }

 
  async handleFormSubmission(newContact: NewContact){
    let res;
    this.isLoading=true;
    if(this.idContacto()){
      res = await this.contactsService.editContact({...newContact,id:this.idContacto()!.toString()})
    } else {
      res = await this.contactsService.createContact(newContact);
    }
    this.isLoading=false;
    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/"]);
  }

}
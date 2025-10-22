import { Component, inject, input } from '@angular/core';
import { Contact } from '../../../interfaces/contact';
import { ContactsService } from '../../../services/contacts-services';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-list-item',
  imports: [RouterModule],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  contact = input.required<Contact>();
  aleatorio = Math.random();
  contactsService = inject(ContactsService);
  router=inject(Router);

  openDeleteModal(){
    Swal.fire({
      title: "¿Desea borrar el contacto?",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cancelar",
      denyButtonText: `Eliminar definitivamente`
    }).then((result) => {
      if (result.isDenied) { 
        this.contactsService.deleteContact(this.contact().id);
        this.router.navigate(["/"])
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ContactsService } from '../../services/contacts-services';
import { Contact } from '../../interfaces/contact';

@Component({
  selector: 'app-contact-details-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './contact-details-page.html',
  styleUrl: './contact-details-page.scss'
})
export class ContactDetailsPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  contactService = inject(ContactsService);

  contacto?: Contact;
  loading = true;

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // <-- se lee de la ruta /contacts/:id
    if (!id) {
      this.loading = false;
      return;
    }
    try {
      this.contacto = await this.contactService.getContactById(id);
    } catch (error) {
      console.error('Error al obtener contacto:', error);
    } finally {
      this.loading = false;
    }
  }

  async toggleFavourite() {
    if (!this.contacto) return;
    await this.contactService.setFavourite(this.contacto.id);
    this.contacto.isFavourite = !this.contacto.isFavourite;
  }

  async deleteContact() {
    if (!this.contacto) return;
    await this.contactService.deleteContact(this.contacto.id);
    this.router.navigate(['/']); 
  }
}

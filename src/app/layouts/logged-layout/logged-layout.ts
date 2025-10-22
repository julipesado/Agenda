import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, RouterLink, ],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {
  authService=inject(AuthService)



openLogoutModal (){
  Swal.fire ({
    title: "Quiere mantenerse loggeado?",
    showDenyButton: true,
    showCancelButton: true,
    showConfirmButton: false,
    cancelButtonText: 'Si'
  }) .then((result)=>{
    if (result.isDenied){
      this.authService.logout();
    }
  })
}
}

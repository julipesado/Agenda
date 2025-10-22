import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { LoggedLayout } from './layouts/logged-layout/logged-layout';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { NewEditContact } from './pages/new-edit-contact/new-edit-contact';
import { RegisterPage } from './pages/register-page/register-page';
export const routes: Routes = [
    {
        path: "login",
        component: LoginPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "register",
        component: RegisterPage
    },
    {
        path: "",
        component: LoggedLayout,
        canActivateChild: [onlyLoggedUserGuard],
        children: [
            {
                path: "",
                component: ContactsPage
            },
            {
                path: "contacts/add",
                component: NewEditContact
            },
            {
                path: "contacts/:id",
                component: ContactDetailsPage
            },
            {
            path: "contacts/:idContacto/edit",
            component: NewEditContact
            },
        ]
    },

];
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// importa las rutas
import { RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// importa todos los componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShoppingCarComponent } from './components/shopping-car/shopping-car.component';

// importa las funciones para Forms
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// importa los servicios
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

// guards
import {AuthGuard} from './guards/auth.guards';
import { LoggedAuthGuard } from './guards/loggedAuth.guards';
import { FooterComponent } from './components/footer/footer.component';





// crea una funcion con todas las rutas
const appRoutes: Routes = [
  {path: '', component: HomeComponent}, // homePage
  {path: 'register', component: RegisterComponent, canActivate: [LoggedAuthGuard]}, // RegisterComponent
  {path: 'login', component: LoginComponent, canActivate: [LoggedAuthGuard]}, // LoginComponent
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}, // DashboardComponent
  {path: 'cursos', component: CursosComponent}, // CursosComponent
  {path: 'checkout', component: CheckoutComponent}, // CheckoutComponent
  {path: 'carrito', component: ShoppingCarComponent}, // ShoppingCarComponent
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]} // ProfileComponent
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    CursosComponent,
    CheckoutComponent,
    ShoppingCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes), // obliga a usar la nueva funcion
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, LoggedAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

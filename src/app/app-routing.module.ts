import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConocimientosComponent } from './conocimientos/conocimientos.component';
import { HomeComponent } from './home/home.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { EducacionComponent } from './educacion/educacion.component';
import { PaginaInexistenteComponent } from './pagina-inexistente/pagina-inexistente.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'skills', component: ConocimientosComponent},
  { path: 'education', component: EducacionComponent},
  { path: 'experience', component: ExperienciaComponent},
 { path: '**', pathMatch: 'full',   component: PaginaInexistenteComponent }, // Wildcard route for a 404 page 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

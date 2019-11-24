import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { StudentListComponent } from './student-list/student-list.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  { path: 'form', component : FormComponent},
  { path: 'list', component : StudentListComponent},
  { path: 'home', component : HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

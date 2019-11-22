import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { StudentListComponent } from './student-list/student-list.component';


const routes: Routes = [
  { path: 'form', component : FormComponent},
  { path: 'list', component : StudentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { Student } from "../student";
import { trigger, state, style, transition, animate } from '@angular/animations';


const ANIMATION_TIME = 300
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  animations: [
    trigger('deleteTrigger', [
      state('isNotDeleting', style({ opacity: 1 })),
      state('isDeleting', style({opacity: 0 })),
      transition('isNotDeleting => isDeleting', animate(ANIMATION_TIME))
    ])
  ]

})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  newStudent: string;

  private refreshStudents() {
    const students = localStorage.getItem('students')
    this.students = students ? JSON.parse(students) : []
  }

  saveStudents() {
    localStorage.setItem('students', JSON.stringify(this.students))
  }


  



  deleteStudents(student: Student) {
    

    // setTimeout(() => (this.students = this.students.filter(s => s.id !== student.id)), ANIMATION_TIME + 50)

    this.students = this.students.filter(s => s.id !== student.id)
    
  
    this.saveStudents()
  
  }

  constructor() { }

  ngOnInit() {
    this.refreshStudents();
  }

}

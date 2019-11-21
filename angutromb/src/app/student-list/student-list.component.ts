import { Component, OnInit } from '@angular/core';
import { Student } from "../student";



@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {


  students: Student[] = [];

  newStudent: string;

  private refreshStudents() {
    const students = localStorage.getItem('students')
    this.students = students ? JSON.parse(students) : []
  }

  constructor() { }

  ngOnInit() {
  }

}

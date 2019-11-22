import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Student } from "../student";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  imageURL: string;
  GradeArray: any = ['B1', 'B2', 'B3', 'I1', 'I2'];
  students: Student[] = [];

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      avatar: [null],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      dob: ['', [Validators.required]],
      grade: ['', [Validators.required]]
    });
    this.refreshStudents();
  }

  private refreshStudents() {
    const students = localStorage.getItem('students')
    this.students = students ? JSON.parse(students) : []
  }

  saveStudents() {
    localStorage.setItem('students', JSON.stringify(this.students))
  }

  // Date
  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get('dob').setValue(convertDate, {
      onlyself: true
    })
  }

  // Handle form errors
  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.patchValue({
      avatar: file
    });
    this.myForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  // Submit Form
  onSubmit() {
    console.log(this.myForm.value);
    this.students.push({
      id: this.students.reduce((acc, t) => acc <= t.id ? t.id + 1 : acc, 1),
      firstName: this.myForm.controls.firstName.value
    })
    this.saveStudents()
  }

}

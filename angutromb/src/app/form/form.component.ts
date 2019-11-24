import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { Subject, Student } from "../student";
import { Router } from "@angular/router";
import { RequiredAgeValidator } from "../required-age.validator";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatChipInputEvent } from "@angular/material/chips";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  imageURL: string;
  GradeArray: any = ["B1", "B2", "B3", "I1", "I2"];
  students: Student[] = [];
  @ViewChild("chipList", { static: true }) chipList;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  SubjectsArray: Subject[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      avatar: [null, [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      gender: [""],
      dob: ["", [Validators.required, RequiredAgeValidator]],
      grade: ["", [Validators.required]],
      subjects: [this.SubjectsArray],
      languages: this.fb.array([])
    });
    this.refreshStudents();
  }

  private refreshStudents() {
    const students = localStorage.getItem("students");
    this.students = students ? JSON.parse(students) : [];
  }

  saveStudents() {
    localStorage.setItem("students", JSON.stringify(this.students));
  }

  // Date
  date(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.myForm.get("dob").setValue(convertDate, {
      onlyself: true
    });
  }

  // Handle form errors
  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  };

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.myForm.patchValue({
      avatar: file
    });
    this.myForm.get("avatar").updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  get languagesArr() {
    return this.myForm.get("languages") as FormArray;
  }

  addLanguage() {
    const language = this.fb.group({
      language: [""]
    });
    this.languagesArr.push(language);
  }

  deleteLanguage(index: number) {
    this.languagesArr.removeAt(index);
  }

  /* Add dynamic languages */
  addSubject(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || "").trim() && this.SubjectsArray.length < 5) {
      this.SubjectsArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  /* Remove dynamic languages */
  removeSubject(subject: Subject): void {
    const index = this.SubjectsArray.indexOf(subject);
    if (index >= 0) {
      this.SubjectsArray.splice(index, 1);
    }
  }

  // Submit Form
  onSubmit() {
    console.log(this.myForm.value);
    this.students.push({
      id: this.students.reduce((acc, t) => (acc <= t.id ? t.id + 1 : acc), 1),
      avatar: this.imageURL,
      firstName: this.myForm.controls.firstName.value,
      lastName: this.myForm.controls.lastName.value,
      email: this.myForm.controls.email.value,
      gender: this.myForm.controls.gender.value,
      grade: this.myForm.controls.grade.value,
      dob: this.myForm.controls.dob.value,
      subjects: this.SubjectsArray
    });
    this.saveStudents();
    this.router.navigate(["/list"]);
  }
}

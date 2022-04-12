import { Component, VERSION } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  Data: Array<any> = [
    { name: 'All', value: 'all' },
    { name: 'Internal', value: 'internal' },
    { name: 'External', value: 'external' },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([]),
    });
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));

      // "all" is getting checked
      if (e.target.value == 'all') {
        //pass
      }
 
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    // If all checkboxes apart all are check => check "All" as well
    if (checkArray.length == this.Data.length - 1) {
      //pass
    }
    console.log(e.target.value);
    console.log(e.target.checked);
  }

  submitForm() {
    console.log(this.form.value);
  }
}

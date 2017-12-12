import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, CONTACTTYPE } from '../shared/feedback';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = CONTACTTYPE;
  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required',
      'minlength': 'First Name must be atleast 2 characters long',
      'maxlength': 'First Name cannot be more than 25 characters'
    },
    'lastname': {
      'minlength': 'Last Name must be atleast 2 characters long',
      'maxlength': 'Last Name cannot be more than 25 characters'
    },
    'telnum': {
      'pattern': 'Tel. Number must contain only numbers'
    },
    'email': {
      'email': 'Email not in valid format'
    }
  };

  constructor(private fb: FormBuilder) { //<-- inject FormBuilder
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, Validators.pattern],
      email: ['', Validators.email],
      agree: false,
      contacttype: 'None',
      message: ['', Validators.required]
    });

    // subscribe to valuechanges observable
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // re-set form validation messages
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }

    const form = this.feedbackForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

}

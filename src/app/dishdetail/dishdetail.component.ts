import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';

import { DishService } from "../services/dish.service";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  // @Input()
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  @ViewChild(FormGroupDirective) commentFormDirective;
  comment: Comment;
  formErrors = {
    'author': '',
    'comment': ''
  };
  validationMessages = {
    'author': {
      'required': 'Name is required',
      'minlength': 'Name must be atleast 2 characters long',
      'maxlength': 'Name cannot be more than 25 characters'
    },
    'comment': {
      'required': 'Your Comment is required',
      'minlength': 'Your Comment must be atleast 2 characters long'
    }
  };

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit() {
    // let id = +this.route.snapshot.params['id'];
    // this.dishservice.getDish(id).subscribe(dish => this.dish = dish);
      // .then(dish => this.dish = dish);

    this.dishservice.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    // using the params observable
    this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(2)]]
    });

    // subscribe to valuechanges observable
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // re-set form validation messages
  }

  onValueChanged(data?: any) {
    if(!this.commentForm) {
      return;
    }

    const form = this.commentForm;
    for (const field in this.formErrors){
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for (const key in control.errors){
          this.formErrors[field] += messages[key] +  ' ';
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    // console.log(this.comment);
    this.comment.date = new Date().toISOString();
    // console.log(this.comment.date);
    this.dish.comments.push(this.comment);
    console.log(this.dish.comments);
    this.commentFormDirective.resetForm({
      author: '',
      rating: 5,
      comment: ''
    });
    // this.commentFormDirective.resetForm();
  }


}

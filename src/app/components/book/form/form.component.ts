import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import fileUpload from 'fuctbase64';

import { BookService } from '../../../core/services/book/book.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../core/models/category';
import { FreightOptions } from '../../../core/models/freightOptions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  formGroup: FormGroup;
  freightOptions: FreightOptions[] = [];
  categories: Category[] = [];

  constructor(
    private _scBook: BookService,
    private _scCategory: CategoryService,
    private _formBuilder: FormBuilder
  ) {

    this.formGroup = _formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      categoryId: ['', [Validators.required]],
      image: ['', [Validators.required]],
      imageBytes: [this._formBuilder.array([])],
      freightOption: _formBuilder.group({
        value: new FormControl('', [Validators.required])
      }),
    });
  }

  get freightOption(): any { return this.formGroup.get('freightOption'); }

  ngOnInit() {
    this.freightOptions = this._scBook.getFreightOptions();
    this._scCategory.getAll().subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  addBook() {
    if (this.formGroup.valid) {
      this._scBook.create(this.formGroup.value).subscribe();
    }
  }

  changeFieldFreightOption(option) {
    this.freightOption.setValue({value: option});
  }

  convertImageToBase64(event) {
    if (event.target.value) {
      fileUpload(event).then(({base64}) => {
        const control = <FormArray>this.formGroup.controls['imageBytes'];
        control.setValue(base64);
      });
    }
  }
}

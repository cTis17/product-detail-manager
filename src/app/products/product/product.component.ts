import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private service : ProductService,
    private firestore : AngularFirestore,
    private toastr : ToastrService) { }
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if (form != null)
      form.resetForm();
    this.service.formData ={
      id: null,
      title: '',
      prodCode: '',
      description: '',
      price: '',
    }
  }

  onSubmit(form: NgForm){
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null)
      this.firestore.collection('products').add(data);
    else
    this.firestore.doc('products/'+form.value.id).update(data);
      this.resetForm(form);
    this.toastr.success('Submitted successfully','Product Details');
  }
}

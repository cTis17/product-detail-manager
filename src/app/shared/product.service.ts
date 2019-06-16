import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  formData : Product;
  constructor(private firestore:AngularFirestore) { }

  getProducts(){
    return this.firestore.collection('products').snapshotChanges();
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Product } from 'src/app/shared/product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  list: Product[];
  constructor(private service: ProductService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getProducts().subscribe(actionArray =>{
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Product;
      })
    });
  }

  onEdit(prod:Product){
    this.service.formData = Object.assign({},prod);
  }

  onDelete(id:string){
    if(confirm("Delete this product?")){
      this.firestore.doc('products/' + id).delete();
      this.toastr.warning('Deleted successfully', 'Product Details');
    }
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { producto } from 'src/app/admin/models/interfaces';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public item: producto,
    private dialogRef: MatDialogRef<DetailProductComponent>,
    // private store: Store<{ app: AppState }>
  ) {}

  closeModal() {
    this.dialogRef.close()
  }

  ngOnInit(): void {
    
  }
}

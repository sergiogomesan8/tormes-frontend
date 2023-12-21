import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@shop/models/product';

@Component({
  selector: 'table-crud-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() elementsTable: any[] = [];
  @Input() displayedColumns: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Product>(this.elementsTable);

    this.elementsTable.forEach((element) => {
      // console.log(element.name);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit() {
    console.log('edit');
  }
  delete() {
    console.log('edit');
  }
}

import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  @Input() displayedColumns: Array<string> = [];

  @Input() updateAction = false;
  @Input() deleteAction = false;
  @Input() viewAction = false;

  @Output() updateEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() viewEvent = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  isAction!: boolean;

  ngOnInit() {
    this.isAction = this.updateAction || this.deleteAction || this.viewAction;
    this.displayedColumns = this.displayedColumns.map((column) =>
      column.toLowerCase()
    );
    this.dataSource = new MatTableDataSource<Product>(this.elementsTable);
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource<Product>(this.elementsTable);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  update(element: any): void {
    this.updateEvent.emit(element);
  }

  delete(element: any): void {
    this.deleteEvent.emit(element);
  }

  view(element: any): void {
    this.viewEvent.emit(element);
  }
}

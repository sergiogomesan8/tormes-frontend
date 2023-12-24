/* tslint:disable:no-unused-variable */
import { MatPaginator } from '@angular/material/paginator';
import { TableComponent } from './table.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

describe('TableComponent', () => {
  let component: TableComponent;
  let mockPaginator: Partial<MatPaginator>;
  let mockSort: Partial<MatSort>;

  beforeEach(() => {
    mockPaginator = {};
    mockSort = {};

    component = new TableComponent();
    component.paginator = mockPaginator as MatPaginator;
    component.sort = mockSort as MatSort;
    component.elementsTable = [];
    component.displayedColumns = [];
    component.dataSource = new MatTableDataSource(component.elementsTable);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource on ngOnInit', () => {
    component.elementsTable = [{ id: 1 }, { id: 2 }];
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(component.elementsTable);
  });

  it('should update dataSource on ngOnChanges', () => {
    component.elementsTable = [{ id: 1 }, { id: 2 }];
    component.ngOnChanges();
    expect(component.dataSource.data).toEqual(component.elementsTable);
  });

  it('should emit updateEvent on update', () => {
    const element = { id: 1 };
    component.updateEvent.subscribe((e) => expect(e).toEqual(element));
    component.update(element);
  });

  it('should emit deleteEvent on delete', () => {
    const element = { id: 1 };
    component.deleteEvent.subscribe((e) => expect(e).toEqual(element));
    component.delete(element);
  });

  it('should set paginator and sort on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toEqual(mockPaginator);
    expect(component.dataSource.sort).toEqual(mockSort);
  });
});

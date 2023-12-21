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

  it('should set paginator and sort on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toEqual(mockPaginator);
    expect(component.dataSource.sort).toEqual(mockSort);
  });

  it('should log "edit" on edit', () => {
    console.log = jest.fn();
    component.edit();
    expect(console.log).toHaveBeenCalledWith('edit');
  });

  it('should log "delete" on delete', () => {
    console.log = jest.fn();
    component.delete();
    expect(console.log).toHaveBeenCalledWith('delete');
  });
});

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

  it('should set isAction correctly on ngOnInit', () => {
    component.updateAction = true;
    component.deleteAction = false;
    component.viewAction = false;
    component.ngOnInit();
    expect(component.isAction).toEqual(true);

    component.updateAction = false;
    component.deleteAction = false;
    component.viewAction = false;
    component.ngOnInit();
    expect(component.isAction).toEqual(false);
  });

  it('should fill columnIds correctly on ngOnInit', () => {
    component.displayedColumns = [
      { id: 'column1', name: 'Column1' },
      { id: 'column2', name: 'Column2' },
    ];
    component.ngOnInit();
    expect(component.columnIds).toEqual(['column1', 'column2']);
  });

  it('should add actions to columnIds if isAction is true on ngOnInit', () => {
    component.updateAction = true;
    component.displayedColumns = [
      { id: 'column1', name: 'Column1' },
      { id: 'column2', name: 'Column2' },
    ];
    component.ngOnInit();
    expect(component.columnIds).toContain('actions');
  });

  it('should initialize dataSource correctly on ngOnInit', () => {
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

  it('should emit viewEvent on view', () => {
    const element = { id: 1 };
    component.viewEvent.subscribe((e) => expect(e).toEqual(element));
    component.view(element);
  });

  it('should set paginator and sort on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.dataSource.paginator).toEqual(mockPaginator);
    expect(component.dataSource.sort).toEqual(mockSort);
  });
});

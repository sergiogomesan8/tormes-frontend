import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../projects/tormes-library/src/public-api';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CarouselComponent } from './components/carousel/carousel.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from './components/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    FontAwesomeModule,

    //Ng Bootstrap
    NgbModule,
    NgbCarouselModule,
  ],
  declarations: [NavbarComponent, CarouselComponent, SidebarComponent, TableComponent],
  exports: [
    ComponentsModule,
    NavbarComponent,
    CarouselComponent,
    SidebarComponent,
    TableComponent,
  ],
})
export class SharedModule {}

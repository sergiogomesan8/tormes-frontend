import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableColumn } from '@shared/models/tableColumn';
import { Section } from '@shop/models/section';
import { SectionService } from '@shop/services/section.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  sections: Section[] = [];

  displayedColumns: TableColumn[] = [
    {
      id: 'name',
      name: 'Name',
    },
  ];

  constructor(
    private readonly sectionService: SectionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.findAllSections();
  }

  findAllSections() {
    this.sectionService.findAllSections().subscribe({
      next: (sections) => {
        this.sections = sections;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateSection(section: Section) {
    this.router.navigate(['/admin/sections/update-section', section.id]);
  }

  deleteSection(section: Section) {
    this.sectionService.deleteSection(section).subscribe({
      next: () => {
        this.findAllSections();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

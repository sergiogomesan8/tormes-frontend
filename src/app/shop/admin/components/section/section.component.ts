import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env';
import { SnackbarService } from '@shared/services/snackbar.service';
import { UpdateProductDto } from '@shop/admin/dtos/product.dto';
import { CreateSectionDto } from '@shop/admin/dtos/section.dto';
import { Section } from '@shop/models/section';
import { SectionService } from '@shop/services/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  section!: Section;
  formGroup: FormGroup;
  loading: boolean = false;
  imageUrl!: string;

  constructor(
    private readonly sectionService: SectionService,
    private readonly snackbarService: SnackbarService,
    private readonly formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const sectionId = this.route.snapshot.paramMap.get('id');
    if (sectionId) {
      this.findSectionById(sectionId);
    }
  }

  findSectionById(sectionId: string) {
    this.sectionService.findSectionById(sectionId).subscribe((section) => {
      if (section) {
        this.section = section;
        this.formGroup.patchValue({
          name: this.section.name,
          image: this.section.image,
        });
        this.imageUrl = environment.production
          ? this.section.image
          : `${environment.tormes_backend_images}/products/${this.section.image}`;
      } else {
        this.router.navigate(['/admin/sections']);
      }
    });
  }

  updateSection(): void {
    if (this.formGroup.valid) {
      const updateSectionDto = this.buildUpdateSectionDto();

      if (updateSectionDto) {
        this.sectionService
          .updateSection(this.section.id, updateSectionDto)
          .subscribe({
            next: () => {
              this.router.navigate(['/admin/sections']);
            },
            error: (error) => {
              console.log(error);
            },
          });
      } else {
        this.snackbarService.showErrorSnackbar(
          'shop.admin.sections.noChanges'
        );
      }
    }
  }

  createSection() {
    if (this.formGroup.valid) {
      const createSectionDto: CreateSectionDto = {
        name: this.formGroup.value.name,
        image: this.formGroup.value.image,
      };

      this.sectionService.createSection(createSectionDto).subscribe({
        next: () => {
          this.router.navigate(['/admin/sections']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  buildUpdateSectionDto(): UpdateProductDto | null {
    const updateProductDto: UpdateProductDto = {};

    this.addIfChanged(
      'name',
      this.formGroup.value.name,
      this.section.name,
      updateProductDto
    );
    this.addIfChanged(
      'image',
      this.formGroup.value.image,
      this.section.image,
      updateProductDto
    );

    return Object.keys(updateProductDto).length > 0 ? updateProductDto : null;
  }

  addIfChanged(
    key: keyof UpdateProductDto,
    formValue: any,
    originalValue: any,
    updateProductDto: UpdateProductDto
  ): void {
    if (formValue !== originalValue) {
      updateProductDto[key] = formValue;
    }
  }

  handleFile(data: { file?: File; error?: string }) {
    if (data.error) {
      console.log('Error', data.error);
      this.snackbarService.showErrorSnackbar(
        'shop.admin.sections.fileTypeError'
      );
    } else if (data.file) {
      this.formGroup.get('image')?.setValue(data.file);
    }
  }
}

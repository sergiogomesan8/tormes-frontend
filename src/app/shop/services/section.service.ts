import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http-service.service';
import { SectionEndPoint } from '@shared/end-points';
import { SnackbarService } from '@shared/services/snackbar.service';
import {
  CreateSectionDto,
  UpdateSectionDto,
} from '@shop/admin/dtos/section.dto';
import { Section } from '@shop/models/section';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  private sectionEndPoint = new SectionEndPoint();

  constructor(
    private readonly httpService: HttpService,
    private readonly snackbarService: SnackbarService
  ) {}

  findSectionById(sectionId: string): Observable<Section | undefined> {
    return this.httpService
      .get(`${this.sectionEndPoint.FIND_BY_ID}${sectionId}`)
      .pipe(
        map((response: undefined) => {
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.sections.getByIdError'
          );
          return of(error);
        })
      );
  }

  findAllSections(): Observable<Section[]> {
    return this.httpService.get(this.sectionEndPoint.FIND_ALL).pipe(
      catchError((error: undefined) => {
        return of([]);
      })
    );
  }

  createSection(
    createSectionDto: CreateSectionDto
  ): Observable<Section | undefined> {
    const formData: FormData = new FormData();
    formData.append('name', createSectionDto.name);
    formData.append('image', createSectionDto.image);

    return this.httpService.post(this.sectionEndPoint.ADD, formData).pipe(
      map((response: Section) => {
        this.snackbarService.showSuccessSnackbar(
          'shop.admin.sections.addSuccess'
        );
        return response;
      }),
      catchError((error: undefined) => {
        this.snackbarService.showErrorSnackbar(
          'shop.admin.sections.addError'
        );
        return of(error);
      })
    );
  }

  updateSection(
    sectionId: string,
    updateSectionDto: UpdateSectionDto
  ): Observable<Section | undefined> {
    const formData: FormData = new FormData();

    if (updateSectionDto.name) {
      formData.append('name', updateSectionDto.name);
    }
    if (updateSectionDto.image) {
      formData.append('image', updateSectionDto.image);
    }

    return this.httpService
      .patch(`${this.sectionEndPoint.UPDATE}${sectionId}`, formData)
      .pipe(
        map((response: undefined) => {
          this.snackbarService.showSuccessSnackbar(
            'shop.admin.sections.updateSuccess'
          );
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.sections.updateError'
          );
          return of(error);
        })
      );
  }

  deleteSection(section: Section): Observable<undefined> {
    return this.httpService
      .delete(`${this.sectionEndPoint.DELETE}${section.id}`, section)
      .pipe(
        map((response: undefined) => {
          this.snackbarService.showSuccessSnackbar(
            'shop.admin.sections.deleteSuccess'
          );
          return response;
        }),
        catchError((error: undefined) => {
          this.snackbarService.showErrorSnackbar(
            'shop.admin.sections.deleteError'
          );
          return of(error);
        })
      );
  }
}

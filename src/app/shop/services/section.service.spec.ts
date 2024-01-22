/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SectionService } from './section.service';
import { HttpService } from '@core/services/http-service.service';
import { SnackbarService } from '@shared/services/snackbar.service';
import { SectionEndPoint } from '@shared/end-points';
import { Section } from '@shop/models/section';
import { of, throwError } from 'rxjs';
import {
  CreateSectionDto,
  UpdateSectionDto,
} from '@shop/admin/dtos/section.dto';

describe('Sectionservice', () => {
  let service: SectionService;
  let httpService: jest.Mocked<HttpService>;
  let snackbarService: jest.Mocked<SnackbarService>;

  let sectionEndPoint: SectionEndPoint;

  beforeEach(() => {
    httpService = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
    } as any;
    snackbarService = {
      showSuccessSnackbar: jest.fn(),
      showErrorSnackbar: jest.fn(),
    } as any;
    sectionEndPoint = new SectionEndPoint();
    service = new SectionService(httpService, snackbarService);
  });

  const sections: Section[] = [
    {
      id: 'D000000001',
      image: '../assets/images/salchichón-iberico-de-bellota.jpg',
      name: 'Salchichón ibérico de bellota',
    },
    {
      id: 'A000000002',
      image: '../assets/images/chorizo-iberico-de-bellota.jpg',
      name: 'Chorizo ibérico de bellota',
    },
  ];

  describe('findAllSections', () => {
    it('should return an array of sections if the http call is successful', () => {
      httpService.get.mockReturnValue(of(sections));

      service.findAllSections().subscribe((res) => {
        expect(res).toEqual(sections);
      });
      expect(httpService.get).toHaveBeenCalled();
    });

    it('should return an empty array if the http call fails', () => {
      httpService.get.mockReturnValue(throwError(() => new Error('Error')));

      service.findAllSections().subscribe((res) => {
        expect(res).toEqual([]);
      });

      expect(httpService.get).toHaveBeenCalled();
    });
  });

  describe('findSectionById', () => {
    it('should return a sections if the http call is successful', () => {
      httpService.get.mockReturnValue(of(sections[0]));

      service.findSectionById(sections[0].id).subscribe((res) => {
        expect(res).toEqual(sections[0]);
      });
      expect(httpService.get).toHaveBeenCalledWith(
        sectionEndPoint.FIND_BY_ID + sections[0].id
      );
    });

    it('should return undefined if the http call fails', () => {
      httpService.get.mockReturnValue(throwError(() => new Error('Error')));

      service.findSectionById(sections[0].id).subscribe(
        () => {},
        () => {
          expect(httpService.get).toHaveBeenCalledWith(
            sectionEndPoint.FIND_BY_ID + sections[0].id
          );

          expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
            'shop.admin.dashboard.options.sections.updateError'
          );
        }
      );
    });
  });

  describe('createSection', () => {
    const createSectionDto: CreateSectionDto = {
      name: 'Chorizo ibérico de bellota',
      image: new Blob(['test'], { type: 'text/plain' }),
    };
    let formData: FormData;

    beforeEach(() => {
      formData = new FormData();
      formData.append('name', createSectionDto.name);
      formData.append('image', createSectionDto.image);
    });

    it('should return a section if the http call is successful', () => {
      httpService.post.mockReturnValue(of(sections[0]));

      service.createSection(createSectionDto).subscribe();

      expect(httpService.post).toHaveBeenCalledWith(
        sectionEndPoint.ADD,
        formData
      );
      expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
        'shop.admin.dashboard.options.sections.addSuccess'
      );
    });

    it('should show error snackbar and return undefined if the http call fails', () => {
      const errorResponse = new Error('Error');
      httpService.post.mockReturnValue(throwError(errorResponse));

      service.createSection(createSectionDto).subscribe(
        () => {},
        (error) => {
          expect(error).toEqual(errorResponse);
          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.admin.dashboard.options.sections.addError'
          );
        }
      );

      expect(httpService.post).toHaveBeenCalledWith(
        sectionEndPoint.ADD,
        formData
      );
    });
  });

  describe('updateSection', () => {
    const updateSectionDto: UpdateSectionDto = {
      name: 'test',
      image: new Blob(['test'], { type: 'text/plain' }),
    };

    let formData: FormData;

    beforeEach(() => {
      formData = new FormData();
      if (updateSectionDto.name) {
        formData.append('name', updateSectionDto.name);
      }
      if (updateSectionDto.image) {
        formData.append('image', updateSectionDto.image);
      }
    });
    it('should return undefined if the http call is successful', () => {
      httpService.patch.mockReturnValue(of(undefined));

      service
        .updateSection(sections[0].id, updateSectionDto)
        .subscribe((res) => {
          expect(res).toBeUndefined();
        });
      expect(httpService.patch).toHaveBeenCalledWith(
        `${sectionEndPoint.UPDATE}${sections[0].id}`,
        formData
      );
      expect(snackbarService.showSuccessSnackbar).toHaveBeenCalledWith(
        'shop.admin.dashboard.options.sections.updateSuccess'
      );
    });

    it('should return undefined if the http call fails', () => {
      httpService.patch.mockReturnValue(throwError(() => new Error('Error')));

      service
        .updateSection(sections[0].id, updateSectionDto)
        .subscribe((res) => {
          expect(res).toBeUndefined();
          expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
            'shop.admin.dashboard.options.sections.updateError'
          );
        });

      expect(httpService.patch).toHaveBeenCalledWith(
        `${sectionEndPoint.UPDATE}${sections[0].id}`,
        formData
      );
    });
  });

  describe('deleteSection', () => {
    it('should return undefined if the http call is successful', () => {
      httpService.delete.mockReturnValue(of(undefined));

      service.deleteSection(sections[0]).subscribe((res) => {
        expect(res).toBeUndefined();
      });
      expect(httpService.delete).toHaveBeenCalled();
    });

    it('should return undefined if the http call fails', () => {
      httpService.delete.mockReturnValue(throwError(() => new Error('Error')));

      service.deleteSection(sections[0]).subscribe((res) => {
        expect(res).toBeUndefined();
      });

      expect(httpService.delete).toHaveBeenCalled();
    });
  });
});

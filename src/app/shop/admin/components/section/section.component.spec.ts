/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SectionComponent } from './section.component';
import { SectionService } from '@shop/services/section.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@shared/services/snackbar.service';
import { Section } from '@shop/models/section';
import { of, throwError } from 'rxjs';
import { UpdateSectionDto } from '@shop/admin/dtos/section.dto';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let mockSectionService: jest.Mocked<SectionService>;
  let mockRouter: jest.Mocked<Router>;
  let formBuilder: FormBuilder;
  let route: ActivatedRoute;
  let snackbarService: jest.Mocked<SnackbarService>;

  beforeEach(() => {
    mockSectionService = {
      findSectionById: jest.fn(),
      updateSection: jest.fn(),
      createSection: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    snackbarService = {
      showErrorSnackbar: jest.fn(),
    } as any;

    formBuilder = new FormBuilder();

    route = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1'),
        },
      },
    } as any;

    component = new SectionComponent(
      mockSectionService,
      snackbarService,
      formBuilder,
      mockRouter,
      route
    );
  });

  const section: Section = {
    id: 'D000000001',
    image: '../assets/images/salchichón-iberico-de-bellota.jpg',
    name: 'Salchichón ibérico de bellota',
  };

  describe('ngOnInit', () => {
    it('should initialize form with section data if section id is present', () => {
      const testSection: Section = {
        id: '1',
        name: 'Test Section',
        image: 'Test Image',
      };
      mockSectionService.findSectionById.mockReturnValue(of(testSection));

      component.ngOnInit();
      expect(mockSectionService.findSectionById).toHaveBeenCalledWith('1');
      expect(component.formGroup.value).toEqual({
        name: testSection.name,
        image: testSection.image,
      });
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to /admin/sections if section is not found', () => {
      jest
        .spyOn(mockSectionService, 'findSectionById')
        .mockReturnValue(of(undefined));

      component.ngOnInit();
      expect(component.section).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/sections']);
    });
  });

  describe('createSection', () => {
    it('should add product and navigate on success', () => {
      component.formGroup = formBuilder.group({
        name: ['test', [Validators.required]],
        image: ['test', [Validators.required]],
      });

      const sectionDto = {
        name: 'test',
        image: 'test',
      };

      mockSectionService.createSection.mockReturnValue(of(undefined));

      component.createSection();

      expect(mockSectionService.createSection).toHaveBeenCalledWith(sectionDto);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/sections']);
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');

      component.formGroup = formBuilder.group({
        name: ['test', [Validators.required]],
        image: ['test', [Validators.required]],
      });

      mockSectionService.createSection.mockReturnValue(throwError(() => error));

      component.createSection();

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });

    it('should not add product if form is invalid', () => {
      component.formGroup = formBuilder.group({
        name: ['', [Validators.required]],
        image: ['test', [Validators.required]],
      });

      component.createSection();

      expect(mockSectionService.createSection).not.toHaveBeenCalled();
    });
  });

  describe('updateSection', () => {
    it('should call updateSection service if form is valid and there are changes', () => {
      component.formGroup.setValue({
        name: 'new name',
        image: 'test',
      });
      component.section = section;
      mockSectionService.updateSection.mockReturnValue(of(undefined));
      component.updateSection();
      expect(mockSectionService.updateSection).toHaveBeenCalledWith(
        section.id,
        { name: 'new name', image: 'test' }
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/sections']);
    });

    it('should show error snackbar if form is valid but there are no changes', () => {
      component.formGroup.setValue({
        name: 'Salchichón ibérico de bellota',
        image: '../assets/images/salchichón-iberico-de-bellota.jpg',
      });
      component.section = section;
      component.updateSection();
      expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
        'shop.admin.dashboard.options.sections.noChanges'
      );
    });

    it('should not call updateSection service if form is invalid', () => {
      component.formGroup.setErrors({ invalid: true });
      component.updateSection();
      expect(mockSectionService.updateSection).not.toHaveBeenCalled();
    });

    it('should log error if updateSection service fails', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      component.formGroup.setValue({
        name: 'new name',
        image: 'test',
      });
      component.section = section;
      const error = new Error('Error');
      mockSectionService.updateSection.mockReturnValue(throwError(() => error));
      component.updateSection();
      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('handleFile', () => {
    it('should set image path on file handle', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      component.handleFile({ file });
      expect(component.formGroup.get('image')?.value).toBe(file);
    });

    it('should handle error', () => {
      const error = 'Test error';
      component.handleFile({ error });
      expect(snackbarService.showErrorSnackbar).toHaveBeenCalledWith(
        'shop.admin.dashboard.options.products.fileTypeError'
      );
    });
  });

  describe('buildUpdateSectionDto', () => {
    it('should return null if no changes', () => {
      component.formGroup.setValue({
        name: 'Salchichón ibérico de bellota',
        image: '../assets/images/salchichón-iberico-de-bellota.jpg',
      });
      component.section = section;
      expect(component.buildUpdateSectionDto()).toBeNull();
    });

    it('should return updated fields if changes', () => {
      component.formGroup.setValue({
        name: 'new name',
        image: '../assets/images/salchichón-iberico-de-bellota.jpg',
      });
      component.section = section;
      const expectedDto: UpdateSectionDto = { name: 'new name' };
      expect(component.buildUpdateSectionDto()).toEqual(expectedDto);
    });
  });

  describe('addIfChanged', () => {
    it('should add field to dto if changed', () => {
      const dto: UpdateSectionDto = {};
      component.addIfChanged('name', 'new name', 'old name', dto);
      expect(dto).toEqual({ name: 'new name' });
    });

    it('should not add field to dto if not changed', () => {
      const dto: UpdateSectionDto = {};
      component.addIfChanged('name', 'old name', 'old name', dto);
      expect(dto).toEqual({});
    });
  });
});

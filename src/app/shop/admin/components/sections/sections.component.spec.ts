/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SectionsComponent } from './sections.component';
import { SectionService } from '@shop/services/section.service';
import { Router } from '@angular/router';
import { Section } from '@shop/models/section';
import { of, throwError } from 'rxjs';

describe('SectionsComponent', () => {
  let component: SectionsComponent;
  let mockSectionService: jest.Mocked<SectionService>;
  let mockRouter: jest.Mocked<Router>;

  const section: Section = {
    id: 'D000000001',
    image: '../assets/images/salchichón-iberico-de-bellota.jpg',
    name: 'Salchichón ibérico de bellota',
  };
  const sections = [section];

  beforeEach(() => {
    mockSectionService = {
      findAllSections: jest.fn().mockReturnValue(of(sections)),
      deleteSection: jest.fn(),
    } as any;

    mockRouter = {
      navigate: jest.fn(),
    } as any;

    component = new SectionsComponent(mockSectionService, mockRouter);
  });

  describe('ngOnInit', () => {
    it('should call findAllSections on ngOnInit', () => {
      component.ngOnInit();
      expect(mockSectionService.findAllSections).toHaveBeenCalled();
    });
  });

  describe('findAllSections', () => {
    it('should find all sections', () => {
      component.findAllSections();

      expect(mockSectionService.findAllSections).toHaveBeenCalled();
      expect(component.sections).toEqual(sections);
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');

      mockSectionService.findAllSections.mockReturnValue(
        throwError(() => error)
      );

      component.findAllSections();

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('deleteSection', () => {
    it('should delete product and refresh the list', () => {
      const findAllSectionsSpy = jest.spyOn(component, 'findAllSections');
      mockSectionService.deleteSection.mockReturnValue(of(undefined));

      component.deleteSection(section);

      expect(mockSectionService.deleteSection).toHaveBeenCalledWith(section);
      expect(findAllSectionsSpy).toHaveBeenCalled();
    });

    it('should log error on failure', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const error = new Error('Test error');
      const section: Section = {
        id: 'D000000002',
        image: '../assets/images/salchichón-iberico-de-bellota.jpg',
        name: 'Salchichón ibérico de bellota',
      };

      mockSectionService.deleteSection.mockReturnValue(throwError(() => error));

      component.deleteSection(section);

      expect(consoleSpy).toHaveBeenCalledWith(error);
    });
  });

  describe('updateSection', () => {
    it('should navigate to update section page', () => {
      component.updateSection(section);

      expect(mockRouter.navigate).toHaveBeenCalledWith([
        '/admin/sections/update-section',
        section.id,
      ]);
    });
  });
});

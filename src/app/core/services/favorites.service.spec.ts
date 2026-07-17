import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  beforeEach(() => { localStorage.clear(); TestBed.resetTestingModule(); });

  it('toggles and persists favorite IDs', () => {
    const service = TestBed.inject(FavoritesService);
    service.toggle('angular-performance-workshop');
    expect(service.isFavorite('angular-performance-workshop')).toBe(true);
    expect(JSON.parse(localStorage.getItem('codeconnect-favorites') ?? '[]')).toContain('angular-performance-workshop');
    service.toggle('angular-performance-workshop');
    expect(service.count()).toBe(0);
  });
});

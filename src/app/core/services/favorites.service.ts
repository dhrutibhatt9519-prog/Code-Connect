import { Injectable, computed, signal } from '@angular/core';

const STORAGE_KEY = 'codeconnect-favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly favoriteIds = signal<Set<string>>(this.readFavorites());
  readonly ids = computed(() => [...this.favoriteIds()]);
  readonly count = computed(() => this.favoriteIds().size);

  isFavorite(id: string): boolean {
    return this.favoriteIds().has(id);
  }

  toggle(id: string): void {
    const next = new Set(this.favoriteIds());
    next.has(id) ? next.delete(id) : next.add(id);
    this.favoriteIds.set(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  }

  private readFavorites(): Set<string> {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as string[]);
    } catch {
      return new Set();
    }
  }
}

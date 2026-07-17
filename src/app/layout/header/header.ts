import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  readonly themeService = inject(ThemeService);
  readonly favorites = inject(FavoritesService);
  readonly menuOpen = signal(false);
  closeMenu(): void { this.menuOpen.set(false); }
}

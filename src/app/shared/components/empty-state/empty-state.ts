import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <section class="empty" role="status">
      <span class="icon" aria-hidden="true">{{ icon() }}</span>
      <h2>{{ title() }}</h2><p>{{ message() }}</p>
      @if (actionLabel()) { <button class="btn btn-secondary" type="button" (click)="action.emit()">{{ actionLabel() }}</button> }
    </section>`,
  styles: [`
    .empty { min-height: 18rem; display: grid; place-content: center; justify-items: center; text-align: center; gap: .6rem; padding: 2rem; border: 1px dashed var(--border); border-radius: var(--radius-lg); background: var(--surface); }
    .icon { font-size: 2rem; } h2, p { margin: 0; } p { color: var(--text-muted); max-width: 32rem; } button { margin-top: .65rem; }
  `]
})
export class EmptyStateComponent {
  readonly icon = input('⌁'); readonly title = input.required<string>(); readonly message = input.required<string>();
  readonly actionLabel = input(''); readonly action = output<void>();
}

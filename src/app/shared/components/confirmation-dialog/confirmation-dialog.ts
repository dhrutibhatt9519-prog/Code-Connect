import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    @if (open()) {
      <div class="backdrop" (click)="cancel.emit()">
        <section class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="dialog-title" (click)="$event.stopPropagation()">
          <span class="warning" aria-hidden="true">!</span><h2 id="dialog-title">{{ title() }}</h2><p>{{ message() }}</p>
          <div class="actions"><button class="btn btn-secondary" type="button" (click)="cancel.emit()">Keep registration</button><button class="btn btn-danger" type="button" (click)="confirm.emit()" [disabled]="busy()">{{ busy() ? 'Cancelling…' : confirmLabel() }}</button></div>
        </section>
      </div>
    }`,
  styles: [`
    .backdrop { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 1rem; background: rgb(3 7 18 / .68); backdrop-filter: blur(4px); }
    .dialog { width: min(100%, 28rem); padding: 1.75rem; border-radius: var(--radius-lg); background: var(--surface); box-shadow: var(--shadow-lg); text-align: center; }
    .warning { display: grid; place-items: center; width: 3rem; height: 3rem; margin: auto; border-radius: 50%; color: #b42318; background: #fee4e2; font-weight: 800; }
    h2 { margin: 1rem 0 .5rem; } p { color: var(--text-muted); margin: 0; } .actions { display: flex; gap: .75rem; margin-top: 1.5rem; } .actions button { flex: 1; }
  `]
})
export class ConfirmationDialogComponent {
  readonly open = input(false); readonly busy = input(false); readonly title = input('Are you sure?'); readonly message = input.required<string>(); readonly confirmLabel = input('Confirm');
  readonly confirm = output<void>(); readonly cancel = output<void>();
}

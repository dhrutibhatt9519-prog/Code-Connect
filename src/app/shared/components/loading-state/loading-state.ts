import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-state',
  template: `<div class="state" role="status"><span class="spinner" aria-hidden="true"></span><p>{{ message() }}</p></div>`,
  styles: [`
    .state { min-height: 18rem; display: grid; place-content: center; justify-items: center; gap: 1rem; color: var(--text-muted); }
    .spinner { width: 2.5rem; height: 2.5rem; border: 3px solid var(--border); border-top-color: var(--primary); border-radius: 50%; animation: spin .8s linear infinite; }
    p { margin: 0; } @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoadingStateComponent { readonly message = input('Loading…'); }

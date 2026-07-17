import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer', imports: [RouterLink], template: `
  <footer><div class="container footer-grid">
    <div><a class="brand" routerLink="/opportunities">&lt;/&gt; CodeConnect</a><p>Where developers learn, build, and grow together.</p></div>
    <div><h2>Platform</h2><a routerLink="/opportunities">Explore opportunities</a><a routerLink="/registrations">My registrations</a><a routerLink="/favorites">Saved opportunities</a></div>
    <div><h2>Community</h2><a href="https://github.com" target="_blank" rel="noopener">GitHub</a><a href="mailto:hello@codeconnect.dev">Contact</a><span>Made for developers</span></div>
  </div><div class="container copyright">© 2026 CodeConnect. Keep learning, keep shipping.</div></footer>`,
  styles: [`
    footer { margin-top: 5rem; padding: 3.5rem 0 1.5rem; border-top: 1px solid var(--border); background: var(--surface); }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; } .brand { color: var(--text); font-size: 1.1rem; font-weight: 800; text-decoration: none; }
    p, a, span { color: var(--text-muted); font-size: .88rem; } p { max-width: 22rem; } h2 { margin: 0 0 .8rem; font-size: .82rem; text-transform: uppercase; letter-spacing: .08em; }
    .footer-grid > div:not(:first-child) { display: flex; flex-direction: column; gap: .55rem; } a { text-decoration: none; } a:hover { color: var(--primary); }
    .copyright { padding-top: 2rem; margin-top: 2.5rem; border-top: 1px solid var(--border); color: var(--text-subtle); font-size: .78rem; }
    @media (max-width: 650px) { .footer-grid { grid-template-columns: 1fr 1fr; } .footer-grid > div:first-child { grid-column: 1 / -1; } }
  `]
})
export class FooterComponent {}

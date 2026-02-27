import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Sistema de Inventario</h1>
      <app-categorias></app-categorias>
      <app-productos></app-productos>
      <app-movimientos></app-movimientos>
    </div>
  `
})
export class AppComponent {}

import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categorias',
  template: `<div class="card"><h2>Categorías</h2><ul><li *ngFor="let c of categorias">{{ c.nombre }} - {{ c.descripcion }}</li></ul></div>`
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.listar().subscribe(data => (this.categorias = data));
  }
}

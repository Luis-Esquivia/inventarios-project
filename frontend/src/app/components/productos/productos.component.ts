import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { Producto } from '../../models/producto.model';
import { CategoriaService } from '../../services/categoria.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html'
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  editandoId?: number;

  productoForm = this.fb.group({
    codigo: ['', Validators.required],
    nombre: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    stockActual: [0, [Validators.required, Validators.min(0)]],
    categoriaId: [null as number | null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
    this.buscar();
  }

  buscar(nombre: string = ''): void {
    this.productoService.listar(nombre).subscribe(data => (this.productos = data));
  }

  cargarCategorias(): void {
    this.categoriaService.listar().subscribe(data => (this.categorias = data));
  }

  guardar(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const value = this.productoForm.value;
    const categoria = this.categorias.find(c => c.id === value.categoriaId);
    if (!categoria) {
      return;
    }

    const payload: Producto = {
      codigo: value.codigo!,
      nombre: value.nombre!,
      precio: Number(value.precio),
      stockActual: Number(value.stockActual),
      categoria
    };

    const request$ = this.editandoId
      ? this.productoService.actualizar(this.editandoId, payload)
      : this.productoService.crear(payload);

    request$.subscribe(() => {
      this.limpiar();
      this.buscar();
    });
  }

  editar(producto: Producto): void {
    this.editandoId = producto.id;
    this.productoForm.patchValue({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      stockActual: producto.stockActual,
      categoriaId: producto.categoria.id || null
    });
  }

  eliminar(id?: number): void {
    if (!id) {
      return;
    }
    this.productoService.eliminar(id).subscribe(() => this.buscar());
  }

  limpiar(): void {
    this.editandoId = undefined;
    this.productoForm.reset({ codigo: '', nombre: '', precio: 0, stockActual: 0, categoriaId: null });
  }
}

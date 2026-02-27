import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MovimientoInventario } from '../../models/movimiento.model';
import { Producto } from '../../models/producto.model';
import { MovimientoService } from '../../services/movimiento.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html'
})
export class MovimientosComponent implements OnInit {
  productos: Producto[] = [];
  historial: MovimientoInventario[] = [];

  movimientoForm = this.fb.group({
    productoId: [null as number | null, Validators.required],
    tipoMovimiento: ['ENTRADA', Validators.required],
    cantidad: [1, [Validators.required, Validators.min(1)]]
  });

  constructor(
    private fb: FormBuilder,
    private movimientoService: MovimientoService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.productoService.listar().subscribe(data => (this.productos = data));
  }

  registrar(): void {
    if (this.movimientoForm.invalid) {
      return;
    }
    const payload = this.movimientoForm.value as MovimientoInventario;
    this.movimientoService.registrar(payload).subscribe(() => {
      if (payload.productoId) {
        this.cargarHistorial(payload.productoId);
      }
    });
  }

  cargarHistorial(productoId: number): void {
    this.movimientoService.historial(productoId).subscribe(data => (this.historial = data));
  }
}

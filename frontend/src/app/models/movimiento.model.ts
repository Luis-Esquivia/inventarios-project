import { Producto } from './producto.model';

export type TipoMovimiento = 'ENTRADA' | 'SALIDA';

export interface MovimientoInventario {
  id?: number;
  producto?: Producto;
  productoId?: number;
  tipoMovimiento: TipoMovimiento;
  cantidad: number;
  fecha?: string;
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovimientoInventario } from '../models/movimiento.model';

@Injectable({ providedIn: 'root' })
export class MovimientoService {
  private readonly apiUrl = `${environment.apiUrl}/movimientos`;

  constructor(private http: HttpClient) {}

  registrar(movimiento: MovimientoInventario): Observable<MovimientoInventario> {
    return this.http.post<MovimientoInventario>(this.apiUrl, movimiento);
  }

  historial(productoId: number): Observable<MovimientoInventario[]> {
    return this.http.get<MovimientoInventario[]>(`${this.apiUrl}/producto/${productoId}`);
  }
}

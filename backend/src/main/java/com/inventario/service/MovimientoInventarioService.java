package com.inventario.service;

import com.inventario.dto.MovimientoRequest;
import com.inventario.entity.MovimientoInventario;
import com.inventario.entity.Producto;
import com.inventario.entity.TipoMovimiento;
import com.inventario.exception.BusinessException;
import com.inventario.repository.MovimientoInventarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MovimientoInventarioService {

    private final MovimientoInventarioRepository movimientoRepository;
    private final ProductoService productoService;

    public MovimientoInventarioService(MovimientoInventarioRepository movimientoRepository, ProductoService productoService) {
        this.movimientoRepository = movimientoRepository;
        this.productoService = productoService;
    }

    @Transactional
    public MovimientoInventario registrar(MovimientoRequest request) {
        Producto producto = productoService.obtenerPorId(request.getProductoId());
        int stockActual = producto.getStockActual();

        if (request.getTipoMovimiento() == TipoMovimiento.ENTRADA) {
            producto.setStockActual(stockActual + request.getCantidad());
        } else {
            if (stockActual < request.getCantidad()) {
                throw new BusinessException("Stock insuficiente para la salida solicitada");
            }
            producto.setStockActual(stockActual - request.getCantidad());
        }

        productoService.guardar(producto);

        MovimientoInventario movimiento = new MovimientoInventario();
        movimiento.setProducto(producto);
        movimiento.setTipoMovimiento(request.getTipoMovimiento());
        movimiento.setCantidad(request.getCantidad());
        movimiento.setFecha(LocalDateTime.now());

        return movimientoRepository.save(movimiento);
    }

    public List<MovimientoInventario> historialPorProducto(Long productoId) {
        productoService.obtenerPorId(productoId);
        return movimientoRepository.findByProductoIdOrderByFechaDesc(productoId);
    }
}

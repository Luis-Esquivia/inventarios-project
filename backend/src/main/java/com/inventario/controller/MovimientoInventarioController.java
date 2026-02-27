package com.inventario.controller;

import com.inventario.dto.MovimientoRequest;
import com.inventario.entity.MovimientoInventario;
import com.inventario.service.MovimientoInventarioService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@Validated
public class MovimientoInventarioController {

    private final MovimientoInventarioService movimientoService;

    public MovimientoInventarioController(MovimientoInventarioService movimientoService) {
        this.movimientoService = movimientoService;
    }

    @PostMapping
    public MovimientoInventario registrar(@Valid @RequestBody MovimientoRequest request) {
        return movimientoService.registrar(request);
    }

    @GetMapping("/producto/{productoId}")
    public List<MovimientoInventario> historial(@PathVariable Long productoId) {
        return movimientoService.historialPorProducto(productoId);
    }
}

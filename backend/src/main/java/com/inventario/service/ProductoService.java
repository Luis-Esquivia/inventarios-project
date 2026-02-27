package com.inventario.service;

import com.inventario.entity.Categoria;
import com.inventario.entity.Producto;
import com.inventario.exception.NotFoundException;
import com.inventario.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final CategoriaService categoriaService;

    public ProductoService(ProductoRepository productoRepository, CategoriaService categoriaService) {
        this.productoRepository = productoRepository;
        this.categoriaService = categoriaService;
    }

    public List<Producto> listar(String nombre) {
        if (nombre == null || nombre.trim().isEmpty()) {
            return productoRepository.findAll();
        }
        return productoRepository.findByNombreContainingIgnoreCase(nombre.trim());
    }

    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado: " + id));
    }

    public Producto crear(Producto producto) {
        Categoria categoria = categoriaService.obtenerPorId(producto.getCategoria().getId());
        producto.setCategoria(categoria);
        return productoRepository.save(producto);
    }

    public Producto actualizar(Long id, Producto producto) {
        Producto existente = obtenerPorId(id);
        Categoria categoria = categoriaService.obtenerPorId(producto.getCategoria().getId());

        existente.setCodigo(producto.getCodigo());
        existente.setNombre(producto.getNombre());
        existente.setPrecio(producto.getPrecio());
        existente.setStockActual(producto.getStockActual());
        existente.setCategoria(categoria);

        return productoRepository.save(existente);
    }

    public void eliminar(Long id) {
        Producto existente = obtenerPorId(id);
        productoRepository.delete(existente);
    }

    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }
}

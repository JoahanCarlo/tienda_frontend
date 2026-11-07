import React, { useEffect, useState } from "react";
import CategoriaService from "../service/CategoriaService";
import ProductoService from "../service/ProductoService";
import Swal from "sweetalert2";

export const RegistrarProductosComponent = ({
    cerrarModal,
    cargarProductos
}) => {

    // ==========================================
    // ESTADO DEL PRODUCTO
    // ==========================================

    const [producto, setProducto] = useState({
        codigoProducto: "",
        nombreProducto: "",
        precioProducto: "",
        stockProducto: "",
        categoriaId: ""
    });

    // ==========================================
    // ESTADO DE CATEGORIAS
    // ==========================================

    const [categorias, setCategorias] = useState([]);

    // ==========================================
    // CARGAR CATEGORIAS
    // ==========================================

    const cargarCategorias = () => {

        CategoriaService.getAllCategoria()
            .then(response => {

                console.log("CATEGORIAS:", response.data);

                setCategorias(response.data);

            })
            .catch(error => {

                console.log("Error de categorias:", error);

            });
    };

    // ==========================================
    // EJECUTAR AL CARGAR EL COMPONENTE
    // ==========================================

    useEffect(() => {

        cargarCategorias();

    }, []);

    // ==========================================
    // MANEJAR CAMBIOS
    // ==========================================

    const manejarCambio = (e) => {
    const { name, value } = e.target;

    setProducto(productoAnterior => ({
        ...productoAnterior,
        [name]: value
    }));
    };

    // ==========================================
    // REGISTRAR PRODUCTO
    // ==========================================

    const registrarProducto = (e) => {

        e.preventDefault();

        console.log("=================================");
        console.log("PRODUCTO COMPLETO:", producto);
        console.log("categoriaId:", producto.categoriaId);
        console.log("tipo:", typeof producto.categoriaId);
        console.log("=================================");

        // Convertir categoriaId a número
        const categoriaId = Number(producto.categoriaId);

        // ==========================================
        // VALIDAR CATEGORIA
        // ==========================================

        if (!Number.isInteger(categoriaId) || categoriaId <= 0) {

            Swal.fire({
                icon: "warning",
                title: "Categoría inválida",
                text: "Selecciona una categoría válida."
            });

            return;
        }

        // ==========================================
        // CREAR OBJETO PARA ENVIAR AL BACKEND
        // ==========================================

        const productoEnviar = {

            codigoProducto: producto.codigoProducto.trim(),

            nombreProducto: producto.nombreProducto.trim(),

            precioProducto: Number(producto.precioProducto),

            stockProducto: Number(producto.stockProducto),

            categoriaId: categoriaId
        };

        console.log("PRODUCTO A ENVIAR:", productoEnviar);

        // ==========================================
        // ENVIAR AL BACKEND
        // ==========================================

        ProductoService.createProducto(productoEnviar)

            .then(response => {

                console.log("RESPUESTA:", response.data);

                Swal.fire({
                    icon: "success",
                    title: "¡Producto registrado!",
                    text: "El producto se registró correctamente",
                    confirmButtonText: "Aceptar"
                });

                // Actualizar productos
                cargarProductos();

                // Cerrar modal
                cerrarModal();

            })

            .catch(error => {

                console.log("ERROR:", error);

                console.log(
                    "BACKEND:",
                    error.response?.data
                );
            });
    };

    // ==========================================
    // HTML
    // ==========================================

    return (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    {/* =================================
                        HEADER
                    ================================== */}

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Registrar Producto
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={cerrarModal}
                        >
                        </button>

                    </div>

                    {/* =================================
                        FORMULARIO
                    ================================== */}

                    <form onSubmit={registrarProducto}>

                        <div className="modal-body">

                            {/* =================================
                                CODIGO PRODUCTO
                            ================================== */}

                            <div className="mb-3">

                                <label className="form-label">
                                    CODIGO PRODUCTO
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="codigoProducto"
                                    value={producto.codigoProducto}
                                    onChange={manejarCambio}
                                    required
                                />

                            </div>

                            {/* =================================
                                NOMBRE PRODUCTO
                            ================================== */}

                            <div className="mb-3">

                                <label className="form-label">
                                    NOMBRE PRODUCTO
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombreProducto"
                                    value={producto.nombreProducto}
                                    onChange={manejarCambio}
                                    required
                                />

                            </div>

                            {/* =================================
                                PRECIO PRODUCTO
                            ================================== */}

                            <div className="mb-3">

                                <label className="form-label">
                                    PRECIO PRODUCTO
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    name="precioProducto"
                                    value={producto.precioProducto}
                                    onChange={manejarCambio}
                                    required
                                />

                            </div>

                            {/* =================================
                                STOCK PRODUCTO
                            ================================== */}

                            <div className="mb-3">

                                <label className="form-label">
                                    STOCK DEL PRODUCTO
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="stockProducto"
                                    value={producto.stockProducto}
                                    onChange={manejarCambio}
                                    required
                                />

                            </div>

                            {/* =================================
                                CATEGORIA
                            ================================== */}

                            <div className="mb-3">

                                <label className="form-label">
                                    SELECCIONAR LA CATEGORIA
                                </label>

                                <select
    className="form-select"
    name="categoriaId"
    value={producto.categoriaId}
    onChange={manejarCambio}
    required
>
    <option value="">
        SELECCIONAR UNA CATEGORIA
    </option>

    {categorias.map((categoria) => (
        <option
            key={categoria.id}
            value={categoria.id}
        >
            {categoria.nombreCategoria}
        </option>
    ))}
</select>

                            </div>

                        </div>

                        {/* =================================
                            FOOTER
                        ================================== */}

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={cerrarModal}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                <i className="fa-solid fa-floppy-disk"></i>
                                {" "}Guardar
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};
import React, { use, useEffect, useState } from "react";
import ProductoService from "../service/ProductoService";
import { RegistrarProductosComponent } from "./RegistrarProductosComponent";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import ActualizarProductoComponent from './ActualizarProductoComponent';
import Swal from "sweetalert2";

DataTable.use(DT);

export const ListProductosComponent = () => {

    const [productos, setProductos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);

    const idiomaEspañol = {
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
        zeroRecords: "No se encontraron registros",
        paginate: {
            next: "Siguiente",
            previous: "Anterior"
        }
    };

    const eliminarProducto = (id) => {
        Swal.fire({
            title: '¿Está seguro?',
            text: 'El producto será eliminado',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true 
        }).then((result) => {
            if (result.isConfirmed) {
                ProductoService.eliminarProducto(id)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto eliminado',
                        text: 'El producto se eliminó correctamente',
                        confirmButtonText: 'Aceptar'
                    });
                    cargarProductos();
                })
                .catch(error => {
                    console.log(error);
                    Swal.fire({
                         icon: 'error',
                        title: 'Error',
                        text: 'No se pudo eliminar el producto',
                        confirmButtonText: 'Aceptar'
                    });
                });
            }
        })
    }

    const abrirModalActualizar = (producto) => {
        setProductoSeleccionado(producto);
        setMostrarModalActualizar(true);
    };

    const cerrarModalActualizar = () => {
        setMostrarModalActualizar(false);
        setProductoSeleccionado(null);
    };

    const cargarProductos = () => {
        ProductoService.getAllProductos()
            .then(response => {
                console.log("PRODUCTOS:", response.data);
                console.log("PRIMER PRODUCTO:", response.data[0]);
                setProductos(response.data);
            })
            .catch(error => {
                console.log("ERROR:", error);
            });
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const abrirModal = () => {
        setMostrarModal(true);
    };

    const cerrarModal = () => {
        setMostrarModal(false);
    };

    const columnas = [
        {
            title: "CODIGO PRODUCTO",
            data: "codigoProducto"
        },
        {
            title: "NOMBRE DEL PRODUCTO",
            data: "nombreProducto"
        },
        {
            title: "PRECIO",
            data: "precioProducto"
        },
        {
            title: "STOCK",
            data: "stockProducto"
        },
        {
            title: "CATEGORIA",
            data: "nombreCategoria"
        },
        {
            title: "ACCIONES",
            data: null,
            orderable: false,
            searchable: false
        }
    ];

    return (
        <div className="container">

            <h2 className="text-center">
                Lista de productos
            </h2>

            <div className="mb-3">

                <button
                    className="btn btn-success"
                    onClick={abrirModal}
                >
                    <i className="fa-solid fa-plus"></i>{" "}
                    Registrar producto
                </button>

            </div>

            <DataTable
                data={productos}
                columns={columnas}
                className="display"

                slots={{
                    5: (data, row) => (
                        <div>

                            <button
                                className="btn btn-primary me-2"
                                onClick={() => abrirModalActualizar(row)}
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>

                            <button
                                className="btn btn-danger"
                            >
                                <i className="fa-solid fa-trash" onClick={()=> eliminarProducto(row.id)}></i>
                            </button>

                        </div>
                    )
                }}

                options={{
                    language: idiomaEspañol,
                    pageLength: 5,
                    lengthMenu: [5, 10, 15, 20],
                    searching: true,
                    ordering: true,
                    paging: true
                }}
            >

                <thead>
                    <tr>
                        <th>CODIGO PRODUCTO</th>
                        <th>NOMBRE PRODUCTO</th>
                        <th>PRECIO PRODUCTO</th>
                        <th>STOCK PRODUCTO</th>
                        <th>CATEGORIA</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>

            </DataTable>

            {mostrarModal && (
                <RegistrarProductosComponent
                cerrarModal={cerrarModal}
                cargarProductos={cargarProductos}/>
            )}

            {mostrarModalActualizar && productoSeleccionado && (
                <ActualizarProductoComponent
                cerrarModal = {cerrarModalActualizar}
                cargarProductos = {cargarProductos}
                productoSeleccionado={productoSeleccionado}
                categorias={categorias}
                />
            )}

        </div>
    );
};

export default ListProductosComponent;
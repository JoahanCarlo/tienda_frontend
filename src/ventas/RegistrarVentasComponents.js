import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import ProductoService from "../service/ProductoService";
import ClienteService from "../service/ClienteService"
import VentaService from "../service/VentaService";

export const RegistrarVentasComponents = ({cerrarModal, cargarVentas, onVentaRegistrada}) => {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);

    const [clienteId, setClienteId] = useState("");
    const [productoId, setProductoId] = useState("");
    const [cantidad, setCantidad] = useState(1);

    const [detalleVenta, setDetalleVenta] = useState([]);


    useEffect(() => {
        ClienteService.getAllClientes()
        .then(response => {
            setClientes(response.data);
        })
        .catch(error => {
            console.log("ERROR CLIENTES", error);
        });
        ProductoService.getAllProductos()
        .then(response => {
            setProductos(response.data);
        }).catch(error => {
            console.log("ERROR PRODUCTOS", error);
        });
    }, []);

    const clienteSeleccionado = clientes.find(cliente => cliente.id === Number(clienteId));

    const productoSeleccionado = productos.find(
        producto => producto.id === Number(productoId)
    );

    const agregarProducto = () => {
        if (!productoSeleccionado) {
            Swal.fire({
                icon: "warning",
                title: "Producto",
                text: "Seleccione un producto"
            });
            return;
        }

        if (cantidad <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Cantidad",
                text: "Ingrese una cantidad valida"
            });
            return;
        }

        const subtotal = productoSeleccionado.precioProducto * Number(cantidad);

        const nuevoDetalle = {
            productoId: productoSeleccionado.id,

            codigoProducto: productoSeleccionado.codigoProducto,

            nombreProducto: productoSeleccionado.nombreProducto,

            precioUnitario: productoSeleccionado.precioProducto,

            cantidad: Number(cantidad),

            total: subtotal

        };

        setDetalleVenta([
            ...detalleVenta,
            nuevoDetalle
        ]);

        setProductoId("");
        setCantidad(1);
    };

    const eliminarProducto = (index) => {
        const nuevaLista =detalleVenta.filter(
            (_, i) => i !== index
        );

        setDetalleVenta(nuevaLista);
    };

    const totalVenta = detalleVenta.reduce(
        (total,detalle) => total + detalle.total,
        0
    )


    const registrarVenta = (e) => {
        e.preventDefault();

        if (!clienteId) {
            Swal.fire({
                icon: "warning",
                title: "Cliente",
                text: "Seleccione un cliente"
            });
            return;
        }

        if (detalleVenta.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Productos",
                text: "Agregue al menos un producto"
            });
            return;
        }

        const ventaRequest = {
            dniCliente: clienteSeleccionado.dniCliente,

            detalleVentaRequests: detalleVenta.map(detalle => ({
                codigoProducto: detalle.codigoProducto,
                cantidadVenta: detalle.cantidad
            }))
        };

        console.log("VENTA:", ventaRequest);

        VentaService.registrarVenta(ventaRequest)
        .then(response => {
            const ventaCreada = response.data;

            Swal.fire({
                icon: "success",
                title: "Venta registrada",
                text: "La venta se registró correctamente",
                confirmButtonText: "Aceptar"
            }).then(async ()=> {
                if (typeof cargarVentas === "function") {
                    cargarVentas();
                }
                cerrarModal();

                if (typeof onVentaRegistrada === "function") {
                    onVentaRegistrada(ventaCreada);
                }

            });
        }).catch(error => {
            console.log("ERROR VENTA:", error);        
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "No se pudo registrar la venta"
            });
        });
    };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: "rgba(0,0,0,0.5)"}}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Registrar Venta</h5>
                        <button type="button" className="btn-close" onClick={cerrarModal}></button>
                    </div>
                    <form onSubmit={registrarVenta}>
                        <div className="modal-body">
                            {/*CLIENTE*/}
                            <div className="mb-3">
                                <label className="form-label">
                                    Cliente
                                </label>
                                <select className="form-select"
                                        value={clienteId}
                                        onChange={(e) => setClienteId(e.target.value)} required>
                                        <option value="">SELECCIONAR CLIENTE</option>
                                        {clientes.map(cliente => (
                                            <option key={cliente.id}
                                                    value={cliente.id}>
                                                    {cliente.nombreCliente}
                                                    {" "}
                                                    {cliente.apellidoCliente}
                                                    </option>
                                        ))}
                                </select>
                            </div>
                            <hr/>
                            <h5>Agregar Producto</h5>
                            {/*PRODUCTO*/}
                            <div className="row g-3 align-items-end">
                                <div className="col-md-6">
                                    <label className="fomr-label">
                                        Producto
                                    </label>
                                    <select className="form-select"
                                            value={productoId}
                                            onChange={(e) => setProductoId(e.target.value)}>
                                            <option value="">SELECCIONAR PRODUCTO</option>
                                            {productos.map(producto => (
                                                <option
                                                  key={producto.id}
                                                  value={producto.id}
                                                  >
                                                  {producto.codigoProducto}
                                                  {" - "}
                                                  {producto.nombreProducto}
                                                  </option>
                                            ))}
                                            </select>
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">Código</label>
                                    <input className="form-control"
                                           value={productoSeleccionado?.codigoProducto || ""}
                                           readOnly/>
                                </div>
                                <div className="col-md-2">
                                    <label className="form-label">Precio Unit.</label>
                                    <input className="form-control" value={productoSeleccionado?`S/.${productoSeleccionado.precioProducto}`: ""}
                                    readOnly/>
                                </div>
                                <div className="col-md-1">
                                    <label className="form-label">Cant.</label>
                                    <input type="number" 
                                            min="1"
                                            className="form-control"
                                            value={cantidad}
                                            onChange={(e) => setCantidad(e.target.value)}/>
                                </div>
                                <div className="col-md-1">
                                    <button type="button"
                                            className="btn btn-success"
                                            onClick={agregarProducto}>+</button>
                                </div>
                                <hr/>
                                {/*TABLA*/}
                                <h5>Detalle de Venta</h5>
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre</th>
                                            <th>Precio.Unit</th>
                                            <th>Cant.</th>
                                            <th>Total</th>
                                            <th>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detalleVenta.map(
                                            (detalle, index) => (
                                                <tr key={index}>
                                                    <td>{detalle.codigoProducto}</td>
                                                    <td>{detalle.nombreProducto}</td>
                                                    <td>
                                                        S/.
                                                        {" "}
                                                        {detalle.precioUnitario.toFixed(2)}
                                                    </td>
                                                    <td>{detalle.cantidad}</td>
                                                    <td>{detalle.total}</td>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm"
                                                            onClick={()=> eliminarProducto(index)}>
                                                                <i className="fa-solid fa-trash"></i>
                                                            </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                {/*TOTAL*/}
                                <div className="text-end">
                                    <h4>
                                        Total: S/.
                                        {" "}
                                        {totalVenta.toFixed(2)}
                                    </h4>
                                </div>
                                {/*FOOTER*/}
                                <div className="modal-footer">
                                    <button type="button"
                                            className="btn btn-secondary"
                                            onClick={cerrarModal}>
                                            Cancelar
                                            </button>
                                    <button type="submit"
                                            className="btn btn-success">
                                                Registrar venta
                                            </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    </div>
  )
}

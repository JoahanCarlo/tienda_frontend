
import React from "react";
import "../DetalleVentaComponents.css";

const DetalleVentaComponents = ({ venta, cerrarModal }) => {

    if (!venta) return null;

    const detalles = venta.detalleVentaResponses || [];

    const total = Number(venta.totalVenta ?? 0);

    const nombreCliente = venta.nombreCliente ?? "No disponible";

    return (
        <div className="detalle-venta-overlay" onClick={cerrarModal}>
            <div
                className="detalle-venta-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="detalle-venta-header">
                    <h4>
                        <i className="fa-solid fa-receipt"></i>
                        {" "}Detalle de venta
                    </h4>

                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Cerrar"
                        onClick={cerrarModal}
                    />
                </div>

                <div className="detalle-venta-body">
                    <label>Cliente</label>
                    <div className="campo-visor">
                        {nombreCliente}
                    </div>

                    <h5>Productos de la venta</h5>

                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Precio unitario</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                {detalles.length > 0 ? (
                                    detalles.map((detalle, index) => (
                                        <tr key={detalle.id ?? index}>
                                            <td>
                                                {detalle.codigoProducto ?? "-"}
                                            </td>

                                            <td>{detalle.nombreProducto ?? "-"}</td>

                                            <td>{detalle.cantidadVenta ?? "-"}</td>

                                            <td>
                                                S/. {Number(detalle.precioVenta ?? 0).toFixed(2)}
                                            </td>

                                            <td>
                                                S/. {Number(detalle.subtotalVenta ?? 0).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">
                                            No hay productos registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="detalle-venta-total">
                        <span>Total de la venta</span>
                        <strong>
                            S/. {total.toFixed(2)}
                        </strong>
                    </div>
                </div>

                <div className="detalle-venta-footer">
                    <button
                        className="btn btn-secondary"
                        onClick={cerrarModal}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetalleVentaComponents;

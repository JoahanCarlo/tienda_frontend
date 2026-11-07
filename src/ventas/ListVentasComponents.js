import React, { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import DataTable from "datatables.net-dt";
import VentaService from "../service/VentaService";
import { RegistrarVentasComponents } from "./RegistrarVentasComponents";
import ReporteVentasComponents from "./ReporteVentasComponents";
import VistaVentaComponents from "./VistaVentaComponents";

export const ListVentasComponents = () => {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mostrarModal,setMostrarModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [ventaDetalleSeleccionada, setVentaDetalleSeleccionada] = useState(null);

  const tablaRef = useRef(null);
  const dataTableRef = useRef(null);
  
  const mostrarBoletaAutomatica = (venta) =>{
    setVentaSeleccionada(venta);
  }

  const cargarVentas = () => {
    setCargando(true);

    VentaService.getAllVentas()
    .then(response => {
        console.log("VENTAS RECIBIDAS", response.data);
        setVentas(response.data);
    })
    .catch(error => {
        console.error("Error al cargar ventas", error);
        Swal.fire(
            "Error",
            "No se pudieron cargar las ventas.",
            "error"
        );
    }).finally(()=> {
        setCargando(false);
    });
  };

  useEffect(() => {
    cargarVentas();
  },[]);

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
        setMostrarModal(false);
    };

    useEffect(() => {
        if (cargando || !tablaRef.current) {
            return;
        }

        const tabla = tablaRef.current;

        const dataTable = new DataTable(tabla,{
            data: ventas,
            columns: [
                {
                    data: "id",
                    title: "ID"
                },
                {
                    data: "nombreCliente",
                    title: "Cliente",
                    defaultContent: "Sin nombre"
                },
                {
                    data: "fechaVenta",
                    title: "Fecha",
                    defaultContent: "-",
                    render: (data,type) => {
                        if(!data) return "-";
                        if(type !== "display") return data;
                        return new Date(data).toLocaleDateString("es-PE");
                    }
                },
                {
                    data: "totalVenta",
                    title: "Total",
                    render: (data) => `S/. ${Number(data ?? 0).toFixed(2)}`
                },
                {
                    data: null,
                    title: "Acciones",
                    orderable: false,
                    searchable: false,
                    render: (_data, _type, venta) => `
                        <button
                         type="button"
                         class = "btn btn-info btn-sm me-1"
                         title = "Ver detalle de la boleta"
                         data-accion="detalle"
                         data-id="${venta.id}">
                         <i class="fa-solid fa-eye"></i>
                         </button>

                         <button
                          type="button"
                          class="btn btn-danger btn-sm me-1"
                          data-accion="eliminar"
                          data-id="${venta.id}">
                          <i class="fa-solid fa-trash"></i>
                          </button>

                        <button
                        type="button"
                        class="btn btn-success btn-sm"
                        title="Ver boleta"
                        data-accion="boleta"
                        data-id="${venta.id}"
                        >
                        <i class="fa-solid fa-receipt"></i>
                        </button>
                    `
                }
            ],
            pageLength: 10,
            lengthMenu: [10,25,50],
            order: [[0, "asc"]],
            language: {
                 search: "Buscar:",
                searchPlaceholder: "Buscar ventas...",
                lengthMenu: "Mostrar _MENU_ registros",
                info: "Mostrando _START_ a _END_ de _TOTAL_ ventas",
                infoEmpty: "Mostrando 0 a 0 de 0 ventas",
                infoFiltered: "(filtrado de _MAX_ ventas)",
                zeroRecords: "No se encontraron resultados",
                emptyTable: "No hay ventas realizadas",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior"
                }
            }
        });
        dataTableRef.current = dataTable;

        const manejarClick = (event) => {
            const boton = event.target.closest("button[data-accion]");
            if (!boton || !tabla.contains(boton)) {
                return;
            }

            const id = boton.dataset.id;
            const venta = ventas.find(
                (item) => String(item.id) === String(id)
            );

            if(!venta) return;

            switch(boton.dataset.accion) {
                case "detalle":
                    setVentaDetalleSeleccionada(venta);
                    break;
                case "boleta":
                    setVentaSeleccionada(venta);
                    break;
                case "eliminar":
                    Swal.fire({
                        title: "¿Eliminar venta?",
                        text: "Debes conectar esta acción con el servicio de eliminación.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Continuar",
                        cancelButtonText: "Cancelar"
                    }).then((resultado) => {
                        if(resultado.isConfirmed){
                            Swal.fire(
                                "Pendiente",
                                "Implementa aquí el método de eliminación de VentaService.",
                                "info"
                            );
                        }
                    });
                    break;

                    default:
                        break;
            }
        };

        tabla.addEventListener("click", manejarClick);

        return () => {
            tabla.removeEventListener("click", manejarClick);
            dataTable.destroy();
            dataTableRef.current = null;
        };
    }, [ventas, cargando]);

  return (
    <div className="container-mt-4">
        <h2 className="mb-4">
            <i className="fa-solid fa-receipt"></i>
            {" "} Lista de ventas realizadas
        </h2>

        <div className="card shadow">
            <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                    <h5>Historial de Ventas</h5>
                    <div>
                      <button className="btn btn-success me-2"
                            onClick={()=> setMostrarModal(true)}>
                            <i className="fa-solid fa-plus"></i>
                            {" "} Registrar Venta
                    </button>
                    <button
                     className="btn btn-primary"
                     onClick={cargarVentas}
                     disabled={cargando}>
                        <i className="fa-solid fa-rotate"></i>
                        {" "} Actualizar
                    </button>
                    </div>
                </div>

                {cargando && (
                    <p className="text-muted">Cargando ventas .......</p>
                )}

                <div className="table-responsive">
                    <table 
                      ref={tablaRef}
                      className="display table table-striped table-bordered"
                      style={{width: "100%"}}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                      </table>
                </div>

                {mostrarModal && (
                    <RegistrarVentasComponents
                     cerrarModal={cerrarModal}
                     cargarVentas={cargarVentas}
                     onVentaRegistrada={mostrarBoletaAutomatica}/>
                )}

                {ventaSeleccionada && (
                    <div
                      className="modal-reporte-overlay"
                      onClick={() => setVentaSeleccionada(null)}>
                        <div
                         className="modal-reporte-contenido"
                         onClick={(e) => e.stopPropagation()}>
                            <div 
                              className="modal-reporte-cabecera">
                                <h5>
                                  <i className="fa-solid fa-receipt"></i>
                                  {" "}Boleta de venta
                                </h5>
                                <button
                                 type="button"
                                 className="btn-close"
                                 aria-label="Cerrar"
                                 onClick={() => setVentaSeleccionada(null)}/>
                              </div>
                              <div className="modal-reporte-cuerpo">
                                <ReporteVentasComponents
                                 venta = {ventaSeleccionada}/>
                              </div>
                         </div>
                      </div>
                )}

                {ventaDetalleSeleccionada && (
                    <VistaVentaComponents
                      venta = {ventaDetalleSeleccionada}
                      cerrarModal={() => setVentaDetalleSeleccionada(null)}
                    />
                )}
            </div>
        </div>
    </div>
  );
};

export default ListVentasComponents;

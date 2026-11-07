import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import "../ReporteVenta.css";

export const ReporteVentasComponents = ({venta, nombreEmpresa = "MI BARRUNTO"}) => {
    if(!venta){
        return <p>no se encontraron los datos de la venta.</p>
    }

    const detalles = venta.detalleVentaResponses || [];
    const total = Number(venta.totalVenta || 0);
    const fecha = venta.fechaVenta
    ? new Date(venta.fechaVenta).toLocaleString("es-PE")
    : "";
    const numeroVenta = `V-${String(venta.id).padStart(6,0)}`;

       //Datos en el QR
    const datosQR = JSON.stringify({
        idVenta: venta.id,
        numeroVenta,
        dniCliente: venta.dniCliente,
        fechaVenta: venta.fechaVenta,
        totalVenta: total
    });

    const descargarPDF = () => {
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        doc.setFont("helvetica","bold");
        doc.setFontSize(18);
        doc.text("BOLETA DE VENTA", 105, 18, {
            align: "center",
        });

        doc.setFontSize(13);
        doc.text(nombreEmpresa, 14, 30);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(`N° de venta : ${numeroVenta}`, 14, 40);
        doc.text(`Cliente: ${venta.nombreCliente || ""}`, 14, 47);
        doc.text(`DNI: ${venta.dniCliente || ""}`, 14, 54);
        doc.text(`Fecha: ${fecha}`,14,61);

        autoTable(doc, {
            startY: 70,
            head: [[
                "Codigo",
                "Producto",
                "Cantidad",
                "P.unitario",
                "Subtotal",
            ]],
            body: detalles.map((detalle) => [
                detalle.codigoProducto || "",
                detalle.nombreProducto || "",
                detalle.cantidadVenta,
                    `S/. ${Number(detalle.precioVenta).toFixed(2)}`,
                    `S/. ${Number(detalle.subtotalVenta).toFixed(2)}`,
            ]),

            styles: {
                fontSize: 8,
                cellPadding: 3,
            },
        });

        const posicionY = doc.lastAutoTable.finalY + 12;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text(
            `TOTAL :  S/. ${total.toFixed(2)}`,
            196,
            posicionY,
            {align: "right"}
        );

        doc.save(`Boleta_${venta.id}.pdf`);
        };

        const imprimir = () => {
            window.print();
        };

  return (
    <div className='reporte-contenedor'>
        <div className='boleta' id='boleta-venta'>
            <header className='boleta-cabecera'>
                <h1>{nombreEmpresa}</h1>
                <h2>BOLETA DE VENTA</h2>
                <p><strong>Número : </strong>{numeroVenta}</p>
            </header>

            <section className='datos-cliente'>
                <p>
                 <strong>Cliente:</strong>{" "}
                 {venta.nombreCliente}
                </p>

                <p>
                 <strong>DNI: </strong>
                 {venta.dniCliente}
                </p>

                <p>
                 <strong>Fecha de venta:</strong>{fecha}
                </p>
            </section>
            
            <h3>Detalle de productos</h3>
            <table className='tabla-productos'>
                <thead>
                    <tr>
                     <th>Código</th>
                     <th>Producto</th>
                     <th>Cantidad</th>
                     <th>Precio</th>
                     <th>Subtotal</th>
                    </tr>
                </thead>

                <tbody>
                    {detalles.map((detalle, index) => (
                        <tr key={detalle.id ?? index}>
                          <td>{detalle.codigoProducto}</td>
                          <td>{detalle.nombreProducto}</td>
                          <td>{detalle.cantidadVenta}</td>
                          <td>
                            S/. {Number(detalle.precioVenta).toFixed(2)}
                          </td>
                          <td>
                            S/. {Number(detalle.subtotalVenta).toFixed(2)}
                          </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='boleta-total'>
                <span>TOTAL DE LA VENTA</span>
                <strong>S/. {total.toFixed(2)}</strong>
            </div>

            <div className='boleta-qr'>
                <h3>Código QR de la venta</h3>
                <QRCodeSVG
                 value={datosQR}
                 size={150}
                 level='M'/>
                 <p>Escanea para consultar los datos de esta venta.</p>
            </div>

            <footer className='boleta-pie'>
                <p>¡Gracias por su compra!</p>
                <small>Documento generado por el sistema de ventas.</small>
            </footer>
        </div>
            <div className='botones-reporte'>
                <button onClick={imprimir}>
                    Imprimir boleta
                </button>

                <button onClick={descargarPDF}>
                    Descargar PDF
                </button>
            </div>
    </div>
  );
};

export default ReporteVentasComponents;

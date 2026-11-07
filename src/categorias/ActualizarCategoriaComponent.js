import React, { useState } from "react";
import CategoriaService from '../service/CategoriaService'
import Swal from 'sweetalert2'

export const ActualizarCategoriaComponent = ({categoriaSeleccionado,
    cerrarModal, cargarCategorias
}) => {

    const [categoria,setCategoria] = useState(categoriaSeleccionado);
    const manejarCambio = (e) => {
        const {name, value} = e.target;

        setCategoria({
            ...categoria,
            [name]: value
        });
    };

    const actualizarCategoria = (e) => {
        e.preventDefault();

        console.log("CATEGORIA COMMPLETA",categoria);
        console.log("ID ENVIADO", categoria.id);

        CategoriaService.updateCategoria(categoria.id,categoria)
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: '¡Categoria actualizado!',
                text: 'La categoria se ha actualizado',
                confirmButtonText: 'Aceptar'
            }).then(()=> {
                cerrarModal();
                cargarCategorias();
            })
        })
        .catch(error => {
            console.log(error);
            Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se puede realizar la actualización',
                        confirmButtonText: 'Aceptar'
                    });
        });
    };

  return (
    <div className="modal fade show" style={{display:"block", backgroundColor: "rgba(0,0,0,0.5)"}}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title">Actualizar categoria</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
            </div>
            <form onSubmit={actualizarCategoria}>
                <div className="modal-body">
                    <div className="mb-3">
                    <label className="form-label"> NOMBRE DE LA CATEGORIA </label>
                    <input type="text" className="form-control" name="nombreCategoria" value={categoria.nombreCategoria} onChange={manejarCambio} required />
                </div>
                  <div className="mb-3">
                    <label className="form-label"> DESCRIPCIÓN DE LA CATEGORIA </label>
                    <input type="text" className="form-control" name="descripcionCategoria" value={categoria.descripcionCategoria} onChange={manejarCambio} required />
                  </div>
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button type="submit" className="btn btn-success"><i className="fa-solid fa-floppy-disk"></i>{" "} Actualizar</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default ActualizarCategoriaComponent;

import React,{useState} from "react";
import CategoriaService from '../service/CategoriaService';
import Swal from 'sweetalert2';

export const RegistrarCategoriaComponent = ({cerrarModal,cargarCategorias}) => {
    const [categoria,setCategoria] = useState({
        nombre_categoria: "",
        descripcion_categoria: ""
    });

    const manejarCambio = (e) => {
        const {name,value} = e.target;
        setCategoria({
            ...categoria,
            [name]: value
        });
    };

    const registrarCategoria = (e) =>{
        e.preventDefault();

        CategoriaService.createCategoria(categoria)
        .then(response=>{
            Swal.fire({
                icon: 'success',
                title: '¡Categoria registrado!',
                text: 'La categoria se registro correctamente',
                confirmButtonText: 'Aceptar'
            }).then(()=>{
                cerrarModal();
                cargarCategorias();
            })
        }).catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se puede registrar la cateogoria',
                    confirmButtonText: 'Aceptar'
                });
            });
    };
  return (
    <div className="modal fade show" style={{display:"block", backgroundColor: "rgba(0,0,0,0.5)"}}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">
                        Registrar categoria
                    </h5>
                    <button type="button" className="btn-close" onClick={cerrarModal}></button>
                </div>
                <form onSubmit={registrarCategoria}>
                    <div className="modal-body">
                       <div className='mb-3'>
                            <label className='form-label'>NOMBRE DE CATEGORIA </label>
                            <input type='text' className='form-control' name='nombreCategoria' value={categoria.nombreCategoria} onChange={manejarCambio} required/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>DESCRIPCIÓN DE LA CATEGORIA </label>
                            <input type='text' className='form-control' name='descripcionCategoria' value={categoria.descripcionCategoria} onChange={manejarCambio} required/>
                        </div>
                         <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                            <button type="submit" className="btn btn-success">
                                <i className="fa-solid fa-floppy-disk">{''}</i> Guardar
                            </button>
                         </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}


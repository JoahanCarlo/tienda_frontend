import React, { useState } from 'react'
import ClienteService from '../service/ClienteService';
import Swal from 'sweetalert2';

export const ActualizarClienteComponents = ({clienteSeleccionado,
  cerrarModal,
  cargarClientes}) => {
  const [cliente,setCliente] = useState(clienteSeleccionado);
  const manejarCambio = (e) => {
    const {name, value} = e.target;

    setCliente({
        ...cliente,
        [name]: value
    });
  };

  const actualizarCliente = (e) =>{
    e.preventDefault();

    ClienteService.updateCliente(cliente.id, cliente)
    .then(response => {
        Swal.fire({
            icon: 'success',
            title: '¡Cliente actualizado!',
            text: 'El cliente se ha actualizado',
            confirmButtonText: 'Aceptar'
        }).then(()=>{
            cerrarModal();
        cargarClientes();
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
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }} > 
    <div className="modal-dialog modal-dialog-centered"> 
        <div className='modal-content'>
            <div className="modal-header"> 
                <h5 className="modal-title"> Actualizar cliente </h5> 
                <button type="button" className="btn-close" onClick={cerrarModal} ></button> 
        </div> 
                <form onSubmit={actualizarCliente}> 
                    <div className="modal-body">
                        <div className="mb-3"> 
                            <label className="form-label"> DNI </label> 
                            <input type="text" className="form-control" name="dniCliente" value={cliente.dniCliente} onChange={manejarCambio} required /> 
                        </div>
                        <div className="mb-3"> 
                                <label className="form-label"> NOMBRE CLIENTE </label> 
                                <input type="text" className="form-control" name="nombreCliente" value={cliente.nombreCliente} onChange={manejarCambio} required /> 
                        </div> 
                        <div className="mb-3"> 
                                    <label className="form-label"> APELLIDO CLIENTE </label> 
                                    <input type="text" className="form-control" name="apellidoCliente" value={cliente.apellidoCliente} onChange={manejarCambio} required /> 
                        </div> 
                        <div className="mb-3"> 
                                    <label className="form-label"> TELEFONO </label> 
                                    <input type="text" className="form-control" name="telefonoCliente" value={cliente.telefonoCliente} onChange={manejarCambio} required /> 
                                    </div> 
                        <div className="mb-3"> 
                                    <label className="form-label"> CORREO </label> 
                                    <input type="email" className="form-control" name="emailCliente" value={cliente.emailCliente} onChange={manejarCambio} required /> 
                         </div> 
                    </div>  
                    <div className="modal-footer"> 
                                    <button type="button" className="btn btn-secondary" onClick={cerrarModal} > Cancelar </button> 
                                    <button type="submit" className="btn btn-success" > <i className="fa-solid fa-floppy-disk"></i>{" "} Actualizar </button> 
                    </div> 
                </form>    
        </div> 
    </div> 
    </div>
  );
};

export default ActualizarClienteComponents;

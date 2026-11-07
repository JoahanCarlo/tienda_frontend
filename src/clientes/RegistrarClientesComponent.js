import React, { useState } from 'react';
import ClienteService  from '../service/ClienteService';
import Swal from 'sweetalert2';

export const RegistrarClientesComponent = ({cerrarModal, cargarClientes}) => {
    const [cliente, setCliente] = useState({
        dniCliente : "",
        nombreCliente : "",
        telefonoCliente : "",
        emailCliente: ""
    });

    const manejarCambio = (e) => {
        const {name,value} = e.target;

        setCliente({
            ...cliente,
            [name]: value
        });
    };

    const registrarCliente = (e) => {
        e.preventDefault();

        ClienteService.createCliente(cliente)
        .then(response =>{
            Swal.fire({
                icon: 'success',
                title: '¡Cliente registrado!',
                text: 'El cliente se registro correctamente.',
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
                text: 'No se pudo registrar el cliente.',
                confirmButtonText: 'Aceptar'
            });
        });
    };
  return (
    <div className='modal fade show' style={{display:"block", backgroundColor: "rgba(0,0,0,0.5)"}}>

        <div className='modal-dialog'>
            <div className='modal-content'>

                <div className='modal-header'>
                    <h5 className='modal-title'>
                        Registrar Cliente
                    </h5>
                    <button type='button' className='btn-close' onClick={cerrarModal}></button>
                </div>

                <form onSubmit={registrarCliente}>
                    <div className='modal-body'>
                        <div className='mb-3'>
                            <label className='form-label'>DNI </label>
                            <input type='text' className='form-control' name='dniCliente' value={cliente.dniCliente} onChange={manejarCambio} required/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>NOMBRE CLIENTE </label>
                            <input type='text' className='form-control' name='nombreCliente' value={cliente.nombreCliente} onChange={manejarCambio} required/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>APELLIDO CLIENTE </label>
                            <input type='text' className='form-control' name='apellidoCliente' value={cliente.apellidoCliente} onChange={manejarCambio} required/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>TELEFONO </label>
                            <input type='text' className='form-control' name='telefonoCliente' value={cliente.telefonoCliente} onChange={manejarCambio} required/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>CORREO </label>
                            <input type='text' className='form-control' name='emailCliente' value={cliente.emailCliente} onChange={manejarCambio} required/>
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={cerrarModal}>Cancelar</button>
                         <button type='submit' className='btn btn-success'>
                            <i className='fa-solid fa-floppy-disk'></i>{''}Guardar
                         </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

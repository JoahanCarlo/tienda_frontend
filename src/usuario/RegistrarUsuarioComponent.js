import React , { useEffect, useState} from 'react';
import UsuarioService from '../service/UsuarioService';
import Swal from 'sweetalert2';

export const RegistrarUsuarioComponent = ({cerrarModal, cargarUsuarios}) => {
    const [usuario, setUsuario] = useState({
        nombreCompleto : "",
        usario : "",
        password : ""
    });

    const manejarCambio = (e) => {
        const {name, value} = e.target;

        setUsuario({
            ...usuario,
            [name] : value
        });
    };

    const registrarUsuario = (e) => {
        e.preventDefault();

        UsuarioService.createUsuario(usuario)
        .then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Usuario registrado!',
                text: 'El usuario se registro correctamente.',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                cerrarModal();
                cargarUsuarios();
            })
        })
        .catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo registrar el usuario.',
                confirmButtonText: 'Aceptar'
                });
        });
    };

    return (
        <div className='modal fade show' style={{display:"block", background: "rgba(0,0,0,0.5)"}}>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>
                            Registrar Usuario
                        </h5>
                        <button type= 'button' className='btn-close' onClick={cerrarModal}/>
                    </div>

                    <form onSubmit={registrarUsuario}>
                        <div className='modal-body'>
                            <div className='mb-3'>
                            <label className='form-label'>NOMBRE COMPLETO </label>
                            <input type='text' className='form-control' name='nombreCompleto' value={usuario.nombreCompleto} onChange={manejarCambio} required/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>USUARIO </label>
                            <input type='text' className='form-control' name='usuario' value={usuario.usuario} onChange={manejarCambio} required/>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Password </label>
                            <input type='text' className='form-control' name='password' value={usuario.password} onChange={manejarCambio} required/>
                        </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' onClick={cerrarModal}> Cancelar</button>
                            <button type='submit' className='btn btn-success'>
                                <i className='fa-solid fa-floppy-disk'></i> {' '} Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
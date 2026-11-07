import React, { useState} from 'react'
import UsuarioService from '../service/UsuarioService';
import Swal from 'sweetalert2';

export const ActualizarUsuarioComponents = ({usuarioSeleccionado,
  cerrarModal,
  cargarUsuarios}) => {
    const [usuario, setUsuario] = useState(usuarioSeleccionado);
    const manejarCambio = (e) => {
      const  {name, value} = e.target;
      setUsuario({
        ...usuario,
        [name]: value
      });
    };

    const actualizarUsuario = (e) => {
      e.preventDefault();
      UsuarioService.updateUsuario(usuario.id, usuario)
      .then(response => {
        Swal.fire({
          icon: 'success',
          title: '¡Usuario actualizado!',
          text: 'El usuario se ha actualizado',
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
          text: 'No se puede realizar la actualización',
          confirmButtonText: 'Aceptar'
        });
      });
    };
  return (
    <div className='modal fade show' style={{display:"block", background: "rgba(0,0,0,0.5)"}}>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>
                            Actualizar Usuario
                        </h5>
                        <button type= 'button' className='btn-close' onClick={cerrarModal}/>
                    </div>

                    <form onSubmit={actualizarUsuario}>
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
                                <i className='fa-solid fa-floppy-disk'></i> {' '} Actualizar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
};

export default ActualizarUsuarioComponents;
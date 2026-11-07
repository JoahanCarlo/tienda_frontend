import React, { useEffect, useState} from 'react';
import UsuarioService from '../service/UsuarioService'
import {RegistrarUsuarioComponent} from './RegistrarUsuarioComponent';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { ActualizarUsuarioComponents } from './ActualizarUsuarioComponents';
import "../estado.css"
import Swal from 'sweetalert2';

DataTable.use(DT);

const ListUsuarioComponent = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);

    const idiomaEspañol = {
    search: "Buscar:",
    lengthMenu: "Mostrar _MENU_ registros",
    info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
    zeroRecords: "No se encontraron registros",
    paginate: {
        next: "Siguiente",
        previous: "Anterior"
    }
    };

    const cambiarEstado = async (usuario) => {
        const estadoActual = Boolean(usuario.estado);

        Swal.fire({
             title: '¿Estás seguro?',
             text: estadoActual
            ? '¿Deseas desactivar a este usuario?'
            : '¿Deseas activar a este usuario?',
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: estadoActual ? '#d33' : '#28a745',
             cancelButtonColor: '#6c757d',
             confirmButtonText: estadoActual ? 'Sí, desactivar' : 'Sí, activar',
             cancelButtonText: 'Cancelar',
             reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                UsuarioService.cambiarEstadoUsuario(usuario.id)
        .then(response => {
            console.log("RESPUESTA COMPLETA:", response.data);
            console.log("ESTADO RECIBIDO:", response.data.estado);
            
            const estadoNuevo = Boolean(response.data.estado);
            setUsuarios(usuarios => usuarios.map(u => u.id === usuario.id ? {...u, estado: estadoNuevo}: u));
            Swal.fire({
                icon: 'success',
                title: estadoNuevo ? 'Usuario activado' : 'Usuario desactivado',
                text: estadoNuevo 
                ? 'Se ha activado correctamente al usuario.' 
                : 'Se ha desactivado correctamente al usuario.',
                timer: 1500,
                showConfirmButton: false
            });
        }).catch(error => {
            console.error("ERROR:", error);
            console.error("RESPUESTA:", error.response?.data);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cambiar el estado del usuario'
            });
        });
            }
        })
    };

    const abrirModalActualizar = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setMostrarModalActualizar(true);
    }

    const cerrrarModalActualizar = () => {
        setMostrarModalActualizar(false);
        setUsuarioSeleccionado(null);
    }

    const cargarUsuarios = () => {
        UsuarioService.getAllUsuario()
        .then(response => {
            console.log("RESPUESTA COMPLETA:", response);
            console.log("DATOS RECIBIDOS:", response.data);
            setUsuarios(response.data);
        })
        .catch(error => {
            console.error("Error al cargar usuarios:", error);
        });
    };

    useEffect(() => {
        cargarUsuarios();
    },[]);

    const abrirModal = () => {
        setMostrarModal(true);
    }

    const cerrarModal = () => {
        setMostrarModal(false);
    }

    const columnas = [
        {
            title: 'N°',
            data: 'id',
            defaultContent: "-"
        },
        {
            title: 'NOMBRE COMPLETO',
            data: 'nombreCompleto'
        },
        {
            title: 'USUARIO',
            data: 'usuario'
        },
        {
            title: 'ACCIONES',
            data: null,
            orderable: false,
            searchable: false
        }
    ];

    return (
        <div className='container'>
            <h2 className='text-center'>Lista de Usuarios</h2>
            <div className='mb-3'>
                <button className='btn btn-success' onClick={abrirModal}>
                    <i className='fa-solid fa-plus'></i> {' '} Registar Usuario
                </button>
            </div>

            <DataTable
                data = {usuarios}
                columns = {columnas}
                className = 'dispplay'
                slots={{
                    3: (data,row) => {
                        console.log("USUARIO:", row.usuario, "ESTADO:", row.estado);
                        return (
                            <div className='d-flex align-items-center'>
                            <button className='btn btn-primary me-2' onClick={() => abrirModalActualizar(row)}>
                                <i className='fa-solid fa-pen-to-square'></i>
                            </button>

                            <button className='btn btn-danger me-2'>
                                <i className='fa-solid fa-trash' ></i>
                            </button>
                            <div className="form-check form-switch m-0">
                               <input
                                   className="form-check-input"
                                   type="checkbox"
                                   role="switch"
                                   id={`switch-${row.id}`}
                                   checked={row.estado}
                                   onChange={() => cambiarEstado(row)}/>
                            </div>
                        </div>
                        )
                    }
                }}
                options={{
                    language: idiomaEspañol,
                    pageLength: 5,
                    lengthMenu: [5,10,15,20],
                    searching: true,
                    ordering: true,
                    paging: true
                }}
            >
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>NOMBRE COMPLETO</th>
                        <th>NOMBRE DE USUARIO</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
            </DataTable>

            {mostrarModal && (
                <RegistrarUsuarioComponent
                cerrarModal={cerrarModal}
                cargarUsuarios={cargarUsuarios}/>
            )}

            {mostrarModalActualizar && (
                <ActualizarUsuarioComponents
                  cerrarModal={cerrrarModalActualizar}
                  cargarUsuarios = {cargarUsuarios}
                  usuarioSeleccionado={usuarioSeleccionado}/>
            )}

           
        </div>
    );
};

export default ListUsuarioComponent;
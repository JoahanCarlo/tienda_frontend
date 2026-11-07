import React, { useEffect, useState } from 'react';
import ClienteService from '../service/ClienteService';
import { RegistrarClientesComponent } from './RegistrarClientesComponent';
import ActualizarClienteComponent from './ActualizarClienteComponents';
import '../responsive/clienteResponsive.css'

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import Swal from 'sweetalert2';

DataTable.use(DT);

const ListClientesComponent = () => {
  const [clientes,setClientes] = useState([]);
  const [mostrarModal,setMostrarModal] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
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

  const eliminarCliente = (id) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'El cliente será eliminado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
          ClienteService.eliminarCliente(id)
          .then(()=> {
            Swal.fire({
            icon: 'success', 
            title: '¡Cliente eliminado!', 
            text: 'El cliente fue desactivado correctamente.', 
            confirmButtonText: 'Aceptar'  
            }).then(()=>{
              cargarClientes();
            });
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el cliente.',
              confirmButtonText: 'Aceptar'
            });
          });
      }
    });
  }

    const abrirModalActualizar = (cliente) =>{
    setClienteSeleccionado(cliente);
    setMostrarModalActualizar(true);
  }

  const cerrarModalActualizar = () => {
    setMostrarModalActualizar(false);
    setClienteSeleccionado(null);
  };

  const cargarClientes = () => {
    ClienteService.getAllClientes()
    .then(response =>{
      setClientes(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    cargarClientes();
  },[]);

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const columnas = [
    {
      title: 'DNI',
      data: 'dniCliente'
    },
    {
      title: 'NOMBRE',
      data: 'nombreCliente'
    },
    {
      title: 'APELLIDO',
      data: 'apellidoCliente'
    },
    {
      title: 'TELEFONO',
      data: 'telefonoCliente'
    },
    {
      title: 'EMAIL',
      data: 'emailCliente'
    },
    {
      title: 'ACCIONES',
      data: null,
      orderable: false,
      searchable: false
    }
  ];

  return (
    <div className='container-fluid px-2 px-md-4'>
   
      <h2 className='text-center'>Lista de clientes</h2>
      <div className='mb-3'>
        <button className='btn btn-success w-100 w-md-auto mb-2' onClick={abrirModal}>
          <i className='fa-solid fa-plus'></i> {' '} Registrar Cliente
        </button>
      </div>

      <div className='table-responsive'>
        <DataTable
        data = {clientes}
        columns = {columnas}
        className = 'display'
        slots={{
          5: (data,row) => (
            <div>
              <button className='btn btn-primary me-2' onClick={()=>abrirModalActualizar(row)}>
                  <i className='fa solid fa-pen-to-square'></i>
                    </button>

                  <button className='btn btn-danger'>
                  <i className='fa-solid fa-trash' onClick={()=> eliminarCliente(row.id)}></i>
                  </button>
            </div>
          )
        }}
        options = {{
          language: idiomaEspañol,
          pageLength: 5,
          lengthMenu : [5,10,15,20],
          searching: true,
          ordering: true,
          paging: true
        }}
      >
          <thead>
          <tr>
          <th>DNI</th>
          <th>NOMBRE</th>
          <th>APELLIDO</th>
          <th>TELEFONO</th>
          <th>EMAIL</th>
          <th>ACCIONES</th>
          </tr>
        </thead>
        
      </DataTable>
      </div>


      {mostrarModalActualizar && clienteSeleccionado && (
        <ActualizarClienteComponent
         clienteSeleccionado = {clienteSeleccionado}
         cerrarModal ={cerrarModalActualizar}
         cargarClientes = {cargarClientes} />
      )}

      { mostrarModal && (
        <RegistrarClientesComponent 
          cerrarModal={cerrarModal}
          cargarClientes={cargarClientes}
          />
      )}
    </div>
  );
};

export default ListClientesComponent 
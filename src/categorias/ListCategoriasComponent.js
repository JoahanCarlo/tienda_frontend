import React, { useEffect, useState } from 'react';
import CategoriaService from '../service/CategoriaService';
import {RegistrarCategoriaComponent} from './RegistrarCategoriaComponent';
import ActualizarCategoriaComponent from './ActualizarCategoriaComponent';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import Swal from 'sweetalert2';

DataTable.use(DT);

const ListCategoriasComponent = () => {
    const [categorias, setCategorias] = useState([]);
    const [MostrarModal,setMostrarModal] = useState(false);
    const [categoriaSeleccionado, setCategoriaSeleccionado] = useState(null);
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

    const cargarCategorias = () => {
        CategoriaService.getAllCategoria()
        .then(response=>{
            setCategorias(response.data);
            console.log(response.data);
        })
    }

    const abrirModalActualizar = (categorias) => {
        setCategoriaSeleccionado(categorias);
        setMostrarModalActualizar(true);
    }

    const cerrarModalActualizar = () => {
        setMostrarModalActualizar(false);
        setCategoriaSeleccionado(null);
    }

    useEffect(() => {
        cargarCategorias();
    },[]);

    const abrirModal = () =>{
        setMostrarModal(true);
    }

    const cerrarModal = () => {
        setMostrarModal(false);
    }

    const columnas = [
        {
            title: 'CATEGORIAS',
            data: 'nombreCategoria'
        },
        {
            title: 'DESCRIPCIÓN',
            data: 'descripcionCategoria'
        },
        {
            title: 'ACCIONES',
            data: null,
            orderable: false,
            searchable: false
        }
    ]

  return (
    <div className='container'>
        <h2 className='text-center'>Lista de categorias</h2>
        <div className='mb-3'>
            <button className='btn btn-success' onClick={abrirModal}>
                <i className='fa-solid fa-plus'></i>{' '} Registrar categoria
            </button>
        </div>

        <DataTable
          data = {categorias}
          columns={columnas}
          className='display'
          slots={{
            2: (data,row) => (
                <div>
                    <button className='btn btn-primary me-2' onClick={()=> abrirModalActualizar(row)}>
                        <i className='fa solid fa-pen-to-square'></i>
                    </button>
                <button className='btn btn-danger'>
                        <i className='fa-solid fa-trash' onClick={''}></i>
                </button>
                </div>
            )
          }}

          options={{
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
                <th>NOMBRE DE LA CATEGORIA</th>
                <th>DESCRIPCIÓN</th>
            </tr>
          </thead>
         </DataTable>
        {
            mostrarModalActualizar && categoriaSeleccionado && (
                <ActualizarCategoriaComponent
                categoriaSeleccionado= {categoriaSeleccionado}
                cerrarModal={cerrarModalActualizar}
                cargarCategorias={cargarCategorias}/>
            )}

        {
            MostrarModal && (
                <RegistrarCategoriaComponent
                cerrarModal={cerrarModal}
                cargarCategorias={cargarCategorias}/>
            )}
    </div>
  )
}

export default ListCategoriasComponent

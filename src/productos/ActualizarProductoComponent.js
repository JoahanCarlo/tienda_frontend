import React, {useEffect, useState} from 'react'
import ProductoService from '../service/ProductoService'
import CategoriaService from '../service/CategoriaService'
import Swal from 'sweetalert2'

export const ActualizarProductoComponent = ({productoSeleccionado,
    cerrarModal,
    cargarProductos
}) => {

  const [producto,setProducto] = useState(productoSeleccionado);
  const [categorias,setCategorias] = useState([])

  const manejarCambio = (e) => {
    const {name, value} = e.target;

    setProducto({
        ...producto,
        [name]: value
    });
  };


  const cargarCategorias = () => {
    CategoriaService.getAllCategoria()
        .then(response => {
            console.log("CATEGORIAS", response.data);

            setCategorias(response.data);
        })
        .catch(error => {
            console.log("Error de categorias:", error);
        });
  };

  useEffect(() => {
    cargarCategorias();
  })

  const actualizarProducto = (e) => {
    e.preventDefault();

    ProductoService.updateProducto(producto.id, producto)
    .then(response => {
        Swal.fire({
                    icon: 'success',
                    title: 'Porducto actualizado!',
                    text: 'El producto se ha actualizado',
                    confirmButtonText: 'Aceptar'
                }).then(()=>{
                    cerrarModal();
                cargarProductos();
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
    <div className="modal fade show" style={{display: "block", backgroundColor: "rgba(0,0,0,0.5)"}}>
        <div className="modal-dialog modal-dialog-centered">
            <div className='modal-content'>
                <div className='modal-header'>
                    <h5 className='modal-title'>Actualizar producto</h5>
                    <button type='button' className='btn-close' onClick={cerrarModal}></button>
                </div>
                <form onSubmit={actualizarProducto}>
                    <div className='modal-body'>
                        <div className='mb-3'>
                            <label className='form-label'>CODIGO PRODUCTO</label>
                            <input type="text"                               className="form-control"
                                    name="codigoProducto"
                                    value={producto.codigoProducto}
                                    onChange={manejarCambio}
                                    required
                                />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">
                                    NOMBRE PRODUCTO
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombreProducto"
                                    value={producto.nombreProducto}
                                    onChange={manejarCambio}
                                    required
                                />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">
                                    PRECIO PRODUCTO
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    name="precioProducto"
                                    value={producto.precioProducto}
                                    onChange={manejarCambio}
                                    required
                                />
                        </div>
                        <div className='mb-3'>
                            <label className="form-label">
                                    STOCK DEL PRODUCTO
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="stockProducto"
                                    value={producto.stockProducto}
                                    onChange={manejarCambio}
                                    required
                                />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>
                                SELECCIONAR CATEGORIA
                            </label>
                            <select className='form-select' name='categoriaId' value={producto.categoriaId} onChange={manejarCambio} required>
                                <option value= "">
                                    SELECCIONAR UNA CATEGORIA
                                </option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id}
                                            value={categoria.id}>
                                            {categoria.nombreCategoria}
                                            </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                            <button type='button' className='btn btn-secondary' onClick={cerrarModal}>Cancelar</button>
                            <button type='submit' className='btn btn-success'><i className='fa-solid fa-floppy-disk'></i>{" "} Actualizar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ActualizarProductoComponent;

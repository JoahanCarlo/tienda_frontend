import axios from "axios"

const PRODUCTO_BASE_REST_API_URL = "http://localhost:8080/productos";

class ProductoService {
    getAllProductos(){
        return axios.get(PRODUCTO_BASE_REST_API_URL);
    }

    createProducto(productos){
       return axios.post(
        PRODUCTO_BASE_REST_API_URL,
        productos
       );
    }


    updateProducto(id,productos){
        return axios.put(
            `${PRODUCTO_BASE_REST_API_URL}/${id}`,
            productos
        );       
       }

    eliminarProducto(id){
        return axios.put(
            `${PRODUCTO_BASE_REST_API_URL}/${id}/estado`
        );
    }
}

export default new ProductoService();
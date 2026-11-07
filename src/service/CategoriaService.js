import axios from "axios";

const CATEGORIAS_BASE_REST_API_URL = "http://localhost:8080/categoria";

class CategoriaService {

    getAllCategoria() {
        return axios.get(CATEGORIAS_BASE_REST_API_URL);
    }

    createCategoria(categoria) {
        return axios.post(
            CATEGORIAS_BASE_REST_API_URL,
            categoria
        );
    }

    updateCategoria(id,categoria){
        return axios.put(
            `${CATEGORIAS_BASE_REST_API_URL}/${id}`,
            categoria
        )
    }
}

export default new CategoriaService();
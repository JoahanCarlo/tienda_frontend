import axios from "axios"

const CLIENTE_BASE_REST_API_URL = "http://localhost:8080/cliente"


class ClienteService{
    getAllClientes(){
        return axios.get(CLIENTE_BASE_REST_API_URL);
    }

    createCliente(cliente){
        return axios.post(
            CLIENTE_BASE_REST_API_URL,
            cliente
        );
    }

    updateCliente(id,cliente){
        return axios.put(
         `${CLIENTE_BASE_REST_API_URL}/${id}`,
         cliente
        )
    }

    eliminarCliente(id){
        return axios.put(
            `${CLIENTE_BASE_REST_API_URL}/${id}/estado`
        );
    }
}

export default  new ClienteService();
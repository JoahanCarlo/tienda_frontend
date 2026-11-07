import axios from 'axios';

const USUARIO_BASE_REST_API_URL = "http://localhost:8080/usuario";

class UsuarioService{
    getAllUsuario(){
        return axios.get(`${USUARIO_BASE_REST_API_URL}/listar`);
    }

    createUsuario(usuario){
        return axios.post(
            USUARIO_BASE_REST_API_URL,
            usuario
        );
    }

    updateUsuario(id, usuario){
        return axios.put(
            `${USUARIO_BASE_REST_API_URL}/${id}`,
            usuario
        )
    }

    cambiarEstadoUsuario(id){
        return axios.put(
            `${USUARIO_BASE_REST_API_URL}/${id}/estado`);
    }

    estadoUsuario(id){
        return axios.put(
            `${USUARIO_BASE_REST_API_URL}/estado/${id}`
        )
    }
}

export default new UsuarioService();

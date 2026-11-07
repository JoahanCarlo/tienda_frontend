import axios from "axios";

const VENTA_BASE_REST_API_URL = "http://localhost:8080/ventas";

class VentaService {
    getAllVentas(){
        return axios.get("http://localhost:8080/ventas/ventas_realizadas");
    }

    registrarVenta(ventaRequest){
        return axios.post(
            VENTA_BASE_REST_API_URL,
            ventaRequest
        );
    }
}


export default new VentaService();
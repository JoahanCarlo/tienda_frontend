import React, { useState } from 'react';
import Swal from 'sweetalert2';

export const LoginComponents = ({iniciarSesion}) => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/usuario/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: usuario,
                    password: password
                })
            });

            console.log('Codigo HTTP:', response.status);
            const data = await response.json();

            console.log("RESPUESTA DEL SERVIDOR" ,data);

            if (!response.ok) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Acceso denegado',
                    text: data.mensaje || data.message || 'Usuario o contraseña incorrectos',
                    confirmButtonColor: '#dc3545'            
                })
                return;
            }

            iniciarSesion(data);
        }catch(error){
            console.error('Error', error);
            Swal.fire({
                icon: 'error',
            title: 'Error del Servidor',
            text: 'No se pudo procesar la solicitud'
            })
        }
    };
   
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">

            <div className="card shadow p-4" style={{ width: '400px' }}>

                <div className="card-body">

                    <h2 className="text-center mb-4">
                        Iniciar Sesión
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label
                                htmlFor="email"
                                className="form-label"
                            >
                                Usuario
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                placeholder="Ingrese su correo"
                                value={usuario}
                                onChange={(e)=> setUsuario(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="password"
                                className="form-label"
                            >
                                Contraseña
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="recordar"
                            />

                            <label
                                className="form-check-label"
                                htmlFor="recordar"
                            >
                                Recordarme
                            </label>
                        </div>

                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Iniciar Sesión
                            </button>
                        </div>

                    </form>

                </div>

            </div>

        </div>
  )
}

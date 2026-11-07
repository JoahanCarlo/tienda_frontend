import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    console.log('USUARIO GUARDADO:', usuarioGuardado);
    console.log('ESTADO:', usuarioGuardado?.estado);
    if(!usuarioGuardado){
      navigate('/login', { replace:true });
      return;
    }

    if (usuarioGuardado.estado !== true) {
       Swal.fire({
        icon: 'warning',
        title: 'Acceso denegado',
        text: 'Usted no puede ingresar, no estás activo.',
        confirmButtonColor: '#dc3545',
        allowOutsideClick:false
       }).then(() => {
        localStorage.removeItem('usuario');
        navigate('/login', { replace:true });
       });
       return;
    }

    setUsuario(usuarioGuardado);
  }, [navigate]);

  if (!usuario) {
     return null;
  }

  return <BienvenidoComponent usuario={usuario}/>;
};

export const BienvenidoComponent = ({usuario}) => {
  return (
    <div className='container mt-4'>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-6">Bienvenido al sistema {' '} {usuario?.nombreCompleto}
          </h1>
          <p className="lead">Este es el sistema de ventas</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
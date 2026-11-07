import { useState } from 'react';
import './App.css';
import { BienvenidoComponent } from './menu/BienvenidoComponent';
import { MenuPrincipalComponent } from './menu/MenuPrincipalComponent';
import { LoginComponents } from './usuario/LoginComponents';
import ListClientesComponent from './clientes/ListClientesComponent';
import ListCategoriasComponent from './categorias/ListCategoriasComponent';
import ListProductosComponent from './productos/ListProductosComponent';
import ListVentasComponents from './ventas/ListVentasComponents';
import ListUsuarioComponents from './usuario/ListUsuarioComponent';

import Swal from 'sweetalert2'

function App() {
    const [logueado,setLogueado] = useState(
        localStorage.getItem('usuarioLogueado') === 'true'
    );

    const [usuario,setUsuario] =useState(
        JSON.parse(localStorage.getItem('usuario'))
    )

    const [pagina, setPagina] = useState('inicio');

    const iniciarSesion = (usuario) => {
        console.log('Usuario autenticado : ',usuario);

        localStorage.setItem('usuarioLogueado','true');

        localStorage.setItem(
            'usuario',
            JSON.stringify(usuario)
        );

        setUsuario(usuario);
        setLogueado(true);

        Swal.fire({
            title: '¡Bienvenido!',
            text: 'Inicio de sesión correcto.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true
        })
    };

    
    const cerrarSesion = () => {

        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('usuario');

        setLogueado(false);
    };

    if (!logueado) {
        return (
            <LoginComponents
            iniciarSesion={iniciarSesion} />
        );
    }
    return (
        <>
            <MenuPrincipalComponent
             cerrarSesion = {cerrarSesion} 
             cambiarPagina = {setPagina}/>

             {pagina === 'inicio' && (
               <BienvenidoComponent 
                usuario={usuario}/>
             )}

             {pagina === 'clientes' && (
                <ListClientesComponent/>
             )}

             {pagina === 'categorias' && (
                <ListCategoriasComponent/>
             )}

             {pagina === 'productos' && (
                <ListProductosComponent/>
             )}

             {pagina === 'ventas' && (
                <ListVentasComponents/>
             )}

             {pagina === 'usuarios' && (
                <ListUsuarioComponents/>
             )}
        </>
    )
}

export default App;
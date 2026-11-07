import React, { useState } from 'react';
import Swal from 'sweetalert2';
import "../menuResponsive.css"

export const MenuPrincipalComponent = ({ cerrarSesion, cambiarPagina }) => {

    const [menuAbierto, setMenuAbierto] = useState(null);

    const opcionesMenu = [
        {
            nombre: 'Inicio',
            icono: 'fa-house',
            pagina: 'inicio'
        },
        {
            nombre: 'Clientes',
            icono: 'fa-users',
            submenu: [
                {
                    nombre: 'Crud de cliente',
                    icono: 'fa-user',
                    pagina: 'clientes'
                }
            ]
        },
        {
            nombre: 'Productos',
            icono: 'fa-shopping-cart',
            submenu: [
                {
                    nombre: 'Crud de producto',
                    icono: 'fa-box',
                    pagina: 'productos'
                },
                {
                    nombre: 'Crud de categoria',
                    icono: 'fa-list',
                    pagina: 'categorias'
                }
            ]
        },
        {
            nombre: 'Ventas',
            icono: 'fa-shopping-cart',
            submenu: [
                 {
                    nombre: 'Registrar venta',
                    icono: 'fa-cart-plus',
                    pagina: 'ventas'
                 }
            ]
        },
        {
            nombre: 'Usuarios',
            icono: 'fa-user',
            submenu: [
                {
                    nombre: 'Crud de usuario',
                    icono: 'fa-user-plus',
                    pagina: 'usuarios'
                }
            ]
        }
    ];

    const confirmarCerrarSesion = () => {

        Swal.fire({
            title: '¿Cerrar sesión?',
            text: '¿Está seguro de que desea salir del sistema?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((resultado) => {

            if (resultado.isConfirmed) {
                cerrarSesion();
            }

        });
    };

    const abrirMenu = (nombre) => {

        if (menuAbierto === nombre) {
            setMenuAbierto(null);
        } else {
            setMenuAbierto(nombre);
        }

    };

    const seleccionarPagina = (pagina) => {

        setMenuAbierto(null);
        cambiarPagina(pagina);

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

            <div className="container-fluid">

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuPrincipal"
                    aria-controls="#menuPrincipal"
                    aria-expanded="false"
                    aria-label="Mostrar menu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="menuPrincipal"
                >

                    <ul className="navbar-nav me-auto">


                        {/* ===================== */}
                        {/* OPCIONES DEL MENÚ */}
                        {/* ===================== */}

                        {opcionesMenu.map((opcion, index) => (

                            <li
                                className="nav-item mx-3 position-relative"
                                key={index}
                            >


                                {/* ===================== */}
                                {/* SIN SUBMENÚ */}
                                {/* ===================== */}

                                {!opcion.submenu && (

                                    <button
                                        type="button"
                                        className="nav-link btn btn-link"
                                        onClick={() =>
                                            seleccionarPagina(opcion.pagina)
                                        }
                                    >

                                        <i
                                            className={`fa-solid ${opcion.icono}`}
                                        ></i>

                                        {' '}

                                        {opcion.nombre}

                                    </button>

                                )}


                                {/* ===================== */}
                                {/* CON SUBMENÚ */}
                                {/* ===================== */}

                                {opcion.submenu && (

                                    <>

                                        <button
                                            type="button"
                                            className="nav-link btn btn-link"
                                            onClick={() =>
                                                abrirMenu(opcion.nombre)
                                            }
                                        >

                                            <i
                                                className={`fa-solid ${opcion.icono}`}
                                            ></i>

                                            {' '}

                                            {opcion.nombre}

                                            {' '}

                                            <i
                                                className={`fa-solid ${
                                                    menuAbierto === opcion.nombre
                                                        ? 'fa-chevron-up'
                                                        : 'fa-chevron-down'
                                                }`}
                                            ></i>

                                        </button>


                                        {/* ===================== */}
                                        {/* SUBMENÚ */}
                                        {/* ===================== */}

                                        {menuAbierto === opcion.nombre && (

                                            <ul
                                                className="dropdown-menu show"
                                                style={{
                                                    position: 'absolute',
                                                    top: '100%',
                                                    left: '0'
                                                }}
                                            >

                                                {opcion.submenu.map(
                                                    (subopcion, subIndex) => (

                                                        <li key={subIndex}>

                                                            <button
                                                                type="button"
                                                                className="dropdown-item"
                                                                onClick={() =>
                                                                    seleccionarPagina(
                                                                        subopcion.pagina
                                                                    )
                                                                }
                                                            >

                                                                <i
                                                                    className={`fa-solid ${subopcion.icono}`}
                                                                ></i>

                                                                {' '}

                                                                {subopcion.nombre}

                                                            </button>

                                                        </li>

                                                    )
                                                )}

                                            </ul>

                                        )}

                                    </>

                                )}

                            </li>

                        ))}

                    </ul>


                    {/* ===================== */}
                    {/* CERRAR SESIÓN */}
                    {/* ===================== */}

                    <ul className="navbar-nav">

                        <li className="nav-item mx-3">

                            <button
                                type="button"
                                className="btn btn-dark"
                                onClick={confirmarCerrarSesion}
                            >

                                <i className="fa-solid fa-user"></i>

                                {' '}

                                CERRAR SESIÓN

                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>
    );
};
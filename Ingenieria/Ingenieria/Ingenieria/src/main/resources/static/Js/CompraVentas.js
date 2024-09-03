$(document).ready(function () {
    var currentChart = null;

    function mostrarGrafico(graficoId) {
        $('#grafico-ventas-semanal').hide();
        $('#grafico-compras-semanal').hide();
        $(graficoId).show();
    }

    function destruirGrafico() {
        if (currentChart instanceof Chart) {
            currentChart.destroy();
            currentChart = null; // Limpiar la referencia al gráfico destruido
        }
    }

    function cargarGraficoVentasSemanal(data) {
        destruirGrafico(); // Destruir el gráfico existente antes de crear uno nuevo
        mostrarGrafico('#grafico-ventas-semanal');
        var ctx = document.getElementById('grafico-ventas-semanal').getContext('2d');
        currentChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Ventas Semanales',
                    data: data.map(item => ({
                        x: new Date(item.fecha),
                        y: item.cantidad
                    })),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)', // Fondo de los puntos
                    borderColor: 'rgba(54, 162, 235, 1)',        // Borde de los puntos
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    showLine: true,
                    fill: true,                                  // Para que el área bajo la línea tenga color
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'yyyy-MM-dd'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Fecha',
                            color: '#333'                        // Color del texto del título del eje X
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)'    // Color de la cuadrícula
                        },
                        ticks: {
                            color: '#333'                        // Color de las etiquetas
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad',
                            color: '#333'                        // Color del texto del título del eje Y
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)'    // Color de la cuadrícula
                        },
                        ticks: {
                            color: '#333'                        // Color de las etiquetas
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        titleColor: '#333',
                        bodyColor: '#333',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        callbacks: {
                            label: function (context) {
                                return `Fecha: ${context.raw.x.toISOString().split('T')[0]}, Ventas: ${context.raw.y}`;
                            }
                        }
                    },
                    legend: {
                        display: true,
                        labels: {
                            color: '#333'                        // Color de las etiquetas de la leyenda
                        }
                    }
                },
                layout: {
                    backgroundColor: '#fff'                     // Color de fondo del gráfico
                }
            }
        });
    }

    function cargarGraficoComprasSemanal(data) {
        destruirGrafico();
        mostrarGrafico('#grafico-compras-semanal');
        var ctx = document.getElementById('grafico-compras-semanal').getContext('2d');
        currentChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Compras Semanales',
                    data: data.map(item => ({
                        x: new Date(item.fecha),
                        y: item.cantidad
                    })),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fondo de los puntos
                    borderColor: 'rgba(75, 192, 192, 1)',        // Borde de los puntos
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    showLine: true,
                    fill: true,                                  // Para que el área bajo la línea tenga color
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'yyyy-MM-dd'
                            }
                        },
                        title: {
                            display: true,
                            text: 'Fecha',
                            color: '#333'                        // Color del texto del título del eje X
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)'    // Color de la cuadrícula
                        },
                        ticks: {
                            color: '#333'                        // Color de las etiquetas
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad',
                            color: '#333'                        // Color del texto del título del eje Y
                        },
                        grid: {
                            color: 'rgba(200, 200, 200, 0.3)'    // Color de la cuadrícula
                        },
                        ticks: {
                            color: '#333'                        // Color de las etiquetas
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        titleColor: '#333',
                        bodyColor: '#333',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        callbacks: {
                            label: function (context) {
                                return `Fecha: ${context.raw.x.toISOString().split('T')[0]}, Compras: ${context.raw.y}`;
                            }
                        }
                    },
                    legend: {
                        display: true,
                        labels: {
                            color: '#333'                        // Color de las etiquetas de la leyenda
                        }
                    }
                },
                layout: {
                    backgroundColor: '#fff'                     // Color de fondo del gráfico
                }
            }
        });
    }

    function cargarVentasSemanal() {
        var hoy = new Date();
        var inicioSemana = new Date(hoy);
        inicioSemana.setDate(hoy.getDate() - hoy.getDay());

        var finSemana = new Date(hoy);
        finSemana.setDate(inicioSemana.getDate() + 6);

        $.ajax({
            url: '/graficos/ventas-semanal',
            method: 'GET',
            data: {
                inicio: inicioSemana.toISOString().split('T')[0],
                fin: finSemana.toISOString().split('T')[0]
            },
            success: function (data) {
                cargarGraficoVentasSemanal(data);
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud: ", error);
            }
        });
    }

    function cargarComprasSemanal() {
        var hoy = new Date();
        var inicioSemana = new Date(hoy);
        inicioSemana.setDate(hoy.getDate() - hoy.getDay());

        var finSemana = new Date(hoy);
        finSemana.setDate(inicioSemana.getDate() + 6);

        $.ajax({
            url: '/graficos/compras-semanal',
            method: 'GET',
            data: {
                inicio: inicioSemana.toISOString().split('T')[0],
                fin: finSemana.toISOString().split('T')[0]
            },
            success: function (data) {
                cargarGraficoComprasSemanal(data);
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud: ", error);
            }
        });
    }

    // Inicializa la carga de gráficos
    $('#btn-ventas').on('click', cargarVentasSemanal);
    $('#btn-compras').on('click', cargarComprasSemanal);
    cargarComprasSemanal(); // Carga las compras por defecto

    function verificarTokenYRedireccionarALogin() {
        let token = localStorage.getItem('token');
    
        // Verificar si el token está presente
        if (token === null) {
            // Si el token no está presente, redirigir al usuario al inicio de sesión
            window.location.href = '/Vistas/inicioVista.html';
        } else {
            var tokenParts = token.split('.');
            var tokenPayload = JSON.parse(atob(tokenParts[1]));
            var username = tokenPayload.sub;
            console.log(username);
        }
    }

    verificarTokenYRedireccionarALogin();  // Añadido para ejecutar la verificación del token en la carga de la página
});


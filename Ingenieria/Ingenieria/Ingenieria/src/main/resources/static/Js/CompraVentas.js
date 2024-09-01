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
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    showLine: true, // Mostrar la línea entre puntos
                    fill: false, // Evita que el área bajo la línea se rellene
                    tension: 0.1
                }]
            },
            options: {
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
                            text: 'Fecha'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Fecha: ${context.raw.x.toISOString().split('T')[0]}, Ventas: ${context.raw.y}`;
                            }
                        }
                    }
                }
            }
        });
    }

    function cargarGraficoComprasSemanal(data) {
        destruirGrafico(); // Destruir el gráfico existente antes de crear uno nuevo
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
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    showLine: true, // Mostrar la línea entre puntos
                    fill: false, // Evita que el área bajo la línea se rellene
                    tension: 0.1
                }]
            },
            options: {
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
                            text: 'Fecha'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cantidad'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Fecha: ${context.raw.x.toISOString().split('T')[0]}, Compras: ${context.raw.y}`;
                            }
                        }
                    }
                }
            }
        });
    }

    function cargarVentasSemanal() {
        var hoy = new Date();
        var inicioSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay()));
        var finSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 6));
        
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
        var inicioSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay()));
        var finSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 6));
        
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

    cargarVentasSemanal();  // Carga inicial de ventas
    $('#btn-ventas').click(cargarVentasSemanal);
    $('#btn-compras').click(cargarComprasSemanal);

    function verificarTokenYRedireccionarALogin() {
        let token = localStorage.getItem('token');
    
        // Verificar si el token está presente
        if (token === null) {
            // Si el token no está presente, redirigir al usuario al inicio de sesión
            window.location.href = '/Vistas/inicioVista.html';
        } else {
            var tokenParts = token.split('.');
            var tokenPayload = JSON.parse(atob(tokenParts[1]));
            var username=tokenPayload.sub;
            console.log(username);
        }
    }
});

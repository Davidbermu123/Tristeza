$(document).ready(function () {
    var currentChart = null;

    function mostrarGrafico(graficoId) {
        $('#grafico-ventas-semanal').hide();
        $('#grafico-compras-semanal').hide();
        $(graficoId).show();
    }

    function cargarGraficoVentasSemanal(scatterData) {
        if (currentChart) {
            currentChart.destroy();
        }
        mostrarGrafico('#grafico-ventas-semanal');
        var ctx = document.getElementById('grafico-ventas-semanal').getContext('2d');
        currentChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Ventas Semanales',
                    data: scatterData,
                    pointRadius: 5,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    showLine: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Semana'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 50,
                        title: {
                            display: true,
                            text: 'Cantidad'
                        },
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            }
        });
    }

    function cargarGraficoComprasSemanal(scatterData) {
        if (currentChart) {
            currentChart.destroy();
        }
        mostrarGrafico('#grafico-compras-semanal');
        var ctx = document.getElementById('grafico-compras-semanal').getContext('2d');
        currentChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Compras Semanales',
                    data: scatterData,
                    pointRadius: 5,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    showLine: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Semana'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 50,
                        title: {
                            display: true,
                            text: 'Cantidad'
                        },
                        ticks: {
                            stepSize: 5
                        }
                    }
                }
            }
        });
    }

    function cargarVentasSemanal() {
        $.ajax({
            url: '/graficos/ventas-semanal',
            method: 'GET',
            data: {
                inicio: '2024-01-01',  // Reemplaza con el valor adecuado
                fin: '2024-01-07'      // Reemplaza con el valor adecuado
            },
            success: function (data) {
                var scatterData = [];
                $.each(data, function (key, value) {
                    scatterData.push({ x: key, y: value });
                });
                cargarGraficoVentasSemanal(scatterData);
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud: ", error);
            }
        });
    }

    function cargarComprasSemanal() {
        $.ajax({
            url: '/graficos/compras-semanal',
            method: 'GET',
            data: {
                inicio: '2024-01-01',  // Reemplaza con el valor adecuado
                fin: '2024-01-07'      // Reemplaza con el valor adecuado
            },
            success: function (data) {
                var scatterData = [];
                $.each(data, function (key, value) {
                    scatterData.push({ x: key, y: value });
                });
                cargarGraficoComprasSemanal(scatterData);
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud: ", error);
            }
        });
    }

    cargarVentasSemanal();  // Carga inicial de ventas
    $('#btn-ventas').click(cargarVentasSemanal);
    $('#btn-compras').click(cargarComprasSemanal);
});
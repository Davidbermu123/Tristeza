$(document).ready(function () {
    var currentChart = null;

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
                        type: 'time',
                        time: {
                            unit: 'week',
                            displayFormats: {
                                week: 'MMM d'
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Ventas'
                        },
                        ticks: {
                            stepSize: 1
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
                        type: 'time',
                        time: {
                            unit: 'week',
                            displayFormats: {
                                week: 'MMM d'
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Compras'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    function cargarVentasSemanal() {
        $.ajax({
            url: '/graficos/ventas-semanal?inicio=1&fin=100', // Cambiar según sea necesario
            method: 'GET',
            success: function (data) {
                var scatterData = [];
                $.each(data, function (date, value) {
                    scatterData.push({ x: new Date(date), y: value });
                });
                cargarGraficoVentasSemanal(scatterData);
            }
        });
    }

    function cargarComprasSemanal() {
        $.ajax({
            url: '/graficos/compras-semanal?inicio=1&fin=100', // Cambiar según sea necesario
            method: 'GET',
            success: function (data) {
                var scatterData = [];
                $.each(data, function (date, value) {
                    scatterData.push({ x: new Date(date), y: value });
                });
                cargarGraficoComprasSemanal(scatterData);
            }
        });
    }

    function mostrarGrafico(graficoId) {
        $('#grafico-ventas-semanal').hide();
        $('#grafico-compras-semanal').hide();
        $(graficoId).show();
    }

    cargarVentasSemanal();  // Carga inicial
    $('#btn-ventas').click(cargarVentasSemanal);
    $('#btn-compras').click(cargarComprasSemanal);
});
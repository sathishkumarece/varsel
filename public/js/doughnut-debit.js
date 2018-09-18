/*=========================================================================================
    File Name: doughnut-debit.js
    Description: echarts doughnut chart for display expense
    ----------------------------------------------------------------------------------------
    Thanks to: PIXINVENT
==========================================================================================*/

// Doughnut chart
// ------------------------------

var myChart;
$(document).ready(function () {

    // Set paths
    // ------------------------------

    require.config({
        paths: {
            echarts: '../lib/echarts/js'
        }
    });

    // Configuration
    // ------------------------------


    $.ajax({
        url: "/activities/monthView/Debit",
        type: "GET",
        async: false,
        success: function (debit_data) {
            setTimeout(function () {
                console.log(debit_data);
            }, 2000);
            echartDebitConfig(debit_data);
        },
        error: function () {
            console.log('error occured');
        },
        complete: function () {
            // location.href = "/html/managePerson.html";
            // showNotification('top','right');
        }
    });
});

function echartDebitConfig(debit_data) {
    require(
        [
            'echarts',
            'echarts/chart/pie',
            'echarts/chart/funnel'
        ],

        // Charts setup
        function (ec) {
            // Initialize chart
            // ------------------------------
            myChart = ec.init(document.getElementById('doughnut-debit'));

            if (debit_data.length === 0) {
                myChart.showLoading({
                    text: 'No data',    //loading text
                });
            } else {
                // Chart Options
                // ------------------------------
                chartOptions = {

                    // Add title
                    title: {
                        text: 'Monthly expense view',
                        subtext: 'Debit',
                        x: 'center'
                    },

                    // Add legend
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['Salary', 'Food', 'Study', 'Shopping', 'Travel', 'Household', 'Doctor', 'Others']
                    },

                    // Add custom colors
                    // color: ['#00A5A8', '#626E82', '#FF7D4D', '#FF4558', '#16D39A'],

                    // Display toolbox
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        feature: {
                            // mark: {
                            //     show: true,
                            //     title: {
                            //         mark: 'Markline switch',
                            //         markUndo: 'Undo markline',
                            //         markClear: 'Clear markline'
                            //     }
                            // },
                            // dataView: {
                            //     show: true,
                            //     readOnly: false,
                            //     title: 'View data',
                            //     lang: ['View chart data', 'Close', 'Update']
                            // },
                            magicType: {
                                show: true,
                                title: {
                                    pie: 'Switch to pies',
                                    funnel: 'Switch to funnel',
                                },
                                type: ['pie', 'funnel'],
                                option: {
                                    funnel: {
                                        x: '25%',
                                        y: '20%',
                                        width: '80%',
                                        height: '70%',
                                        funnelAlign: 'left',
                                        max: 10000
                                    }
                                }
                            },
                            restore: {
                                show: true,
                                title: 'Restore'
                            },
                            saveAsImage: {
                                show: true,
                                title: 'Same as image',
                                lang: ['Save']
                            }
                        }
                    },

                    // Enable drag recalculate
                    calculable: true,

                    // Add series
                    series: [
                        {
                            name: 'Activities',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            center: ['50%', '57.5%'],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true
                                    },
                                    labelLine: {
                                        show: true
                                    }
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        formatter: '{b}' + '\n\n' + '{c}€ ({d}%)',
                                        position: 'center',
                                        textStyle: {
                                            fontSize: '17',
                                            fontWeight: '500'
                                        }
                                    }
                                }
                            },

                            data: debit_data
                        }
                    ]
                };

                // Apply options
                // ------------------------------

                myChart.setOption(chartOptions);


                // Resize chart
                // ------------------------------

                $(function () {

                    // Resize chart on menu width change and window resize
                    $(window).on('resize', resize);
                    $(".menu-toggle").on('click', resize);

                    // Resize function
                    function resize() {
                        setTimeout(function () {

                            // Resize chart
                            myChart.resize();
                        }, 200);
                    }
                });
                modifyData();
            }
        }
    );

}

function modifyData() {
    // myChart.clear();
    // myChart.setOption({
    //     series: [
    //         {
    //             data: [{0:0},
    //                 {value:'100',name:'Travel'},
    //         {value:'200', name:'Household'}]
    //         }
    //     ]
    // });
    // myChart.refresh();
    let data = [];
    data.push({ value: '100', name: 'Travel' });
    data.push({ value: '200', name: 'Household' });
    // echartConfig(data);
}

/*=========================================================================================
    File Name: doughnut-credit.js
    Description: echarts doughnut chart for display expense
    ----------------------------------------------------------------------------------------
    Thanks to: PIXINVENT
==========================================================================================*/

// Doughnut chart
// ------------------------------

var echartCredit;
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
        url: "/activities/monthView/Credit",
        type: "GET",
        async: false,
        success: function (credit_data) {
            setTimeout(function () {
                console.log(credit_data);
            }, 2000);
            echartCreditConfig(credit_data);
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

function echartCreditConfig(credit_data) {
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
            echartCredit = ec.init(document.getElementById('doughnut-credit'));

            if (credit_data.length === 0) {
                echartCredit.showLoading({
                    text: 'No data',    //loading text
                });
            } else {

                // ajax getting data...............

                // ajax callback
                // myChart.hideLoading();
                // Chart Options
                // ------------------------------
                chartOptions = {

                    // Add title
                    title: {
                        text: 'Monthly expense view',
                        subtext: 'Credit',
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

                            data: credit_data
                        }
                    ]
                };

                // Apply options
                // ------------------------------

                echartCredit.setOption(chartOptions);


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
                            echartCredit.resize();
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
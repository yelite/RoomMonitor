/**
 * Created by Yelite on 14-3-11.
 */
function zip() {
    var args = [].slice.call(arguments);
    var shortest = args.length == 0 ? [] : args.reduce(function (a, b) {
        return a.length < b.length ? a : b
    });

    return shortest.map(function (_, i) {
        return args.map(function (array) {
            return array[i]
        })
    });
}


$(function () {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    $.getJSON('/data', function (data) {

        var credits = {enabled: false};
        var chart = {
            plotBackgroundColor: '#F5FAFF',
            borderRadius: 14
        };
        var navigator = {enabled: false};
        var rangeSelector = {
            buttonTheme: { // styles for the buttons
                fill: 'none',
                stroke: 'none',
                'stroke-width': 0,
                r: 4,
                style: {
                    color: '#346691',
                    fontWeight: 'bold'
                },
                states: {
                    hover: {
                    },
                    select: {
                        fill: '#346691',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },

            buttons: [
                {
                    type: 'minute',
                    count: 120,
                    text: '2h'
                },
                {
                    type: 'minute',
                    count: 480,
                    text: '8h'
                },
                {
                    type: 'day',
                    count: 1,
                    text: '1d'
                },
                {
                    type: 'day',
                    count: 7,
                    text: '1w'
                },
                {
                    type: 'all',
                    text: 'All'
                }
            ],
            inputEnabled: false,
            selected: 2
        };
        var xAxis = {
            ordinal: false
        };
        var temp = zip(data.timestamp, data.temp);
        var pressure = zip(data.timestamp, data.pressure);
        var light = zip(data.timestamp, data.light_level);
        var hum = zip(data.timestamp, data.hum);
        // Create the chart
        $('#pressure').highcharts('StockChart', {
            chart: chart,

            credits: credits,

            navigator: navigator,

            rangeSelector: rangeSelector,

            title: {
                text: 'Pressure (Pa)'
            },

            series: [
                {
                    name: 'Indoor',
                    data: pressure,
                    type: 'spline',
                    tooltip: {
                        valueDecimals: 2
                    }
                }
            ],

            xAxis: xAxis
        });
        $('#temp').highcharts('StockChart', {
            chart: chart,

            credits: credits,

            navigator: navigator,

            rangeSelector: rangeSelector,

            title: {
                text: 'Temperature (C)'
            },

            series: [
                {
                    name: 'Indoor',
                    data: temp,
                    type: 'spline',
                    tooltip: {
                        valueDecimals: 2
                    }
                }
            ],

            xAxis: xAxis
        });
        $('#light').highcharts('StockChart', {
            chart: chart,

            credits: credits,

            navigator: navigator,

            rangeSelector: rangeSelector,

            title: {
                text: 'Light'
            },

            series: [
                {
                    name: 'Indoor',
                    data: light,
                    type: 'spline',
                    tooltip: {
                        valueDecimals: 2
                    }
                }
            ],

            xAxis: xAxis
        });
        $('#hum').highcharts('StockChart', {
            chart: chart,

            credits: credits,

            navigator: navigator,

            rangeSelector: rangeSelector,

            title: {
                text: 'Humidity (%)'
            },

            series: [
                {
                    name: 'Indoor',
                    data: hum,
                    type: 'spline',
                    tooltip: {
                        valueDecimals: 2
                    }
                }
            ],

            xAxis: xAxis
        });
    });
});
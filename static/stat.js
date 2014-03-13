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

var pressure_plot;
var hum_plot;
var light_plot;
var temp_plot;

var temp;
var pressure;
var light;
var hum;

$(function () {
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    var credits = {enabled: false};
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

    pressure_plot = new Highcharts.StockChart({
        chart: {
            plotBackgroundColor: '#F5FAFF',
            borderRadius: 14,
            renderTo: 'pressure'
        },
        credits: credits,
        navigator: navigator,
        rangeSelector: rangeSelector,
        title: {
            text: 'Pressure (Pa)'
        },
        xAxis: xAxis
    });
    temp_plot = new Highcharts.StockChart({
        chart: {
            plotBackgroundColor: '#F5FAFF',
            borderRadius: 14,
            renderTo: 'temp'
        },
        credits: credits,
        navigator: navigator,
        rangeSelector: rangeSelector,
        title: {
            text: 'Temperature (C)'
        },
        xAxis: xAxis
    });
    light_plot = new Highcharts.StockChart({
        chart: {
            plotBackgroundColor: '#F5FAFF',
            borderRadius: 14,
            renderTo: 'light'
        },
        credits: credits,
        navigator: navigator,
        rangeSelector: rangeSelector,
        title: {
            text: 'Light'
        },
        xAxis: xAxis
    });
    hum_plot = new Highcharts.StockChart({
        chart: {
            plotBackgroundColor: '#F5FAFF',
            borderRadius: 14,
            renderTo: 'hum'
        },
        credits: credits,
        navigator: navigator,
        rangeSelector: rangeSelector,
        title: {
            text: 'Humidity (%)'
        },
        xAxis: xAxis
    });

    // TODO need a compact form
    pressure_plot.showLoading();
    temp_plot.showLoading();
    light_plot.showLoading();
    hum_plot.showLoading();

    $.getJSON('/data', function (data) {
        temp = zip(data.timestamp, data.temp);
        pressure = zip(data.timestamp, data.pressure);
        light = zip(data.timestamp, data.light_level);
        hum = zip(data.timestamp, data.hum);

        pressure_plot.hideLoading();
        pressure_plot.addSeries(
            {
                name: 'Indoor',
                type: 'spline',
                data: pressure,
                tooltip: {
                    valueDecimals: 2
                }
            }
        );
        pressure_plot.rangeSelector.render();


        hum_plot.hideLoading();
        hum_plot.addSeries(
            {
                name: 'Indoor',
                type: 'spline',
                data: hum,
                tooltip: {
                    valueDecimals: 2
                }
            }
        );
        hum_plot.rangeSelector.render();

        temp_plot.hideLoading();
        temp_plot.addSeries(
            {
                name: 'Indoor',
                type: 'spline',
                data: temp,
                tooltip: {
                    valueDecimals: 2
                }
            }
        );
        temp_plot.rangeSelector.render();

        light_plot.hideLoading();
        light_plot.addSeries(
            {
                name: 'Indoor',
                type: 'spline',
                data: light,
                tooltip: {
                    valueDecimals: 2
                }
            }
        );
        light_plot.rangeSelector.render();


    });
});
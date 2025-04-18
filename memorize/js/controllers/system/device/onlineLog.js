app.controller('onlineLogController', function($scope, $timeout, $http0, toaster, items) {

    $scope.maxDate = new Date();
    let div, myChart;

    $scope.loadChart = function (start, end) {
        $http0.post1('/chart/online', {id: items, start: start, end: end}).then(function(data) {
            if(data.status)
                reviewChart(data.data);
            else
                toaster.pop('error', data.msg);
        });
    }


    function renderItem(params, api) {
        var categoryIndex = api.value(0);
        var start = api.coord([api.value(1), categoryIndex]);
        var end = api.coord([api.value(2), categoryIndex]);
        var height = api.size([0, 1])[1] * 0.6;

        return {
            type: 'rect',
            shape: echarts.graphic.clipRectByRect({
                x: start[0],
                y: start[1] - height / 2,
                width: end[0] - start[0],
                height: height
            }, {
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            }),
            style: api.style()
        };
    }

    function reviewChart(data) {
        if(data.map)
            $scope.rate = data.map.rate;
        if(data.series)
            for(let i in data.series)
                if(data.series[i].name == 'online')
                    data.series[i]['itemStyle'] = {normal: {color: '#6bc235'}};
                else
                    data.series[i]['itemStyle'] = {normal: {color: '#ff425d'}};

        if(!myChart) {
            div = document.getElementById('main');
            myChart = echarts.init(div);
        }

        let option = {
            tooltip: {
                axisPointer: {
                    type: 'cross'
                },
                formatter: function(params) {
                    let t = params.data.value[3] / 1000;
                    let time = Math.floor(t) % 60 + '秒';
                    if(t > 60) {
                        t = t / 60;
                        time = Math.floor(t) % 60 + '分' + time;
                    }
                    if(t > 60) {
                        t = t / 60;
                        time = Math.floor(t) + '时' + time;
                    }
                    return params.marker + params.name + '<br>' + time;
                }
            },
            title: {
                left: 'center'
            },
            dataZoom: [{
                type: 'slider',
                filterMode: 'weakFilter',
                show: true,
                start: 0,
                end: 100,
            }],
            grid: {
                height: 300
            },
            xAxis: {
                type: 'time',
                min: data.bothX.min,
                max: data.bothX.max,
                interval: 7200000,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                data: [''].reverse()
            },
            series: [
                {
                    type: 'custom',
                    renderItem: renderItem,
                    itemStyle: {
                        normal: {
                            opacity: 0.8
                        }
                    },
                    encode: {
                        x: [1, 2, 3],
                        y: 0,
                    },
                    data: data.series
                }]
        };
        myChart.setOption(option);
    }

    $scope.dateChange = function (){
        $scope.loadChart($scope.dt)
    }

    $scope.today = function() {
        var date = new Date();
        $scope.dt =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    };


    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker'
    };
    $scope.today();
});
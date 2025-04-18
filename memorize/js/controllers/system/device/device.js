app.controller('deviceController', function($scope, $rootScope, $http0, $permission, toaster, $modal) {

    $scope.params = {
    };

    $scope.grafanaUrl = config.global.grafana;

    $scope.reset = function() {
        $scope.params['search'] = '';
        $scope.list();
    }

    $scope.list = function() {
        $http0.post("/device/list", $scope.params).then(
            function(data) {
                if(data.status) {
                    $scope.data = data.data;
                    $scope.params['pn'] = data.data.pn;
                } else
                    toaster.pop('error', data.msg);
            });
    }

    $scope.list();

    function openForm(deviceId) {
        let modalInstance = $modal.open({
            templateUrl: 'tpl/system/device/form.html',
            controller: 'deviceFormController',
            size: 'lg',
            resolve: {
                items: function () {
                    return {deviceId: deviceId, cs: $scope.cs};
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.list();
        });
    }
    $scope.showChart = function(deviceId) {
        openChartForm(deviceId);
    }

    function openChartForm(devId) {
        let modalInstance = $modal.open({
            templateUrl: 'tpl/system/device/HeartChart.html',
            controller: 'heartChartController',
            size: 'lg',
            resolve: {
                items: function () {
                    var div = document.getElementById('main') ;
                    return {deviceId: devId, title: "Heart",selectTime:"today"};
                }
            }
        });

    }
    $scope.onlineLog = function(id) {
        $modal.open({
            templateUrl: 'tpl/system/device/onlineLog.html',
            controller: 'onlineLogController',
            size: 'lg',
            resolve: {
                items: function () {
                    return id;
                }
            }
        });
    }
    function openTagForm(deviceId) {
        let modalInstance = $modal.open({
            templateUrl: 'tpl/system/device/tagForm.html',
            controller: 'tagFormController',
            size: 'lg',
            resolve: {
                items: function () {
                    return {deviceId: deviceId, title: "Tags"};
                }
            }
        });

    }

    $scope.info = function(deviceId) {
        openForm(deviceId);
    }
    $scope.tag_info = function(deviceId) {
        openTagForm(deviceId);
    }

    $scope.add = function() {
        openForm();
    }
    $scope.addTag = function() {
        openTagForm();
    }
    $scope.delete = function(deviceId) {
        if(!confirm("确定删除？"))
            return;
        $http0.post('/device/delete', {id: deviceId}).then(function(data) {
            if(data.status) {
                toaster.pop('success', "success");
                $scope.list();
            }
            else
                toaster.pop('error', data.msg);
        });
    }

    $scope.template = function(deviceId, sn) {
        $modal.open({
            templateUrl: 'tpl/system/device/template.html',
            controller: 'templateController',
            size: 'md',
            resolve: {
                items: function () {
                    return {deviceId: deviceId, sn: sn};
                }
            }
        });
    }

    $scope.admin = function(sn) {
        $modal.open({
            templateUrl: 'tpl/system/device/admin.html',
            controller: 'adminController',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                items: function () {
                    return sn;
                }
            }
        });
    }

});
app.controller('deviceFormController', function($scope, $http0, toaster, items, $modalInstance) {

    $scope.device = {};
    if(items.deviceId) {
        $http0.post('/device/info', {id: items.deviceId}).then(function (data) {
            if (data && data.status)
                $scope.device = data.data;
        });
    }

    $scope.save = function($event) {
        $http0.post('/device/setSim', {id: $scope.device.id, sim: $scope.device.sim}).then(function(data) {
            if(data.status) {
                toaster.pop('success', "success");
                $modalInstance.close();
            }
            else {
                toaster.pop('error', data.msg);
                $($event.target).removeClass('active disabled');
            }
        });
    }
});
app.controller('heartChartController', function($scope, $http0, toaster, items, $modalInstance) {
    var  selectTime = "today";
    var chartDiv ;
    $scope.title = items.title;
    $scope.selectTimeChange = function (time) {
        if(typeof time == 'undefined') {
            selectTime = $('#timeSelect').val();
            if(selectTime == "") return;
            items.selectTime = selectTime;
        }else{
            items.selectTime = time;
        }
        $scope.refreshChart();
    }

    $scope.refreshChart = function () {
        $http0.post('/chart/list', {deviceId: items.deviceId,time: items.selectTime}).then(function(data) {
            var myChart = echarts.init(chartDiv);
            var option ;
            if(data && data.status)
                option = data.data.data;
            myChart.setOption(option);

        });
    }


    $scope.dateChange = function (){
        if( $scope.dt != null){
            items.selectTime =  $scope.dt.getFullYear() + '-' + ($scope.dt.getMonth() > 9 ?  ($scope.dt.getMonth() + 1) :( '0'+($scope.dt.getMonth()+1))) + '-' +( $scope.dt.getDate() > 9 ? $scope.dt.getDate():('0'+$scope.dt.getDate()));
            if(items.deviceId)
                $http0.post('/chart/list', {deviceId: items.deviceId,time: items.selectTime}).then(function(data) {
                    var div = document.getElementById('main') ; //angular.element("main");
                    chartDiv = div;
                    var myChart = echarts.init(chartDiv);
                    var option ;
                    if(data && data.status)
                        option = data.data.data;
                    myChart.setOption(option);

                });
        }
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
app.controller('tagFormController', function($scope, $http0, toaster, items, $modalInstance) {

    $scope.title = items.title;
    $scope.tag = {};

    if(items.deviceId){
        //隐藏form
        $scope.isShow = false;
        $http0.post('/tag/list').then(function(data) {
            if(data && data.status && data.data) {
                $scope.allTags = data.data.data;
                $http0.post('/device/getTags', {deviceId: items.deviceId}).then(function(data) {
                    if(data && data.status)
                        for(let i in data.data)
                            for(let j in $scope.allTags)
                                if($scope.allTags[j].id == data.data[i].id)
                                    $scope.allTags[j].selected = true;
                });
            }
        });
    }else{
        $scope.isShow = true;
    }

    $scope.save = function() {
            $http0.post('/tag/add', $scope.tag).then(function(data) {
                if(data.status) {
                    toaster.pop('success', "success");
                    $modalInstance.close();
                }
                else
                    toaster.pop('error', data.msg);
            });
    }
    $scope.change = function (tag) {
        $http0.post(tag.selected ? '/device/addTag' : '/device/deleteTag', {deviceId: items.deviceId, tagId: tag.id}).then(function(data) {
            if(data.status)
                toaster.pop('success', 'success');
            else
                toaster.pop('error', data.msg);
        });
    }
});
app.controller('templateController', function($scope, $http0, toaster, items, $modal, $modalInstance) {
    $http0.get('/template/' + items.deviceId).then(function(data) {
        if(data.status)
            $scope.data = data.data;
        else
            toaster.pop('error', data.msg);

        if(!$scope.data)
            $scope.data = {id: items.deviceId, interval: 600, watch_interval: 0}
    });

    $scope.showChart = function() {
        toaster.pop("info", 1);
    }

    $scope.edit = function() {
        $modalInstance.close();
        $modal.open({
            templateUrl: 'tpl/system/device/templateEdit.html',
            controller: 'templateEditController',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                items: function () {
                    return {data: $scope.data, sn: items.sn, id: items.deviceId};
                }
            }
        });
    }

    $scope.upload = function() {
        $http0.post1('/admin/set/' + items.sn + '/template', $scope.data).then(function(data) {
            if(data.status) {
                toaster.pop('success', data.data);
            }
            else
                toaster.pop('error', data.msg);
        });
    }

    $scope.chart = function(point) {
        $modal.open({
            templateUrl: 'tpl/system/device/realdata.html',
            controller: 'realDataController',
            size: 'lg',
            resolve: {
                items: function () {
                    return point;
                }
            }
        });
    }
});
app.controller('realDataController', function($scope, $http0, toaster, items, $filter) {

    $scope.maxDate = new Date();
    let div, myChart;

    // $timeout(function() {
    //     div = document.getElementById('main');
    //     myChart = echarts.init(div);
    //     $scope.loadChart();
    // }, 500);

    $scope.loadChart = function (start, end) {
        $http0.post1('/chart/real', {point: items, start: start, end: end}).then(function(data) {
            if(data.status)
                reviewChart(data.data);
            else
                toaster.pop('error', data.msg);
        });
    }

    function reviewChart(data) {
        if(!data || !data.series)
            return;
        if(!myChart) {
            div = document.getElementById('main');
            myChart = echarts.init(div);
        }
        let series = data.series;
        for (let i = 0; i < series.length; i++) {
            series[i]['type'] = 'line';
            series[i]['symbol'] = 'none';
            series[i]['smooth'] = true;
        }
        let option = {
            tooltip: {
                trigger: 'axis',
                formatter:function(params)
                {
                    let relVal = name;
                    relVal += $filter('date')(params[0].value[0], 'HH:mm:ss') + '<br/>' + params[0].seriesName + ': ' + params[0].value[1] + ' ' + data.symbols[params[0].seriesIndex];
                    return relVal;
                }
            },
            legend: {
                data: data.titles,
                selectedMode: 'single'
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
            toolbox: {
                show: true,
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    }
                }
            },
            yAxis: {
                type: 'value',
                scale: true
            },
            series: data.series
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
app.controller('selectPointController', function($scope, $http0, $timeout, toaster, $modalInstance) {

    $http0.get('/template/point').then(function(data) {
        if(data.status) {
            $scope.data = data.data;
            $timeout(function() {
                $("#model_select").trigger("chosen:updated");
            }, 200);
        }
        else
            toaster.pop('error', data.msg);
    });

    $scope.ok = function() {
        for(let g in $scope.data)
            for(let p of $scope.data[g])
                if(p.id == $scope.selectedPoint)
                    $modalInstance.close(p.point);
    }
});
app.controller('savePointController', function($scope, $http0, toaster, items, $modalInstance) {

    $scope.point = {point: items}

    $scope.save = function($event) {
        if($scope.pointForm.$invalid) {
            toaster.pop("warning", "please perfect the form");
            return;
        }
        // console.log($scope.point)
        $http0.post1('/template/point', $scope.point).then(function(data) {
            if(data.status) {
                toaster.pop('success', "Success");
                $modalInstance.close();
            } else {
                toaster.pop('error', data.msg);
                $($event.target).removeClass('active disabled');
            }
        });
    }
});
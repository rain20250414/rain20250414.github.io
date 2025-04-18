app.controller('pointTemplateController', function($scope, $http0, toaster, $modal) {
    $scope.data = [];

    function loadData() {
        $http0.get('/template/point').then(data => {
            if(data.status)
                $scope.data = data.data;
        });
    }

    loadData();

    $scope.edit = function(data) {
        // console.log(data);
        let modalInstance = $modal.open({
            templateUrl: 'tpl/pointTemplate/templateEdit.html',
            controller: 'templateEditController',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                items: function () {
                    return {data: data};
                }
            }
        });
        modalInstance.result.then(function () {
            loadData();
        });
    };

    $scope.delete = function(id) {
        if(!confirm("确定删除？"))
            return;
        $http0.delete('/template/point/'+id).then(function(data) {
            if(data.status) {
                toaster.pop('success', "success");
                loadData();
            }
            else
                toaster.pop('error', data.msg);
        });
    }
});
app.controller('templateEditController', function($scope, $http0, toaster, items, $modal, $modalInstance) {
    $scope.template = items.data;
    $scope.isAdd = $scope.data?false:true;

    let default_point = {
        type: 'modbus',
        baud: 9600,
        parity: 'N',
    };

    if(!$scope.template)
        $scope.template = {
            point: default_point
        };

    if(!$scope.template.point)
        $scope.template.point = default_point;

    $scope.data = {
        commands: [
            '01-读线圈状态',
            '02-读输入状态',
            '03-读保持寄存器',
            '04-读输入寄存器'
        ],
        methods: [
            '先高后低',
            '先低后高'
        ],
        types: [
            'modbus',
            '645-97',
            '645-07',
            'vantage'
        ],
        bauds: [
            1200, 2400, 9600, 19200
        ],
        parities: [
            {value: 'N', name: '无校验'},
            {value: 'E', name: '偶校验'}
        ]
    };

    $scope.save = function($event) {
        // console.log($scope.template);
        if($scope.myForm.$invalid) {
            toaster.pop("warning", "please perfect the form");
            $($event.target).removeClass('active disabled');
            return;
        }
        $http0.post1('/template/point', $scope.template).then(function(data) {
            if(data.status) {
                toaster.pop('success', "success");
                $modalInstance.close();
            }
            else {
                toaster.pop('error', data.msg);
                $($event.target).removeClass('active disabled');
            }
        });
    };

    $scope.changeType = function(type) {
        // console.log(type);
        if(type == 'modbus') {
            $scope.template.point.baud = 9600;
            $scope.template.point.parity = 'N';
        } else if(type == '645-97') {
            $scope.template.point.baud = 1200;
            $scope.template.point.parity = 'E';
        } else if(type == '645-07') {
            $scope.template.point.baud = 2400;
            $scope.template.point.parity = 'E';
        } else if(type == 'vantage') {
            $scope.template.point.baud = 19200;
            $scope.template.point.parity = 'N';
        }
        if($scope.template.point['data'])
            $scope.template.point['data'].length = 0;
        if($scope.template.point['watch'])
            $scope.template.point['watch'].length = 0;
        // console.log($scope.template);
    };

    $scope.cancel = function() {
        $modalInstance.close();
    }

    /**
     * 复制一个对象
     * @param obj
     * @returns {any}
     */
    function cloneObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    $scope.addProperty = function() {
        if(!$scope.template.point['data'])
            $scope.template.point['data'] = [];

        let dataLength = $scope.template.point['data'].length;
        if(dataLength == 0) {
            if($scope.template.point.type == 'modbus')
                $scope.template.point.data.push({ option: [3, 1, 1, 0, 0, 1]});
            else if($scope.template.point.type == '645-97')
                $scope.template.point.data.push({ option: [9, 0, 1, 0, 0, 1, 4]});
            else if($scope.template.point.type == '645-07')
                $scope.template.point.data.push({ option: [0, 1, 0, 0, 0, 1, 4]});
            else if($scope.template.point.type == 'vantage')
                $scope.template.point.data.push({ option: [0, 1, 0, 0, 0, 1]});
        } else {
            $scope.template.point.data.push(cloneObj($scope.template.point.data[dataLength - 1]));
        }

    }

    $scope.delProperty = function(i) {
        $scope.template.point.data.splice(i, 1);
    }

    $scope.addWatch = function() {
        if(!$scope.template.point['watch'])
            $scope.template.point['watch'] = [];

        let dataLength = $scope.template.point['watch'].length;
        if(dataLength == 0) {
            if ($scope.template.point.type == 'modbus')
                $scope.template.point.watch.push({option: [3, 1, 1, 0, 0, 1]});
            else if ($scope.template.point.type == '645-97')
                $scope.template.point.watch.push({option: [9, 0, 1, 0, 0, 1, 4]});
            else if ($scope.template.point.type == '645-07')
                $scope.template.point.watch.push({option: [0, 1, 0, 0, 0, 1, 4]});
            else if($scope.template.point.type == 'vantage')
                $scope.template.point.watch.push({option: [0, 1, 0, 0, 0, 1]});
        } else {
            $scope.template.point.watch.push(cloneObj($scope.template.point.watch[dataLength - 1]));
        }
    }

    $scope.delWatch = function(i) {
        $scope.template.point.watch.splice(i, 1);
    }
});
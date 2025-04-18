app.controller('upgradeLogController', function($scope, $rootScope, $http0, $permission, toaster, $modal) {

    $scope.pn = 1;

    $scope.list = function() {
        $http0.get(`/upgradeLog/all?page=${$scope.pn - 1}`).then(
            function(data) {
                if(data.status) {
                    if(data.data) {
                        $scope.data = data.data.content;
                        $scope.total = data.data.totalElements;
                    }
                }
                else
                    toaster.pop('error', data.msg);
            });
    }

    $scope.list();

    function openForm() {
        let modalInstance = $modal.open({
            templateUrl: 'tpl/system/upgradeLog/form.html',
            controller: 'upgradeLogFormController',
            size: 'md'
        });
        modalInstance.result.then(function () {
            $scope.list();
        });
    }

    $scope.add = function() {
        openForm();
    }

    $scope.delete = function(id) {
        if(!confirm("确定删除？"))
            return;
        $http0.delete('/upgradeLog/delete/'+id).then(function(data) {
            if(data.status) {
                toaster.pop('success', "success");
                $scope.list();
            }
            else
                toaster.pop('error', data.msg);
        });
    }
});
app.controller('upgradeLogFormController', function($scope, $http0, toaster, $modalInstance) {

    $scope.bean = {};

    $scope.save = function($event) {
        if(!$scope.bean.version) {
            toaster.pop('error', "请填写版本");
            $($event.target).removeClass('active disabled');
            return;
        }
        $http0.post1('/upgradeLog/save', $scope.bean).then(function(data) {
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

    $scope.dateChange = function (){
        if( $scope.dt != null){
            $scope.bean.time = $scope.dt;
        }
    }

    $scope.today = function() {
        var date = new Date();
        $scope.dt =  date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    };


    $scope.clear = function () {
        $scope.dt = null;
    };

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
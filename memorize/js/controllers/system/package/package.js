app.controller('packageController', function($scope, $rootScope, $http0, $permission, toaster, $modal) {

    $scope.list = function() {
        $http0.get("/package/list", $scope.params).then(
            function(data) {
                if(data.status)
                    $scope.data = data.data;
                else
                    toaster.pop('error', data.msg);
            });
    }

    $scope.list();

    function openForm(id) {
        let modalInstance = $modal.open({
            templateUrl: 'tpl/system/package/form.html',
            controller: 'packageFormController',
            size: 'lg',
            resolve: {
                items: function () {
                    return {id: id};
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.list();
        });
    }

    $scope.info = function(id) {
        openForm(id);
    }

    $scope.add = function() {
        openForm();
    }

    $scope.delete = function(id) {
        if(!confirm("确定删除？"))
            return;
        $http0.delete('/package/'+id).then(function(data) {
            if(data.status) {
                toaster.pop('success', "success");
                $scope.list();
            }
            else
                toaster.pop('error', data.msg);
        });
    }
});
app.controller('packageFormController', function($scope, $http0, toaster, items, $modalInstance) {

    $scope.id = items.id;

    $scope.p = {};
    if(items.id)
        $http0.get('/package/get?id=' + items.id).then(function(data) {
            if(data && data.status)
                $scope.p = data.data;
        });

    $scope.save = function($event) {
        if(!$scope.p.type) {
            toaster.pop('error', "请选择类型");
            return;
        }
        $http0.post1('/package/save', $scope.p).then(function(data) {
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
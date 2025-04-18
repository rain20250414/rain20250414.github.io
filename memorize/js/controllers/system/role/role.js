app.controller('roleController', function($scope, $http0, toaster, $modal) {
    $scope.list = function() {
        $http0.post("/role/list", $scope.params).then(
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
            templateUrl: 'tpl/system/role/form.html',
            controller: 'roleFormController',
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
        $http0.post("/role/delete", {id: id}).then(
            function(data) {
                if(data.status) {
                    toaster.pop('success', 'success');
                    $scope.list();
                }
                else
                    toaster.pop('error', data.msg);
            });
    }

    $scope.permissions = function(id) {
        $modal.open({
            templateUrl: 'tpl/system/role/permission.html',
            controller: 'rolePermissionController',
            size: 'lg',
            resolve: {
                items: function () {
                    return id;
                }
            }
        });
    }
});
app.controller('roleFormController', function($scope, $http0, toaster, items, $modalInstance) {

    $scope.user = {};
    if(items.id)
        $http0.post('/role/info', {id: items.id}).then(function(data) {
            if(data && data.status)
                $scope.role = data.data;
        });

    $scope.save = function($event) {
        $http0.post($scope.role.id ? '/role/update':'/role/save', $scope.role).then(function(data) {
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
app.controller('rolePermissionController', function($scope, $http0, toaster, items, $modalInstance) {

    $http0.post('/permission/get', {roleId: items}).then(function(data) {
        if(data && data.status) {
            $scope.permissions = data.data;
        }
    });

    $scope.change = function(permission) {
        $http0.post(permission.selected ? '/role/addPermission' : '/role/deletePermission', {permissionId: permission.id, roleId: items}).then(function(data) {
            if(data.status)
                toaster.pop('success', 'success');
            else
                toaster.pop('error', data.msg);
        });
    }
});
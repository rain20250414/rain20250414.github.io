app.controller('userController', function($scope, $rootScope, $http0, $permission, toaster, $modal) {

    $scope.params = {
        cid: -1,
        pn: 1,
        ps: 10
    };

    if($permission.check('system_manage'))
        $http0.post("/company/list", $scope.params).then(
            function(data) {
                if(data.status)
                    $scope.cs = data.data.data;
                else
                    toaster.pop('error', data.msg);
            });

    $scope.list = function() {
        $http0.post("/user/list", $scope.params).then(
            function(data) {
                if(data.status)
                    $scope.data = data.data;
                else
                    toaster.pop('error', data.msg);
            });
    }

    $scope.reset = function() {
        $scope.params['cid'] = -1;
        $scope.params['search'] = '';
        $scope.list();
    }

    $scope.list();

    function openForm(userId) {
        let modalInstance = $modal.open({
            templateUrl: 'tpl/system/user/form.html',
            controller: 'userFormController',
            size: 'lg',
            resolve: {
                items: function () {
                    return {userId: userId, cs: $scope.cs};
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.list();
        });
    }

    $scope.info = function(userId) {
        openForm(userId);
    }

    $scope.add = function() {
        openForm();
    }

    $scope.delete = function(userId) {
        if(!confirm("确定删除？"))
            return;
        $http0.post('/user/delete', {id: userId}).then(function(data) {
            if(data.status) {
                toaster.pop('success', "success");
                $scope.list();
            }
            else
                toaster.pop('error', data.msg);
        });
    }

    $scope.roles = function(userId) {
        $modal.open({
            templateUrl: 'tpl/system/user/roles.html',
            controller: 'userRoleController',
            size: 'lg',
            resolve: {
                items: function () {
                    return userId;
                }
            }
        });
    }

});
app.controller('userFormController', function($scope, $http0, toaster, items, $modalInstance) {

    $scope.user = {};
    if(items.userId)
        $http0.post('/user/info', {id: items.userId}).then(function(data) {
            if(data && data.status)
                $scope.user = data.data;
        });

    $scope.cs = items.cs;

    $scope.save = function($event) {
        if(!$scope.user.cid)
            delete $scope.user.cid;
        if($scope.user.createTime)
            delete $scope.user.createTime;
        if(!$scope.user.phone || !(/^1[3456789]\d{9}$/.test($scope.user.phone))){
            toaster.pop('error', "手机号码有误，请重填");
            $($event.target).removeClass('active disabled');
            return;
        }
        if ($scope.user.id)
            $http0.post('/user/update', $scope.user).then(function(data) {
                if(data.status) {
                    toaster.pop('success', "success");
                    $modalInstance.close();
                }
                else {
                    toaster.pop('error', data.msg);
                    $($event.target).removeClass('active disabled');
                }
            });
        else
            $http0.post('/user/create', $scope.user).then(function(data) {
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
app.controller('userRoleController', function($scope, $http0, toaster, items, $modalInstance) {

    $http0.post('/role/list').then(function(data) {
        if(data && data.status && data.data) {
            $scope.allRoles = data.data.data;
            $http0.post('/user/roles', {id: items}).then(function(data) {
                if(data && data.status)
                    for(let i in data.data)
                        for(let j in $scope.allRoles)
                            if($scope.allRoles[j].id == data.data[i])
                                $scope.allRoles[j].selected = true;
            });
        }
    });

    $scope.change = function(role) {
        $http0.post(role.selected ? '/user/addRole' : '/user/deleteRole', {userId: items, roleId: role.id}).then(function(data) {
            if(data.status)
                toaster.pop('success', 'success');
            else
                toaster.pop('error', data.msg);
        });
    }
});
app.controller('HeaderController', function($scope, $http0, $rootScope, $modal) {

    $scope.companies = [];
    $scope.ownerId = -1;

    // $http0.get('/user/currentUser').then(function(data) {
    //     if(data.status) {
    //         $rootScope.token = data.data;
    //         if(!data.data.user) {// 未绑定用户，弹出绑定页面
    //             let modalInstance = $modal.open({
    //                 templateUrl: 'tpl/blocks/bindUser.html',
    //                 controller: 'bindUserController',
    //                 backdrop: 'static',
    //                 size: 'sm'
    //             });
    //             modalInstance.result.then(function () {
    //                 $scope.list();
    //             });
    //         } else {
    //             $scope.ownerId = data.data.user.cid ? data.data.user.cid : -1;
    //         }
    //         $scope.companies = data.data.companies;

    //         if($scope.companies) {
    //             $scope.cmap = {}
    //             for (let c of $scope.companies)
    //                 $scope.cmap[c.id] = c.name;
    //         }
    //     }
    // });

    $scope.setIdentity = function(id) {
        // console.log(id);
        $http0.get('/user/switchIdentify/' + id).then(function(data) {
            if(data.status) {
                $rootScope.token = data.data;
                $scope.ownerId = id;
                if(data.data.user && data.data.user.cid) {
                    $scope.ownerId = data.data.user.cid;
                }

                $http0.get('/user/getPermission').then(function(data) {
                    if (data.status) {
                        sessionStorage.setItem('ruler-web-p-cache', data.data);
                        window.location.reload();
                    } else {
                        console.warn('load permission failed');
                    }
                })
            }
        });
    }
})
;
app.controller('bindUserController', function($scope, $http0, $modalInstance, $state) {
    $scope.save = function($event) {
        $http0.post('/user/bind', {username: $scope.user.username, password: sha1($scope.user.password)}).then(function(data) {
            $($event.target).removeClass('active disabled');
            if(data.status) {
                alert('ok');
                $modalInstance.close();
                $state.reload()
            } else
                alert(data.msg);
        });
    }
});
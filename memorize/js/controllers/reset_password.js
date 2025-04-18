'use strict';

/* Controllers */
  // signin controller
app.controller('ResetPasswordController', ['$scope', '$http0', 'toaster', '$interval', '$state', '$rootScope', function($scope, $http0, toaster, $interval, $state, $rootScope) {
    $scope.show = false;
    let timer;
    $scope.canReset = false;
    $scope.param = {};
    $scope.canInput = true;
    if($rootScope.token && $rootScope.token.user && $rootScope.token.user.phone) {
        $scope.param.phone = $rootScope.token.user.phone;
        $scope.canInput = false;
    }

    $scope.send = function($event) {
        $http0.get("/api/sendCode?phone="+$scope.param.phone).then(function(data) {
            $($event.target).removeClass('active disabled');
            if(data.status) {
                toaster.pop("success", "发送成功");
                $($event.target).addClass('disabled');
                showCount();
            } else
                toaster.pop('error', data.msg);
        });
    };

    $scope.submit = function($event) {
        $http0.get("/api/validate?phone="+$scope.param.phone+"&code="+$scope.param.code).then(function(data) {
            $($event.target).removeClass('active disabled');
            if(data.status) {
                $scope.canReset = true;
            } else
                toaster.pop('error', data.msg);
        });
    };

    $scope.ok = function($event) {
        $http0.post("/api/resetPassword", {phone: $scope.param.phone, password: sha1($scope.param.password)}).then(function(data) {
            $($event.target).removeClass('active disabled');
            if(data.status) {
                alert("重置成功，请重新登录")
                $state.go('login');
            } else {
                toaster.pop('error', data.msg);
            }
        });
    }

    /**
     * 显示倒计时
     */
    function showCount() {
        $scope.count = 60;
        $scope.show = true;
        timer = $interval(countDown, 1000)
    }

    function countDown() {
        if(-- $scope.count < 0) {
            $scope.show = false;
            $interval.cancel(timer);
            timer = null;
            $("#btn_send").removeClass('disabled');
        }
    }
}]);
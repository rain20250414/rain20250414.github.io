app.controller('wxMenuController', function($scope, $http0, toaster) {

    $http0.post("/menu/get").then(
        function(response) {
            if(response)
                if(response.status == false)
                    toaster.pop('error', response.msg);
                else
                    $scope.data = JSON.stringify(response.menu, null, "\t");
            else
                $scope.data = response;
        });

    $scope.save = function() {
        $http0.post1("/menu/create", $scope.data).then(
            function(response) {
                if(response) {
                    toaster.pop(response.errcode ? 'error' : 'success', response.errmsg);
                } else
                    toaster.pop('default', 'default');
            });
    }

    $scope.delete = function() {
        toaster.pop('warning', 'not support');
    }
});
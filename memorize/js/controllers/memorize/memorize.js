app.controller('memorizeController', function($scope, $http0, toaster, $modal) {
    $scope.data = [];
    $scope.params = {
        pn: 1,

    };

    $scope.reset = function() {
        $scope.params['search'] = '';
        $scope.list();
    }

    $scope.list = function() {
        $http0.post1("/record/list", $scope.params).then(
            function(data) {
                $scope.data = data.content;
                $scope.params['pn'] = data.number;
            });
    }

    $scope.list();

    function openForm(userId) {
        let modalInstance = $modal.open({
            templateUrl: 'tpl/memorize/form.html',
            controller: 'memorizeAddFormController',
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

    $scope.add = function() {
        openForm();
    }
});
app.controller('memorizeAddFormController', function($scope, $http0, toaster, items, $modal, $modalInstance) {
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

    $scope.cancel = function() {
        $modalInstance.close();
    }
});
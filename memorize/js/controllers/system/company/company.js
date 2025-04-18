app.controller('companyController', function($scope, $http0, toaster, $modal) {
    $scope.params = {
    };

    $scope.list = function() {
        $http0.post("/company/list", $scope.params).then(
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
            templateUrl: 'tpl/system/company/form.html',
            controller: 'companyFormController',
            size: 'lg',
            resolve: {
                items: function () {
                    return {id: id, title: "Company Info"};
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
        $http0.delete('/company/' + id).then(function(data) {
            if(data.status) {
                toaster.pop('success', "success");
                $scope.list();
            }
            else
                toaster.pop('error', data.msg);
        });
    }
});
app.controller('companyFormController', function($scope, items, $http0, toaster, $modalInstance) {
    $scope.title = items.title;
    $scope.company = {};

    if(items.id)
        $http0.get('/company/' + items.id).then(function(data) {
            if(data && data.status)
                $scope.company = data.data;
        });

    $scope.save = function($event) {
        if ($scope.company.id)
            $http0.post1('/company/update', $scope.company).then(function(data) {
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
            $http0.post1('/company/save', $scope.company).then(function(data) {
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
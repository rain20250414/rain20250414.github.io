app.controller('memorizeController', function($scope, $http0, toaster, $modal) {
    $scope.data = [];
    $scope.params = {
        pn: 1,

    };

    $scope.reset = function() {
        $scope.params['search'] = '';
        $scope.list();
    }

    $scope.search = function() {
        $scope.list();
    }

    $scope.list = function() {
        $http0.post1("/record/list", $scope.params).then(
            function(data) {
                if(data.status) {
                    $scope.data = data.data;
                    $scope.params['pn'] = data.data.number + 1;
                }
                else {
                    toaster.pop('error', "error");
                }
            });
    }

    $scope.list();

    function openForm() {
        let modalInstance = $modal.open({
            templateUrl: 'tpl/memorize/form.html',
            controller: 'memorizeAddFormController',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                items: function () {
                    return {};
                }
            }
        });
        modalInstance.result.then(function () {
            $scope.list();
        });
    }

    function openTestForm(record) {
        let modalInstance = $modal.open({
            templateUrl: 'tpl/memorize/test.html',
            controller: 'memorizeTestFormController',
            size: 'lg',
            backdrop: 'static',
            resolve: {
                items: function () {
                    return record;
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

    $scope.test = function(record) {
        openTestForm(record);
    }
});
app.controller('memorizeAddFormController', function($scope, $http0, toaster, items, $modal, $modalInstance) {
    $scope.save = function($event) {
        $http0.post1('/record/save', $scope.record).then(function(data) {
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
app.controller('memorizeTestFormController', function($scope, $http0, toaster, items, $modal, $modalInstance) {
    $scope.showText = items.content;
    $scope.showForm1 = true;
    $scope.showForm2 = false;

    $scope.start = function($event) {
        $scope.showForm1 = false;
        $scope.showForm2 = true;
    };

    function submit(success) {
        $http0.post1('/record/test', {id: items.id, success: success}).then(function(data) {
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

    $scope.submit = function($event) {
        if (Object.is($scope.showText, $scope.inputText)) {
            submit(true);
        } else {
            toaster.pop('error', "failed");
        }
        $($event.target).removeClass('active disabled');
    };

    $scope.cancel = function() {
        $modalInstance.close();
    }
});
app.controller('memorizeController', function($scope, $http0, toaster, $modal) {
    $scope.data = [];
    $scope.todoCount = 0;
    $scope.params = {
        pn: 1,

    };
    $scope.now = new Date();

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
                    $scope.now = new Date();
                }
                else {
                    toaster.pop('error', "error");
                }
            });
        $http0.post1("/record/todoCount", $scope.params).then(
            function(data) {
                if(data.status) {
                    $scope.todoCount = data.data;
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

    $scope.isPastDate = function(itemDate) {
        return new Date(itemDate) < $scope.now;
    };
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
    $scope.showCompare = false;

    var comp;

    setTimeout(() => {
        comp = $('#compare');

        comp.mergely({
        cmsettings: {
            readOnly: false,
            lineWrapping: true
        },
        wrap_lines: true,

        editor_width: 'calc(50% - 25px)',
        editor_height: '100%'
        
        });
        comp.mergely('lhs', $scope.showText);
    }, 1000);

    $scope.start = function($event) {
        $scope.showForm1 = false;
        $scope.showForm2 = true;
    };

    function upload($event, success) {
        $http0.post1('/record/test', {id: items.id, success: success}).then(function(data) {
            if(data.status) {
                if (success) {
                    $modalInstance.close();
                    toaster.pop('success', "success");
                }
            }
            else {
                toaster.pop('error', data.msg);
            }
            $($event.target).removeClass('active disabled');
        });
    }

    $scope.submit = function($event) {
        if (Object.is($scope.showText, $scope.inputText)) {
            upload($event, true);
        } else {
            comp.mergely('rhs', $scope.inputText);
            $scope.showForm2 = false;
            $scope.showCompare = true;
            $($event.target).removeClass('active disabled');
        }
    };

    $scope.pass = function($event) {
        upload($event, true);
    }

    $scope.reject = function($event) {
        upload($event, false);
        $scope.inputText = '';
        $scope.showForm2 = true;
        $scope.showCompare = false;
    }

    $scope.back = function($event) {
        $scope.showForm1 = true;
        $scope.showForm2 = false;
    }

    $scope.cancel = function() {
        $modalInstance.close();
    }
});
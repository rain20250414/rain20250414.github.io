app.controller('permissionController', function($scope, $http0, toaster, $modal) {
    $scope.list = function() {
        $http0.post("/permission/get", $scope.params).then(
            function(data) {
                if(data.status)
                    $scope.my_data = data.data;
                else
                    toaster.pop('error', data.msg);

            });
    }

    $scope.list();

    $scope.my_tree_handler = function(branch) {
        $scope.permission = branch.value;
    };


    $scope.my_data = [];
    $scope.try_changing_the_tree_data = function() {
        if ($scope.my_data === treedata_avm) {
            return $scope.my_data = treedata_geography;
        } else {
            return $scope.my_data = treedata_avm;
        }
    };
    $scope.my_tree = tree = {};

    $scope.add = function() {
        let b = tree.get_selected_branch();
        if(!b)
            return;
        let c = tree.add_branch(b, {
            label: 'new',
            value: {
                name: 'new',
                key: 'new',
                parentId: b.id
            }
        });
        tree.select_branch(c);
    };

    $scope.delete = function($event) {
        if(!confirm("确定删除？")) {
            $($event.target).removeClass('active disabled');
            return;
        }
        if($scope.permission && $scope.permission.id)
            $http0.post("/permission/delete", $scope.permission).then(
                function(data) {
                    $($event.target).removeClass('active disabled');
                    if(data.status) {
                        tree.delete_branch(tree.get_selected_branch());
                        toaster.pop('success', "success");
                    }
                else
                    toaster.pop('error', data.msg);

                });
        else {
            tree.delete_branch(tree.get_selected_branch());
            toaster.pop('warning', "Data is not save, Discarded");
        }

    }

    $scope.save = function($event) {
        if($scope.permission) {
            let action = $scope.permission.id ? 'update' : 'save';
            $http0.post("/permission/" + action, $scope.permission).then(
                function(data) {
                    $($event.target).removeClass('active disabled');
                    if(data.status) {
                        let b = tree.get_selected_branch();
                        b.label = $scope.permission.name;
                        if(data.data)
                            b.id = data.data;
                        toaster.pop('success', "success");
                    }
                    else
                        toaster.pop('error', data.msg);

                });
        }
    }
});
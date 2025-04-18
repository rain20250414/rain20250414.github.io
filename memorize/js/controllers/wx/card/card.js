app.controller('wxCardController', function($scope, $http0, toaster, $modal) {

    $scope.params = {
        "offset": 0,
        "count": 10,
        "status_list": ["CARD_STATUS_VERIFY_OK", "CARD_STATUS_DISPATCH", "CARD_STATUS_NOT_VERIFY", "CARD_STATUS_VERIFY_FAIL"]
    };

    $scope.list = function() {
        $http0.post1("/card/list", $scope.params).then(
            function(response) {
                if(response.status == false)
                    toaster.pop('error', response.msg);
                else
                    $scope.data = response;
            });
    }

    $scope.list();

    $scope.info = function(cardId) {
        $modal.open({
            templateUrl: 'tpl/wx/card/info.html',
            controller: 'cardInfoController',
            size: 'lg',
            resolve: {
                items: function () {
                    return cardId;
                }
            }
        });
    }

    $scope.userList = function(cardId) {
        $modal.open({
            templateUrl: 'tpl/wx/card/userList.html',
            controller: 'cardUserListController',
            size: 'lg',
            resolve: {
                items: function () {
                    return cardId;
                }
            }
        });
    }

    $scope.qrCode = function(cardId) {
        $modal.open({
            templateUrl: 'tpl/wx/card/qrCode.html',
            controller: 'cardQrCodeController',
            resolve: {
                items: function () {
                    return cardId;
                }
            }
        });
    }
});
app.controller('cardQrCodeController', function($scope, $http0, $modalInstance, items) {
    let param = {"action_name":
            "QR_CARD",
        "action_info": {
            "card": {
                "card_id": items
            }
        }
    };

    $http0.post1('/card/qrCode', param).then(function(data) {
        if(data && !data.errcode)
            $scope.src = data.show_qrcode_url;
    });
});
app.controller('cardInfoController', function($scope, $http0, $modalInstance, items, toaster) {
    let param = {"card_id": items};

    $http0.post1('/card/get', param).then(function(data) {
        if(data && !data.errcode)
            $scope.data = JSON.stringify(data, null, "\t");
    });

    $scope.delete = function(cardId) {
        toaster.pop('warning', 'not support');
    }

    $scope.save = function() {
        toaster.pop('success', 'not achieved');
    }
});
app.controller('cardUserListController', function($scope, $http0, $modalInstance, items) {
    $scope.param = {
        "card_id": items
    };

    $scope.search = function() {
        $http0.post1('/card/userInfo', $scope.param).then(function(data) {
            if(data && !data.errcode)
                $scope.data = JSON.stringify(data, null, "\t");
        });
    }
});
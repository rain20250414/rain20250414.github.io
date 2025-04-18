'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http0', '$state', function($scope, $http0, $state) {
    $scope.token = getToken();

    $scope.login = function($event) {
        $scope.authError = '';
      $http0.post('/login/login', {username: $scope.user.username, password: sha1($scope.user.password)}).then(
          function(response) {
              if ( !response.status ) {
                  $scope.authError = response.msg;
                  $($event.target).removeClass('active disabled');
              }else{
                  $http0.get('/user/getPermission').then(function(data) {
                      if (data.status) {
                          sessionStorage.setItem('ruler-web-p-cache', data.data);
                          $state.go('app.dashboard-v1');
                      } else {
                          console.warn('load permission failed');
                          $scope.authError = data.msg;
                      }
                  })
              }
          });
    };
    function getToken() {
        return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
    }
  }])
;
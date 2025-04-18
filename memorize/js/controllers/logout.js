'use strict';

/* Controllers */
  // signin controller
app.controller('LogoutController', ['$scope', '$http0', '$state', function($scope, $http0, $state) {
      $http0.post('/login/logout')
      .then(function(response) {
          sessionStorage.removeItem('ruler-web-p-cache');
      });
      $state.go('login');
  }])
;
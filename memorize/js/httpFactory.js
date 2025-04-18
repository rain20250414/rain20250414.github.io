app.factory('$http0', function($http, $q) {
    return {
        post: function(url, params, app) {
            if(!app)
                app = config.global.default_app;
            var deferred = $q.defer();
            return $http.post(config.global.host + app + url, params ? $.param(params) : null, {headers: {'Content-Type':'application/x-www-form-urlencoded'}})
                .success(function(data) {
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject();
                }), deferred.promise;
        },
        post1: function(url, params, app) {
            if(!app)
                app = config.global.default_app;
            var deferred = $q.defer();
            return $http.post(config.global.host + app + url, params, {headers: {'Content-Type':'application/json'}})
                .success(function(data) {
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject();
                }), deferred.promise;
        },
        get: function(url, app) {
            if(!app)
                app = config.global.default_app;
            var deferred = $q.defer();
            return $http.get(config.global.host + app + url)
                .success(function(data) {
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject();
                }), deferred.promise;
        },
        delete: function(url, app) {
            if(!app)
                app = config.global.default_app;
            var deferred = $q.defer();
            return $http.delete(config.global.host + app + url)
                .success(function(data) {
                    deferred.resolve(data);
                }).error(function() {
                    deferred.reject();
                }), deferred.promise;
        }
    }
});
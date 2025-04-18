angular.module('app')
    .directive('oneOff', ['$timeout', '$document', function($timeout, $document) {
        return {
            restrict: 'A',
            link: function(scope, el) {
                el.on('click', function() {
                    let b = $(el);
                    let loading = b.children(".text-active")
                    if(!loading.length)
                        b.append('<span class="text-active"><i class="fa fa-spin fa-spinner"></i></span>');
                    b.addClass('active disabled');
                });
            }
        };
    }]);
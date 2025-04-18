angular.module('app').directive('rulerCheck', function($animate, $permission) {
    return {
        multiElement: true,
        transclude: 'element',
        priority: 600,
        terminal: true,
        restrict: 'A',
        $$tlb: true,
        scope: {
            rulerCheck: '@'
        },
        link: function($scope, $element, $attr, ctrl, $transclude) {
            if(!$scope.rulerCheck)
                return;

            needShow($permission.check($scope.rulerCheck));

            /**
             * 是否需要显示
             * @param show
             */
            function needShow(show) {
                let block, childScope, previousElements;
                if (show) {
                    if (!childScope) {
                        $transclude(function(clone, newScope) {
                            childScope = newScope;
                            clone[clone.length++] = document.createComment(' end ruler check');
                            // Note: We only need the first/last node of the cloned nodes.
                            // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                            // by a directive with templateUrl when its template arrives.
                            block = {
                                clone: clone
                            };
                            $animate.enter(clone, $element.parent(), $element);
                        });
                    }
                } else {
                    if (previousElements) {
                        previousElements.remove();
                        previousElements = null;
                    }
                    if (childScope) {
                        childScope.$destroy();
                        childScope = null;
                    }
                    if (block) {
                        previousElements = getBlockNodes(block.clone);
                        $animate.leave(previousElements).then(function() {
                            previousElements = null;
                        });
                        block = null;
                    }
                }
            }
        }
    };
});
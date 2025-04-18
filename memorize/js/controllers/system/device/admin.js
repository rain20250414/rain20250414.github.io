app.controller('adminController', function($scope, $http0, toaster, items, $modal, $modalInstance, $timeout) {
    $scope.sn = items;
    $scope.connected = true;

    let host = config.global.host;
    host = host.replace('http', 'ws');

    let buf = [];
    let ws = new WebSocket(host + "terminal/ws/client?id=" + $scope.sn);
    let term = new Terminal();

    ws.onopen = function() {
        console.log('opened');
        ws.send("clear\n");
        $scope.connected = true;
    };

    ws.onmessage = function(event) {
        console.debug(event.data);
        if(term)
            term.write(event.data);
    };

    ws.onclose = function () {
        console.log('connection closed');
        $scope.connected = false;
    };

    $timeout(function() {
        term.open(document.getElementById('terminal'));
        term.onData(e => {
            if(!ws) {
                console.warn('ws is not open');
                return;
            }
            // console.log(e);
            let code = e.charCodeAt();
            if(code == 4) {
                alert("Don\'t use Ctrl + D, please!");
                return;
            } else if(code == 13) {
                // 换行键
                if(buf.length > 0) {
                    let c = buf.join('').trim();
                    if (c == 'exit') {
                        alert("Dont\'t use exit, please!");
                        return;
                    }
                    buf.length = 0;
                }
            } else if(code == 127) {
                // 删除键
                if(buf.length > 0)
                    buf.length = buf.length - 1;
            } else if(buf.length < 16 && code >= 32)
                buf.push(e);

            ws.send(e);
        });
    }, 500);

    $scope.ctl = function($event, command) {
        $http0.get('/admin/ctl/' + $scope.sn + '/' + command).then(function(data) {
            $($event.target).removeClass('active disabled');
            if(data.status)
                toaster.pop('success', data.data);
            else
                toaster.pop('error', data.msg);
        });
    }

    $scope.cancel = function() {
        $modalInstance.close();
    }
});
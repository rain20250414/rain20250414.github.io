app.factory('$permission', function() {
    return {
        check: function (keyword) {
            return checkPermission(sessionStorage.getItem('ruler-web-p-cache'));

            /**
             * 检查权限
             * @param pCache
             */
            function checkPermission(pCache) {
                if(!pCache)
                    return false;

                let permission = JSON.parse(pCache);
                let p = permission.p;
                let ps = permission.ps;

                if (!p || !ps)
                    return;

                let nps = [];
                queryNeedIds(ps, keyword, nps);

                return appraisal(p, nps);
            }

            /**
             * 检查是否有权限
             * @param hps
             * @param nps
             * @returns {boolean}
             */
            function appraisal(hps, nps) {
                if (nps)
                    for (let np of nps)
                        if (np)
                            for (let hp of hps)
                                if (np == hp)
                                    return true;
                return false;
            }

            /**
             * 从权限树中查询出该权限需要的id列表
             * @param ps
             * @param key
             * @param ids
             * @returns {boolean}
             */
            function queryNeedIds(ps, key, ids) {
                if (ps)
                    for (let node of ps) {
                        if (node && key == node.value.key) {
                            ids.push(node.id);
                            return true;
                        } else if (queryNeedIds(node.children, key, ids)) {
                            ids.push(node.id);
                            return true;
                        }
                    }
                return false;
            }
        }
    }
});
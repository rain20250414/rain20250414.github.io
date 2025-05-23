let host_local = "http://168.138.47.33:8080/";
let host_prod = "http://168.138.47.33:8080/";
let host_dev = "http://168.138.47.33:8080/";

let g_dev = "https://g.dev.grapefruitpi.com/";
let g_prod = "https://g.grapefruitpi.com/";

let env = {
    local: {
        host: host_dev,
        grafana: g_dev,
        default_app: "memorize"
    },
    dev: {
        host: host_dev,
        grafana: g_dev,
        default_app: "memorize"
    },
    prod: {
        host: host_prod,
        grafana: g_prod,
        default_app: "memorize"
    }
};

const config = (function($){$.global = env[profile.active];return $;})(window.config||{});
let host_local = "http://localhost:8080/";
let host_prod = "https://ruler-api.grapefruitpi.com/";
let host_dev = "https://dev.ruler-api.grapefruitpi.com/";

let g_dev = "https://g.dev.grapefruitpi.com/";
let g_prod = "https://g.grapefruitpi.com/";

let env = {
    local: {
        host: host_dev,
        grafana: g_dev,
        default_app: "ruler"
    },
    dev: {
        host: host_dev,
        grafana: g_dev,
        default_app: "ruler"
    },
    prod: {
        host: host_prod,
        grafana: g_prod,
        default_app: "ruler"
    }
};

const config = (function($){$.global = env[profile.active];return $;})(window.config||{});
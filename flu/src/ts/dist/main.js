import { v5_callFunction as callFunction$$, v5_registerService as registerService$$, } from '@fluencelabs/js-client';
export function registerMutexAddressRouter() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    registerService$$(args, {
        "defaultServiceId": "mutexaddressrouter",
        "functions": {
            "fields": {
                "route": {
                    "domain": {
                        "fields": {
                            "tx": {
                                "name": "string",
                                "tag": "scalar"
                            }
                        },
                        "tag": "labeledProduct"
                    },
                    "codomain": {
                        "items": [
                            {
                                "name": "string",
                                "tag": "scalar"
                            }
                        ],
                        "tag": "unlabeledProduct"
                    },
                    "tag": "arrow"
                }
            },
            "tag": "labeledProduct"
        }
    });
}
export function registerVM() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    registerService$$(args, {
        "defaultServiceId": "vm",
        "functions": {
            "fields": {
                "call": {
                    "domain": {
                        "fields": {
                            "tx": {
                                "name": "string",
                                "tag": "scalar"
                            }
                        },
                        "tag": "labeledProduct"
                    },
                    "codomain": {
                        "items": [
                            {
                                "name": "bool",
                                "tag": "scalar"
                            }
                        ],
                        "tag": "unlabeledProduct"
                    },
                    "tag": "arrow"
                },
                "inProgress": {
                    "domain": {
                        "tag": "nil"
                    },
                    "codomain": {
                        "items": [
                            {
                                "name": "bool",
                                "tag": "scalar"
                            }
                        ],
                        "tag": "unlabeledProduct"
                    },
                    "tag": "arrow"
                }
            },
            "tag": "labeledProduct"
        }
    });
}
// Functions
export var helloWorld_script = "\n(xor\n (seq\n  (seq\n   (seq\n    (call %init_peer_id% (\"getDataSrv\" \"-relay-\") [] -relay-)\n    (call %init_peer_id% (\"getDataSrv\" \"name\") [] -name-arg-)\n   )\n   (call %init_peer_id% (\"op\" \"concat_strings\") [\"Hello, \" -name-arg-] ret)\n  )\n  (call %init_peer_id% (\"callbackSrv\" \"response\") [ret])\n )\n (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [:error: 0])\n)\n";
export function helloWorld() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return callFunction$$(args, {
        "functionName": "helloWorld",
        "arrow": {
            "domain": {
                "fields": {
                    "name": {
                        "name": "string",
                        "tag": "scalar"
                    }
                },
                "tag": "labeledProduct"
            },
            "codomain": {
                "items": [
                    {
                        "name": "string",
                        "tag": "scalar"
                    }
                ],
                "tag": "unlabeledProduct"
            },
            "tag": "arrow"
        },
        "names": {
            "relay": "-relay-",
            "getDataSrv": "getDataSrv",
            "callbackSrv": "callbackSrv",
            "responseSrv": "callbackSrv",
            "responseFnName": "response",
            "errorHandlingSrv": "errorHandlingSrv",
            "errorFnName": "error"
        }
    }, helloWorld_script);
}
export var call_script = "\n(xor\n (seq\n  (seq\n   (seq\n    (seq\n     (seq\n      (call %init_peer_id% (\"getDataSrv\" \"-relay-\") [] -relay-)\n      (call %init_peer_id% (\"getDataSrv\" \"peer_id\") [] -peer_id-arg-)\n     )\n     (call %init_peer_id% (\"getDataSrv\" \"contractAddress\") [] -contractAddress-arg-)\n    )\n    (call %init_peer_id% (\"getDataSrv\" \"tx\") [] -tx-arg-)\n   )\n   (new $peer\n    (seq\n     (seq\n      (xor\n       (seq\n        (seq\n         (seq\n          (new $-ephemeral-stream-\n           (new #-ephemeral-canon-\n            (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)\n           )\n          )\n          (call -peer_id-arg- (\"mutexaddressrouter\" \"route\") [-contractAddress-arg-] ret)\n         )\n         (ap ret $peer)\n        )\n        (new $-ephemeral-stream-\n         (new #-ephemeral-canon-\n          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)\n         )\n        )\n       )\n       (seq\n        (seq\n         (new $-ephemeral-stream-\n          (new #-ephemeral-canon-\n           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)\n          )\n         )\n         (new $-ephemeral-stream-\n          (new #-ephemeral-canon-\n           (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)\n          )\n         )\n        )\n        (fail :error:)\n       )\n      )\n      (new $peer_test\n       (seq\n        (seq\n         (fold $peer peer_fold_var\n          (seq\n           (seq\n            (ap peer_fold_var $peer_test)\n            (canon %init_peer_id% $peer_test  #peer_iter_canon)\n           )\n           (xor\n            (match #peer_iter_canon.length 1\n             (null)\n            )\n            (next peer_fold_var)\n           )\n          )\n          (never)\n         )\n         (canon %init_peer_id% $peer_test  #peer_result_canon)\n        )\n        (ap #peer_result_canon peer_gate)\n       )\n      )\n     )\n     (xor\n      (seq\n       (seq\n        (new $-ephemeral-stream-\n         (new #-ephemeral-canon-\n          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)\n         )\n        )\n        (call peer_gate.$.[0] (\"vm\" \"call\") [-tx-arg-] ret-0)\n       )\n       (new $-ephemeral-stream-\n        (new #-ephemeral-canon-\n         (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)\n        )\n       )\n      )\n      (seq\n       (seq\n        (new $-ephemeral-stream-\n         (new #-ephemeral-canon-\n          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)\n         )\n        )\n        (new $-ephemeral-stream-\n         (new #-ephemeral-canon-\n          (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)\n         )\n        )\n       )\n       (fail :error:)\n      )\n     )\n    )\n   )\n  )\n  (call %init_peer_id% (\"callbackSrv\" \"response\") [ret-0])\n )\n (call %init_peer_id% (\"errorHandlingSrv\" \"error\") [:error: 0])\n)\n";
export function call() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return callFunction$$(args, {
        "functionName": "call",
        "arrow": {
            "domain": {
                "fields": {
                    "peer_id": {
                        "name": "string",
                        "tag": "scalar"
                    },
                    "contractAddress": {
                        "name": "string",
                        "tag": "scalar"
                    },
                    "tx": {
                        "name": "string",
                        "tag": "scalar"
                    }
                },
                "tag": "labeledProduct"
            },
            "codomain": {
                "items": [
                    {
                        "name": "bool",
                        "tag": "scalar"
                    }
                ],
                "tag": "unlabeledProduct"
            },
            "tag": "arrow"
        },
        "names": {
            "relay": "-relay-",
            "getDataSrv": "getDataSrv",
            "callbackSrv": "callbackSrv",
            "responseSrv": "callbackSrv",
            "responseFnName": "response",
            "errorHandlingSrv": "errorHandlingSrv",
            "errorFnName": "error"
        }
    }, call_script);
}

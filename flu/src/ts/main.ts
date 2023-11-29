/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is generated using:
 * @fluencelabs/aqua-api version: 0.12.0
 * @fluencelabs/aqua-to-js version: 0.1.0
 * If you find any bugs in generated AIR, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * If you find any bugs in generated JS/TS, please write an issue on GitHub: https://github.com/fluencelabs/js-client/issues
 *
 */
import type { IFluenceClient as IFluenceClient$$, CallParams as CallParams$$ } from '@fluencelabs/js-client';

import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$,
} from '@fluencelabs/js-client';

// Services
export interface MutexAddressRouterDef {
    route: (tx: string, callParams: CallParams$$<'tx'>) => string | Promise<string>;
}
export function registerMutexAddressRouter(service: MutexAddressRouterDef): void;
export function registerMutexAddressRouter(serviceId: string, service: MutexAddressRouterDef): void;
export function registerMutexAddressRouter(peer: IFluenceClient$$, service: MutexAddressRouterDef): void;
export function registerMutexAddressRouter(peer: IFluenceClient$$, serviceId: string, service: MutexAddressRouterDef): void;
export function registerMutexAddressRouter(...args: any[]) {
    registerService$$(
        args,
        {
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
}
    );
}

export interface VMDef {
    call: (tx: string, callParams: CallParams$$<'tx'>) => boolean | Promise<boolean>;
    inProgress: (callParams: CallParams$$<null>) => boolean | Promise<boolean>;
}
export function registerVM(service: VMDef): void;
export function registerVM(serviceId: string, service: VMDef): void;
export function registerVM(peer: IFluenceClient$$, service: VMDef): void;
export function registerVM(peer: IFluenceClient$$, serviceId: string, service: VMDef): void;
export function registerVM(...args: any[]) {
    registerService$$(
        args,
        {
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
}
    );
}


// Functions
export const helloWorld_script = `
(xor
 (seq
  (seq
   (seq
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "name") [] -name-arg-)
   )
   (call %init_peer_id% ("op" "concat_strings") ["Hello, " -name-arg-] ret)
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export function helloWorld(
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorld(
    peer: IFluenceClient$$,
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorld(...args: any[]) {
    return callFunction$$(
        args,
        {
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
},
        helloWorld_script
    );
}

export const call_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
      (call %init_peer_id% ("getDataSrv" "peer_id") [] -peer_id-arg-)
     )
     (call %init_peer_id% ("getDataSrv" "contractAddress") [] -contractAddress-arg-)
    )
    (call %init_peer_id% ("getDataSrv" "tx") [] -tx-arg-)
   )
   (new $peer
    (seq
     (seq
      (xor
       (seq
        (seq
         (seq
          (new $-ephemeral-stream-
           (new #-ephemeral-canon-
            (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
           )
          )
          (call -peer_id-arg- ("mutexaddressrouter" "route") [-contractAddress-arg-] ret)
         )
         (ap ret $peer)
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (seq
        (seq
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
        (fail :error:)
       )
      )
      (new $peer_test
       (seq
        (seq
         (fold $peer peer_fold_var
          (seq
           (seq
            (ap peer_fold_var $peer_test)
            (canon %init_peer_id% $peer_test  #peer_iter_canon)
           )
           (xor
            (match #peer_iter_canon.length 1
             (null)
            )
            (next peer_fold_var)
           )
          )
          (never)
         )
         (canon %init_peer_id% $peer_test  #peer_result_canon)
        )
        (ap #peer_result_canon peer_gate)
       )
      )
     )
     (xor
      (seq
       (seq
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
        (call peer_gate.$.[0] ("vm" "call") [-tx-arg-] ret-0)
       )
       (new $-ephemeral-stream-
        (new #-ephemeral-canon-
         (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
        )
       )
      )
      (seq
       (seq
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
        (new $-ephemeral-stream-
         (new #-ephemeral-canon-
          (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
         )
        )
       )
       (fail :error:)
      )
     )
    )
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [ret-0])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export function call(
    peer_id: string,
    contractAddress: string,
    tx: string,
    config?: {ttl?: number}
): Promise<boolean>;

export function call(
    peer: IFluenceClient$$,
    peer_id: string,
    contractAddress: string,
    tx: string,
    config?: {ttl?: number}
): Promise<boolean>;

export function call(...args: any[]) {
    return callFunction$$(
        args,
        {
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
},
        call_script
    );
}

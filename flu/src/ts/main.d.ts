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
export interface VMDef {
    call: (tx: string, callParams: CallParams$$<'tx'>) => boolean | Promise<boolean>;
    deploy: (tx: string, callParams: CallParams$$<'tx'>) => boolean | Promise<boolean>;
}
export function registerVM(service: VMDef): void;
export function registerVM(serviceId: string, service: VMDef): void;
export function registerVM(peer: IFluenceClient$$, service: VMDef): void;
export function registerVM(peer: IFluenceClient$$, serviceId: string, service: VMDef): void;

// Functions
export function helloWorld(
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function helloWorld(
    peer: IFluenceClient$$,
    name: string,
    config?: {ttl?: number}
): Promise<string>;

export function deploy(
    relay_id: string,
    peer_id: string,
    contractAddress: string,
    tx: string,
    config?: {ttl?: number}
): Promise<boolean>;

export function deploy(
    peer: IFluenceClient$$,
    relay_id: string,
    peer_id: string,
    contractAddress: string,
    tx: string,
    config?: {ttl?: number}
): Promise<boolean>;

export function call(
    relay_id: string,
    peer_id: string,
    contractAddress: string,
    tx: string,
    config?: {ttl?: number}
): Promise<boolean>;

export function call(
    peer: IFluenceClient$$,
    relay_id: string,
    peer_id: string,
    contractAddress: string,
    tx: string,
    config?: {ttl?: number}
): Promise<boolean>;


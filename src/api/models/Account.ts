/* tslint:disable */
/* eslint-disable */
/**
 * AlterOrb API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * A representation of an AlterOrb player account.
 * @export
 * @interface Account
 */
export interface Account {
    /**
     * The player\'s unique identifier.
     * @type {string}
     * @memberof Account
     */
    readonly uuid?: string;
    /**
     * The visible name of the player.
     * @type {string}
     * @memberof Account
     */
    readonly displayName?: string;
    /**
     * The amount of orb points that the player has.
     * @type {number}
     * @memberof Account
     */
    readonly orbPoints?: number;
    /**
     * The amount of orb coins that the player has.
     * @type {number}
     * @memberof Account
     */
    readonly orbCoins?: number;
}

export function AccountFromJSON(json: any): Account {
    return AccountFromJSONTyped(json, false);
}

export function AccountFromJSONTyped(json: any, ignoreDiscriminator: boolean): Account {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uuid': !exists(json, 'uuid') ? undefined : json['uuid'],
        'displayName': !exists(json, 'displayName') ? undefined : json['displayName'],
        'orbPoints': !exists(json, 'orbPoints') ? undefined : json['orbPoints'],
        'orbCoins': !exists(json, 'orbCoins') ? undefined : json['orbCoins'],
    };
}

export function AccountToJSON(value?: Account | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}



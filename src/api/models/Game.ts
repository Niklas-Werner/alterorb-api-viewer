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
 * An AlterOrb game
 * @export
 * @interface Game
 */
export interface Game {
    /**
     * The game id
     * @type {number}
     * @memberof Game
     */
    readonly id?: number;
    /**
     * The game\'s jagex name
     * @type {string}
     * @memberof Game
     */
    readonly jagexName?: string;
    /**
     * The game\'s fancy name
     * @type {string}
     * @memberof Game
     */
    readonly fancyName?: string;
    /**
     * If login & online services are enabled for this game
     * @type {boolean}
     * @memberof Game
     */
    readonly loginEnabled?: boolean;
    /**
     * How many achievements are obtainable in this game
     * @type {number}
     * @memberof Game
     */
    readonly obtainableAchievements?: number;
    /**
     * How many orb coins can be obtained in this game
     * @type {number}
     * @memberof Game
     */
    readonly obtainableOrbCoins?: number;
    /**
     * How many orb points can be obtained in this game
     * @type {number}
     * @memberof Game
     */
    readonly obtainableOrbPoints?: number;
}

export function GameFromJSON(json: any): Game {
    return GameFromJSONTyped(json, false);
}

export function GameFromJSONTyped(json: any, ignoreDiscriminator: boolean): Game {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'jagexName': !exists(json, 'jagexName') ? undefined : json['jagexName'],
        'fancyName': !exists(json, 'fancyName') ? undefined : json['fancyName'],
        'loginEnabled': !exists(json, 'loginEnabled') ? undefined : json['loginEnabled'],
        'obtainableAchievements': !exists(json, 'obtainableAchievements') ? undefined : json['obtainableAchievements'],
        'obtainableOrbCoins': !exists(json, 'obtainableOrbCoins') ? undefined : json['obtainableOrbCoins'],
        'obtainableOrbPoints': !exists(json, 'obtainableOrbPoints') ? undefined : json['obtainableOrbPoints'],
    };
}

export function GameToJSON(value?: Game | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
    };
}



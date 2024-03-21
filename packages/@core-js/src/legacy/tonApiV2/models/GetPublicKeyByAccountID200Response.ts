/* tslint:disable */
/* eslint-disable */
/**
 * REST api to TON blockchain explorer
 * Provide access to indexed TON blockchain
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GetPublicKeyByAccountID200Response
 */
export interface GetPublicKeyByAccountID200Response {
    /**
     * 
     * @type {string}
     * @memberof GetPublicKeyByAccountID200Response
     */
    publicKey: string;
}

/**
 * Check if a given object implements the GetPublicKeyByAccountID200Response interface.
 */
export function instanceOfGetPublicKeyByAccountID200Response(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "publicKey" in value;

    return isInstance;
}

export function GetPublicKeyByAccountID200ResponseFromJSON(json: any): GetPublicKeyByAccountID200Response {
    return GetPublicKeyByAccountID200ResponseFromJSONTyped(json, false);
}

export function GetPublicKeyByAccountID200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetPublicKeyByAccountID200Response {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'publicKey': json['public_key'],
    };
}

export function GetPublicKeyByAccountID200ResponseToJSON(value?: GetPublicKeyByAccountID200Response | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'public_key': value.publicKey,
    };
}


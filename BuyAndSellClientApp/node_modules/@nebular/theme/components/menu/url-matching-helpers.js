/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export function isUrlPathEqual(path, link) {
    var locationPath = getPathPartOfUrl(path);
    return link === locationPath;
}
export function isUrlPathContain(path, link) {
    var locationPath = getPathPartOfUrl(path);
    var endOfUrlSegmentRegExp = /\/|^$/;
    return locationPath.startsWith(link) &&
        locationPath.slice(link.length).charAt(0).search(endOfUrlSegmentRegExp) !== -1;
}
export function getPathPartOfUrl(url) {
    return url.match(/.*?(?=[?;#]|$)/)[0];
}
export function getFragmentPartOfUrl(url) {
    var matched = url.match(/#(.+)/);
    return matched ? matched[1] : '';
}
export function isFragmentEqual(path, fragment) {
    return getFragmentPartOfUrl(path) === fragment;
}
export function isFragmentContain(path, fragment) {
    return getFragmentPartOfUrl(path).includes(fragment);
}
//# sourceMappingURL=url-matching-helpers.js.map
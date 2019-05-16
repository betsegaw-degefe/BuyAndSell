/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { NB_DEFAULT_ROW_LEVEL, NbTreeGridPresentationNode } from './tree-grid.model';
var NbTreeGridDataService = /** @class */ (function () {
    function NbTreeGridDataService() {
        this.defaultGetters = {
            dataGetter: function (node) { return node.data; },
            childrenGetter: function (d) { return d.children || undefined; },
            expandedGetter: function (d) { return !!d.expanded; },
        };
    }
    NbTreeGridDataService.prototype.toPresentationNodes = function (nodes, customGetters, level) {
        if (level === void 0) { level = NB_DEFAULT_ROW_LEVEL; }
        var getters = __assign({}, this.defaultGetters, customGetters);
        return this.mapNodes(nodes, getters, level);
    };
    NbTreeGridDataService.prototype.mapNodes = function (nodes, getters, level) {
        var _this = this;
        var dataGetter = getters.dataGetter, childrenGetter = getters.childrenGetter, expandedGetter = getters.expandedGetter;
        return nodes.map(function (node) {
            var childrenNodes = childrenGetter(node);
            var children;
            if (childrenNodes) {
                children = _this.toPresentationNodes(childrenNodes, getters, level + 1);
            }
            return new NbTreeGridPresentationNode(dataGetter(node), children, expandedGetter(node), level);
        });
    };
    NbTreeGridDataService.prototype.flattenExpanded = function (nodes) {
        var _this = this;
        return nodes.reduce(function (res, node) {
            res.push(node);
            if (node.expanded && node.hasChildren()) {
                res.push.apply(res, _this.flattenExpanded(node.children));
            }
            return res;
        }, []);
    };
    NbTreeGridDataService.prototype.copy = function (nodes) {
        var _this = this;
        return nodes.map(function (node) {
            var children;
            if (node.hasChildren()) {
                children = _this.copy(node.children);
            }
            return new NbTreeGridPresentationNode(node.data, children, node.expanded, node.level);
        });
    };
    NbTreeGridDataService = __decorate([
        Injectable()
    ], NbTreeGridDataService);
    return NbTreeGridDataService;
}());
export { NbTreeGridDataService };
//# sourceMappingURL=tree-grid-data.service.js.map
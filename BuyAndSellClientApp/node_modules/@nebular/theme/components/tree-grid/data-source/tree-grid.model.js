/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export var NB_DEFAULT_ROW_LEVEL = 0;
/**
 * Implicit context of cells and rows
 */
var NbTreeGridPresentationNode = /** @class */ (function () {
    function NbTreeGridPresentationNode(
    /**
     * Data object associated with row
     */
    data, children, 
    /**
     * Row expand state
     */
    expanded, level) {
        this.data = data;
        this.children = children;
        this.expanded = expanded;
        this.level = level;
    }
    /**
     * True if row has child rows
     */
    NbTreeGridPresentationNode.prototype.hasChildren = function () {
        return !!this.children && !!this.children.length;
    };
    return NbTreeGridPresentationNode;
}());
export { NbTreeGridPresentationNode };
//# sourceMappingURL=tree-grid.model.js.map
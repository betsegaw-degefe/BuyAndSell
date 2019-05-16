var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@angular/core';
import { EMPTY, fromEvent as observableFromEvent, merge as observableMerge, Subject } from 'rxjs';
import { debounceTime, delay, filter, map, repeat, share, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { NB_DOCUMENT } from '../../../theme.options';
export var NbTrigger;
(function (NbTrigger) {
    NbTrigger["NOOP"] = "noop";
    NbTrigger["CLICK"] = "click";
    NbTrigger["HOVER"] = "hover";
    NbTrigger["HINT"] = "hint";
    NbTrigger["FOCUS"] = "focus";
})(NbTrigger || (NbTrigger = {}));
/**
 * TODO maybe we have to use renderer.listen instead of observableFromEvent?
 * Renderer provides capability use it in service worker, ssr and so on.
 * */
var NbTriggerStrategyBase = /** @class */ (function () {
    function NbTriggerStrategyBase(document, host, container) {
        this.document = document;
        this.host = host;
        this.container = container;
        this.destroyed$ = new Subject();
    }
    NbTriggerStrategyBase.prototype.destroy = function () {
        this.destroyed$.next();
    };
    NbTriggerStrategyBase.prototype.isNotOnHostOrContainer = function (event) {
        return !this.isOnHost(event) && !this.isOnContainer(event);
    };
    NbTriggerStrategyBase.prototype.isOnHostOrContainer = function (event) {
        return this.isOnHost(event) || this.isOnContainer(event);
    };
    NbTriggerStrategyBase.prototype.isOnHost = function (_a) {
        var target = _a.target;
        return this.host.contains(target);
    };
    NbTriggerStrategyBase.prototype.isOnContainer = function (_a) {
        var target = _a.target;
        return this.container() && this.container().location.nativeElement.contains(target);
    };
    return NbTriggerStrategyBase;
}());
export { NbTriggerStrategyBase };
/**
 * Creates show and hide event streams.
 * Fires toggle event when the click was performed on the host element.
 * Fires close event when the click was performed on the document but
 * not on the host or container.
 * */
var NbClickTriggerStrategy = /** @class */ (function (_super) {
    __extends(NbClickTriggerStrategy, _super);
    function NbClickTriggerStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // since we should track click for both SHOW and HIDE event we firstly need to track the click and the state
        // of the container and then later on decide should we hide it or show
        // if we track the click & state separately this will case a behavior when the container is getting shown
        // and then hidden right away
        _this.click$ = observableFromEvent(_this.document, 'click')
            .pipe(map(function (event) { return [!_this.container() && _this.isOnHost(event), event]; }), share(), takeUntil(_this.destroyed$));
        _this.show$ = _this.click$
            .pipe(filter(function (_a) {
            var shouldShow = _a[0];
            return shouldShow;
        }), map(function (_a) {
            var event = _a[1];
            return event;
        }), takeUntil(_this.destroyed$));
        _this.hide$ = _this.click$
            .pipe(filter(function (_a) {
            var shouldShow = _a[0], event = _a[1];
            return !shouldShow && !_this.isOnContainer(event);
        }), map(function (_a) {
            var event = _a[1];
            return event;
        }), takeUntil(_this.destroyed$));
        return _this;
    }
    return NbClickTriggerStrategy;
}(NbTriggerStrategyBase));
export { NbClickTriggerStrategy };
/**
 * Creates show and hide event streams.
 * Fires open event when a mouse hovers over the host element and stay over at least 100 milliseconds.
 * Fires close event when the mouse leaves the host element and stops out of the host and popover container.
 * */
var NbHoverTriggerStrategy = /** @class */ (function (_super) {
    __extends(NbHoverTriggerStrategy, _super);
    function NbHoverTriggerStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show$ = observableFromEvent(_this.host, 'mouseenter')
            .pipe(filter(function () { return !_this.container(); }), delay(100), takeUntil(observableMerge(observableFromEvent(_this.host, 'mouseleave'), _this.destroyed$)), repeat());
        _this.hide$ = observableFromEvent(_this.host, 'mouseleave')
            .pipe(switchMap(function () { return observableFromEvent(_this.document, 'mousemove')
            .pipe(debounceTime(100), takeWhile(function () { return !!_this.container(); }), filter(function (event) { return _this.isNotOnHostOrContainer(event); })); }), takeUntil(_this.destroyed$));
        return _this;
    }
    return NbHoverTriggerStrategy;
}(NbTriggerStrategyBase));
export { NbHoverTriggerStrategy };
/**
 * Creates show and hide event streams.
 * Fires open event when a mouse hovers over the host element and stay over at least 100 milliseconds.
 * Fires close event when the mouse leaves the host element.
 * */
var NbHintTriggerStrategy = /** @class */ (function (_super) {
    __extends(NbHintTriggerStrategy, _super);
    function NbHintTriggerStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show$ = observableFromEvent(_this.host, 'mouseenter')
            .pipe(delay(100), takeUntil(observableMerge(observableFromEvent(_this.host, 'mouseleave'), _this.destroyed$)), 
        // this `delay & takeUntil & repeat` operators combination is a synonym for `conditional debounce`
        // meaning that if one event occurs in some time after the initial one we won't react to it
        repeat());
        _this.hide$ = observableFromEvent(_this.host, 'mouseleave')
            .pipe(takeUntil(_this.destroyed$));
        return _this;
    }
    return NbHintTriggerStrategy;
}(NbTriggerStrategyBase));
export { NbHintTriggerStrategy };
/**
 * Creates show and hide event streams.
 * Fires open event when a focus is on the host element and stay over at least 100 milliseconds.
 * Fires close event when the focus leaves the host element.
 * */
var NbFocusTriggerStrategy = /** @class */ (function (_super) {
    __extends(NbFocusTriggerStrategy, _super);
    function NbFocusTriggerStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.focusOut$ = observableFromEvent(_this.host, 'focusout')
            .pipe(switchMap(function () { return observableFromEvent(_this.document, 'focusin')
            .pipe(takeWhile(function () { return !!_this.container(); }), filter(function (event) { return _this.isNotOnHostOrContainer(event); })); }), takeUntil(_this.destroyed$));
        _this.clickIn$ = observableFromEvent(_this.host, 'click')
            .pipe(filter(function () { return !_this.container(); }), takeUntil(_this.destroyed$));
        _this.clickOut$ = observableFromEvent(_this.document, 'click')
            .pipe(filter(function () { return !!_this.container(); }), filter(function (event) { return _this.isNotOnHostOrContainer(event); }), takeUntil(_this.destroyed$));
        _this.tabKeyPress$ = observableFromEvent(_this.document, 'keydown')
            .pipe(filter(function (event) { return event.keyCode === 9; }), filter(function () { return !!_this.container(); }), takeUntil(_this.destroyed$));
        _this.show$ = observableMerge(observableFromEvent(_this.host, 'focusin'), _this.clickIn$)
            .pipe(filter(function () { return !_this.container(); }), debounceTime(100), takeUntil(observableMerge(observableFromEvent(_this.host, 'focusout'), _this.destroyed$)), repeat());
        _this.hide$ = observableMerge(_this.focusOut$, _this.tabKeyPress$, _this.clickOut$)
            .pipe(takeUntil(_this.destroyed$));
        return _this;
    }
    return NbFocusTriggerStrategy;
}(NbTriggerStrategyBase));
export { NbFocusTriggerStrategy };
/**
 * Creates empty show and hide event streams.
 * */
var NbNoopTriggerStrategy = /** @class */ (function (_super) {
    __extends(NbNoopTriggerStrategy, _super);
    function NbNoopTriggerStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show$ = EMPTY;
        _this.hide$ = EMPTY;
        return _this;
    }
    return NbNoopTriggerStrategy;
}(NbTriggerStrategyBase));
export { NbNoopTriggerStrategy };
var NbTriggerStrategyBuilderService = /** @class */ (function () {
    function NbTriggerStrategyBuilderService(_document) {
        this._document = _document;
    }
    NbTriggerStrategyBuilderService.prototype.trigger = function (trigger) {
        this._trigger = trigger;
        return this;
    };
    NbTriggerStrategyBuilderService.prototype.host = function (host) {
        this._host = host;
        return this;
    };
    NbTriggerStrategyBuilderService.prototype.container = function (container) {
        this._container = container;
        return this;
    };
    NbTriggerStrategyBuilderService.prototype.build = function () {
        switch (this._trigger) {
            case NbTrigger.CLICK:
                return new NbClickTriggerStrategy(this._document, this._host, this._container);
            case NbTrigger.HINT:
                return new NbHintTriggerStrategy(this._document, this._host, this._container);
            case NbTrigger.HOVER:
                return new NbHoverTriggerStrategy(this._document, this._host, this._container);
            case NbTrigger.FOCUS:
                return new NbFocusTriggerStrategy(this._document, this._host, this._container);
            case NbTrigger.NOOP:
                return new NbNoopTriggerStrategy(this._document, this._host, this._container);
            default:
                throw new Error('Trigger have to be provided');
        }
    };
    NbTriggerStrategyBuilderService = __decorate([
        Injectable(),
        __param(0, Inject(NB_DOCUMENT)),
        __metadata("design:paramtypes", [Object])
    ], NbTriggerStrategyBuilderService);
    return NbTriggerStrategyBuilderService;
}());
export { NbTriggerStrategyBuilderService };
//# sourceMappingURL=overlay-trigger.js.map
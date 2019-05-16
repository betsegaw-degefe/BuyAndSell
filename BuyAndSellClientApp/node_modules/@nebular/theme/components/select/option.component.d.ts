import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
export declare class NbOptionComponent<T> implements OnDestroy {
    protected parent: any;
    protected elementRef: ElementRef;
    protected cd: ChangeDetectorRef;
    /**
     * Option value that will be fired on selection.
     * */
    value: T;
    setDisabled: boolean;
    /**
     * Fires value when option selection change.
     * */
    selectionChange: EventEmitter<NbOptionComponent<T>>;
    /**
     * Fires when option clicked
     */
    private click$;
    readonly click: Observable<NbOptionComponent<T>>;
    selected: boolean;
    disabled: boolean;
    private alive;
    constructor(parent: any, elementRef: ElementRef, cd: ChangeDetectorRef);
    ngOnDestroy(): void;
    /**
     * Determines should we render checkbox.
     * */
    readonly withCheckbox: boolean;
    readonly content: any;
    readonly multiple: any;
    readonly selectedClass: boolean;
    readonly disabledClass: boolean;
    onClick(): void;
    select(): void;
    deselect(): void;
    private setSelection;
}

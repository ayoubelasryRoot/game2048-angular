/**
 * author: Foromo Daniel Soromou
 */

 import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
 import { SIZE } from '../../@services/game.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

 @Component({
     selector: 'dx-cell-panel',
     templateUrl: './cell-panel.component.html',
     styleUrls: ['./cell-panel.component.scss'],
     changeDetection: ChangeDetectionStrategy.OnPush,
     preserveWhitespaces: false
 })


export class CellPanelComponent implements OnInit, OnDestroy {

    @Input() cells: string[];

    @Input() size: number;

    constructor() {

    }


    public ngOnInit(): void {

    }

    public ngOnDestroy(): void {
        
    }

    public getCellTransformStyle(index: number): string {
        const x = (index % SIZE) * this.size + "px";
        const y = Math.floor(index / SIZE) * this.size + 'px';
        return `translate(${x}, ${y})`;
    }
}
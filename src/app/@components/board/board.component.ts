import {
    Component, 
    OnInit, 
    OnDestroy, 
    AfterContentInit,
    ChangeDetectionStrategy, 
    ElementRef, 
    HostBinding, 
    ViewChild
} from '@angular/core';

import { SIZE, GameService } from '../../@services/game.service';
import {  select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as from2048 from '../../@stores';
import { Tile } from '../../@stores/tile.model';
import { GameStats } from '../../@stores/game-stats.model';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';

@Component({
    selector: 'dx-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false
})

export class BoardComponent implements OnInit, AfterContentInit, OnDestroy {

    public tiles$: Observable<Tile[]>;
    public stats$: Observable<GameStats>;
    public cellSize: number;

    @ViewChild('wrapper') panelWrapperElmRef: ElementRef;

    @HostBinding('class.dx-board')
    get game2048BoardClass(): boolean {
        return true;
    }

    get cells(): string[] {
        return 
    }

    constructor(private gameService: GameService, private store: Store<from2048.State>) {

    }

    public ngOnInit(): void {
        this.tiles$ = this.store.pipe(select(from2048.getTiles));
        this.stats$ = this.store.pipe(select(from2048.getGameStats));

        this.newGame();
    }

    public ngOnDestroy(): void {

    }

    public ngAfterContentInit(): void {
        this.cellSize = (this.panelWrapperElmRef.nativeElement.offsetWidth - 24) / SIZE;
    }

    public handleKeydownOnWrapper(event: KeyboardEvent): void {
        const keycode = event.keyCode;

        switch(keycode) {
            case LEFT_ARROW:
            case UP_ARROW:
            case RIGHT_ARROW:
            case DOWN_ARROW:
                this.gameService.move(keycode);
                event.preventDefault();
                return;
            default:
                return;
        }
    }

    public newGame(): void {
        this.gameService.newGame();
    }
}
import { _decorator, EventTouch, game, Label, Node, Vec2 } from 'cc';
import { ENUM_GAME_EVENT} from '../Enum';
import { GameManager } from '../Manager/GameManager';
import LayerBase from '../Manager/LayerBase';
import { PlayerControl } from '../Player/PlayerControl';
const { ccclass, property, menu } = _decorator;


@ccclass('GamePanel')
@menu('Panel/GamePanel')
export class GamePanel extends LayerBase {
    @property(Label)
    scoreText: Label = null;

    @property(PlayerControl)
    playerController: PlayerControl = null;

    private _touchStartPos = new Vec2();
    private _swipeMinLength : number = 120;

    protected onLoad(): void {
        this.node.on(Node.EventType.TOUCH_START,this.onTouchStart,this);
        this.node.on(Node.EventType.TOUCH_END,this.onTouchEnd,this);
    }

    private onTouchStart(e : EventTouch){
        this._touchStartPos = e.getLocation();
        this.playerController.playerFast();
    }

    private onTouchEnd(e : EventTouch){
        if(!this._touchStartPos) return;
        const start = this._touchStartPos;
        const end = e.getLocation();
        this._touchStartPos = null;
        
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const length = Math.sqrt((dx * dx) + (dy * dy));
        const verticalSwipe = Math.abs(dy) > Math.abs(dx);

        if (length < this._swipeMinLength || verticalSwipe) return;
        
        if (dx > 0) {
            this.playerController.onRightSwipe();
        }
        else if (dx < 0) {
            this.playerController.onLeftSwipe();
        }
    }

    setScore(){
        this.scoreText.string = `${GameManager.instance.playerDataManager.getScore()}`
    }

    protected onDestroy(): void {
        this.node.off(Node.EventType.TOUCH_START,this.onTouchStart,this);
    }

}



import { _decorator, Animation, Component, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Tutorial')
export class Tutorial extends Component {
    @property(Animation)
    pointer: Animation = null;

    public swipeLeftDone: boolean = false;
    public swipeRightDone: boolean = false;
    public doubleClickDone : boolean = false;

    public shouldEnableSwipeLeft: boolean = true;
    public shouldEnableSwipeRight: boolean = true;
    public shouldEnableDoubleClick : boolean = true;

    public playSwipeLeft(){
        this.shouldEnableSwipeLeft = false;
        this.pointer.node.active = true;
        this.pointer.play("Tutorial_left")
    }


    public playSwipeRight(){
        this.shouldEnableSwipeRight = false;
        this.pointer.node.active = true;
        this.pointer.play("Tutorial_right")
    }

    public playSpeedUp(){
        this.shouldEnableDoubleClick = false;
        this.pointer.node.active = true;
        this.pointer.play("speedup")
    }

    public hide(){
        this.pointer.node.active = false;
        this.pointer.node.setPosition(0,0,0);
    }


    protected update(dt: number): void {
        
        if(!this.swipeLeftDone && this.shouldEnableSwipeLeft && this.node.getWorldPosition().y > 500 && this.node.getWorldPosition().y < 1000){
            this.playSwipeLeft();
        }
        if(!this.swipeRightDone && this.shouldEnableSwipeRight && this.node.getWorldPosition().y > 1500 && this.node.getWorldPosition().y < 2000){
            this.playSwipeRight();
        }
        if(!this.doubleClickDone && this.shouldEnableDoubleClick && this.node.getWorldPosition().y > 2000 && this.node.getWorldPosition().y < 2010){
            this.playSpeedUp();
        }
    }

}



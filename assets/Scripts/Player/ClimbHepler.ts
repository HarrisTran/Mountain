import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum MOVE_STATE {
    STAY,
    MOVE,
}

@ccclass('ClimbHepler')
export class ClimbHepler extends Component {
    public moveState : MOVE_STATE ;

    public stay () {
        this.moveState = MOVE_STATE.STAY
    }

    public move() {
        this.moveState = MOVE_STATE.MOVE
    }
}



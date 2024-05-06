import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum MOVE_STATE {
    STAY,
    MOVE,
}

@ccclass('test')
export class test extends Component {
    public moveState : MOVE_STATE ;

    public stay () {
        this.moveState = MOVE_STATE.STAY
    }

    public move() {
        this.moveState = MOVE_STATE.MOVE
    }
}



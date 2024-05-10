import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(Node)
    target : Node = null;

    protected update(dt: number): void {
        let targetPos = this.target.getPosition();
        let currentPos = this.node.getPosition();
        this.node.setPosition(0,currentPos.y + (targetPos.y+500 - currentPos.y)*dt)
    }
}



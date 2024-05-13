import { Vec3 } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { PlayerControl } from './Player/PlayerControl';
import { ENUM_PLAYER_STATUS } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(Node)
    target : Node = null;

    protected update(dt: number): void {
        if(this.target.getComponent(PlayerControl).status == ENUM_PLAYER_STATUS.CLIMB){
            let targetPos = this.target.getPosition();
            let currentPos = this.node.getPosition();
            this.node.setPosition(0,currentPos.y + (targetPos.y - currentPos.y)*dt)
        }
        
    }
}



import { Contact2DType } from 'cc';
import { IPhysics2DContact } from 'cc';
import { Collider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_COLLIDER_TAG, MAIN_GAMESTATE } from '../../Enum';
import { GameManager } from '../../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Trap')
export class Trap extends Component {
    protected onLoad(): void {
        this.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
    }

    onBeginContact(self: Collider2D, other: Collider2D,contact: IPhysics2DContact)
    {
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER){
            GameManager.instance.setState(MAIN_GAMESTATE.GAME_OVER);
        }
    }
}



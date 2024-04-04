import { Contact2DType } from 'cc';
import { IPhysics2DContact } from 'cc';
import { Collider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_COLLIDER_TAG } from '../Enum';
import { CCInteger } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Component {
    @property(CCInteger)
    private coinValue: number = 0;

    public get value(){
        return this.coinValue;
    }

    protected onLoad(): void {
        this.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
    }

    onBeginContact(self: Collider2D, other: Collider2D, contact : IPhysics2DContact){
        if(other.tag === ENUM_COLLIDER_TAG.PLAYER)
        {
            this.node.active = false;
            GameManager.instance.playerDataManager.addScore(this.value);
            GameManager.instance.uiManager.setGameScore();
        }
    }
}



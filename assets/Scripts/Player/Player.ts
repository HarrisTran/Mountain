import { BoxCollider2D } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { ENUM_COLLIDER_TAG } from '../Enum';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    protected onCollisionEnter (other: BoxCollider2D, self: BoxCollider2D) {
        let data = GameManager.instance.playerDataManager
        switch (other.tag) {
            case ENUM_COLLIDER_TAG.B1:
                data.addScore(data.triggedX2Booster ? 5 : 10)
                break;
            case ENUM_COLLIDER_TAG.B2:
                data.addScore(data.triggedX2Booster ? 50 : 100)
                break;
            case ENUM_COLLIDER_TAG.B3:
                data.activeX2Booster(true)
                break;
            case ENUM_COLLIDER_TAG.B4:

                break;
            case ENUM_COLLIDER_TAG.B5:

                break;
            case ENUM_COLLIDER_TAG.B6:

                break;
            default:
                break;
        }
    }
}



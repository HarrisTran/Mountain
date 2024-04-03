import { _decorator } from 'cc';
import { Booster } from './Booster';
import { BoxCollider2D } from 'cc';
import { GameManager } from '../../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('B3')
export class B3 extends Booster {

    protected update(dt: number): void {
        super.update(dt);
        GameManager.instance.playerDataManager.activeX2Booster(this.active)
    }

    protected onCollisionEnter (other: BoxCollider2D, self: BoxCollider2D) {
        super.onCollisionEnter(other, self);
    }
}



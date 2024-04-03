import { _decorator, Component, Node } from 'cc';
import { Booster } from './Booster';
import { BoxCollider2D } from 'cc';
import { GameManager } from '../../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('B6')
export class B6 extends Booster {
    protected update(dt: number): void {
        super.update(dt);
        GameManager.instance.playerDataManager.activeSpeedBooster(this.active)
    }

    protected onCollisionEnter (other: BoxCollider2D, self: BoxCollider2D) {
        super.onCollisionEnter(other, self);
    }
}



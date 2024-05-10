import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import LayerBase from '../Manager/LayerBase';
const { ccclass, property, menu } = _decorator;

@ccclass('GameOverPanel')
@menu('Panel/GameOverPanel')
export class GameOverPanel extends LayerBase {
    @property(Node)
    notification : Node = null;

    @property(Node)
    content: Node = null;


    shows(): void {
        this.content.setScale(0,0);
        tween(this.content)
        .delay(1)
        .to(0.5,{scale: new Vec3(1,1,1)},{easing: "sineInOut"})
        .start();
    }
    
}



import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
import LayerBase from '../Manager/LayerBase';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('Game')
export class Game extends LayerBase {
    @property(Label)
    scoreText: Label = null;

    setScore(){
        this.scoreText.string = `${GameManager.instance.playerDataManager.getScore()}`
    }
}



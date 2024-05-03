import { _decorator, Component, Node, Sprite } from 'cc';
import LayerBase from '../Manager/LayerBase';
const { ccclass, property, menu } = _decorator;

@ccclass('LoadingPanel')
@menu('Panel/LoadingPanel')
export class LoadingPanel extends LayerBase {
   @property(Sprite)
   loadingBar: Sprite = null;

   public setLoadingProgress(progress: number) {
    this.loadingBar.fillRange = progress;
   }
}



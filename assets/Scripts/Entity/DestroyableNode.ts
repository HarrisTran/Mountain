import { isValid, Pool } from 'cc';
import { _decorator, Component, Node } from 'cc';
import PoolManager from '../Manager/PoolManager';
const { ccclass, property } = _decorator;

@ccclass('DestroyableNode')
export class DestroyableNode extends Component {
    private _isDestroyable = false;

    public set isDestroyable(value: boolean){
        this._isDestroyable = true;
    }

    protected lateUpdate(dt: number): void {
        if(this._isDestroyable){
            PoolManager.instance.putNode(this.node,false);
        }
    }
}



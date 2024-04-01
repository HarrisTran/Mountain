import { _decorator, Component, Node } from 'cc';
import PoolManager from './Manager/PoolManager';
import { Vec2 } from 'cc';
import { Vec3 } from 'cc';
const { ccclass, property } = _decorator;

export interface IFragment {
    id: number ;
    line1: string[];
    line2: string[];
    line3: string[];
}

@ccclass('Fragment')
export class Fragment extends Component {
    @property(Node) ladder1: Node = null;
    @property(Node) ladder2 : Node = null;
    @property(Node) ladder3: Node = null;

    id: number ;
    line1: string[];
    line2: string[];
    line3: string[];

    init(data: IFragment){
        Object.assign(this,data)
    }

    rendor(){
        for(let i = 0; i< this.line1.length;i++){
            if(this.line1[i] !== ""){
                PoolManager.instance.getNode(this.line1[i],this.ladder1,new Vec3(0,165*(i-4)))
            }
        }
        for(let i = 0; i< this.line2.length; i++){
            if(this.line2[i] !== ""){
                PoolManager.instance.getNode(this.line2[i],this.ladder2,new Vec3(0,165*(i-4)))
            }
        }
        for(let i = 0; i< this.line3.length; i++){
            if(this.line3[i] !== ""){
                PoolManager.instance.getNode(this.line3[i],this.ladder3,new Vec3(0,165*(i-4)))
            }
        }
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}



import { _decorator, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Node, RigidBody2D, v2, Vec3 } from 'cc';
import { ENUM_COLLIDER_TAG } from './Enum';
import { GameManager } from './Manager/GameManager';
import PoolManager from './Manager/PoolManager';
import { delay } from './Utils';
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

    protected onLoad(): void {
        this.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
    }

    init(data: IFragment){
        Object.assign(this,data)
    }

    rendor(){
        for(let i = 0; i< this.line1.length;i++){
            if(this.line1[i] !== ""){
                PoolManager.instance.getNode(this.line1[i],this.ladder1,new Vec3(0,165*(4-i)))
            }
        }
        for(let i = 0; i< this.line2.length; i++){
            if(this.line2[i] !== ""){
                PoolManager.instance.getNode(this.line2[i],this.ladder2,new Vec3(0,165*(4-i)))
            }
        }
        for(let i = 0; i< this.line3.length; i++){
            if(this.line3[i] !== ""){
                PoolManager.instance.getNode(this.line3[i],this.ladder3,new Vec3(0,165*(4-i)))
            }
        }
    }

    onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact){
        if(other.tag == ENUM_COLLIDER_TAG.PLAYER){
            GameManager.instance.playerDataManager.currentFragmentIndex = this.id;
        }
    }

    public async magicPocketEffect() {
        
        let list1Pos : Vec3[] = [];
        let list1Node : Node[] = [];
        this.ladder1.children.forEach(node=>{
            if(node.name === "O1" || node.name === "O2" || node.name === "O3" || node.name === "O4"){
                list1Pos.push(node.getPosition());
                list1Node.push(node)
            }
        })

        let list2Pos : Vec3[] = [];
        let list2Node : Node[] = [];
        this.ladder2.children.forEach(node=>{
            if(node.name === "O1" || node.name === "O2" || node.name === "O3" || node.name === "O4"){
                list2Pos.push(node.getPosition());
                list2Node.push(node)
            }
        })

        let list3Pos : Vec3[] = [];
        let list3Node : Node[] = [];
        this.ladder3.children.forEach(node=>{
            if(node.name === "O1" || node.name === "O2" || node.name === "O3" || node.name === "O4"){
                list3Pos.push(node.getPosition());
                list3Node.push(node)
            }
        })

        list1Pos.forEach(v => {
            let node = PoolManager.instance.getPrefab("B1");
            setTimeout(() => {
                let i = instantiate(node);
                i.parent = this.ladder1;
                i.setPosition(v.clone());
            }, 10);
        })


        list2Pos.forEach(v => {
            let node = PoolManager.instance.getPrefab("B1");
            setTimeout(() => {
                let i = instantiate(node);
                i.parent = this.ladder2;
                i.setPosition(v.clone());
            }, 10);
        })


        list3Pos.forEach(v => {
            let node = PoolManager.instance.getPrefab("B1");
            setTimeout(() => {
                let i = instantiate(node);
                i.parent = this.ladder3;
                i.setPosition(v.clone());
            }, 10);
        })

        list1Node.map(n=>{
            setTimeout(() => {
                n.destroy();
            }, 10);
        });
        list2Node.map(n=>{
            setTimeout(() => {
                n.destroy();
            }, 10);
        });
        list3Node.map(n=>{
            setTimeout(() => {
                n.destroy();
            }, 10);
        });
        
    }

    
}



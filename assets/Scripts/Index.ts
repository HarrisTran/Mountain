import { resources } from "cc";
import { Component } from "cc";
import { _decorator } from "cc";
import ResourceManager from "./Manager/ResourceManager";
import { Collider } from "cc";
import { PhysicsSystem2D } from "cc";
import { EPhysics2DDrawFlags } from "cc";

const {ccclass, property} = _decorator;

@ccclass
export default class Index extends Component {

    protected onLoad() {
        PhysicsSystem2D.instance.enable = true;
        resources.preloadDir("/", (current: number, total: number)=>{

        }, async ()=>{
            await ResourceManager.instance.loadResource();
        })
    }
}

import { _decorator, Component, PhysicsSystem2D, resources } from "cc";
import ResourceManager from "./Manager/ResourceManager";

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

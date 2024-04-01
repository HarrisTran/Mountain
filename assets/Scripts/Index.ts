import { resources } from "cc";
import { Component } from "cc";
import { _decorator } from "cc";
import ResourceManager from "./Manager/ResourceManager";

const {ccclass, property} = _decorator;

@ccclass
export default class Index extends Component {

    protected onLoad() {
        resources.preloadDir("/", (current: number, total: number)=>{

        }, async ()=>{
            await ResourceManager.instance.loadRes("Prefab")
        })
    }
}

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LayerBase')
export default class LayerBase extends Component {

    show() {
        this.node.active = true;
    }
 
    hide() {
        this.node.active = false
    }
}



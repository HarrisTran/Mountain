import { _decorator, Component, Node } from 'cc';
import EventManager from '../Manager/EventManager';
import { ENUM_GAME_EVENT } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {

    onClickStart()
    {
        EventManager.instance.emit(ENUM_GAME_EVENT.GAME_START);
        this.node.active = false;
    }
}



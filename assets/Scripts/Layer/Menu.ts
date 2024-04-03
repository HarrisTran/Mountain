import { _decorator} from 'cc';
import LayerBase from '../Manager/LayerBase';
import EventManager from '../Manager/EventManager';
import { ENUM_GAME_EVENT } from '../Enum';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends LayerBase {
    onClickStartButton()
    {
        EventManager.instance.emit(ENUM_GAME_EVENT.GAME_START);
    }
}



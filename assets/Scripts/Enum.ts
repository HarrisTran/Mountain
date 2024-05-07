export enum MAIN_GAMESTATE {
    LOADING,
    MENU,
    START,
    GAME_OVER,
}

export enum ENUM_GAME_STATUS {

}

export enum ENUM_O3_STATUS {
    IDLE,
    FLY
}

export enum ENUM_PLAYER_STATUS {
    CLIMB,
    FALL,
    JUMP,
}


export enum ENUM_COLLIDER_TAG {
    PLAYER = 0,
    B1 = 1, B2, B3, B4, B5, B6, B7,
    O1, O2, O3, O4,
    T1, T2, T3, T4, T5,
    B5_View, T3_View, T4_View, T5_view, O2_View, O3_View,
    Magnet, NextFragment
}

export enum GamePopupCode {
    POPUP_RETRY,
    POPUP_END,
}

export enum ENUM_GAME_EVENT {
    GAME_START = 'GAME_START',
    RIGHT_SWIPE = 'RIGHT_SWIPE',
    LEFT_SWIPE = 'LEFT_SWIPE',
    PLAYER_FALL = 'PLAYER_FALL',
    PLAYER_FAST = 'PLAYER_FAST',
    GAME_OVER = 'GAME_OVER',
    MAGIC_POCKET_EFFECT = 'MAGIC_POCKET_EFFECT'
}

export enum ENUM_RESOURCE_TYPE {
    JSON = 'Json',
    AUDIO = 'Audio',
    PREFAB = 'Prefab',
    SPRITE = 'Sprite'
}


export enum ENUM_UI_TYPE {
    GAME_LAYER,
    MENU_LAYER
}

export enum ENUM_AUDIO_CLIP {
    BGM
    
}

export const Speed = 33000;

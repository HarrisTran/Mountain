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
    IDLE,
    CLIMB,
    FALL,
    JUMP,
    DEAD,
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
    NEW_FRAGMENT = 'NEW_FRAGMENT',
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

export enum ENUM_ADUDIO_CLIP {
    ACTIVE_LANDSLIDE = 'active_landslide',
    ACTIVE_LIGHTNING = 'active_lightning',
    ACTIVE_SNOWBALL = 'active_snowball',
    ACTIVE_STALACTILE = 'active_stalactile',
    ALERT = 'alert',
    BGM = 'BGM',
    BUTTON_PLAY = 'button_play',
    COIN = 'coin',
    CREATURE_BIRDBAT = 'creature_birdbat',
    CREATURE_MONSTER = 'creature_monster',
    IMPACT_HARD = 'impact_hard',
    IMPACT_SOFT = 'impact_soft',
    ITEM_HELMET = 'item_helmet',
    ITEM_MAGNET = 'item_magnet',
    ITEM_SPEED = 'item_speed',
    ITEM_SWAP = 'item_swap',
    ITEM_x2 = 'item_x2',
    PLAYER_JUMP_01 = 'player_jump_01',
    PLAYER_JUMP_02 = 'player_jump_02',
    PLAYER_SLIP = 'player_slip',
    START = 'start',
}


export const Speed = 20000;

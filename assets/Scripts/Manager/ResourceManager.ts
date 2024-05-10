import { Prefab } from 'cc';
import PoolManager from './PoolManager';
import { resources } from 'cc';
import { ENUM_RESOURCE_TYPE } from '../Enum';
import { IFragment } from '../Fragment';
import { JsonAsset } from 'cc';
import { IManager } from './IManager';

export default class ResourceManager implements IManager {
    

    private static _instance: any = null

    private static readonly FRAGMENT_JSON_PATH: string = "Jsons/Blocks";
    private static readonly LEVEL_JSON_PATH: string = "Jsons/Levels";
    private static readonly PREFAB_PATH: string = "Prefab";

    private _loadedPrefabProgress: number;
    private _loadedFragmentProgress: number;
    private _loadedLevelProgress: number;


    private _prefabLoadDone: boolean;
    private _fragmentLoadDone: boolean;
    private _levelLoadDone: boolean;


    private _fragmentsData: Map<string, IFragment>;
    private _levelsData : any[];


    static getInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this()
        }

        return this._instance
    }

    static get instance() {
        return this.getInstance<ResourceManager>()
    }

    initialize() {
        this.loadResource();
    }

    progress(): number {
        let arr: number[] = [
            this._loadedPrefabProgress,
            this._loadedFragmentProgress,
            this._loadedLevelProgress,
        ];
        return arr.reduce((t, curr) => t + curr, 0) / arr.length;
    }

    initializationCompleted(): boolean {
        let arr: boolean[] = [
            this._prefabLoadDone,
            this._fragmentLoadDone,
            this._levelLoadDone
        ];
        return arr.every(x => x);
    }


    public loadResource() {

        this._loadedPrefabProgress = 0;
        this._prefabLoadDone = false;
        resources.loadDir(ResourceManager.PREFAB_PATH, Prefab,
            (finish, total, item) => {
                this._loadedPrefabProgress = finish / total;
            }
            ,
            (err, assets) => {
                if (err) console.error(err);
                let asset: any
                for (let i = 0; i < assets.length; i++) {
                    asset = assets[i];
                    PoolManager.instance.setPrefab(asset.data.name, asset)
                }
                this._loadedPrefabProgress = 1;
                this._prefabLoadDone = true;
            })


        this._loadedFragmentProgress = 0;
        this._fragmentLoadDone = false;
        resources.loadDir(ResourceManager.FRAGMENT_JSON_PATH, JsonAsset,
            (finish, total, item) => {
                this._loadedFragmentProgress = finish / total;
            },
            (err, assets) => {
                if (err) console.error(err);
                this._fragmentsData = new Map<string, IFragment>();
                for (let asset of assets) {
                    let data = asset.json;
                    this._fragmentsData.set(data.id, {
                        line1: data.line1,
                        line2: data.line2,
                        line3: data.line3
                    })
                }
                this._loadedFragmentProgress = 1;
                this._fragmentLoadDone = true;
            }
        );


        this._loadedLevelProgress = 0;
        this._levelLoadDone = false;
        resources.loadDir(ResourceManager.LEVEL_JSON_PATH, JsonAsset,
            (finish, total, item) => {
                this._loadedLevelProgress = finish / total;
            },
            (err, assets) => {
                if (err) console.error(err);
                else {
                    this._levelsData = []
                    for (let asset of assets) {
                        this._levelsData.push(asset.json.data)
                    }
                }
                this._loadedLevelProgress = 1;
                this._levelLoadDone = true;
            }
        );
    }

    public getFragmentData() {
        return this._fragmentsData;
    }

    public getLevelData() {
        return this._levelsData.reduce((acc,value)=>acc.concat(value),[]);
    }
}

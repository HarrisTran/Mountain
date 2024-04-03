import { Prefab } from 'cc';
import PoolManager from './PoolManager';
import { resources } from 'cc';
import { ENUM_RESOURCE_TYPE } from '../Enum';
import { IFragment } from '../Fragment';
import { JsonAsset } from 'cc';

export default class ResourceManager {

    private static _instance: any = null

    private static readonly FRAGMENT_JSON_PATH : string = "Jsons/Blocks";
    private static readonly FRAGMENT_PREFAB_PATH : string = "Prefab";


    private _fragmentsData : Map<string,IFragment>;


    static getInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this()
        }

        return this._instance
    }

    static get instance() {
        return this.getInstance<ResourceManager>()
    }


    public async loadResource(){
        //load prefab
        const loadPrefab = new Promise<void>((resolve,reject)=>{
            resources.loadDir(ResourceManager.FRAGMENT_PREFAB_PATH, Prefab, (err, assets)=>{
                if(err) reject && reject()
                let asset: any
                for (let i = 0; i < assets.length; i++) {
                    asset = assets[i];
                    PoolManager.instance.setPrefab(asset.data.name, asset)
                }
                resolve && resolve()
            })
        })

        //load json fragments
        const loadJsonFragment = new Promise<void>((resolve,reject)=>{
            resources.loadDir(ResourceManager.FRAGMENT_JSON_PATH, JsonAsset,
                (err, assets) => {
                    if(err) reject && reject()
                    else {
                        this._fragmentsData = new Map<string, IFragment>();
                        for (let asset of assets) {
                            let data = asset.json;
                            this._fragmentsData.set(data.id, {
                                id: data.id,
                                line1: data.line1,
                                line2: data.line2,
                                line3: data.line3
                            })
                        }
                    }
                    resolve && resolve()
                }
            );
        })
        Promise.all([loadPrefab,loadJsonFragment])
    }

    public getFragmentData()
    {
        return this._fragmentsData;
    }
}

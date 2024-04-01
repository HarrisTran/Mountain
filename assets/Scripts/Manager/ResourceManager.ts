import { Prefab } from 'cc';
import PoolManager from './PoolManager';
import { resources } from 'cc';
import { ENUM_RESOURCE_TYPE } from '../Enum';
import { IFragment } from '../Fragment';
import { JsonAsset } from 'cc';

export default class ResourceManager {

    private static _instance: any = null

    private static readonly FRAGMENT_JSON_PATH : string = "Jsons/Blocks";


    private _fragmentsData : Map<string,IFragment>;


    private _jsonFragmentDataProgress : number = 0;
    private _jsonFragmentDataDone : boolean = false;


    static getInstance<T>(): T {
        if (this._instance === null) {
            this._instance = new this()
        }

        return this._instance
    }

    static get instance() {
        return this.getInstance<ResourceManager>()
    }

    public initialize(){


    }

    public

    private startLoadJsons(){

    }

    public async loadRes(type: string){
        return new Promise<void>((resolve, reject)=>{
            let resourceType = null
            switch(type){
                case ENUM_RESOURCE_TYPE.PREFAB:
                    resourceType = Prefab
                    break;
                case ENUM_RESOURCE_TYPE.JSON:
                    resourceType = JsonAsset
                    break;
            }
            resources.loadDir(type, resourceType, (err, assets)=>{
                if(err) reject && reject()
                let asset: any
                
                if(type == ENUM_RESOURCE_TYPE.PREFAB){
                    for (let i = 0; i < assets.length; i++) {
                        asset = assets[i];
                        PoolManager.instance.setPrefab(asset.data.name, asset)
                    }
                }
                if(type == ENUM_RESOURCE_TYPE.JSON){
                    for (let i = 0; i < assets.length; i++) {
                        asset = assets[i];
                        console.log(asset);
                        
                    }
                }
                
                resolve && resolve()
            })
            
        })
    }
}

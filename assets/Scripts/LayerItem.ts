import { _decorator, CCInteger, Component, Node, v3, Vec3 } from 'cc';
import { ItemElement } from './ItemElement';
import { BoxElement } from './BoxElement';
const { ccclass, property } = _decorator;

@ccclass('LayerItem')
export class LayerItem extends Component {

    @property([Node])lstItemPos:Node[];
    @property({visible: true, type:ItemElement})
    lstItemContainer:ItemElement[]=[];
    
    box:BoxElement;
    start() {

    }
    InitLayer(box:BoxElement){
        this.box = box;
        for (let i = 0; i < this.lstItemContainer.length; i++) {
            if  ( this.lstItemContainer[i]!=null ) {
                this.lstItemContainer[i].InitItem(this,box);
            }
        }
    }
    public addItem(item:ItemElement ){
        let index = -1;
        let neardistance = Infinity;
        for (let i = 0; i < this.lstItemContainer.length; i++) {
            if (this.lstItemContainer[i]==null){
                let distance = Vec3.distance(item.node.getWorldPosition(),this.lstItemPos[i].getWorldPosition());
                if(distance<neardistance){
                    neardistance = distance;
                    index = i;
                }
            }
        }
        if(index>=0 && index<this.lstItemPos.length){
            item.MoveToPosTarget(this.lstItemPos[index]);
            this.lstItemContainer[index] = item;
            item.node.setParent(this.lstItemPos[index]);
            item.currentLayer = this;
        }
       this.CheckMatchInLayer();
    }

    CheckMatchInLayer(){
        if(this.CheckMatch()){
            this.MatchListItem();
        }
    }
    CheckMatch():boolean{

        let id : Number = -1;
        for (let i = 0; i <this.lstItemContainer.length;i++){
            if (this.lstItemContainer[i]!=null){
                if (id !=-1){
                    if (id!=this.lstItemContainer[i].id)return false;
                }
                else{
                    id =this.lstItemContainer[i].id;
                }
            }
            else{
                return false;
            }
        }
        return true;
    }
    MatchListItem(){
        for (let i = 0; i < this.lstItemContainer.length;i++){
            this.lstItemContainer[i].MatchTween();
            this.lstItemContainer[i] = null;
        }
    }

    IsLayerContainEmpty():boolean
    {
        for (let i = 0; i < this.lstItemContainer.length; i++) {
            if(this.lstItemContainer[i]==null){
                return true;
            } 
        }
        return false;
    }
     IsLayerEmpty(){
        for (let i = 0; i < this.lstItemContainer.length;i++){
            if(this.lstItemContainer[i]!=null)return false;
        }
        return true;
    }
    RemoveItem(item:ItemElement ){
        for (let i = 0; i < this.lstItemContainer.length;i++)
        {
            if (this.lstItemContainer[i] != null && item.instanceId == this.lstItemContainer[i].instanceId)
            {
                this.lstItemContainer[i] = null;
            }
        }
    }
}



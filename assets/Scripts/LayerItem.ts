import { _decorator, CCInteger, Component, Node, v3, Vec3 } from 'cc';
import { ItemElement } from './ItemElement';
const { ccclass, property } = _decorator;

@ccclass('LayerItem')

export class LayerItem extends Component {

    @property([Node])lstItemPos:Node[]=[];
    @property([ItemElement])lstItemContainer:ItemElement[]=[];

    start() {

    }

    update(deltaTime: number) {
        
    }
    public addItem(item:ItemElement ){
        let index = -1;
        let neardistance = Infinity;
        for (let i = 0; i < this.lstItemContainer.length; i++) {
            if (this.lstItemPos[i]==null){
                let distance = Vec3.distance(item.node.getPosition(),this.lstItemPos[i].getPosition());
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
    }
}



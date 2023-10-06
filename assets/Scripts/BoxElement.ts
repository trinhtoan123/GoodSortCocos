import { _decorator, CCInteger, Component, Node } from 'cc';
import { LayerItem } from './LayerItem';
import { ItemElement } from './ItemElement';
const { ccclass, property } = _decorator;

@ccclass('BoxElement')
export class BoxElement extends Component {

    @property(CCInteger)idBox:Number;
    @property(LayerItem)
    layerFirst:LayerItem;
    @property(LayerItem)
    layerSecon:LayerItem;


    
    start() {
        this.layerFirst.InitLayer(this);
    }

    public AddItem(item:ItemElement)
    {
        if (this.layerFirst.IsLayerContainEmpty()) // o ddaay trong
        {
            item.UpdateCurrentBox(this);
            this.layerFirst.addItem(item);
        }
        else
        {
            item.MoveToPosOrigin();
        }
    }
    RemoveItem(item:ItemElement ){
        this.layerFirst.RemoveItem(item);
    }
}



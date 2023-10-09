import { _decorator, CCInteger, Component, Node, tween, Vec3 } from 'cc';
import { LayerItem } from './LayerItem';
import { ItemElement } from './ItemElement';
import { LevelUnit } from './LevelUnit';
const { ccclass, property } = _decorator;

@ccclass('BoxElement')
export class BoxElement extends Component {

    @property(CCInteger) idBox: Number;
    @property(LayerItem)
    layerFirst: LayerItem;
    @property(LayerItem)
    layerSecond: LayerItem;

    @property(LayerItem)
    layerTarget: LayerItem;

    isCheclayer: boolean = true;



    startGame() {

        this.layerFirst.InitLayer(this);
        this.layerSecond.InitLayer(this);
        this.layerSecond.SetMaterialOff();
        this.layerFirst.SetMaterialOn();

        this.Init(this.layerFirst);



    }
    Init(layer: LayerItem) {
        this.layerTarget = layer
        this.layerTarget.SetMaterialOn();
    }

    public AddItem(item: ItemElement) {
        if (this.layerTarget.IsLayerContainEmpty()) // ô trống ở box mới có trống hay ko
        {

            item.UpdateCurrentBox(this, this.layerTarget);
            this.layerTarget.addItem(item);
        }
        else {
            item.MoveToPosOrigin();
        }
    }
    RemoveItem(item: ItemElement) {

        this.layerTarget.RemoveItem(item);
    }

    CheckLayer(layer: LayerItem) {
        for (var i = 0; i < layer.lstItemContainer.length; i++) {
            if (layer.lstItemContainer[i] != null) {
                console.log(layer.lstItemContainer[i].name);
                return;
            }
        }
        this.UpdateLayer();
    }

    UpdateLayer() {
        this.Init(this.layerSecond);
        tween(this.layerTarget.node.position).to(0.3, new Vec3(0, 0, 0.6),
            {
                onUpdate: (target: Vec3, radius: number) => {
                    this.layerTarget.node.position = target;
                },
            }).start();
    }
    CheckWin() {
        if (this.layerTarget != null) {
            for (var i = 0; i < this.layerTarget.lstItemContainer.length; i++) {
                if (this.layerTarget.lstItemContainer[i] != null) {
                    return false;
                }
            }
            return true;

        }
    }

}



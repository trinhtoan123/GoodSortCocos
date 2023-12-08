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

    @property(Node)
    modelBox:Node

    @property(LayerItem)
    layerTarget: LayerItem;

    isCheclayer: boolean = true;

    @property(Node)
    posParent:Node;

    @property(Node)
    boxChild:Node; 
    
    @property(Node)
    boxParent:Node;  


    protected start(): void {
        this.layerFirst.InitLayer(this);
        this.layerSecond.InitLayer(this);
        this.layerSecond.SetMaterialOff();
        this.layerFirst.SetMaterialOn();
        this.Init(this.layerFirst);
    }
    startGame() {

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
    DropBox(){
        if(this.boxChild==null){
            this.node.active = false;
        }
        else{
            this.modelBox.active = false;
            tween(this.boxChild.position).to(0.3,Vec3.ZERO,
                {
                    easing:  "elasticOut",

                    onUpdate: (target: Vec3, radius: number) => {
                        this.boxChild.position = target;
                    },
                    onComplete:() =>{
                        this.boxChild.setParent(this.posParent);
                        this.boxChild.position = Vec3.ZERO;
                        this.node.active = false;
                        if(this.boxChild!=null){
                            this.boxChild.getComponent(BoxElement).posParent = this.posParent;
                            this.boxChild.getComponent(BoxElement).boxParent=this.boxParent;

                        }
                        if(this.boxParent!=null){
                            this.boxParent.getComponent(BoxElement).boxChild=this.boxChild;
                        }
                    },
                }).start();

        }
       
    }

}



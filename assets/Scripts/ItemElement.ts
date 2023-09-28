import { _decorator, BoxCollider, CCFloat, Component, director, geometry, math, Node, PhysicsRayResult, PhysicsSystem, tween, v3, Vec3 } from 'cc';
import { BoxElement } from './BoxElement';
import { LayerItem } from './LayerItem';
const { ccclass, property } = _decorator;

@ccclass('ItemElement')
export class ItemElement extends Component {
    isSelectItem: boolean;
    posOriginIem: Vec3;
    @property(CCFloat) tweenDuration: number;
    isSelected:boolean;
    public currentLayer:LayerItem;
    


    protected start(): void {
        console.log(this.node.getPosition())
    }

    protected update(deltaTime: number): void {

        this.CheckSelectedBox();
    }

    StartGame() {
        // this.posOriginIem = this.node.getPosition();
    }
    CheckSelectedBox() {
        if(!this.isSelected) 
            return;
        const startPoint :Vec3 = new Vec3(this.node.getWorldPosition().x, this.node.getWorldPosition().y, this.node.getWorldPosition().z);
        const target:Vec3 = new Vec3(startPoint.x, startPoint.y, startPoint.z - 10);

        const outRay = geometry.Ray.create(this.node.getWorldPosition().x, this.node.getWorldPosition().y, this.node.getWorldPosition().z
            , target.x, target.y, target.z );
        if (PhysicsSystem.instance.raycastClosest(outRay)) {
            var raycastResult = PhysicsSystem.instance.raycastClosestResult;
            let item = raycastResult;
            if (item.collider.node.getComponent(BoxCollider) != null && item.collider.node.getComponent(BoxElement)) {
                console.log("Item" + item.collider.node.name);
            }
        }
    }

    public SelectItem() {
        this.node.setPosition(this.node.position.x, this.node.position.y, 2);
        this.isSelected = true;

    }
    public UnSelectItem() {
        this.isSelected = false;
    }
    
    MoveToPosTarget(target: Node) {
        this.TweenMove(new Vec3(target.position.x, target.position.y, 0));
    }
    MoveToPosOrigin() {
        this.TweenMove(this.posOriginIem);
    }

    TweenMove(targetPos: Vec3) {
        tween(this.node.position).to(this.tweenDuration, targetPos,
            {
                onUpdate: (target: Vec3, radius: number) => {
                    this.node.position = target;
                }
            }).start();
    }
}



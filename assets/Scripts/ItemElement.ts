import { _decorator, BoxCollider, CCFloat, Component, director, geometry, math, Node, PhysicsRayResult, PhysicsSystem, tween, Vec3 } from 'cc';
import { BoxElement } from './BoxElement';
const { ccclass, property } = _decorator;

@ccclass('ItemElement')
export class ItemElement extends Component {
    isSelectItem: boolean;
    posOriginIem: Vec3;
    @property(CCFloat) tweenDuration: number;
    private _ray: geometry.Ray;
    protected onLoad(): void {
    }
    protected update(deltaTime: number): void {
        this.CheckSelectedBox();
    }

    StartGame() {
        this.posOriginIem = this.node.getPosition();
    }
    CheckSelectedBox() {
        this._ray = new geometry.Ray();
        let startPoint = new Vec3(this.node.getWorldPosition().x, this.node.getWorldPosition().y, 0);
        geometry.Ray.fromPoints(this._ray, startPoint, startPoint.add(Vec3.FORWARD));
        console.log("Run1");
        if (PhysicsSystem.instance.raycastClosest(this._ray)) {
            console.log("Run2");
            var raycastResult = PhysicsSystem.instance.raycastClosestResult;
            let item = raycastResult;
            if (item.collider.node.getComponent(BoxCollider) != null && item.collider.node.getComponent(BoxElement)) {
                console.log("Item" + item.collider.node.name);
            }
        }
    }

    public SelectItem() {
        this.node.setPosition(this.node.position.x, this.node.position.y, 2);
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



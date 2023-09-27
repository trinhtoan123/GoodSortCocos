import { _decorator, BoxCollider, CCFloat, Component, director, geometry, math, Node, PhysicsRayResult, PhysicsSystem, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TestRaycast')
export class TestRaycast extends Component {
    isSelectItem: boolean;
    posOriginIem: Vec3;
    @property(CCFloat) tweenDuration: number;
    private _ray: geometry.Ray;
    start() {

    }

    update(deltaTime: number) {
        this.CheckSelectedBox();
    }
    CheckSelectedBox() {
        this._ray = new geometry.Ray();
        let startPoint = new Vec3(this.node.getWorldPosition().x, this.node.getWorldPosition().y, 0);
        let direction = startPoint.add(Vec3.FORWARD);
        geometry.Ray.fromPoints(this._ray, startPoint, direction);
        console.log("Run1");
        if (PhysicsSystem.instance.raycastClosest(this._ray)) {
            var raycastResult = PhysicsSystem.instance.raycastClosestResult;
            let item = raycastResult;
            console.log("Run2");
        }


    }

}



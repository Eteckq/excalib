import { Actor, CollisionType, vec } from "excalibur";
import { Resources } from "../../resources";
import { PlayerCollisionMask } from "../../colliders";

export class Bullet extends Actor {
  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 8,
      height: 30,
      vel: vec(0, -600),
      collisionType: CollisionType.Passive,
      collisionGroup: PlayerCollisionMask,
    });

    this.graphics.add(Resources.LaserBlue.toSprite());
  }

  public onInitialize() {}
}

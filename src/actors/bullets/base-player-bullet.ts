import { Actor, CollisionType, vec } from "excalibur";
import { Resources } from "../../resources";
import { PlayerCollisionMask } from "../../colliders";

export abstract class BasePlayerBullet extends Actor {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    private damage: number
  ) {
    super({
      x,
      y,
      width,
      height,
      collisionType: CollisionType.Passive,
      collisionGroup: PlayerCollisionMask,
    });
  }
  public getDamage() {
    return this.damage;
  }
}

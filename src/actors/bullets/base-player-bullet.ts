import { Actor, CollisionType, Engine, vec } from "excalibur";
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

  onPreUpdate(engine: Engine<any>, delta: number): void {
    if (this.isOffScreen) {
      this.kill();
    }
  }

  public getDamage() {
    return this.damage;
  }
}

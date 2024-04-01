import { Actor, CollisionType, vec } from "excalibur";
import { Resources } from "../../resources";
import { PlayerCollisionMask, PowerUpCanCollideWith } from "../../colliders";

export abstract class BasePowerup extends Actor {
  constructor(x: number, y: number) {
    super({
      x,
      y,
      width: 24,
      height: 24,
      collisionType: CollisionType.Passive,
      collisionGroup: PowerUpCanCollideWith,
    });
    this.vel = vec(0, 100);
  }
}

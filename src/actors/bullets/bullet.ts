import { Actor, CollisionType, vec } from "excalibur";
import { Resources } from "../../resources";
import { PlayerCollisionMask } from "../../colliders";
import { BasePlayerBullet } from "./base-player-bullet";

export class BasicBullet extends BasePlayerBullet {
  constructor(x: number, y: number) {
    super(x, y, 8, 30, 10);

    this.vel = vec(0, -600);

    this.graphics.add(Resources.LaserBlue.toSprite());
  }
}

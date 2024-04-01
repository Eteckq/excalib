import { Actor, CollisionType, vec } from "excalibur";
import { Resources } from "../../../resources";
import { PlayerCollisionMask } from "../../../colliders";
import { BasePlayerBullet } from "../base-player-bullet";

export class GreenBullet extends BasePlayerBullet {
  constructor(x: number, y: number) {
    super(x, y, 8, 20, 7);

    this.vel = vec(0, -1200);

    this.graphics.add(Resources.LaserGreen.toSprite());
  }
}

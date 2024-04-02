import {
  Actor,
  Animation,
  AnimationStrategy,
  CollisionType,
  Engine,
  Vector,
  vec,
} from "excalibur";
import { BulletSheet, Resources } from "../../resources";
import { EnemyCollisionMask, PlayerCollisionMask } from "../../colliders";
import { Player } from "../player";

export class EnemyBullet extends Actor {
  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      radius: 5,
      collisionType: CollisionType.Passive,
      collisionGroup: EnemyCollisionMask,
    });

    const anim = Animation.fromSpriteSheet(
      BulletSheet,
      [0, 1, 2],
      150,
      AnimationStrategy.PingPong
    );
    this.graphics.use(anim);
  }

  onPreUpdate(engine: Engine<any>, delta: number): void {
    if (this.isOffScreen) {
      this.kill();
    }
  }

  public onInitialize() {}
}

import {
  Actor,
  CollisionType,
  Engine,
  ImageSource,
  Vector,
  vec,
} from "excalibur";
import { Resources } from "../../resources";
import { PlayerCollisionMask, PowerUpCanCollideWith } from "../../colliders";
import { HEIGHT, WIDTH } from "../../constants";

export abstract class BasePowerup extends Actor {
  private speed = 100;
  constructor(x: number, y: number, public image: ImageSource) {
    super({
      x,
      y,
      width: 24,
      height: 24,
      collisionType: CollisionType.Passive,
      collisionGroup: PowerUpCanCollideWith,
    });
    this.vel = new Vector(this.speed, this.speed);
    this.graphics.add(image.toSprite());
  }

  onInitialize(engine: Engine<any>): void {
    engine.clock.schedule(() => {
      this.actions.blink(100, 100, 10).die();
    }, 6000);
  }

  onPreUpdate(engine: Engine<any>, delta: number): void {
    if (this.pos.x < 0) {
      this.vel.x = this.speed;
    } else if (this.pos.x > WIDTH) {
      this.vel.x = -this.speed;
    } else if (this.pos.y > HEIGHT) {
      this.vel.y = -this.speed;
    } else if (this.pos.y < 0) {
      this.vel.y = this.speed;
    }
  }
}

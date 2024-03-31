import {
  Actor,
  Collider,
  CollisionContact,
  CollisionType,
  Color,
  EmitterType,
  Engine,
  ParticleEmitter,
  PolygonCollider,
  Side,
  Sprite,
  Vector,
  vec,
} from "excalibur";
import { EnemyCollisionMask } from "../../colliders";
import { Bullet } from "../bullets/bullet";

export abstract class BaseEnemyShip extends Actor {
  constructor(x: number, y: number, sprite: Sprite, collider: Collider) {
    super({
      x: x,
      y: y,
      // vel: vec(3, 5),
      collisionType: CollisionType.Passive,

      collisionGroup: EnemyCollisionMask,
      collider:
        collider instanceof PolygonCollider ? collider.triangulate() : collider,
    });

    this.graphics.add(sprite);
  }

  public onInitialize(engine: Engine) {
    // const P: [number, number][] = [];
    // engine.input.pointers.primary.on("down", (evt) => {
    //   let points = P;
    //   points.push([evt.worldPos.x - this.pos.x, evt.worldPos.y - this.pos.y]);
    //   this.collider.set(
    //     new PolygonCollider({
    //       points: points.map((p) => vec(p[0], p[1])),
    //     })
    //   );
    //   console.log(JSON.stringify(points));
    // });
  }

  onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    if (other.owner instanceof Bullet) {
      other.owner.kill();
    }
    this.particleDamage(
      contact.points[0].x - this.pos.x,
      contact.points[0].y - this.pos.y
    );
  }

  particleDamage(x: number, y: number) {
    const emitter = new ParticleEmitter({
      emitterType: EmitterType.Circle,
      radius: 0,
      minVel: 50,
      maxVel: 100,
      minAngle: 0,
      maxAngle: 6.2,
      isEmitting: true,
      emitRate: 200,
      opacity: 1,
      fadeFlag: true,
      particleLife: 600,
      maxSize: 3,
      minSize: 1,
      startSize: 5,
      endSize: 0,
      acceleration: new Vector(0, 399),
      beginColor: Color.Orange,
      endColor: Color.White,
      x: x,
      y: y,
    });

    this.addChild(emitter);

    setTimeout(() => {
      this.removeChild(emitter);
    }, 100);
  }
}

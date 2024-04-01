import {
  Actor,
  CircleCollider,
  Clock,
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
  Timer,
  Vector,
  vec,
} from "excalibur";
import { EnemyCollisionMask } from "../../colliders";
import { BasicBullet } from "../bullets/bullet";
import { HEIGHT, WIDTH } from "../../constants";
import { Player } from "../player";

export abstract class BaseEnemyShip extends Actor {
  private dying = false;
  private player: Player | undefined = undefined;
  constructor(
    x: number,
    y: number,
    private health: number,
    sprite: Sprite,
    collider: Collider
  ) {
    super({
      x: x,
      y: y,
      collisionType: CollisionType.Passive,

      collisionGroup: EnemyCollisionMask,
      collider: collider,
    });

    this.graphics.add(sprite);
  }

  onInitialize(engine: Engine) {
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
    this.player = this.scene?.world.queryTags(["player"]).entities[0] as Player;

    this.scene?.engine.clock.schedule(() => {
      this._shoot();
    }, 1000 + Math.random() * 1000);

    this.onCustomInit(engine, this.player);
  }

  abstract onCustomInit(engine: Engine, player: Player): void;

  onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    contact.points.map((p) => {
      this.particleDamage(p.x, p.y);
    });

    if (other.owner instanceof BasicBullet) {
      other.owner.kill();
      this.damage(other.owner.getDamage());
    }
  }

  onPreUpdate(engine: Engine, delta: number): void {
    if (this.pos.y > HEIGHT + 300) {
      this.kill();
    } else {
      this.customUpdate(engine, delta, this.getPlayer());
    }
  }

  protected getPlayer() {
    if (!this.player) throw new Error("Player not found");
    return this.player;
  }

  private _shoot() {
    if (this.dying) return;
    this.shoot(this.getPlayer());
    this.scene?.engine.clock.schedule(() => {
      this._shoot();
    }, 750 + Math.random() * 2000);
  }

  private damage(value: number) {
    if (this.dying) return;
    this.health -= value;
    if (this.health <= 0) {
      this.destroyParticle();
      this.dying = true;
      this.body.collisionType = CollisionType.PreventCollision;
      this.actions.clearActions();
      this.actions.scaleTo(Vector.Zero, new Vector(8, 8)).die();
    }
  }

  private destroyParticle() {
    if (!this.scene) return;
    const emitter = new ParticleEmitter({
      emitterType: EmitterType.Circle,
      radius: 30,
      minVel: 50,
      maxVel: 100,
      minAngle: 0,
      maxAngle: 6.2,
      isEmitting: true,
      emitRate: 300,
      opacity: 1,
      fadeFlag: true,
      particleLife: 1200,
      maxSize: 10,
      minSize: 4,
      acceleration: new Vector(0, 500),
      beginColor: Color.Red,
      x: this.pos.x,
      y: this.pos.y,
    });

    this.scene.add(emitter);

    this.scene.engine.clock.schedule(() => {
      emitter.kill();
    }, 100);
  }

  abstract customUpdate(engine: Engine, delta: number, player: Player): void;
  abstract shoot(player: Player): void;

  private particleDamage(x: number, y: number) {
    if (!this.scene) return;

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

    this.scene.add(emitter);

    this.scene.engine.clock.schedule(() => {
      emitter.kill();
    }, 25);
  }
}

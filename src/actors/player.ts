import {
  Actor,
  Collider,
  CollisionContact,
  CollisionType,
  Color,
  Engine,
  Input,
  Keys,
  ParticleEmitter,
  PolygonCollider,
  Side,
  Vector,
  vec,
} from "excalibur";
import { Resources } from "../resources";
import { Weapon } from "./weapons/weapons";
import { HEIGHT, WIDTH } from "../constants";
import { PlayerCollisionMask } from "../colliders";
import { BasicBullet } from "./bullets/bullet";
import { EnemyBullet } from "./bullets/enemy-bullet";

const COLLIDER_POINTS: [number, number][] = [
  [6.5, 37.5],
  [14, 27],
  [44, 22],
  [48, -5],
  [35, 0],
  [12, -12],
  [7, -38],
  [-7, -38],
  [-12, -12],
  [-35, 0],
  [-48, -5],
  [-44, 22],
  [-14, 27],
  [-6.5, 37.5],
];

const COLLIDER = new PolygonCollider({
  points: COLLIDER_POINTS.map((p) => vec(p[0], p[1])),
}).triangulate();
export class Player extends Actor {
  private keysPressed: Keys[] = [];

  private weapons: Weapon[] = [new Weapon()];

  private fireEmitter = new ParticleEmitter({
    beginColor: Color.Yellow,
    endColor: Color.White,
    pos: new Vector(-5, 36),
    opacity: 0.4,
    emitRate: 85,
    particleLife: 3000,
    minVel: 0,
    maxVel: 0,
    acceleration: new Vector(0, 800),
    maxAngle: 6.2,
    height: 5,
    width: 10,
  });

  private lastState: "up" | "down" | "neutral" = "neutral";

  constructor() {
    super({
      x: 150,
      y: 600 - 40,
      collisionType: CollisionType.Fixed,
      collisionGroup: PlayerCollisionMask,
      collider: COLLIDER,
    });
    this.graphics.add(Resources.PlayerShip.toSprite());
    this.addTag("player");
  }

  onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    if (other.owner instanceof EnemyBullet) {
      other.owner.kill();
    }
  }

  onInitialize(engine: Engine): void {
    // Keyboard
    engine.input.keyboard.on("press", (evt) => this.addKey(evt.key));
    engine.input.keyboard.on("release", (evt: Input.KeyEvent) =>
      this.removeKey(evt.key)
    );
    this.addChild(this.fireEmitter);
    this.z = 1;
  }

  onPreUpdate(engine: Engine, delta: number): void {
    this.move();

    const spacePressed = this.keysPressed.find((k) => k == Keys.Space);
    this.weapons.map((w) => w.reduceCooldown(delta));
    if (spacePressed) this.weapons.map((w) => w.tryToShoot(this, engine));
  }

  private move() {
    const dir = Vector.Zero.clone();

    const upPressed = this.keysPressed.find((k) => k == Keys.Up || k == Keys.W);
    const downPressed = this.keysPressed.find(
      (k) => k == Keys.Down || k == Keys.S
    );
    const leftPressed = this.keysPressed.find(
      (k) => k == Keys.Left || k == Keys.A
    );
    const rightPressed = this.keysPressed.find(
      (k) => k == Keys.Right || k == Keys.D
    );

    const borderGap = 25;

    if (leftPressed && this.pos.x > 0 + borderGap) dir.x -= 1;
    if (rightPressed && this.pos.x < WIDTH - borderGap) dir.x += 1;

    if (upPressed && this.pos.y > 0 + borderGap) {
      dir.y -= 1;
      this.toggleParticuleAcceleration("up");
    }

    if (downPressed && this.pos.y < HEIGHT - borderGap) {
      dir.y += 1;
      this.toggleParticuleAcceleration("down");
    }

    if (!upPressed && !downPressed) {
      this.toggleParticuleAcceleration("neutral");
    }

    this.vel = dir.scale(400);
  }

  private toggleParticuleAcceleration(state: "up" | "down" | "neutral") {
    if (state == this.lastState) return;
    this.lastState = state;
    let accel = 800;
    switch (state) {
      case "up":
        accel = 2000;
        break;
      case "down":
        accel = 200;
        break;
    }

    this.fireEmitter.acceleration = new Vector(0, accel);
    this.fireEmitter.particles.map(
      (p) => (p.acceleration = new Vector(0, accel))
    );
  }

  private addKey(key: Keys) {
    this.keysPressed.push(key);
  }

  private removeKey(key: Keys) {
    this.keysPressed = this.keysPressed.filter((k) => k != key);
  }
}

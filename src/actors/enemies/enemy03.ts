import { Engine, PolygonCollider, Sprite, Vector, vec } from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";
import { Player } from "../player";
import { EnemyBullet } from "../bullets/enemy-bullet";
import { HEIGHT } from "../../constants";
import { EnemiesHealth, EnemiesScore } from "../../parameters";

const COLLIDER_POINTS: [number, number][] = [
  [-9, 31],
  [9, 31],
  [12, 23],
  [30, 29],
  [27, 39],
  [38, 42],
  [50, -3],
  [25, -36],
  [8, -41],
  [-8, -41],
  [-25, -36],
  [-50, -3],
  [-38, 41],
  [-27, 39],
  [-30, 29],
  [-12, 23],
];

const SPRITE = new Sprite({
  image: Resources.Enemy3,
  // destSize: {
  //   height: 60,
  //   width: 65,
  // },
});

const COLLIDER = new PolygonCollider({
  points: COLLIDER_POINTS.map((p) => vec(p[0], p[1])),
}).triangulate();

export class EnemyShip03 extends BaseEnemyShip {
  constructor(x: number, y: number) {
    super(x, y, EnemiesHealth.Enemy03, EnemiesScore.Enemy03, SPRITE, COLLIDER);
  }

  onCustomInit(engine: Engine<any>, player: Player): void {
    this.actions.repeatForever((repeatCtx) => {
      const angle =
        Math.atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x) -
        Math.PI / 2;

      repeatCtx.rotateTo(angle, 1);
    });
    this.vel = Vector.Down.scale(50);
  }

  customUpdate(engine: Engine<any>, delta: number, player: Player) {
    const distance = player.pos.distance(this.pos);
    if (this.pos.y > HEIGHT - 200 && distance > 300) {
      this.vel = Vector.Up.scale(200);
    } else if (distance < 200) {
      this.vel = new Vector(
        Math.cos(this.rotation - Math.PI / 2),
        Math.sin(this.rotation - Math.PI / 2)
      ).scale(75 * (1 + (1 / distance) * 100));
    } else if (distance > 400) {
      this.vel = new Vector(
        Math.cos(this.rotation + Math.PI / 2),
        Math.sin(this.rotation + Math.PI / 2)
      ).scale(75);
    }
  }

  shoot(player: Player) {
    const spawnA = new Vector(this.pos.x + 35, this.pos.y + 20).rotate(
      this.rotation,
      this.pos
    );
    const spawnB = new Vector(this.pos.x - 35, this.pos.y + 20).rotate(
      this.rotation,
      this.pos
    );
    const bullet = new EnemyBullet(spawnA.x, spawnA.y);
    const bullet2 = new EnemyBullet(spawnB.x, spawnB.y);

    bullet.vel = player.pos.sub(spawnA).normalize().scale(150);

    bullet2.vel = player.pos.sub(spawnB).normalize().scale(150);
    this.scene?.add(bullet);
    this.scene?.add(bullet2);
  }
}

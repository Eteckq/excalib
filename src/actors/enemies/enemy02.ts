import { Engine, PolygonCollider, Sprite, vec } from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";
import { Player } from "../player";
import { HEIGHT, WIDTH } from "../../constants";
import { EnemyBullet } from "../bullets/enemy-bullet";
import { EnemiesHealth, EnemiesScore } from "../../parameters";

const COLLIDER_POINTS: [number, number][] = [
  [-5, 29],
  [-5, 18],
  [5, 18],
  [5, 29],
  [15, 28],
  [33, -6],
  [32, -11],
  [21, -12],
  [0, -30],
  [-21, -12],
  [-32, -11],
  [-33, -6],
  [-15, 28],
];

const SPRITE = new Sprite({
  image: Resources.Enemy2,
  destSize: {
    height: 60,
    width: 65,
  },
});

const COLLIDER = new PolygonCollider({
  points: COLLIDER_POINTS.map((p) => vec(p[0], p[1])),
}).triangulate();

export class EnemyShip02 extends BaseEnemyShip {
  constructor(x: number, y: number) {
    super(x, y, EnemiesHealth.Enemy02, EnemiesScore.Enemy02, SPRITE, COLLIDER);
  }

  onCustomInit(engine: Engine<any>, player: Player): void {
    this.actions.repeatForever((repeatCtx) => {
      const angle =
        Math.atan2(player.pos.y - this.pos.y, player.pos.x - this.pos.x) -
        Math.PI / 2;

      repeatCtx
        .rotateTo(angle, 8)
        .callMethod(() => this.afterRotation(player))
        .delay(200)
        .rotateTo(0, 8)
        .delay(200)
        .moveTo(Math.random() * WIDTH, (Math.random() * HEIGHT) / 3, 500)
        .delay(200);
    });
  }

  customUpdate(engine: Engine<any>, delta: number, player: Player) {}

  shoot(player: Player) {}

  private afterRotation(player: Player) {
    const bullet = new EnemyBullet(this.pos.x, this.pos.y);
    const direction = player.pos.sub(this.pos).normalize();

    bullet.vel = direction.scale(250);
    this.scene?.add(bullet);
  }
}

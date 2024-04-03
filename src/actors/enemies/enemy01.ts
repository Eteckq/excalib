import { Engine, PolygonCollider, Sprite, Vector, vec } from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";
import { EnemyBullet } from "../bullets/enemy-bullet";
import { Player } from "../player";
import { HEIGHT, WIDTH } from "../../constants";
import { EnemiesHealth } from "../../parameters";

const COLLIDER_POINTS: [number, number][] = [
  [-17, 28.5],
  [-8, 25.5],
  [-6.5, 11],
  [6.5, 11],
  [8, 25.5],
  [17, 28.5],
  [32.5, -11.5],
  [20, -30],
  [7, -24],
  [5.5, -17],
  [-5.5, -17],
  [-7, -24],
  [-20, -30],
  [-32.5, -11.5],
];

const SPRITE = new Sprite({
  image: Resources.Enemy1,
  destSize: {
    height: 60,
    width: 65,
  },
});

const COLLIDER = new PolygonCollider({
  points: COLLIDER_POINTS.map((p) => vec(p[0], p[1])),
}).triangulate();

export class EnemyShip01 extends BaseEnemyShip {
  constructor(x: number, y: number) {
    super(x, y, EnemiesHealth.Enemy01, SPRITE, COLLIDER);
  }

  onCustomInit(engine: Engine<any>, player: Player): void {
    this.actions.repeatForever((repeatCtx) => {
      repeatCtx.moveTo(
        Math.random() * WIDTH,
        (Math.random() * HEIGHT) / 2,
        100
      );
    });
  }

  customUpdate(engine: Engine<any>, delta: number, player: Player) {}

  shoot(player: Player) {
    const bullet = new EnemyBullet(this.pos.x, this.pos.y);

    bullet.vel = new Vector(0, 200);
    this.scene?.add(bullet);
  }
}

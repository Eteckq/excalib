import { Engine, PolygonCollider, Sprite, Vector, vec } from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";
import { Player } from "../player";
import { HEIGHT, WIDTH } from "../../constants";
import { EnemyBullet } from "../bullets/enemy-bullet";
import { EnemiesHealth, EnemiesScore } from "../../parameters";

const COLLIDER_POINTS: [number, number][] = [
  [-10, 39],
  [10, 39],
  [14, 30],
  [21, 30],
  [37, -40],
  [24, -40],
  [10, -27],
  [-10, -27],
  [-24, -40],
  [-37, -40],
  [-21, 30],
  [-14, 30],
];

const SPRITE = new Sprite({
  image: Resources.Enemy5,
  destSize: {
    height: 80,
    width: 75,
  },
});

const COLLIDER = new PolygonCollider({
  points: COLLIDER_POINTS.map((p) => vec(p[0], p[1])),
}).triangulate();

export class EnemyShip05 extends BaseEnemyShip {
  constructor(x: number, y: number) {
    super(x, y, EnemiesHealth.Enemy05, EnemiesScore.Enemy05, SPRITE, COLLIDER);
  }

  onCustomInit(engine: Engine<any>, player: Player): void {
    this.actions.repeatForever((repeatCtx) => {
      repeatCtx
        .moveTo(Math.random() * WIDTH, (Math.random() * HEIGHT) / 2, 90)
        .delay(300)
        .callMethod(() => this.customShoot(player))
        .delay(300)
        .callMethod(() => this.customShoot(player))
        .delay(300)
        .callMethod(() => this.customShoot(player))
        .delay(300);
    });
  }

  customUpdate(engine: Engine<any>, delta: number) {}

  customShoot(player: Player) {
    const nbrBullets = 5;
    const spaceFactor = 0.3;
    for (let bulletIndex = 0; bulletIndex < nbrBullets; bulletIndex++) {
      let radian =
        (Math.PI / nbrBullets / (nbrBullets / 2)) *
        Math.round(bulletIndex / 2) *
        spaceFactor;
      if (bulletIndex % 2 == 0) {
        radian *= -1;
      }
      radian += Math.PI / 2;
      const bullet = new EnemyBullet(this.pos.x, this.pos.y);

      bullet.vel = new Vector(Math.cos(radian), Math.sin(radian)).scale(180);
      this.scene?.add(bullet);
    }
  }

  shoot(player: Player) {}
}

import { Engine, PolygonCollider, Sprite, Vector, vec } from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";
import { Player } from "../player";
import { EnemiesHealth, EnemiesScore } from "../../parameters";

const COLLIDER_POINTS: [number, number][] = [
  [-16, 79],
  [16, 79],
  [20, 67],
  [60, 37],
  [59, -56],
  [29, -80],
  [10, -80],
  [10, -63],
  [-10, -63],
  [-10, -80],
  [-29, -80],
  [-59, -56],
  [-60, 37],
  [-20, 67],
];

const SPRITE = new Sprite({
  image: Resources.Enemy4,
  destSize: {
    height: 160,
    width: 120,
  },
});

const COLLIDER = new PolygonCollider({
  points: COLLIDER_POINTS.map((p) => vec(p[0], p[1])),
}).triangulate();

export class EnemyShip04 extends BaseEnemyShip {
  constructor(x: number, y: number) {
    super(x, y, EnemiesHealth.Enemy04, EnemiesScore.Enemy04, SPRITE, COLLIDER);

    this.vel = Vector.Down.scale(40);
  }

  onCustomInit(engine: Engine<any>, player: Player): void {}

  customUpdate(engine: Engine<any>, delta: number) {}

  shoot(player: Player) {}
}

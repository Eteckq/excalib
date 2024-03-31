import { PolygonCollider, Sprite, vec } from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";

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
  image: Resources.EnemyBlack4,
  destSize: {
    height: 160,
    width: 120,
  },
});

const COLLIDER = new PolygonCollider({
  points: COLLIDER_POINTS.map((p) => vec(p[0], p[1])),
});

export class EnemyShip04 extends BaseEnemyShip {
  constructor(x: number, y: number) {
    super(x, y, SPRITE, COLLIDER);
  }
}

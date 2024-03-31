import { PolygonCollider, Sprite, vec } from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";

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
  image: Resources.EnemyBlack5,
  destSize: {
    height: 80,
    width: 75,
  },
});

const COLLIDER = new PolygonCollider({
  points: COLLIDER_POINTS.map((p) => vec(p[0], p[1])),
});

export class EnemyShip05 extends BaseEnemyShip {
  constructor(x: number, y: number) {
    super(x, y, SPRITE, COLLIDER);
  }
}

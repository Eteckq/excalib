import { PolygonCollider, Sprite, vec } from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";

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
  image: Resources.EnemyBlack1,
  destSize: {
    height: 60,
    width: 65,
  },
});

const COLLIDER = new PolygonCollider({
  points: COLLIDER_POINTS.map((p) => vec(p[0], p[1])),
});

export class EnemyShip02 extends BaseEnemyShip {
  constructor(x: number, y: number) {
    super(x, y, SPRITE, COLLIDER);
  }
}

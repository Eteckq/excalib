import { Engine, PolygonCollider, Sprite, Vector, vec } from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";
import { Player } from "../player";

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
    super(x, y, 50, SPRITE, COLLIDER);
  }

  move(engine: Engine<any>, delta: number) {}

  shoot(player: Player) {}
}

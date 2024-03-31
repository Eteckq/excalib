import { Engine, PolygonCollider, Sprite, Vector, vec } from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";
import { Player } from "../player";

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
    super(x, y, 50, SPRITE, COLLIDER);
  }

  move(engine: Engine<any>, delta: number) {}

  shoot(player: Player) {}
}

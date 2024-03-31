import {
  CircleCollider,
  Engine,
  PolygonCollider,
  Sprite,
  Vector,
  vec,
} from "excalibur";
import { Resources } from "../../resources";
import { BaseEnemyShip } from "./base-enemy";
import { Player } from "../player";

const SPRITE = new Sprite({
  image: Resources.UfoRed,
});

const COLLIDER = new CircleCollider({
  radius: 45,
});

export class EnemyShip06 extends BaseEnemyShip {
  constructor(x: number, y: number) {
    super(x, y, 50, SPRITE, COLLIDER);
  }

  move(engine: Engine<any>, delta: number) {}

  shoot(player: Player) {
    console.log("shoot");
  }
}

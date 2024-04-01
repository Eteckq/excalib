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
import { EnemyBullet } from "../bullets/enemy-bullet";
import { HEIGHT, WIDTH } from "../../constants";

const SPRITE = new Sprite({
  image: Resources.Enemy6,
});

const COLLIDER = new CircleCollider({
  radius: 45,
});

export class EnemyShip06 extends BaseEnemyShip {
  constructor(x: number, y: number) {
    super(x, y, 50, SPRITE, COLLIDER);
  }

  onCustomInit(engine: Engine<any>, player: Player): void {
    this.actions.repeatForever((repeatCtx) => {
      repeatCtx.moveTo(Math.random() * WIDTH, (Math.random() * HEIGHT) / 2, 30);
    });
  }

  customUpdate(engine: Engine<any>, delta: number) {}

  shoot(player: Player) {
    const nbrBullets = 12;
    for (let bulletIndex = 0; bulletIndex < nbrBullets; bulletIndex++) {
      const radian = ((Math.PI * 2) / nbrBullets) * (bulletIndex + 1);

      const bullet = new EnemyBullet(this.pos.x, this.pos.y);

      bullet.vel = new Vector(Math.cos(radian), Math.sin(radian)).scale(200);
      this.scene?.add(bullet);
    }
  }
}

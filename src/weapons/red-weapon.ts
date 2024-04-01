import {
  Actor,
  BoundingBox,
  Collider,
  CollisionContact,
  Color,
  Engine,
  Entity,
  ExcaliburGraphicsContext,
  Graphic,
  Line,
  LineOptions,
  Raster,
  Side,
  Vector,
  vec,
} from "excalibur";
import { BlueBullet } from "../actors/bullets/player/blue-bullet";
import { Player } from "../actors/player";
import { BaseWeapon } from "./base-weapons";
import { GreenBullet } from "../actors/bullets/player/green-bullet";
import { BaseEnemyShip } from "../actors/enemies/base-enemy";

class CustomLine extends Graphic {
  clone(): Graphic {
    throw new Error("Method not implemented.");
  }

  color: Color = Color.Red;

  constructor(
    private readonly start: Vector,
    private readonly end: Vector,
    private thickness = 1
  ) {
    super();
  }

  protected _drawImage(
    ctx: ExcaliburGraphicsContext,
    _x: number,
    _y: number
  ): void {
    ctx.drawLine(this.start, this.end, this.color, this.thickness);
  }
}

export class RedWeapon extends BaseWeapon {
  private aliveLasers: Actor[] = [];
  constructor() {
    super();
  }

  public shoot(player: Player, engine: Engine, power = 0) {
    if (this.aliveLasers.length > 0) return;
    const enemies = engine.currentScene.world.queryTags(["enemy"])
      .entities as BaseEnemyShip[];
    if (enemies.length == 0) return;
    const target = enemies[0];

    const laserEntity = new Actor();
    this.aliveLasers.push(laserEntity);
    laserEntity.graphics.use(new CustomLine(player.pos, target.pos, 4));

    engine.add(laserEntity);

    target.on("prekill", () => {
      engine.remove(laserEntity);
      this.aliveLasers = this.aliveLasers.filter((l) => l != laserEntity);
    });
  }
}

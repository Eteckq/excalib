import { Scene, Random, Engine } from "excalibur";
import { Player } from "../actors/player";
import { WIDTH } from "../constants";
import { EnemyShip01 } from "../actors/enemies/enemy01";
import { EnemyShip02 } from "../actors/enemies/enemy02";
import { EnemyShip03 } from "../actors/enemies/enemy03";
import { EnemyShip04 } from "../actors/enemies/enemy04";
import { EnemyShip05 } from "../actors/enemies/enemy05";
import { EnemyShip06 } from "../actors/enemies/enemy06";

export class Game extends Scene {
  random = new Random(); // seeded random

  constructor() {
    super();
  }

  onInitialize(engine: Engine) {
    const paddle = new Player();
    this.add(paddle);
    this.add(new EnemyShip01(100, 150));
    this.add(new EnemyShip06(200, 150));
    this.add(new EnemyShip02(300, 150));
    this.add(new EnemyShip03(400, 150));
    this.add(new EnemyShip04(550, 150));
    this.add(new EnemyShip05(680, 150));
  }
}

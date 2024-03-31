import { Scene, Random, Engine } from "excalibur";
import { Player } from "../actors/player";
import { WIDTH } from "../constants";
import { EnemyShip01 } from "../actors/enemies/enemy01";
import { EnemyShip02 } from "../actors/enemies/enemy02";
import { EnemyShip03 } from "../actors/enemies/enemy03";
import { EnemyShip04 } from "../actors/enemies/enemy04";
import { EnemyShip05 } from "../actors/enemies/enemy05";

export class Game extends Scene {
  random = new Random(); // seeded random

  constructor() {
    super();
  }

  onInitialize(engine: Engine) {
    const paddle = new Player();
    this.add(paddle);
    // this.add(new EnemyShip01(this.random.integer(0, WIDTH), 150));
    this.add(new EnemyShip05(this.random.integer(0, WIDTH), 150));
    // this.add(new EnemyShip02(this.random.integer(0, WIDTH), 150));
  }
}

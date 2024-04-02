import { BaseEnemyShip } from "./actors/enemies/base-enemy";
import { EnemyShip01 } from "./actors/enemies/enemy01";
import { EnemyShip02 } from "./actors/enemies/enemy02";
import { EnemyShip03 } from "./actors/enemies/enemy03";
import { EnemyShip04 } from "./actors/enemies/enemy04";
import { EnemyShip05 } from "./actors/enemies/enemy05";
import { EnemyShip06 } from "./actors/enemies/enemy06";
import { BasePowerup } from "./actors/powerups/base-powerup";
import { SlotPowerup } from "./actors/powerups/slot-powerup";
import { BluePowerup } from "./actors/powerups/weapon/blue-powerup";
import { GreenPowerup } from "./actors/powerups/weapon/green-powerup";

interface EnemyConfig {
  enemyType: typeof BaseEnemyShip;
  canStartAtWave: number;
}

class PoolPicker {
  private enemyConfigs = [
    { enemyType: EnemyShip01, canStartAtWave: 1 },
    { enemyType: EnemyShip02, canStartAtWave: 3 },
    { enemyType: EnemyShip03, canStartAtWave: 10 },
    { enemyType: EnemyShip04, canStartAtWave: 15 },
    { enemyType: EnemyShip05, canStartAtWave: 20 },
    { enemyType: EnemyShip06, canStartAtWave: 25 },
  ];

  private spawnablePowerups = [BluePowerup, GreenPowerup, SlotPowerup];

  public getRandomPowerup() {
    return this.spawnablePowerups[
      Math.floor(Math.random() * this.spawnablePowerups.length)
    ];
  }

  public getEnemiesForWave(wave: number) {
    const max = Math.round(5 + wave / (6 + Math.random() * 8));
    const enemies = [];
    const pool = [];
    for (const enemyConfig of this.enemyConfigs) {
      if (wave >= enemyConfig.canStartAtWave) {
        pool.push({
          enemyType: enemyConfig.enemyType,
          weight: 0.5,
        });
      }
    }
    for (let nbrEnemies = 0; nbrEnemies < max; nbrEnemies++) {
      enemies.push(pool[Math.floor(Math.random() * pool.length)].enemyType);
    }

    return enemies;
  }
}

export class WavesManager {
  private poolPicker = new PoolPicker();
  public waveNumber = 0;

  constructor() {
    //
    // this.poolPicker.getEnemiesForWave(10);
    // this.poolPicker.getEnemiesForWave(20);
  }

  public nextWave() {
    this.waveNumber++;
    return this.poolPicker.getEnemiesForWave(this.waveNumber);
  }

  public getPowerup() {
    return this.poolPicker.getRandomPowerup();
  }
}

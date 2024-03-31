import { ImageSource, Loader, SpriteSheet } from "excalibur";
import playerShip from "./images/playerShip1_blue.png";
import laserBlue from "./images/laserBlue04.png";
import enemyBlack1 from "./images/enemyBlack1.png";
import enemyBlack2 from "./images/enemyBlack2.png";
import enemyBlack3 from "./images/enemyBlack3.png";
import enemyBlack4 from "./images/enemyBlack4.png";
import enemyBlack5 from "./images/enemyBlack5.png";
import ufoRed from "./images/ufoRed.png";
import bullet from "./images/bullet.png";

export const Resources = {
  PlayerShip: new ImageSource(playerShip),
  LaserBlue: new ImageSource(laserBlue),
  EnemyBlack1: new ImageSource(enemyBlack1),
  EnemyBlack2: new ImageSource(enemyBlack2),
  EnemyBlack3: new ImageSource(enemyBlack3),
  EnemyBlack4: new ImageSource(enemyBlack4),
  EnemyBlack5: new ImageSource(enemyBlack5),
  UfoRed: new ImageSource(ufoRed),
  BulletSheet: new ImageSource(bullet),
} as const;

export const BulletSheet = SpriteSheet.fromImageSource({
  image: Resources.BulletSheet,
  grid: {
    rows: 1,
    columns: 3,
    spriteWidth: 16,
    spriteHeight: 16,
  },
});

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}

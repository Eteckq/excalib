import { ImageSource, Loader, SpriteSheet } from "excalibur";
import playerShip from "./images/playerShip1_blue.png";
import laserBlue from "./images/laserBlue04.png";
import enemyRed1 from "./images/enemyRed1.png";
import enemyRed2 from "./images/enemyRed2.png";
import enemyRed3 from "./images/enemyRed3.png";
import enemyRed4 from "./images/enemyRed4.png";
import enemyRed5 from "./images/enemyRed5.png";
import ufoRed from "./images/ufoRed.png";
import bullet from "./images/bullet.png";

export const Resources = {
  PlayerShip: new ImageSource(playerShip),
  LaserBlue: new ImageSource(laserBlue),
  Enemy1: new ImageSource(enemyRed1),
  Enemy2: new ImageSource(enemyRed2),
  Enemy3: new ImageSource(enemyRed3),
  Enemy4: new ImageSource(enemyRed4),
  Enemy5: new ImageSource(enemyRed5),
  Enemy6: new ImageSource(ufoRed),
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

/* 敌机组 */

let enemyAirs = [];
// 子弹
let enemyBullets = [];

// 移动飞机
function moveEnemyAir() {
    for (let i in enemyAirs) {
        // 自动移动
        enemyAirs[i].x -= enemyAirSpeed;
        if (enemyAirs[i].x < -enemyAirLevel1.width) {
            enemyAirs[i].element.remove();
            enemyAirs.splice(i, 1);
        }
    }
}
// 移动子弹    
function moveEnemyBullets() {
    for (let i in enemyBullets) {
        enemyBullets[i].x -= enemyBulletSpeed;
        if (enemyBullets[i].x < -enemyAirLevel1.width) {
            enemyBullets[i].element.remove();
            enemyBullets.splice(i, 1);
        }
    }
}
// 敌机的默认出现位置
let x = divWidth;
let y = divHeight / 3 - enemyAirLevel1.height / 2;

// 敌机组1 创建模板
function enemyAirType1(x, y) {
    let enemyAir = {
        image: airImages[1],
        element: null,
        speed: enemyAirSpeed,
        x: x,
        y: y
    };
    // 创建用于显示敌机的图片标签
    let enemyAirElement = document.createElement('img');
    // 设置属性
    enemyAirElement.src = enemyAir.image;
    enemyAirElement.style.position = 'absolute';
    enemyAirElement.style.left = enemyAir.x;
    enemyAirElement.style.top = enemyAir.y;
    // 将标签赋到敌机元素属性
    enemyAir.element = enemyAirElement;
    // 敌机标签加入到场景中
    sceneElement.appendChild(enemyAirElement);
    enemyAirs.push(enemyAir);
}

// 敌机组1飞机创建定时器
setInterval(() => {
    if (gameStatus == 1) {
        enemyAirType1(x, y);
        enemyAirType1(x + 80, y);
        enemyAirType1(x + 160, y);
        enemyAirType1(x, y + 145);
        enemyAirType1(x + 80, y + 145);
        enemyAirType1(x + 160, y + 145);
    }
}, enemyAirTime);

// 敌机组1子弹创建定时器
setInterval(() => {
    if (gameStatus == 1) {
        // 遍历敌机组1中所有敌机
        for (let i in enemyAirs) {

            // 为敌机创建一个子弹
            let enemyBullet = {
                image: bulletImages[1],
                element: null,
                speed: enemyBulletSpeed,
                x: enemyAirs[i].x,
                y: enemyAirs[i].y + enemyAirLevel1.height / 2 - enemyBulletLevel1.height / 2
            }

            // 创建用于显示子弹的图片标签
            let enemyBulletElement = document.createElement('img');
            // 设置标签属性
            enemyBulletElement.src = enemyBullet.image;
            enemyBulletElement.style.position = 'absolute';
            enemyBulletElement.style.left = enemyBullet.x;
            enemyBulletElement.style.top = enemyBullet.y;
            // 将标签赋到子弹元素属性
            enemyBullet.element = enemyBulletElement;

            // 子弹标签加入到场景中
            sceneElement.appendChild(enemyBulletElement);
            // 子弹存入数组
            enemyBullets.push(enemyBullet);
        }
    }
}, enemyBulletTime);
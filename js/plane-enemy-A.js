/* 单个敌机 */

let enemyAirAs = [];
// 子弹
let enemyBulletAs = [];

// 移动飞机
function moveEnemyAirAs() {
    for (let i in enemyAirAs) {
        // 自动移动
        enemyAirAs[i].x -= enemyAirSpeedA;
        // 飞机越界移除
        if (enemyAirAs[i].x < -100) {
            let moveEnemyAirAs = enemyAirAs.splice(i, 1);
            moveEnemyAirAs[0].element.remove();
        }
    }

}
// 移动子弹    此处x控制 每次子弹移动的像素距离  
function moveEnemyBulletAs() {
    for (let i in enemyBulletAs) {
        enemyBulletAs[i].x -= enemyBulletSpeedA;
        // 飞机子弹越界移除
        if (enemyBulletAs[i].x < -100) {
            let moveEnemyBulletAs =  enemyBulletAs.splice(i, 1);
            moveEnemyBulletAs[0].element.remove();  
        }
    }
}

// 敌机A的创建模板
function enemyAirTypeA() {
    let enemyAirA = {
        image: airImages[2],
        element: null,
        speed: enemyAirSpeedA,
        x: divWidth,
        y: divHeight / 2 - enemyAirLevelA.height /2
    };
    // 创建用于显示敌机的图片标签
    let enemyAirElementA = document.createElement('img');
    // 设置属性
    enemyAirElementA.src = enemyAirA.image;
    enemyAirElementA.style.position = 'absolute';
    enemyAirElementA.style.left = enemyAirA.x;
    enemyAirElementA.style.top = enemyAirA.y;
    // 将标签赋到敌机元素属性
    enemyAirA.element = enemyAirElementA;
    // 敌机标签加入到场景中
    sceneElement.appendChild(enemyAirElementA);
    enemyAirAs.push(enemyAirA);
}

// 敌机组A创建定时器
setInterval(() => {
    if (gameStatus == 1) {
        enemyAirTypeA();
    }
}, enemyAirTimeA);

// 敌机组A子弹创建定时器
setInterval(() => {
    if (gameStatus == 1) {
        for (let i in enemyAirAs) {
            let enemyBulletA = {
                image: bulletImages[2],
                element: null,
                speed: enemyBulletSpeedA,
                x: enemyAirAs[i].x,
                y: enemyAirAs[i].y + enemyAirLevelA.height / 2 - enemyBulletLevelA.height / 2
            }
            // 创建用于显示子弹的图片标签
            let enemyBulletElementA = document.createElement('img');
            // 设置属性
            enemyBulletElementA.src = enemyBulletA.image;
            enemyBulletElementA.style.position = 'absolute';
            enemyBulletElementA.style.left = enemyBulletA.x;
            enemyBulletElementA.style.top = enemyBulletA.y;
            // 将标签赋到子弹元素属性
            enemyBulletA.element = enemyBulletElementA;
            // 子弹标签加入到场景中
            sceneElement.appendChild(enemyBulletElementA);

            enemyBulletAs.push(enemyBulletA);
        }
    }
}, enemyBulletTimeA);


/* 控制屏幕的显示 */

// 显示定时器 60FPS：1000/60=16.6ms  设置为16ms
setInterval(() => {
    //  显示地图图片
    for (let map of maps) {
        map.element.style.left = map.x + 'px';
        map.element.style.top = map.y + 'px';
    }
    
    // 显示主机
    planeMain.element.style.left = planeMain.x + 'px';
    planeMain.element.style.top = planeMain.y + 'px';

    // 显示主机子弹
    for (let bullet of bullets) {
        bullet.element.style.left = bullet.x + 'px';
        bullet.element.style.top = bullet.y + 'px';
    }

    // 显示敌机组1
    for (let enemyAir of enemyAirs) {
        enemyAir.element.style.left = enemyAir.x + 'px';
        enemyAir.element.style.top = enemyAir.y + 'px';
    }

    // 显示敌机组1子弹
    for (let enemyBullet of enemyBullets) {
        enemyBullet.element.style.left = enemyBullet.x + 'px';
        enemyBullet.element.style.top = enemyBullet.y + 'px';
    }

      // 显示飞机A
      for (let enemyAirA of enemyAirAs) {
        enemyAirA.element.style.left = enemyAirA.x + 'px';
        enemyAirA.element.style.top = enemyAirA.y + 'px';
    }
    // 显示飞机A子弹
    for (let enemyBulletA of enemyBulletAs) {
        enemyBulletA.element.style.left = enemyBulletA.x + 'px';
        enemyBulletA.element.style.top = enemyBulletA.y + 'px';
    }


}, showTime);

// 移动定时器  
setInterval(() => {
    if (gameStatus == 1) {
        // 移动地图
        moveMap();

        // 移动主机
        moveAir();
        // 移动主机子弹
        moveBullets();

        // 移动敌机组A
        moveEnemyAir();
        // 移动敌机组A子弹
        moveEnemyBullets();

         // 移动飞机A
         moveEnemyAirAs();
         // 移动飞机A子弹
         moveEnemyBulletAs();

        // 碰撞检测
        killEnemyAir1();
        killEnemyAirA();
    }
}, moveTime);

// 游戏状态初始化
function initStart() {
    // 创建图片标签 
    let startElement = document.createElement('img');
    // 设置飞机的属性
    startElement.src = dataShowImages[0];
    startElement.style.position = 'absolute';
    startElement.style.left = 450 +  'px';
    startElement.style.top =  10 + 'px';
    startElement.style.width = 56 + 'px';
    startElement.style.height = 25 + 'px';
    // 添加到场景标签中
    sceneElement.appendChild(startElement);
}
// 积分初始化
function initScore() {
    // 创建图片标签 
    let scoreElement = document.createElement('img');
    // 设置飞机的属性
    scoreElement.src = dataShowImages[0];
    scoreElement.style.position = 'absolute';
    scoreElement.style.left = 450 +  'px';
    scoreElement.style.top =  10 + 'px';
    scoreElement.style.width = 56 + 'px';
    scoreElement.style.height = 25 + 'px';
    // 添加到场景标签中
    sceneElement.appendChild(scoreElement);
}

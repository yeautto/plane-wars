/* 主机 */

let planeMain = {
    image: airImages[0],
    element: null,
    // 方向
    direction: {
        up: false,
        down: false,
        left: false,
        right: false
    },
    speed: airSpeed,
    x: 0,
    y: 155
};
// 主机子弹
let bullets = [];

// 飞机初始化
function initPlayer() {
    // 创建图片标签 , 设置玩家的飞机
    let airElement = document.createElement('img');
    // 设置飞机的属性
    airElement.src = planeMain.image;
    airElement.style.position = 'absolute';
    airElement.style.left = planeMain.x + 'px';
    airElement.style.top = planeMain.y + 'px';
    // 添加到场景标签中
    sceneElement.appendChild(airElement);
    planeMain.element = airElement;
}

// 移动飞机
function moveAir() {
    // 飞机的允许飞行范围
    let width = divWidth - airLevel1.width;
    let height = divHeight - airLevel1.height;
    //  判断移动方向 改变位置坐标
    // 向上
    if (planeMain.direction.up && planeMain.y >= 0) {
        planeMain.y -= planeMain.speed;
    }
    // 向下
    if (planeMain.direction.down && planeMain.y <= height) {
        planeMain.y += planeMain.speed;
    }
    // 向左
    if (planeMain.direction.left && planeMain.x >= 0) {
        planeMain.x -= planeMain.speed;
    }
    // 向右
    if (planeMain.direction.right && planeMain.x <= width) {
        planeMain.x += planeMain.speed;
    }
}

// 移动子弹    此处x控制 每次子弹移动的像素距离  
function moveBullets() {
    // 遍历子弹组
    for (let i in bullets) {

        // 子弹坐标更新
        bullets[i].x += bulletSpeed;

        // 子弹的越界检测
        let index = bullets.findIndex((bullet) => bullet.x > divWidth);
        if (index != -1) {
            // 返回的一个数组
            let newBullet = bullets.splice(index, 1);
            newBullet[0].element.remove();
            i--;
        }
    }
}

// 碰撞检测
// 敌机组1碰撞检测
function killEnemyAir1() {
    // 遍历子弹组
    for (let i in bullets) {

        // 1.子弹与敌机组1的碰撞检测  获得发生碰撞的敌机索引
        let bulletLeft = bullets[i].x;
        let bulletRight = bullets[i].x + bulletLevel1.width;
        let bulletUp = bullets[i].y;
        let bulletDown = bullets[i].y + bulletLevel1.height;  

        let enemyAirIndex = enemyAirs.findIndex((enemyAir) => {
            let enemyAir1Left = enemyAir.x;
            let enemyAir1Right = enemyAir.x + enemyAirLevel1.width;
            let enemyAir1Up = enemyAir.y;
            let enemyAir1Down = enemyAir.y + enemyAirLevel1.width;

            return (bulletLeft < enemyAir1Right
                && bulletRight > enemyAir1Left
                && bulletUp < enemyAir1Down
                && bulletDown > enemyAir1Up)
        })

        // 等于-1说明没有发生碰撞，跳出本层循环
        if (enemyAirIndex == -1) {
            continue;
        }
      
        // 2. 如果发生碰撞 就移除该子弹和对应敌机
        // 2.1 移除这一颗子弹
        let moveBullets = bullets.splice(i, 1);
        moveBullets[0].element.remove();

        // 2.2 移除子弹碰撞到的敌机
        let moveEnemyAir = enemyAirs.splice(enemyAirIndex, 1);
        // 3 获取中心位置信息
        let x0 = moveEnemyAir[0].x + enemyAirLevel1.width / 2;
        let y0 = moveEnemyAir[0].y + enemyAirLevel1.height / 2;
        enemyAir1Blast(x0, y0);
        moveEnemyAir[0].element.remove();

        // 原子弹组此位置对象已被移除，由后一位填补，下次循环需要再次访问在此位置，减一以抵消马上要进行的i++
        i--;
    }
}
// 敌机A碰撞检测
function killEnemyAirA() {
    // 遍历子弹组
    for (let i in bullets) {

        // 1.子弹与敌机组1的碰撞检测  获得发生碰撞的敌机索引
        let bulletLeft = bullets[i].x;
        let bulletRight = bullets[i].x + bulletLevel1.width;
        let bulletUp = bullets[i].y;
        let bulletDown = bullets[i].y + bulletLevel1.height;  

        let enemyAirAIndex = enemyAirAs.findIndex((enemyAirA) => {
            let enemyAirALeft = enemyAirA.x;
            let enemyAirARight = enemyAirA.x + enemyAirLevelA.width;
            let enemyAirAUp = enemyAirA.y;
            let enemyAirADown = enemyAirA.y + enemyAirLevelA.width;

            return (bulletLeft < enemyAirARight
                && bulletRight > enemyAirALeft
                && bulletUp < enemyAirADown
                && bulletDown > enemyAirAUp)
        })

        // 等于-1说明没有发生碰撞，跳出本层循环
        if (enemyAirAIndex == -1) {
            continue;
        }

        // 如果发生碰撞 就移除该子弹和对应敌机
        // 移除这一颗子弹
        let moveBullets = bullets.splice(i, 1);
        moveBullets[0].element.remove();

        // 移除子弹碰撞到的敌机
        let moveEnemyAirA = enemyAirAs.splice(enemyAirAIndex, 1);
        // 3 获取中心位置信息
        let x1 = moveEnemyAirA[0].x + enemyAirLevelA.width / 2;
        let y1 = moveEnemyAirA[0].y + enemyAirLevelA.height / 2;
        enemyAirABlast(x1, y1);
        moveEnemyAirA[0].element.remove();

        // 原子弹组此位置对象已被移除，由后一位填补，下次循环需要再次访问在此位置，减一以抵消马上要进行的i++
        i--;
    }
}

// 为敌机组1爆炸效果
function enemyAir1Blast(x0, y0) {
    // 创建爆炸的图片标签
    let blast1Element = document.createElement('img');
    //设置其属性
    blast1Element.src = blastImages[0];
    blast1Element.style.position = 'absolute';
    blast1Element.style.left = x0 - 32 + 'px';
    blast1Element.style.top = y0 - 32 + 'px';
    sceneElement.appendChild(blast1Element);

    // 设置爆炸图片的显示时间 
    setTimeout(() => {
        blast1Element.remove();
    }, 17 * 3);
}

// 为敌机A爆炸效果
function enemyAirABlast(x1, y1) {
    // 创建爆炸的图片标签
    let blastAElement = document.createElement('img');
    //设置其属性
    blastAElement.src = blastImages[1];
    blastAElement.style.position = 'absolute';
    blastAElement.style.left = x1 - 32 + 'px';
    blastAElement.style.top = y1 - 32 + 'px';
    sceneElement.appendChild(blastAElement);

    // 设置爆炸图片的显示时间 
    setTimeout(() => {
        blastAElement.remove();
    }, 17 * 3);
}


// 事件：飞机移动    keydown按下事件：飞机根据按下的键值 进行位置编号  Arrow：箭头
window.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'ArrowUp':
            planeMain.direction.up = true;
            planeMain.direction.down = false;
            break;
        case 'ArrowDown':
            planeMain.direction.up = false;
            planeMain.direction.down = true;
            break;
        case 'ArrowLeft':
            planeMain.direction.left = true;
            planeMain.direction.right = false;
            break;
        case 'ArrowRight':
            planeMain.direction.left = false;
            planeMain.direction.right = true;
            break;
    }
});
// 事件：飞机停止移动  keyup松开事件；按键松开，飞机位置不再发生变化
window.addEventListener('keyup', function (event) {
    switch (event.code) {
        case 'ArrowUp':
            planeMain.direction.up = false;
            break;
        case 'ArrowDown':
            planeMain.direction.down = false;
            break;
        case 'ArrowLeft':
            planeMain.direction.left = false;
            break;
        case 'ArrowRight':
            planeMain.direction.right = false;
            break;
    }
});

// 子弹创建定时器 子弹根据飞机定位  此处控制子弹发射频率：此定时器间隔 
setInterval(() => {
    if (gameStatus == 1) {
        // 创建用于显示子弹的图片标签
        let bullet = {
            image: bulletImages[0],
            element: null,
            speed: bulletSpeed,
            x: planeMain.x + airLevel1.width,
            y: planeMain.y + airLevel1.height / 2 - bulletLevel1.height / 2
        }
        // 设置属性
        let bulletElement = document.createElement('img');
        bulletElement.src = bullet.image;
        bulletElement.style.position = 'absolute';
        bulletElement.style.left = bullet.x + 'px';
        bulletElement.style.top = bullet.y + 'px';

        // 将标签赋到子弹元素属性
        bullet.element = bulletElement;
        // 子弹标签加入到场景中
        sceneElement.appendChild(bulletElement);

        bullets.push(bullet);
    }
}, bulletTime);
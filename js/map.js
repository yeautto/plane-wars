/* 地图控制 */

// 地图
let maps = [];

// 地图初始化 
function initMap() {
    for (let i in mapImages) {
        // 1.1 创建地图图片标签
        let bgMapElement = document.createElement('img');
        // 1.2 设置地图的属性
        bgMapElement.src = mapImages[i];
        bgMapElement.style.position = 'absolute';
        // 为每个地图创建对象
        let map = {
            element: bgMapElement,
            x: i * bgMapImage.width,
            y: 0,
            speed: mapSpeed
        }
        // 添加到地图的数组中
        maps.push(map);
        // 把地图的图片添加到场景标签中
        sceneElement.appendChild(bgMapElement);
    }
}

// 移动地图
function moveMap() {
    for (let map of maps) {
        // 设置地图 每次刷新 移动的像素
        map.x -= map.speed / 1000 * moveTime;
        // 判断是否该切换图片
        if (map.x <= -bgMapImage.width) {
            map.x = (maps.length - 1) * bgMapImage.width;
        }
    }
}
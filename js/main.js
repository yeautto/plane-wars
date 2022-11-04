/* 程序入口 */

// 游戏的状态: 0开始   1.运行中  2.暂停  3.结束
let gameStatus = 0;
// // 事件：开始游戏 监听键盘键：Space  启动游戏
// window.addEventListener('keypress', function (event) {
//     if (event.code == 'Space') {
//         if (gameStatus == 0) {
//             // 改为运行状态
//             gameStatus = 1;
//             // 播放音乐
//             bgMusicControl('开始');    
//         } else if (gameStatus == 1) {
//             // 改为暂停状态
//             gameStatus = 2;
//             bgMusicControl('暂停');
//             gameStatusElement.style.display = "block";
//         } else if (gameStatus == 2) {
//             // 改为运行状态
//             gameStatus = 1;
//             bgMusicControl('开始');
//         }
//     }
// })
// 事件：开始游戏 监听键盘键：Space  启动游戏
function initGameStatus() {
    // 创建音乐开启按钮图片
    let gameStatusElement = document.createElement('img');
    gameStatusElement.src = gameStatusImages[0];
    gameStatusElement.style.position = 'absolute';
    gameStatusElement.style.display = "block";
    gameStatusElement.style.top = 10 + 'px';
    gameStatusElement.style.left = 10 + 'px';
    gameStatusElement.style.width = 88 + 'px';
    gameStatusElement.style.height = 36 + 'px';
    sceneElement.appendChild(gameStatusElement);


    gameStatusElement.addEventListener('click', function () {
        if (gameStatus == 0) {
            // 改为运行状态
            gameStatus = 1;
            // 播放音乐
            bgMusicControl('开始');
        } else if (gameStatus == 1) {
            // 改为暂停状态
            gameStatus = 2;
            bgMusicControl('暂停');
            gameStatusElement.style.display = "block";
        } else if (gameStatus == 2) {
            // 改为运行状态
            gameStatus = 1;
            bgMusicControl('开始');
        }
    
    })
}

// 入口
function main() {
    // 初始化
    initMap();
    initPlayer();
    initScore();
    initBgMusic();
    initGameStatus();
}

main();
/* 音乐控制 */

// 背景音乐
let bgMusics = {
    element: null,
    musics: musics
}

// 音乐初始化
function initBgMusic() {
    // 1.创建一个音乐标签，用于播放音乐
    let audioElement = document.createElement('audio');
    // 2.设置属性 循环播放：loop  元素名称：id
    audioElement.loop = true;
    // 3.随机选择背景音乐 地址 src；随机选择
    let index = parseInt(Math.random() * bgMusics.musics.length);
    audioElement.src = bgMusics.musics[index];
    // 4.添加音乐到场景标签中
    sceneElement.appendChild(audioElement);
    bgMusics.element = audioElement;

    // 创建音乐开启按钮图片
    let musicOpenElement = document.createElement('img');
    musicOpenElement.src = musicSetImages[0];
    musicOpenElement.style.position = 'absolute';
    musicOpenElement.style.display = "none";
    musicOpenElement.style.top = 10 + 'px';
    musicOpenElement.style.left = 120 + 'px';
    musicOpenElement.style.width = 88 + 'px';
    musicOpenElement.style.height = 36 + 'px';
    sceneElement.appendChild(musicOpenElement);
    // 创建音乐关闭按钮图片
    let musicCloseElement = document.createElement('img');
    musicCloseElement.src = musicSetImages[1];
    musicCloseElement.style.position = 'absolute';
    musicCloseElement.style.display = "block";
    musicCloseElement.style.top = 10 + 'px';
    musicCloseElement.style.left = 120 + 'px';
    musicCloseElement.style.width = 88 + 'px';
    musicCloseElement.style.height = 36 + 'px';
    sceneElement.appendChild(musicCloseElement);

    // 事件：点击音乐开启   
    musicOpenElement.addEventListener('click', function () {
        musicCloseElement.style.display = "block";
        musicOpenElement.style.display = "none";
        bgMusicControl('开始');
    });
    // 事件：点击音乐开启   
    musicCloseElement.addEventListener('click', function () {
        musicCloseElement.style.display = "none";
        musicOpenElement.style.display = "block";
        bgMusicControl('暂停');
    });
}


// 音乐控制  skip()：跳到第10秒
function bgMusicControl(trl) {
    switch (trl) {
        case '开始':
            bgMusics.element.play();
            break;
        case '暂停':
            bgMusics.element.pause();
            break;
        default:
            alert('只有【开始】【暂停】可选');
    }
}
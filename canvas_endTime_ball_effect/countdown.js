var WINDOW_WIDTH = 1200;
var WINDOW_HEIGHT = 600;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 100;

const endTime = new Date(2015, 5, 25, 18, 47, 52); //截止時間
var curShowTimeSeconds = 0;

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();

    setInterval(function() {
        render(context); //繪製
        update(); //數值改變
    }, 50);
}

function getCurrentShowTimeSeconds() { //獲得剩餘到數時間
    var nowTime = new Date(); //now
    var ret = endTime.getTime() - nowTime.getTime(); //截止-當前，所獲得的毫秒數
    ret = Math.round(ret / 1000) //毫秒變秒

    return ret >= 0 ? ret : 0;
}

function update() { //更新時間，使圓點重新繪製
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nexthours = parseInt(nextShowTimeSeconds / 3600);
    var nextminutes = parseInt((nextShowTimeSeconds - nexthours * 3600) / 60);
    var nextseconds = nextShowTimeSeconds % 60;

    var curhours = parseInt(curShowTimeSeconds / 3600);
    var curminutes = parseInt((curShowTimeSeconds - nexthours * 3600) / 60);
    var curseconds = curShowTimeSeconds % 60;

    if (nextseconds != curseconds) {
        if (parseInt(curhours / 10) != parseInt(nexthours / 10)) { //當前小時十位數不等於下一次顯示小時十位數，數字就會改變並增加小球
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curhours / 10));
        }
        if (parseInt(curhours % 10) != parseInt(nexthours % 10)) { //當前小時個位數不等於下一次顯示小時個位數，數字就會改變並增加小球
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curhours / 10));
        }


        if (parseInt(curminutes / 10) != parseInt(nextminutes / 10)) { //當前分鐘十位數不等於下一次顯示分鐘十位數，數字就會改變並增加小球
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curhours / 10));
        }
        if (parseInt(curminutes % 10) != parseInt(nextminutes % 10)) { //當前分鐘個位數不等於下一次顯示分鐘個位數，數字就會改變並增加小球
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curhours % 10));
        }


        if (parseInt(curseconds / 10) != parseInt(nextseconds / 10)) { //當前秒鐘十位數不等於下一次顯示秒鐘十位數，數字就會改變並增加小球
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curhours / 10));
        }
        if (parseInt(curseconds % 10) != parseInt(nextseconds % 10)) { //當前秒鐘個位數不等於下一次顯示秒鐘個位數，數字就會改變並增加小球
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curhours % 10));
        }
        curShowTimeSeconds = nextShowTimeSeconds; //更新秒數
    }

    updateBalls();
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }
}

function addBalls(x, y, num) { //增加小球
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 10) + (RADIUS + 10),
                    y: y + i * 2 * (RADIUS + 10) + (RADIUS + 10),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, //-1的多少次方，結果就是取-1或1，再乘4
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }

                balls.push(aBall);
            }
        }
    }
}

function render(cxt) { //繪製圓點

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT); //可消除原本存在的圓點

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60); //減去小時再除60分
    var seconds = curShowTimeSeconds % 60;

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt); //時
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt); //時
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt); //:
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt); //分
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt); //分
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt); //:
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt); //秒
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt); //秒

    //各種顏色小球
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI);
        cxt.closePath();
        cxt.fill();
    }
}

function renderDigit(x, y, num, cxt) { //繪製圓點正確位置
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j * (RADIUS + 10) + (RADIUS + 10), y + i * (RADIUS + 10) + (RADIUS + 10), RADIUS, 0, 2 * Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}

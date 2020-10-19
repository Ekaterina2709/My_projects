var mass = [];
var img=document.querySelectorAll('img');
for (var h = 0; h < img.length; h++) {
    mass.push(img[h].getAttribute('src'));
}

function shuffle(array) {
    var i = array.length;
    var j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

shuffle(mass);
for (var j = 0; j < img.length; j++) {
    img[j].setAttribute('src', mass[j])
}
var flip = document.querySelectorAll('.flip');
var counter_rotate=0;
var rotate=[];
var backFalse=[];
var couple_card=0;
var seconds=60;
var button=document.querySelector("button");
var modal=document.querySelector(".modal");
var overlay=document.querySelector(".overlay");
var timerID = setInterval(time, 1000);
flip.forEach(function (elem){
    elem.addEventListener('click', click)
})

function click(){
    if (this.querySelector('.back').classList.contains('back_true')){
    }else{
        if (this.querySelector('.back').classList.contains('back_false')){
        }else{
            if (backFalse.length>0) {
                backFalse.forEach(function(elem){
                    elem.classList.remove('rotate');
                    elem.querySelector('.back').classList.remove('back_false');
                })
                backFalse.pop();
                backFalse.pop();
            }
            if (counter_rotate < 2) {
                this.classList.toggle('rotate')
                if (this.classList.contains('rotate')) {
                    counter_rotate ++;
                    rotate.push(this);
                } else {
                    counter_rotate = counter_rotate - 1;
                    rotate.pop();
                }
            }
            if (counter_rotate === 2) {
                var elem = [];
                elem[0] = rotate[0].querySelector('img');
                elem[1] = rotate[1].querySelector('img');
                if (elem[0].src === elem[1].src) {
                    rotate.forEach(function (elem){
                        elem.querySelector('.back').classList.add('back_true');
                    });
                    counter_rotate = 0;
                    rotate.pop();
                    rotate.pop();
                    couple_card++;
                    if(couple_card===6) {
                        setTimeout(() => {
                            clearInterval(timerID);
                            open();
                            openWin();
                        });
                    }
                } else {
                    rotate.forEach(function (elem){
                        elem.querySelector('.back').classList.add('back_false');
                    })
                    counter_rotate = 0;
                    backFalse[0]=rotate[0];
                    backFalse[1]=rotate[1];
                    rotate.pop();
                    rotate.pop();
                }
            }
        }
    }
}

function time() {
    seconds = seconds - 1;
    if (seconds < 10) {
        seconds = '0' + String(seconds);
    } else {
        seconds = String(seconds);
    }
    document.querySelector(".time").textContent = '00:' + seconds;
    seconds = Number(seconds);
    if (seconds === 0) {
        setTimeout(() => {
            clearInterval(timerID);
            open();
            openLoose()
        });
    }
}
function open(){
    modal.classList.add("modal_show");
    overlay.classList.add("modal_show");
}
function openWin(){
    document.querySelector("span").textContent = 'WIN';
    document.querySelector("button").textContent = 'Play again';
}
function openLoose() {
    document.querySelector("span").textContent = 'LOOSE';
    document.querySelector("button").textContent = 'Try again';
}
button.addEventListener('click', function (event) {
    event.preventDefault();
    modal.classList.remove("modal_show");
    overlay.classList.remove('modal_show');
    flip.forEach(function (elem){
        elem.classList.remove('rotate');
        elem.querySelector('.back').classList.remove('back_true');

    });
    seconds = 60;
    shuffle(mass);
    for (var j = 0; j < img.length; j++) {
        img[j].setAttribute('src', mass[j])
    }
    timerID = setInterval(time, 1000);
    couple_card=0;
});
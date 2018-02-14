const https = require('https');

const url = 'https://coincheck.com/api/ticker';

let result;
let lastRate;

//function dispTime(num) { // �����\����񌅂ɐݒ�i��F�P��5��(1:5)->01:05�j
//    if (num <= 9) {
//        num = "0" + num;
//    }
//    return num;
//}
//
//function clock() { // ���v�{��
//
//    // ���ݎ����̎擾
//    var getNowTime = new Date(),
//    ye = getNowTime.getFullYear(), // �N
//    mo = getNowTime.getMonth(), // ��
//    da = getNowTime.getDate(), // ��
//    wdArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // �j���i�\���ݒ�j
//    wd = wdArr[getNowTime.getDay()], // �j��
//
//    hh = dispTime(getNowTime.getHours()), // �� (dispTime�œ񌅕\��)
//    mm = dispTime(getNowTime.getMinutes()), // �� (dispTime�œ񌅕\��)
//
//    printTime = hh + ":" + mm, // ����
//    printCal = ye + "/" + (mo + 1) + "/" + da + "/" + wd; // ���t�i�N�����Ɨj���j
//
//    document.getElementById('dispClock').innerHTML = printTime; // �����\��
//    document.getElementById('dispCal').innerHTML = printCal; // ���t�\��
//
//}

function chart() {
    https.get(url, (res) => {
      res.setEncoding('utf8');
      res.on('data', (d) => {
        result = JSON.parse(d).last;

        if (result > lastRate) {
          document.getElementById("dispChart").className = "rate-up";
        } else if (result < lastRate) {
          document.getElementById("dispChart").className = "rate-down";
        } else {
          document.getElementById("dispChart").className = "";
        }

        lastRate = result;

        document.getElementById('dispChart').innerHTML = result;
      });

    }).on('error', (e) => {
      console.log(e); //�\�����ďI��
    });
}


setInterval(function () { // ��L�̓�����P�����ƂɍX�V
//    clock();
    chart();
}, 1000);


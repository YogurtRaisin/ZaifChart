function dispTime(num) { // 時刻表示を二桁に設定（例：１時5分(1:5)->01:05）
    if (num <= 9) {
        num = "0" + num;
    }
    return num;
}

function clock() { // 時計本体

    // 現在時刻の取得
    var getNowTime = new Date(),
        ye = getNowTime.getFullYear(), // 年
        mo = getNowTime.getMonth(), // 月
        da = getNowTime.getDate(), // 日
        wdArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // 曜日（表示設定）
        wd = wdArr[getNowTime.getDay()], // 曜日

        hh = dispTime(getNowTime.getHours()), // 時 (dispTimeで二桁表示)
        mm = dispTime(getNowTime.getMinutes()), // 分 (dispTimeで二桁表示)

        printTime = hh + ":" + mm, // 時刻
        printCal = ye + "/" + (mo + 1) + "/" + da + "/" + wd; // 日付（年月日と曜日）

    document.getElementById('dispClock').innerHTML = printTime; // 時刻表示
    document.getElementById('dispCal').innerHTML = printCal; // 日付表示

}

setInterval(function () { // 上記の動作を１分ごとに更新
    clock();
}, 1000);


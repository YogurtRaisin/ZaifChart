'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');

const setWin = require("./setWin.json");
const path = require('path').join(__dirname, 'setWin.json');

let mainWindow = null;
let tray = null;

const icon = __dirname + '/icon.png';

// GCされないようにグローバル宣言
let mainWindow = null;
var Menu = null;
var Tray = null;
var nativeImage = null;
var tray = null;
var contextMenu = null;
var clickable = true;
// 全てのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 60,
    maxWidth: 400,
    maxHeight: 80,
    minWidth: 150,
    minHeight: 60,
    resizable: true,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true
   });

  mainWindow.setIgnoreMouseEvents(!clickable)
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.setPosition(setWin["x"], setWin["y"]);
  mainWindow.setSize(setWin["width"], setWin["height"]);

  // タスクトレイに格納
  Menu = electron.Menu;
  Tray = electron.Tray;
  nativeImage = electron.nativeImage;
  tray = new Tray(nativeImage.createFromPath(__dirname + "/icon.png"));

    // タスクトレイに右クリックメニューを追加
    var contextMenu = Menu.buildFromTemplate([
        { label: "表示", click: function () { mainWindow.focus(); } },
        { label: "終了", click: function () { mainWindow.close(); } }
    ]);
    tray.setContextMenu(contextMenu);

    // タスクトレイのツールチップをアプリ名に
    tray.setToolTip(app.getName());

    // タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
    tray.on("clicked", function () {
        mainWindow.focus();
    });



  mainWindow.on('close', function () {
    let item = JSON.stringify(mainWindow.getBounds());
    fs.writeFile(path, item);;
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

});

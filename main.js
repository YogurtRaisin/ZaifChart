'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const fs = require('fs');

const setWin = require("./setWin.json");
const path = require('path').join(__dirname, 'setWin.json');

const icon = __dirname + '/icon.png';

// GCされないようにグローバル宣言
let mainWindow = null;
var Menu = null;
var Tray = null;
var nativeImage = null;
var tray = null;
var contextMenu = null;
var isClickable = setWin["isClickable"];
var isStartup = setWin["isStartup"];

// 全てのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 200,
    height: 50,
    resizable: false,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    //resizable:true,
    skipTaskbar: true
   });
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.setPosition(setWin["x"], setWin["y"]);
  //mainWindow.setSize(setWin["width"], setWin["height"]);

  // タスクトレイに格納
  Menu = electron.Menu;
  Tray = electron.Tray;
  nativeImage = electron.nativeImage;
  tray = new Tray(nativeImage.createFromPath(__dirname + "/app/icon.png"));

    // タスクトレイに右クリックメニューを追加
    var contextMenu = Menu.buildFromTemplate([
        { label: "show", click: function () { mainWindow.focus(); } },
        { label: "TradeView", click: function () {
          shell.openExternal("https://coincheck.com/exchange/tradeview");
        } },
        { label: "clickThrough", type: 'checkbox', checked: isClickable, click: function(e) {
          if (e.checked) {
            mainWindow.setIgnoreMouseEvents(true);
            isClickable = true;
          } else {
            mainWindow.setIgnoreMouseEvents(false);
            isClickable = false;
          }
        } },
        { label: "startup", type: 'checkbox', checked: isStartup, click: function (e) {
          if (e.checked) {
            app.setLoginItemSettings({
              openAtLogin: true
            });
            isStartup = true;
          } else {
            app.setLoginItemSettings({
              openAtLogin: false
            });
            isStartup = false;
          }
        } },
        { label: "exit", click: function () { mainWindow.close(); } }
    ]);
    tray.setContextMenu(contextMenu);

    // タスクトレイのツールチップをアプリ名に
    tray.setToolTip(app.getName());

    // タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
    tray.on("double-click", function () {
      shell.openExternal("https://coincheck.com/exchange/tradeview");
    });



  mainWindow.on('close', function () {
    let pos = mainWindow.getBounds();
    let item = `{"x":${pos.x},"y":${pos.y},"isClickable":${isClickable},"isStartup":${isStartup}}`;
    fs.writeFile(path, item);
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

});

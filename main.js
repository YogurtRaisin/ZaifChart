'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');

const setWin = require("./setWin.json");
const path = require('path').join(__dirname, 'setWin.json');

let mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform != 'darwin')
    app.quit();
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
    transparent: true
   });
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');

  mainWindow.setPosition(setWin["x"], setWin["y"]);
  mainWindow.setSize(setWin["width"], setWin["height"]);

  mainWindow.on('close', function () {
    let item = JSON.stringify(mainWindow.getBounds());
    fs.writeFile(path, item);;
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

});

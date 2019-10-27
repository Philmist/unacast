"use strict";

//Electronのモジュール
const path = require('path');
const electron = require("electron");
const ipcMain = electron.ipcMain;

//アプリケーションをコントロールするモジュール
const app = electron.app;

// サーバー起動モジュール
var ss = require('./startServer.js');

//ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow = null;

//全てのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
  if (process.platform != "darwin") {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on("ready", () => {
  //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
  mainWindow = new BrowserWindow({width: 1280, height: 720, useContentSize: true});
  //使用するhtmlファイルを指定する
  mainWindow.loadURL(`file://${__dirname}/../html/index.html`);

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

});



//synchronous-messageチャンネルの受信処理
ipcMain.on('synchronous-message', (event, arg) => {
  // "ping"が出力される
  console.log(arg)
  // 呼び出し元の戻り値に文字列"pong"を設定
  event.returnValue = 'hoge'
});


ipcMain.on("start-server", () => {

  ss.startServer(3000);
});

ipcMain.on("stop-server", function (event, arg) {
    server.stop();
    console.log("main : server stop");
    event.sender.send("stop");
});
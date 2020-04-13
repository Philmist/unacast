/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main/ReadIcons.ts":
/*!*******************************!*\
  !*** ./src/main/ReadIcons.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * アイコン表示に関するモジュール
 * シングルトン
 */
var fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
var path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
var log = __webpack_require__(/*! electron-log */ "electron-log");
var randomIconList;
var idIconList;
/**
 * コンストラクタ
 * ・ランダムフォルダからアイコン名を取得してリスト化
 * ・IDフォルダからもリスト化、空の対応マップ作製
 * ・コテハン対応ファイルを読みこんでmapに格納
 */
var ReadIcons = /** @class */ (function () {
    function ReadIcons() {
        /**
         * アイコンランダム表示機能（デフォルト）
         * 起動時に作成したアイコンリストからランダムで1つ取得
         */
        this.getRandomIcons = function () {
            var iconPath = '';
            try {
                var dirName = './img/random/';
                // リストからランダム取得
                //  var size = randomIconList.size;
                var num = Math.floor(randomIconList.length * Math.random());
                log.info(JSON.stringify(randomIconList));
                iconPath = dirName + randomIconList[num];
            }
            catch (e) {
                log.error(e);
            }
            return iconPath;
        };
        //画像ディレクトリ
        var randomDir = path_1.default.resolve(__dirname, "../public/img/random/");
        console.log('[ReadIcons]loadRandomDir = ' + randomDir);
        log.info('[ReadIcons]loadRandomDir = ' + randomDir);
        //  ランダムアイコン取得
        randomIconList = readDir(randomDir);
        //ID用アイコンディレクトリ
        var idDir = path_1.default.resolve(__dirname, "../public/img/id/");
        console.log('[ReadIcons]loadIDDir = ' + idDir);
        //  ランダムアイコン取得
        idIconList = readDir(idDir);
    }
    return ReadIcons;
}());
var readDir = function (imgDir) {
    var iconFileList = [];
    console.log('[ReadIcons.readDir]start');
    //  指定したディレクトリのアイコン取得
    var files = fs_1.default.readdirSync(imgDir, { withFileTypes: true });
    //pngファイルのみ返却リストに格納する
    files.forEach(function (file) {
        console.log('[ReadIcons.readDir]file = ' + file);
        log.info('[ReadIcons.readDir]file = ' + file);
        // asar圧縮するとfileが文字列になる。開発環境だとfileオブジェクトになる
        var target = typeof file.name !== 'string' ? file : file.name;
        var regx = /.*\.png$/.test(target);
        if (regx) {
            iconFileList.push(target);
        }
    });
    console.log('[ReadIcons.readDir]end');
    log.info('[ReadIcons.readDir]end');
    log.info(JSON.stringify(iconFileList));
    return iconFileList;
};
/**
 * IDによるアイコン固定機能（オプションでON,OFF可能）
 * 初出のIDならばランダムでアイコンを取得し
 * IDとファイル名のセットでマップに格納
 * @param string // ID
 * @return string filename
 */
/**
 * コテハンリスト機能（オプションでON,OFF可能）
 * koteフォルダの下にkotehan.jsonを作って
 * 名前とアイコンファイル名の対応をマップにして返すだけ
 */
exports.default = ReadIcons;


/***/ }),

/***/ "./src/main/getRes.ts":
/*!****************************!*\
  !*** ./src/main/getRes.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var router = express_1.default.Router();
var log = __webpack_require__(/*! electron-log */ "electron-log");
var body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser")); // jsonパーサ
var ReadIcons_1 = __importDefault(__webpack_require__(/*! ./ReadIcons */ "./src/main/ReadIcons.ts")); //アイコンファイル名取得
var readIcons = new ReadIcons_1.default();
var JSDOM = __webpack_require__(/*! jsdom */ "jsdom").JSDOM;
var $ = __webpack_require__(/*! jquery */ "jquery")(new JSDOM().window);
var readSitaraba_1 = __importDefault(__webpack_require__(/*! ./readBBS/readSitaraba */ "./src/main/readBBS/readSitaraba.ts")); // したらば読み込み用モジュール
var sitaraba = new readSitaraba_1.default();
var Read5ch_1 = __importDefault(__webpack_require__(/*! ./readBBS/Read5ch */ "./src/main/readBBS/Read5ch.ts")); // 5ch互換板読み込み用モジュール
var read5ch = new Read5ch_1.default();
// 掲示板読み込みモジュール、一度決定したら使いまわすためにグローバル宣言
var bbsModule = null;
// リクエストのbodyをパース下りエンコードしたりするためのやつ
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
/*
 * http://localhost:3000/getRes にGETメソッドのリクエストを投げると、
 * JSON形式で文字列を返す。
 */
router.post('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var threadUrl, resNum;
    return __generator(this, function (_a) {
        log.info('getRes');
        threadUrl = req.body.threadUrl;
        resNum = req.body.resNumber;
        //リクエストURLを解析し、使用するモジュールを変更する（初回のみ）
        if (bbsModule === null) {
            bbsModule = analysBBSName(threadUrl);
        }
        //選択したモジュールでレス取得処理を行う
        bbsModule
            .read(threadUrl, resNum)
            .then(function (response) {
            console.log('[getRes.js]レス取得成功。件数=' + response.length);
            log.info('[getRes.js]レス取得成功。件数=' + response.length);
            // 返却されたjsonオブジェクトを組み立てる
            var result = buildResponseArray(response);
            // 返却
            res.header('Content-Type', 'application/json; charset=UTF-8');
            console.log('[getRes.js]レス処理完了');
            log.info('[getRes.js]レス処理完了');
            //    console.log(result);
            res.send(result);
        })
            .catch(function (err) {
            console.log(err);
            log.error(err);
        });
        return [2 /*return*/];
    });
}); });
/*
 * URLをみてどこのBBSか判定して使用するモジュールを返却する
 */
var analysBBSName = function (threadUrl) {
    //したらばドメイン名
    var sitarabaDomain = 'jbbs.shitaraba.net';
    //こんな感じで必要に応じて増やしていけばいいんじゃね？
    //  const dokkanoBBS = 'dokka.bbs.com';
    if (threadUrl.indexOf(sitarabaDomain) != -1) {
        // URLにしたらばドメイン名が入ってればしたらば
        return sitaraba;
    }
    // どこにも該当しなかったらとりあえず5chで
    // この辺も対応ドメインリストとか作ってちゃんと判定したほうがよさそう
    return read5ch;
};
/**
 * レスポンスの生成
 * レスポンスオブジェクトの配列をHTMLに変換
 */
var buildResponseArray = function (resObject) {
    //結果を格納する配列
    var result = new Array();
    console.log('[getRes.buildResponseArray]レスポンス整形開始 件数=' + resObject.length);
    resObject.forEach(function (value) {
        result.push(buildResponse(value));
    });
    return result;
};
/**
 *レスポンスのパース
 *レス番号とHTML文字列を格納したオブジェクトを返却する
 * @param object // レスオブジェクト（ReadShitaraba.jsとか参照）
 * @return { レス番 , HTML整形後のレス }のオブジェクト
 */
function buildResponse(res) {
    //  console.log('[getRes.js]パース開始');
    //  console.log(res);
    //最終的にHTML文字列にするためのダミーオブジェクト
    var $dummy = $('<div />');
    var $li = $('<li />', { class: 'list-item' });
    var $iconImg = getIcon(res.name, res.id); //アイコン取得
    var $icon = $('<span />', { class: 'icon-block' }).append($iconImg); // ここにアイコン
    //レス番を取得
    var $resNumber = $('<span />', { class: 'resNumber' }).append(res.number);
    //名前を取得
    var $name = $('<span />', { class: 'name' }).append(res.name);
    //日付を取得
    var $date = $('<span />', { class: 'date' }).append(res.date);
    //レスを取得
    var $res = $('<span />', { class: 'res' }).append(res.text);
    // 名前やレスのエリア
    var $resDiv = $('<div />', { class: 'content' });
    //レス番表示
    if (globalThis.config.showNumber) {
        $resDiv.append($resNumber);
    }
    //名前表示
    if (globalThis.config.showName) {
        $resDiv.append($name);
    }
    //時刻表示
    if (globalThis.config.showTime) {
        $resDiv.append($date);
    }
    //ここで改行化スペースを入れる
    if (globalThis.config.newLine) {
        $resDiv.append('<br/>').append($res);
    }
    else {
        $resDiv.append($res);
    }
    $li.append($icon);
    $li.append($resDiv);
    //HTMLオブジェクトをダミー要素へ入れる
    $dummy.append($li);
    //レス番号更新
    //$('#resNumber').val(parseInt(res.number) + 1);
    //  console.log('[getRes.js]パース完了');
    //  console.log($dummy.html());
    // レス番とテキストをセットにしたJSONを返す
    var result = {
        resNumber: res.number,
        html: $dummy.html(),
    };
    // JSONオブジェクトを返却
    return result;
}
/**
 * アイコン画像取得表示のためのimgタグを返す
 * @param String // name 名前
 * @param String // id ID、板によっては非表示だったりする、困る
 */
function getIcon(name, id) {
    var src = getIconFileName(name, id);
    var $imgTag = $('<img />', { class: 'icon', src: src });
    return $imgTag;
}
/**
 * アイコン画像名取得、名前やIDを見て条件によって固定のアイコンを返す
 * @param String // name 名前
 * @param String // id ID、板によっては非表示だったりする、困る
 */
function getIconFileName(name, id) {
    // アイコンファイル名
    var src;
    /* まだまだ未実装
    // コテハン機能
    if(コテハンオプション == true){
      src = ReadIcons.getKotehanIcons();
      if(src != null){
        // 名前に対応するアイコンが取得出来たらreturnする
        return src;
      }
    }
    // IDとアイコン関連付け機能
    if(IDオプション == true
      && id != null){
      src = ReadIcons.getIdIcons();
      if(src != null){
        return src;
      }
    }
    */
    // ランダムアイコン取得
    return readIcons.getRandomIcons();
}
exports.default = router;


/***/ }),

/***/ "./src/main/main.ts":
/*!**************************!*\
  !*** ./src/main/main.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Electronのモジュール
var path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
var electron_1 = __importDefault(__webpack_require__(/*! electron */ "electron"));
var log = __webpack_require__(/*! electron-log */ "electron-log");
process.on('uncaughtException', function (err) {
    log.error('electron:event:uncaughtException');
    log.error(err);
    log.error(err.stack);
    // app.quit();
});
//アプリケーションをコントロールするモジュール
var app = electron_1.default.app;
// サーバー起動モジュール
var ss = __webpack_require__(/*! ./startServer */ "./src/main/startServer.ts");
console.log(ss);
//ウィンドウを作成するモジュール
var BrowserWindow = electron_1.default.BrowserWindow;
// メインウィンドウはGCされないようにグローバル宣言
var mainWindow = null;
//全てのウィンドウが閉じたら終了
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
// Electronの初期化完了後に実行
app.on('ready', function () {
    //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
    mainWindow = new BrowserWindow({
        width: 700,
        height: 720,
        useContentSize: true,
        icon: __dirname + './../../icon.png',
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.setTitle('unacast');
    //使用するhtmlファイルを指定する
    mainWindow.loadURL(path_1.default.resolve(__dirname, '../src/html/index.html'));
    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
    // mainWindow.webContents.openDevTools();
});


/***/ }),

/***/ "./src/main/readBBS/Read5ch.ts":
/*!*************************************!*\
  !*** ./src/main/readBBS/Read5ch.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 5ch互換BBS読み込み用モジュール
 */
var rp = __importStar(__webpack_require__(/*! request-promise */ "request-promise")); //httpリクエスト
var iconv_lite_1 = __importDefault(__webpack_require__(/*! iconv-lite */ "iconv-lite")); // 文字コード変換用パッケージ
var log = __webpack_require__(/*! electron-log */ "electron-log");
//ステータスコード304 _NotModified
var NOT_MODIFIED = '304';
var RANGE_NOT_SATISFIABLE = '416';
// 最終取得スレッド
var lastThreadUrl = '';
// 最終レス番号
var lastResNumber = 0;
//最終更新日時
var lastModified = null;
// 最終バイト数
var lastByte = 0;
/**
 * コンストラクタ
 *
 */
var Read5ch = /** @class */ (function () {
    function Read5ch() {
        var _this = this;
        /**
         * レス読み込み
         * 引数で指定した板からレスを読む
         * レス番号を指定していない場合は最新1件取得
         * @param String // threadUrl スレURL
         * @param String // resNum レス番号
         */
        this.read = function (threadUrl, resNum) { return __awaiter(_this, void 0, void 0, function () {
            var rep, requestUrl, range, options, responseJson, response, statusCode, headers, str, error_1, rsArray;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.info("threadUrl=" + threadUrl + " resNum=" + resNum);
                        //板や最終日レス番号がかわったら最初からとり直す(lastmodifiと rangeのリセット)
                        if (threadUrl != lastThreadUrl || parseInt(resNum) < lastResNumber || resNum === '') {
                            lastThreadUrl = threadUrl;
                            lastModified = null;
                            lastByte = 0;
                            console.log('[Read5ch.js]resete!!!!!!!!!!!!!!!!');
                        }
                        else {
                            console.log('noresete');
                        }
                        rep = /\/test\/read.cgi(\/.+)(\/.+)\//;
                        requestUrl = threadUrl.replace(rep, '$1/dat$2.dat');
                        range = lastByte;
                        options = {
                            url: requestUrl,
                            method: 'GET',
                            encoding: null,
                            resolveWithFullResponse: true,
                            headers: {
                                'if-modified-since': lastModified,
                                range: 'bytes=' + range + '-',
                            },
                        };
                        console.log(options);
                        //掲示板へのリクエスト実行
                        console.log('[Read5ch.js]5ch系BBSレス取得API呼び出し開始');
                        log.info('[Read5ch.js]5ch系BBSレス取得API呼び出し開始');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, rp.get(options)];
                    case 2:
                        response = _a.sent();
                        statusCode = response.statusCode;
                        console.log('[Read5ch.js]5ch系BBSレス取得API呼び出し完了、statusCode=' + statusCode);
                        log.info('[Read5ch.js]5ch系BBSレス取得API呼び出し完了、statusCode=' + statusCode);
                        // レスポンスヘッダ表示
                        console.log('[Read5ch.read]レスポンスヘッダ=');
                        headers = response.headers;
                        console.log(headers);
                        //LastModifiedとRange更新処理
                        if (headers['last-modified'] != null) {
                            lastModified = headers['last-modified'];
                            console.log('[Read5ch.read]lastModified=' + lastModified);
                        }
                        str = iconv_lite_1.default.decode(Buffer.from(response.body), 'Shift_JIS');
                        // レスポンスオブジェクト作成、content-rangeがある場合とない場合で処理を分ける
                        if (headers['content-range'] == null || lastByte == 0) {
                            console.log('[Read5ch.read]content-range=' + headers['content-range']);
                            responseJson = purseNewResponse(str, resNum);
                        }
                        else {
                            responseJson = purseDiffResponse(str, resNum);
                        }
                        // 取得バイト数表示
                        if (headers['content-length'] != null && responseJson.length > 0) {
                            lastByte = lastByte + parseInt(headers['content-length']) - 1;
                            console.log('[Read5ch.read]lastByte=' + lastByte);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        rsArray = new Array();
                        responseJson = rsArray;
                        if (error_1.status == NOT_MODIFIED) {
                            log.error('[Read5ch.js]5ch系BBSレス取得APIリクエストエラー、NOT_MODIFIED');
                        }
                        else if (error_1.status == RANGE_NOT_SATISFIABLE) {
                            log.error('[Read5ch.js]5ch系BBSレス取得APIリクエストエラー、RANGE_NOT_SATISFIABLE');
                        }
                        else {
                            log.error('[Read5ch.js]5ch系BBSレス取得APIリクエストエラー、message=' + error_1.message);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        log.info(JSON.stringify(responseJson));
                        return [2 /*return*/, responseJson];
                }
            });
        }); };
    }
    return Read5ch;
}());
/**
 *取得したレスポンス（複数）のパース
 *戻りとしてパースしたjsonオブジェクトの配列を返す
 * @param string // res 板から返却されたdat
 * @param string // resNum リクエストされたレス番号
 */
var purseNewResponse = function (res, resNum) {
    //結果を格納する配列
    var result = new Array();
    // レス番号
    var num = 0;
    //新着レスを改行ごとにSplitする
    var resArray = res.split(/\r\n|\r|\n/);
    // 新着なしなら戻る。
    if (resArray.length == 0) {
        return result;
    }
    // 配列の最後に空の要素が入ることがあるので取り除く
    if (resArray[resArray.length - 1].length == 0) {
        resArray.pop();
    }
    // レス指定なしの場合最後の1件取得
    if (resNum == null || resNum === '') {
        num = resArray.length - 1;
    }
    else {
        num = parseInt(resNum) - 1;
    }
    console.log('[Read5ch.purseNewResponse]取得レス番号=' + num);
    //1行ごとにパースする
    for (; num < resArray.length; num++) {
        //パースメソッド呼び出し
        if (resArray[num].length > 0) {
            result.push(purseResponse(resArray[num], num + 1));
        }
    }
    lastResNumber = num + 1;
    // パースしたオブジェクトの配列を返却
    return result;
};
/**
 *取得したレスポンス（複数）のパース
 *戻りとしてパースしたjsonオブジェクトの配列を返す
 * @param string // res 板から返却されたdat1行分
 * @param string // resNum リクエストされたレス番号
 */
var purseDiffResponse = function (res, resNum) {
    //結果を格納する配列
    var result = new Array();
    // レス番号
    var num = parseInt(resNum);
    //新着レスを改行ごとにSplitする
    var resArray = res.split(/\r\n|\r|\n/);
    // 新着なしなら戻る。
    if (resArray.length == 0) {
        return result;
    }
    else {
        // 配列の最後に空の要素が入ることがあるので取り除く
        if (resArray[resArray.length - 1].length == 0) {
            resArray.pop();
        }
    }
    console.log('[Read5ch.purseDiffResponse]取得レス番号=' + num);
    //1行ごとにパースする
    resArray.forEach(function (value) {
        //パースメソッド呼び出し
        if (value.length > 0) {
            result.push(purseResponse(value, num));
            num++;
        }
    });
    // パースしたオブジェクトの配列を返却
    return result;
};
/**
 * レスポンスのパース
 *Jsonオブジェクトを返却する
 *@param String // res レスポンス1レス
 *@param Integer // num レス番（0スタート）
 *{
 * number: レス番号
 * name: 名前
 * email: メアド
 * date: 日付
 * text: 本文
 * threadTitle: スレタイ
 * id: ID
 *}
 */
var purseResponse = function (res, num) {
    //APIの返却値を<>で分割
    //レスの要素
    //0:名前
    //1:メアド
    //2:日付とID （2019/11/03(日) 08:55:00 ID:kanikani）みたいに表示
    //3:本文
    //4:スレタイ （1レス目のみ）
    var splitRes = res.split('<>');
    // 日付とID分離処理、' ID:'で区切る
    var dateId = splitRes[2].split(' ID:');
    var date = dateId[0];
    // IDが取得できない場合はnullにする
    var id = dateId.length == 2 ? dateId[1] : null;
    var resJson = {
        number: num,
        name: splitRes[0],
        email: splitRes[1],
        date: date,
        text: splitRes[3],
        threadTitle: splitRes[4],
        id: id,
    };
    // オブジェクトを返却
    return resJson;
};
exports.default = Read5ch;


/***/ }),

/***/ "./src/main/readBBS/readSitaraba.ts":
/*!******************************************!*\
  !*** ./src/main/readBBS/readSitaraba.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * したらば読み込み用モジュール
 */
var request = __webpack_require__(/*! request-promise */ "request-promise"); //httpリクエスト
var iconv = __webpack_require__(/*! iconv-lite */ "iconv-lite"); // 文字コード変換用パッケージ
var log = __webpack_require__(/*! electron-log */ "electron-log");
/**
 * コンストラクタ
 *
 */
var ReadSitaraba = /** @class */ (function () {
    function ReadSitaraba() {
        //テストメソッド
        this.test = function () {
            console.log(global.config);
        };
        /**
         * レス読み込み
         * 引数で指定した板からレスを読む
         * レス番号を指定していない場合は最新1件取得
         * @param String // threadUrl スレURL
         * @param String // resNum レス番号
         */
        this.read = function (threadUrl, resNum) {
            return __awaiter(this, void 0, void 0, function () {
                var requestUrl, options, responseJson;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestUrl = threadUrl.replace('read.cgi', 'rawmode.cgi');
                            if (resNum > 0) {
                                // レス番号がある場合レス番号以降を取得
                                requestUrl += resNum + '-';
                            }
                            else {
                                // レス番号がない場合最新の1件取得
                                requestUrl += 'l1';
                            }
                            options = {
                                url: requestUrl,
                                method: 'GET',
                                encoding: null,
                            };
                            //掲示板へのリクエスト実行
                            log.info('[ReadSitaraba.js]したらばレス取得API呼び出し開始');
                            console.log('[ReadSitaraba.js]したらばレス取得API呼び出し開始');
                            return [4 /*yield*/, request(options).then(function (body) {
                                    console.log('[ReadSitaraba.js]したらばレス取得API呼び出し成功');
                                    //したらばAPIの文字コードはEUC-JPなのでUTF-8に変換する
                                    var str = iconv.decode(Buffer.from(body), 'EUC-JP');
                                    // レスポンスオブジェクト作成
                                    responseJson = purseNewResponse(str);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, responseJson];
                    }
                });
            });
        };
    }
    return ReadSitaraba;
}());
//取得したレスポンス（複数）のパース
//戻りとしてパースしたjsonオブジェクトの配列を返す
function purseNewResponse(res) {
    //結果を格納する配列
    var result = new Array();
    //新着レスを改行ごとにSplitする
    var resArray = res.split(/\r\n|\r|\n/);
    //1行ごとにパースする
    resArray.forEach(function (value) {
        //パースメソッド呼び出し
        if (value.length > 0) {
            result.push(purseResponse(value));
        }
    });
    // パースした<li>オブジェクトの配列を返却
    return result;
}
/**レスポンスのパース
 *Jsonオブジェクトを返却する
 *@param String // res レスポンス1レス
 *{
 * number: レス番号
 * name: 名前
 * email: メアド
 * date: 日付
 * text: 本文
 * threadTitle: スレタイ
 * id: ID
 *}
 */
function purseResponse(res) {
    //APIの返却値を<>で分割
    //レスの要素
    //0:レス番号
    //1:名前
    //2:メアド
    //3:日付
    //4:本文
    //5:スレタイ
    //6:ID
    var splitRes = res.split('<>');
    var resJson = {
        number: splitRes[0],
        name: splitRes[1],
        email: splitRes[2],
        date: splitRes[3],
        text: splitRes[4],
        threadTitle: splitRes[5],
        id: splitRes[6],
    };
    // オブジェクトを返却
    return resJson;
}
exports.default = ReadSitaraba;


/***/ }),

/***/ "./src/main/startServer.ts":
/*!*********************************!*\
  !*** ./src/main/startServer.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
var express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
var app;
var electron_1 = __webpack_require__(/*! electron */ "electron");
// レス取得APIをセット
var getRes_1 = __importDefault(__webpack_require__(/*! ./getRes */ "./src/main/getRes.ts"));
// サーバーをグローバル変数にセットできるようにする（サーバー停止処理のため）
var server;
/* サーバー起動
 * config:設定を格納したjson、以下jsonの中身
 * url:掲示板URL
 * resNumber:読み込み開始レス位置
 * port:ポート番号
 *
 *
 */
electron_1.ipcMain.on('start-server', function (event, config) {
    // express = require('express');
    app = express_1.default();
    var ejs = __webpack_require__(/*! ejs */ "ejs");
    app.set('view engine', 'ejs');
    //viewディレクトリの指定
    app.set('views', path_1.default.resolve(__dirname, '../views'));
    app.use('/getRes', getRes_1.default);
    // 設定情報をグローバル変数へセットする
    globalThis.config = config;
    console.log('[startServer]設定値 = ');
    console.log(globalThis.config);
    app.get('/', function (req, res, next) {
        res.render('server', config);
        console.log(config);
        req.connection.end();
    });
    //静的コンテンツはpublicディレクトリの中身を使用するという宣言
    app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
    //指定したポートで待ち受け開始
    server = app.listen(config.port, function () {
        console.log('[startServer]start server on port:' + config.port);
        console.log(server.listening);
    });
    //成功メッセージ返却
    event.returnValue = 'success';
});
/**
 * サーバー停止
 */
electron_1.ipcMain.on('stop-server', function (event) {
    console.log(server.listening);
    server.close();
    app = null;
    // express = null;
    console.log('[startServer]server stop');
    console.log(server.listening);
    event.returnValue = 'stop';
});


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "ejs":
/*!**********************!*\
  !*** external "ejs" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "electron-log":
/*!*******************************!*\
  !*** external "electron-log" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-log");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "iconv-lite":
/*!*****************************!*\
  !*** external "iconv-lite" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("iconv-lite");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jquery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),

/***/ "jsdom":
/*!************************!*\
  !*** external "jsdom" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsdom");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "request-promise":
/*!**********************************!*\
  !*** external "request-promise" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request-promise");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map
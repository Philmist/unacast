import electron from 'electron';
import log from 'electron-log';
import { electronEvent } from '../main/const';

const ipcRenderer = electron.ipcRenderer;

let forceScroll = true;

document.addEventListener('DOMContentLoaded', () => {
  console.debug('[renderer.js] DOM Content Loaded');
});

ipcRenderer.on(electronEvent.FORCE_SCROLL, (event: any, args: boolean) => {
  log.info(`[FORCE_SCROLL] ${args}`);
  forceScroll = args;
});

// コメント表示
ipcRenderer.on(electronEvent.SHOW_COMMENT, (event: any, args: { config: typeof globalThis['config']; dom: string }) => {
  log.info('[show-comment] received');
  const dom = document.getElementById('res-list') as HTMLInputElement;

  // スクロール位置が端であるなら、スクロール位置も追従する
  const isTop = document.documentElement.scrollTop === 0;
  const isBottom = document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight;

  // 表示順オプションで上に追加するか下に追加するか選ぶ
  if (args.config.dispSort) {
    // 下に追加
    dom.insertAdjacentHTML('beforeend', args.dom);
  } else {
    // 上に追加
    dom.insertAdjacentHTML('afterbegin', args.dom);
  }

  if (args.config.dispSort) {
    // 新着が下
    if (isBottom || forceScroll) {
      document.documentElement.scrollTo(0, document.documentElement.scrollHeight);
    }
  } else {
    // 新着が上
    if (isTop || forceScroll) {
      document.documentElement.scrollTo(0, 0);
    }
  }
});

// リセット
ipcRenderer.on(electronEvent.CLEAR_COMMENT, (event: any) => {
  log.info('[clear-comment] received');
  const dom = document.getElementById('res-list') as HTMLInputElement;
  dom.innerHTML = '';
});

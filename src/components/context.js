/* eslint-disable no-undef */
export const isUtoolsContext =
  typeof WindowDatabaseApi !== 'undefined' &&
  typeof WindowUtoolsApi !== 'undefined';

import p from '../../package.json';
import { QUERY_KEY } from '../constant/index';
export const AppVersion = p.version;
export const AppHomepage = p.homepage;

export const EnableDebug = window.WindowEnableDebug;

const EmptyFunction = () => {
  console.log('没有运行在 utools 环境, 空方法被调用');
  if (EnableDebug) console.trace();
};

/*
数据库里就一个 doc
key 是 web search-config
value 结构是
{
    "defaultGearId": "123",
    "listGear": [
        {
            "id": "123",
            "name": "google",
            "urlPattern": "https"
        },
    ],
}
*/

const dbGet = isUtoolsContext ? WindowDatabaseApi.dbGet : EmptyFunction;
const dbGetAll = isUtoolsContext ? WindowDatabaseApi.dbGetAll : EmptyFunction;
const dbPut = isUtoolsContext ? WindowDatabaseApi.dbPut : EmptyFunction;
const dbRemove = isUtoolsContext ? WindowDatabaseApi.dbRemove : EmptyFunction;

const Key = 'web-search-config';

export const Database = {
  getConfig() {
    const ret = dbGet(Key);
    if (ret == null)
      return {
        _id: 'empty',
        rev: '',
        data: {
          defaultGearId: '',
          listGear: [{ id: '', name: 'Empty', url: '' }],
        },
      };
    return ret;
  },
  setConfig(config) {
    return dbPut(config);
  },

  /**
   * 调用这个方法会初始化数据库环境
   * 如果数据库已经初始化过, 调用这个方法没有任何影响
   * */
  init() {
    // 先检查有没有之前的数据库环境
    const origin = dbGet(Key);
    if (origin != null) return;
    dbPut({
      _id: Key,
      data: {
        defaultGearId: 'google',
        listGear: [
          {
            id: 'github',
            name: 'github',
            url: `https://github.com/search?q={${QUERY_KEY}}&ref=opensearch`,
          },
          {
            id: 'pack',
            name: 'pack',
            url: `https://www.npmjs.com/package/{${QUERY_KEY}}`,
          },
          {
            id: 'npm',
            name: 'npm',
            url: `https://www.npmjs.com/search?q={${QUERY_KEY}}`,
          },
          {
            id: 'caniuse',
            name: 'caniuse',
            url: `https://caniuse.com/?search={${QUERY_KEY}}`,
          },
          {
            id: 'k8s',
            name: 'k8s',
            url: `http://{${QUERY_KEY}}.k8s-uat-internal.ewinlu.com`,
          },
          {
            id: 'google',
            name: 'google',
            url: `https://www.google.com/search?q={${QUERY_KEY}}`,
          },
          {
            id: 'baidu',
            name: 'baidu',
            url: `https://www.baidu.com/s?wd={${QUERY_KEY}}`,
          },
          {
            id: 'docker',
            name: 'docker',
            url: `https://hub.docker.com/search?q={${QUERY_KEY}}`,
          },
        ],
      },
    });
  },
  /**
   * 调用这个方法会清空数据库
   * */
  clear() {
    const list = dbGetAll() ?? [];
    for (let doc of list) dbRemove(doc);
  },
};
const outPlugin = isUtoolsContext ? WindowUtoolsApi.outPlugin : EmptyFunction;
const onPluginEnter = isUtoolsContext
  ? WindowUtoolsApi.onPluginEnter
  : EmptyFunction;
const shellOpenExternal = isUtoolsContext
  ? WindowUtoolsApi.shellOpenExternal
  : (url) => window.open(url, '_blank');

export const Utools = {
  outPlugin,
  onPluginEnter,
  shellOpenExternal,
};

const showSaveDialog = isUtoolsContext
  ? WindowFsApi.showSaveDialog
  : EmptyFunction;
const showOpenDialog = isUtoolsContext
  ? WindowFsApi.showOpenDialog
  : EmptyFunction;

const writeFile = isUtoolsContext ? WindowFsApi.fsWrite : EmptyFunction;
const readFile = isUtoolsContext ? WindowFsApi.fsRead : EmptyFunction;
const existFile = isUtoolsContext ? WindowFsApi.fsExist : EmptyFunction;
const deleteFile = isUtoolsContext ? WindowFsApi.fsDelete : EmptyFunction;
const pathDefault = isUtoolsContext ? WindowFsApi.pathDefault : './';
export const Fs = {
  pathDefault,
  showSaveDialog,
  showOpenDialog,
  existFile,
  deleteFile,
  writeFile,
  readFile,
};

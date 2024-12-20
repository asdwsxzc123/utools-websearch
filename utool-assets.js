const fs = require('fs');
const path = require('path');

for (let source of ['plugin.json', 'preload.js']) {
  let target = path.join('./dist/', source);
  if (source === 'plugin.json') {
    // 读取plugin.json文件内容
    let content = fs.readFileSync(source, 'utf8');
    try {
      // 将JSON字符串解析为对象
      let jsonObj = JSON.parse(content);
      // 删除development字段（如果存在）
      delete jsonObj.development;
      // 将处理后的对象再转换回JSON字符串
      content = JSON.stringify(jsonObj, null, 2);
      // 写回原文件，覆盖原有内容
      fs.writeFileSync(target, content, 'utf8');
    } catch (err) {
      console.error('解析或处理plugin.json文件出错:', err);
    }
  } else {
      if (fs.existsSync(target)) fs.rmSync(target);
      fs.copyFileSync(source, target);
  }
}
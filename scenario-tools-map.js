// 场景专题页面工具URL映射
const toolUrls = {
    'Kimi': 'https://kimi.moonshot.cn',
    'WPS AI': 'https://www.wps.cn',
    '豆包': 'https://www.doubao.com',
    '美图AI PPT': 'https://www.designkit.com/ppt/',
    'Gamma': 'https://gamma.app',
    '飞书妙记': 'https://www.feishu.cn/product/minutes',
    '通义听悟': 'https://tingwu.aliyun.com',
    '讯飞听见': 'https://www.iflyrec.com',
    'ChatExcel': 'https://chatexcel.com',
    'Remove.bg': 'https://www.remove.bg',
    'DeepL Write': 'https://www.deepl.com/write',
    'Grammarly': 'https://www.grammarly.com',
    'iSlide AI': 'https://www.islide.cc',
    'ProcessOn': 'https://www.processon.com',
    'Canva': 'https://www.canva.cn',
    '文心一言': 'https://yiyan.baidu.com',
    '秘塔AI搜索': 'https://metaso.cn',
    'Notion AI': 'https://www.notion.so',
    '印象笔记AI': 'https://www.yinxiang.com',
    'FlowUs AI': 'https://flowus.cn',
    '腾讯元宝': 'https://yuanbao.tencent.com',
    '智谱清言': 'https://chatglm.cn',
    '天工AI': 'https://www.tiangong.cn',
    '海螺AI': 'https://hailuoai.com',
    '小浣熊AI': 'https://raccoon.sensetime.com',
    '百度文库AI': 'https://wenku.baidu.com',
    '讯飞智文': 'https://zhiwen.xfyun.cn',
    'ChatPPT': 'https://www.chatppt.com',
    'MindShow': 'https://www.mindshow.fun',
    'Beautiful.ai': 'https://www.beautiful.ai',
    'Tome': 'https://tome.app',
    '火山写作': 'https://writingo.net',
    'SheetAI': 'https://www.sheetai.app',
    'Rows': 'https://rows.com',
    'ChatCSV': 'https://chatcsv.com',
    '酷表ChatExcel': 'https://chatexcel.com',
    '秒转翻译': 'https://www.miaozhuan.com',
    '网易邮箱AI': 'https://mail.163.com'
};

// 获取工具URL
function getToolUrl(toolName) {
    return toolUrls[toolName] || '#';
}

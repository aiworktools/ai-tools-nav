// 前10个核心工具 - 使用logo图片路径
const coreToolsWithLogos = [
    {
        id: 1,
        name: "飞书妙记",
        category: "meeting",
        categoryName: "会议日程",
        icon: "logos/feishu.png",  // 官方logo
        iconType: "image",
        tagline: "会议录音转文字，自动生成纪要",
        // ... 其他字段
    },
    {
        id: 2,
        name: "通义听悟",
        category: "meeting",
        categoryName: "会议日程",
        icon: "阿",  // 阿里橙
        iconType: "text",
        iconColor: "#FF6A00",
        tagline: "阿里出品，音视频智能总结",
        // ... 其他字段
    },
    {
        id: 3,
        name: "讯飞听见",
        category: "meeting",
        categoryName: "会议日程",
        icon: "讯",  // 讯飞红
        iconType: "text",
        iconColor: "#E60012",
        tagline: "语音识别老字号",
        // ... 其他字段
    },
    {
        id: 4,
        name: "Kimi",
        category: "writing",
        categoryName: "文档写作",
        icon: "K",  // Kimi蓝
        iconType: "text",
        iconColor: "#4A90E2",
        tagline: "超长文本处理，一次读100页PDF",
        // ... 其他字段
    },
    {
        id: 5,
        name: "WPS AI",
        category: "writing",
        categoryName: "文档写作",
        icon: "logos/wps.png",  // 官方logo
        iconType: "image",
        tagline: "国产办公套件内置AI",
        // ... 其他字段
    },
    {
        id: 6,
        name: "美图AI PPT",
        category: "ppt",
        categoryName: "PPT演示",
        icon: "美",  // 美图粉
        iconType: "text",
        iconColor: "#FF6B9D",
        tagline: "一句话生成PPT",
        // ... 其他字段
    },
    {
        id: 7,
        name: "文心一言",
        category: "writing",
        categoryName: "文档写作",
        icon: "logos/baidu.svg",  // 百度logo
        iconType: "svg",
        tagline: "百度出品，国产大模型",
        // ... 其他字段
    },
    {
        id: 8,
        name: "豆包",
        category: "email",
        categoryName: "邮件沟通",
        icon: "豆",  // 字节绿
        iconType: "text",
        iconColor: "#00C853",
        tagline: "字节出品，中文写作助手",
        // ... 其他字段
    },
    {
        id: 9,
        name: "Notion AI",
        category: "notes",
        categoryName: "知识管理",
        icon: "logos/notion.svg",  // Notion logo
        iconType: "svg",
        tagline: "All-in-one知识库内置AI",
        // ... 其他字段
    },
    {
        id: 10,
        name: "Gamma",
        category: "ppt",
        categoryName: "PPT演示",
        icon: "γ",  // Gamma紫
        iconType: "text",
        iconColor: "#7B68EE",
        tagline: "AI生成高颜值演示文档",
        // ... 其他字段
    }
];

// CSS样式建议
const logoStyles = `
/* 图片logo */
.tool-icon img {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    object-fit: contain;
}

/* SVG logo */
.tool-icon svg {
    width: 48px;
    height: 48px;
}

/* 文字logo */
.tool-icon.text {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    border-radius: 10px;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}
`;

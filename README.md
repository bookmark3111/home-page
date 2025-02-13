# 个人主页
基于Vue的个人主页

# Demo
预览
## 主页
![主页]![image](https://github.com/user-attachments/assets/88006cb3-5fe6-428b-8128-0397f1994e89)
![行程安排](https://github.com/user-attachments/assets/80e5b6c2-dfb9-4f2b-a3ff-43bb41290f55)


## 作品集
![作品集](image/xiangceji.png)

## 弹幕板
![弹幕板](image/danmu.png)

## 手机适配
![手机：首页](image/iphone-home.png)
![手机：相册集](image/phone-xiangce.png)
![手机：弹幕板](image/phone-danmu.png)

# 修改
图标默认采用Font Awesome，如需修改图标，请前往 Font Awesome 复制图标

修改联系方式 src/config/links.json 文件中的内容值即可
修改网站列表 src/config/site.json 文件中的内容值即可
# 部署
安装 node.js 环境

node > 16.16.0 npm > 8.15.0

然后以 管理员权限 运行 cmd 终端，并 cd 到 项目根目录

在 终端 中输入：

# 安装依赖
npm install
# 预览
npm run dev
# 构建
npm run build
构建完成后，静态资源会在 dist 目录 中生成，可将 dist 文件夹下的文件上传至服务器，也可使用 Vercel 等托管平台一键导入并自动部署

Vercle部署
点击后自动部署并创建仓库

# js
 {
        "name": "主页",
        "url": "/",
        "icon": "fa fa-home"
    },

    {
        "name": "作品集",
        "url": "/picture",
        "icon": "fa fa-image"
    },
    {
        "name": "留言板",
        "url": "/message",
        "icon": "fa fa-message"
    },
    {
        "name": "弹幕板",
        "url": "/danmuban",
        "icon": "fa fa-message"
    }

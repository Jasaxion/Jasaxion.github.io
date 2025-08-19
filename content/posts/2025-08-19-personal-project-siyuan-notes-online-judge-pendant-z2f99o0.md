---
title: '[个人项目]思源笔记在线判题 OnlineJudge 挂件'
slug: personal-project-siyuan-notes-online-judge-pendant-z2f99o0
url: /post/personal-project-siyuan-notes-online-judge-pendant-z2f99o0.html
date: '2025-08-19 14:14:41+08:00'
draft: false
lastmod: '2025-08-19 14:28:33+08:00'
tags:
  - tech
keywords:
  - 个人项目
  - 开源
twikoo: true
description: 基于 Judge0，在思源笔记中集成代码判题挂件
show_toc: false
isCJKLanguage: true
---



# [个人项目]思源笔记在线判题 OnlineJudge 挂件

# 背景

突然奇想，有没有一种可能，用思源笔记进行笔记记录的时候，能够在笔记内直接执行代码？使用场景诸如学习一门编程语言，验证代码是否正确，能够低成本的运行而不需要担心环境问题。以及自己练习的算法题笔记，希望可以运行调试结果。

> 虽然有很多类似的平台提供这样的能力，但我们想要折腾嘛，能不能直接就在笔记里面实现好了，懒得再多开个网页了。

然后我刷到了 Judge0 一个开源的Online Judge服务器后端，可以轻松在 Docker下进行部署，并且官方还提供免费的 API（不过一天只能提交 50 次）。

于是乎就花了一点时间做了这一款基于 Judge0 后端/API 的思源笔记的挂件，能够支持直接在笔记内运行调试代码。

# 主要特点

> 第一次制作思源笔记挂件，大佬勿喷；

项目地址：[GitHub - Jasaxion/siyuan-code-judge: 基于Judge0的多语言代码在线判题挂件，在思源笔记里面集成 online judge"](https://github.com/Jasaxion/siyuan-code-judge)​

- 🚀 **多语言支持**：支持 40+ 种编程语言，包括 C++、Python、Java、JavaScript、Go、Rust 等，以及自定义编程语言，需要 Judge0 后端支持；
- 📝 **Monaco 编辑器**：功能完整的代码编辑器，支持语法高亮、代码提示和格式化
- 🧪 **测试用例管理**：创建和管理多个测试用例，包含预期输出
- ⚡ **实时执行**：执行代码和运行测试用例，即时获得反馈
- 📊 **详细结果**：查看执行时间、内存使用量和详细错误信息
- 🎨 **可定制**：亮色/暗色主题和可配置的 API 设置
- 💾 **自动保存**：自动保存您的代码和测试用例

# 功能截图

- 美观的代码编辑界面

![image](https://pve.digikamc.cn:56806/assets/image-20250819142505-7jgmlnz.png "相对美观的界面，支持输入/输出调试，显示时空开销")​

- 支持测试用例输入输出判题

![image](https://pve.digikamc.cn:56806/assets/image-20250819142552-18heo7n.png)​

- 支持非常多的语言以及自定义增加编程语言（需要 Judge0 后端支持）

![image](https://pve.digikamc.cn:56806/assets/image-20250819142613-j8q2am4.png "使用")​

![image](https://pve.digikamc.cn:56806/assets/image-20250819142634-mrweu2j.png "可以自行添加新的语言")​

- 编译信息输出

![image](https://pve.digikamc.cn:56806/assets/image-20250819142730-afxngvq.png "编译问题输出")​

## 安装方法

### 从商城安装

1. 打开思源笔记
2. 进入设置 > 集市 > 挂件
3. 搜索"代码判题挂件"
4. 点击安装

## 配置说明

### 使用 Judge0 官方 API

> ⚠️：官方免费订阅，只支持一天 50 次访问提交，建议有条件可以本地使用 Docker 部署 Judge0 server

使用挂件前，您需要配置 Judge0 API：

1. 获取 Judge0 API 访问权限：

    - 访问 [RapidAPI Judge0](https://rapidapi.com/judge0-official/api/judge0-ce)
    - 注册并订阅 Judge0 CE（有免费套餐）
    - 从控制台复制您的 API 密钥
2. 配置挂件：

    - 点击挂件中的设置按钮 (⚙️)
    - 输入您的 API 配置：

      - **API URL**: `https://judge0-ce.p.rapidapi.com`​
      - **API Key**: 您的 RapidAPI 密钥
      - **API Host**: `judge0-ce.p.rapidapi.com`​
    - 点击"测试连接"进行验证
    - 保存配置

### 本地 Docker 部署 Judge0 Server

#### Docker 部署，转自 Judge0 官方

> 官方仓库：
>
> https://github.com/judge0/judge0/blob/master/CHANGELOG.md#deployment-procedure

**系统要求**

请注意，Judge0 仅在 Linux 上经过测试，可能无法在其他系统上运行；因此我们不为其他系统提供支持。

我们推荐使用 **Ubuntu 22.04**，在该系统上需要进行以下 GRUB 更新操作：

1. 使用 `sudo` 打开文件 `/etc/default/grub`​
2. 在变量 `GRUB_CMDLINE_LINUX` 的值中添加 `systemd.unified_cgroup_hierarchy=0`​
3. 应用更改：`sudo update-grub`​
4. 重启服务器：`sudo reboot`​

此外，请确保已安装 **Docker** 和 **Docker Compose**。

---

**部署步骤**

1. 下载并解压发布包：

    ```
    wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
    unzip judge0-v1.13.1.zip
    ```
2. 访问一个随机密码生成网站，生成一个随机密码。  
    将该密码更新到 `judge0.conf` 文件中的 **​`REDIS_PASSWORD`​** 变量。
3. 再次访问该网站，生成另一个随机密码。  
    将该密码更新到 `judge0.conf` 文件中的 **​`POSTGRES_PASSWORD`​** 变量。
4. 运行所有服务，并等待数秒完成初始化：

    ```
    cd judge0-v1.13.1
    docker-compose up -d db redis
    sleep 10s
    docker-compose up -d
    sleep 5s
    ```
5. 现在，你的 **Judge0 CE v1.13.1** 实例已经启动并运行。  
    在浏览器中访问：

    ```
    http://<你的服务器IP>:2358/docs
    ```
    即可查看文档。

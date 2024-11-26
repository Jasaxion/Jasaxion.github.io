+++
date = '2024-11-25T10:01:03+08:00'
draft = false
title = '个人NAS配置私人图床！ZimaOS/CasaOS/Docker 配置 EasyImage 简单图床+uPic+Typora'
tags = 'tech'
show_toc = false
twikoo = true
keywords = ['NAS', '经验分享']
description = "在个人 nas 上配置私人的图床吧！ZimaOS/CasaOS/Docker 配置 EasyImage 简单图床+uPic"

+++

## 事情起因

​	最近总算完成了 github.io 个人主页由原来简陋的 docify 部署的简单界面，完善成了现在 hugo 的界面，本来之前就一直很烦这个 markdown 图片问题，总是会发生路径错误等问题。每次都需要重置一下每篇文章里面的图片链接，虽然现在网络上铺天盖地有一些图床+markdown+upic/ipic/picgo 等工具的教程，但无一例外要么是阿里云的存储资源，要么就是 sms 等一些公开图床。用个人阿里云的存储资源确实比较方便，也比较安全，但 sms 等一些公开图床还需要担心他什么时候会挂，然后图片全部上传到公开位置也不太安全。

​	于是乎，我想起了我放在老家的 Nas，是否可以在 nas 上搭建图床呢？

## 前提条件

​	如果需要公网随时访问，你的 NAS 需要具备公网访问的能力。你需要先确认你的 NAS 是否具备公网 IP，以及是否能够 ping 通。

## 基本配置

​	保研潇洒的这一年折腾了一堆东西，捡垃圾组的 nas 也是其中一个，哈哈哈。我的 nas 系统安装的是 PVE 系统用于管理多个虚拟机，其中一个虚拟机中安装有 ZimaOS，一个非常好用的一站式 NAS 系统。

​	ZimaOS 提供了一系列的 APP docker 应用，可以非常快捷且方便地进行安装。

> ZimaOS: https://github.com/IceWhaleTech/ZimaOS

​	2024年 6 月以后，docker 下载源国内已经很难访问了，如果要正确使用到 ZimaOS 的 docker app，首先需要配置 ZimaOS 的国内源，ZimaOS 的商店有一个应用就非常方便dkTurbo

<img src="https://pve.digikamc.cn:8343/i/2024/11/26/gqa02h-0.png" alt="image-20241126101158707" style="zoom:33%;" />

> 注：如果是初次安装 ZimaOS 可能在应用商店 App Store找不到这个应用，需要先增加一个商店源：
>
> 商店源文档地址「以防以后更换」：https://github.com/Cp0204/CasaOS-AppStore-Play/blob/main/README.md
>
> 我们需要在 ZimaOS 中打开应用商店 App Store 引入这个商店源
>
> <img src="https://pve.digikamc.cn:8343/i/2024/11/26/grxl34-0.png" alt="image-20241126101436351" style="zoom:33%;" />
>
> 然后直接安装并打开 dkTurbo 即可，运行 dkTurbo 等待 dkTurbo 的图标变成灰色即可。
>
> 当然过程中可能遇到更改未生效的问题，你可以尝试重启 ZimaOS 系统再尝试运行 dkTurbo，也可以打开 dkTurbo 的终端日志查看运行日志。

## 安装 EasyImage

​	在替换好商店源后搜索 EasyImage 安装简单图床，docker 安装非常方便。

## 配置 EasyImage

​	如果你希望配置简单图床 EasyImage 保存的图片路径，可以在 ZimaOS 中打开 EasyImage 的设置，配置卷，将/app/web/i 映射到你希望保存的位置，这里我将其导航到了另外一块大容量的机械硬盘中。

<img src="https://pve.digikamc.cn:8343/i/2024/11/26/gwhezn-0.png" alt="image-20241126102200590" style="zoom:50%;" />

进入 EasyImage，首先登录管理员账号，登录完成后，点击设置-API 设置

<img src="https://pve.digikamc.cn:8343/i/2024/11/26/hedyql-0.png" alt="image-20241126102531845" style="zoom:40%;" />

这里需要**记录一下 API 调用地址，和 Token，你可以重新生成新的 Token。**

与此同时，**在图床安全中打开 API 上传**

![image-20241126102642311](https://pve.digikamc.cn:8343/i/2024/11/26/gz3z92-0.png)

这样 EasyImage 图床的工作就完成了，现在我们配置本地图片上传工具。

## 配置 uPic

​	我的笔记本是 Macbook air，希望在本地 typora 自动调用图片上传，思来想去最后是在 App store 下载了 uPic 工具来完成这一操作，综合来看uPic 工具提供的功能更为全面，也更方便。

1. 打开 uPic 的偏好设置，添加自定义图床

<img src="https://pve.digikamc.cn:8343/i/2024/11/26/h0zkyj-0.png" alt="image-20241126102956959" style="zoom:50%;" />

2. 配置自定义图床

<img src="https://pve.digikamc.cn:8343/i/2024/11/26/h1wapa-0.png" alt="image-20241126103110661" style="zoom:50%;" />

```text
- API 地址填写在 EasyImage 中获取的地址
- 请求方式选择‘POST’
- 不启用 Base64
- 文件字段名 选择 image
- URL 路径选择 ["url"]
```

点击其他字段

<img src="https://pve.digikamc.cn:8343/i/2024/11/26/h8nqu9-0.png" alt="image-20241126104245063" style="zoom:40%;" />

```
header数据添加
	content-type：multipart/form-data
body 数据添加
	token：之前在 easyImage获取的 token
```

最后点击验证，如果验证成功，点击保存即可完成配置

## 在 Typora 中配置

Typora 设置-图像，选择图片上传，并将上传服务选择 uPic，最后点击验证，没问题后保存即可。

<img src="https://pve.digikamc.cn:8343/i/2024/11/26/h9mqp7-0.png" alt="image-20241126104409452" style="zoom:40%;" />


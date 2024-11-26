+++
date = '2024-11-26T09:50:31+08:00'
draft = false
title = 'PVE系统为 NAS-ZimaOS虚拟机 docker 容器网站「EasyImage简单图床」配置 SSL 证书（https 访问）'
tags = 'tech'
show_toc = false
twikoo = true
keywords = ['SSL', 'NAS', '经验分享']
description = "PVE 系统中，为 ZimaOS虚拟机 docker 容器网站「EasyImage简单图床」配置 SSL 证书（成功实现https 访问）"

+++

## 事情起因

升级了个人主页，解决了烦人的 Markdown 图片路径问题，但 https 的网站无法访问 http 的图片，造成了麻烦，为图床实现 ssl，拓展个人图床的应用能力。

见前文：[个人NAS配置私人图床！ZimaOS/CasaOS/Docker 配置 EasyImage 简单图床+uPic+Typora](https://jasaxion.github.io/posts/2024/11/%E4%B8%AA%E4%BA%BAnas%E9%85%8D%E7%BD%AE%E7%A7%81%E4%BA%BA%E5%9B%BE%E5%BA%8Azimaos/casaos/docker-%E9%85%8D%E7%BD%AE-easyimage-%E7%AE%80%E5%8D%95%E5%9B%BE%E5%BA%8A-upic-typora/)

我的情况「应该属于非常非常小众的需求了」

1. NAS 运行 PVE 系统
2. PVE 上创建一个虚拟机，构建 ZimaOS
3. ZimaOS 上安装 docker 版网站
4. 外网可以直接 http 访问该 docker 网站，但无法 https访问，现在在 PVE 系统上配置 SSL 证书使其能够正确访问

## 证书申请

[Let's Encrypt](https://letsencrypt.org/zh-cn/) 是一个由非营利性组织 互联网安全研究小组（[ISRG](https://www.abetterinternet.org/)）提供的免费、自动化和开放的证书颁发机构（CA）。

简单的说，借助 Let's Encrypt 颁发的证书可以为我们的网站免费启用 HTTPS(SSL/TLS) 。

Let's Encrypt免费证书的签发/续签都是脚本自动化的，官方提供了几种证书的申请方式方法，[点击此处 ](https://letsencrypt.org/zh-cn/docs/client-options/)快速浏览。

官方推荐使用 [Certbot ](https://certbot.eff.org/)客户端来签发证书，这种方式可参考文档自行尝试，不做评价。

### 安装 certbot 客户端

```ssh
apt install certbot
```

> 如果无法安装也可以使用 github源码使用：https://github.com/letsencrypt/letsencrypt

验证是否安装成功

```
certbot
```

### 申请证书

```
certbot certonly  -d *.you.cn --manual --preferred-challenges dns --server https://acme-v02.api.letsencrypt.org/directory
```

请将`you.cn`换成你自己的域名

| 参数                       | 说明                                                         |
| -------------------------- | ------------------------------------------------------------ |
| certonly                   | 表示安装模式，Certbot 有安装模式和验证模式两种类型的插件。   |
| --manual                   | 表示手动安装插件，Certbot 有很多插件，不同的插件都可以申请证书，用户可以根据需要自行选择 |
| -d                         | 为那些主机申请证书，如果是通配符，输入 *.you.cn（可以替换为你自己的一级域名） |
| --preferred-challenges dns | 使用 DNS 方式校验域名所有权                                  |
| --server                   | Let's Encrypt ACME v2 版本使用的服务器不同于 v1 版本，需要显示指定。 |

接下来会有几个交互需要完成

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
agree in order to register with the ACME server at
https://acme-v02.api.letsencrypt.org/directory
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(A)gree/(C)ancel: A
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Would you be willing to share your email address with the Electronic Frontier
Foundation, a founding partner of the Let's Encrypt project and the non-profit
organization that develops Certbot? We'd like to send you email about our work
encrypting the web, EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: N
Obtaining a new certificate
Performing the following challenges:
dns-01 challenge for kuaichuangkeji.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.

Are you OK with your IP being logged?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: Y
```

1. 是否同意条款：Y/A
2. 是否分享自己的邮箱：N
3. 是否记录 IP：Y

过程中需要登记一次邮箱来确定证书的状态，可以放你的常用邮箱。

### 配置域名证书

**⚠️注意，验证域名是否为自己的，需要增加一条解析记录**

**也就是到了下面的进度，一定不要着急点 Enter**

```
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name
_acme-challenge.you.cn with the following value:

<解析值>asdjkbakjsdbkajsdnlakjbndjkabdnklasnbdakslkdsaln

Before continuing, verify the record is deployed.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
Waiting for verification...
Cleaning up challenges
```

到这里后，我们保存``<解析值>`` 和 `_acme-challenge`

现在我们前往云解析服务，我用的是腾讯云 DNSpod

<img src="https://pve.digikamc.cn:8343/i/2024/11/26/ljb88i-0.png" alt="image-20241126130220334" style="zoom:50%;" />

主机记录: _acme-challenge

记录类型为：TXT

记录值为：提示中的 <解析值>

然后点击保存解析后，等1 分钟左右，回到certbot 客户端，现在可以按下回车↩︎Enter 了～

没问题的话，显示结果如下：

```
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/you.cn/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/you.cn/privkey.pem
   Your cert will expire on 2019-02-27. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot-auto
   again. To non-interactively renew *all* of your certificates, run
   "certbot-auto renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

两个重要路径：

证书文件保存在：/etc/letsencrypt/live/you.cn/fullchain.pem

密钥保存在：/etc/letsencrypt/live/you.cn/privkey.pem

### 自动更新证书

> 注意，证书不是永久的，一段时间就会过期，这样很麻烦
>
> 可以输入 certbot renew 来刷新证书，老是操作也很麻烦，自动化操作方法
>
> ```
> 1.编辑定时任务
> crontab -e
> 2.然后在 crontab 的最后一行加上
> 0 */12 * * * certbot renew --quiet --renew-hook "/etc/init.d/nginx reload"
> 3.保存即可
> ```

### 取消证书

```
1. 撤回操作
certbot revoke --cert-path /etc/letsencrypt/live/you.cn/cert.pem
2. 删除操作
certbot delete --cert-name you.cn
```

## Nginx反向代理

好了٩(•̤̀ᵕ•̤́๑)ᵒᵏᵎᵎᵎᵎ，现在我们已经有了 SSL 证书了，然后发现网站还是无法 https 访问，那当然啦。那么现在我们使用 Nginx 反向代理来为 docker 容器中的网站装配 SSL 证书。

> 题外话，一般运营商会封禁 443 80 8080 25 8443 等端口，故此如果在个人主机上配置的话，记得避开这些主流端口，否则可能会出现无法访问的问题，而且比较难查，如果是专业云主机或者商业云服务器之类的不受影响。

首先，虚拟机 ZimaOS 的局域网 IP 地址为 192.168.9.104，PVE的局域网 IP 地址为 192.168.9.108。

docker 网站映射 8010 端口到其网站的 80 端口，采用桥接网络的方式。

现在我们测试 PVE 系统是否能本地访问到 ZimaOS 上这个 docker 容器的网站

```
 curl -v http://192.168.9.104:8010
```

![image-20241126131542467](https://pve.digikamc.cn:8343/i/2024/11/26/lr6bdg-0.png)

成功连接上了，说明 PVE 本地到该 docker 容器网站的链路是通的。

### 在 PVE 上安装 nginx

```
apt update
apt install nginx -y
```

### 配置 nginx 代理

创建一个网站配置：

```
nano /etc/nginx/sites-available/you_cn
```

写入配置「同样 you.cn 改成你自己的 域名」：

```

server {
    listen 443 ssl; #注意如果运营商封禁了443端口，可以多多尝试其他的端口，尽可能不要用常用的端口，否则即便成功了，也无法成功访问
    server_name you.cn;

    # SSL配置
    ssl_certificate /etc/letsencrypt/live/you.cn/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/you.cn/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # 反向代理到虚拟机的服务
    location / {
        proxy_pass http://192.168.9.104:8010;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

```

启用配置并重启Nginx：

```
sudo ln -s /etc/nginx/sites-available/virtual_machine_proxy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 完成，测试访问

接下来就可以通过 https://you.cn/进行访问了

如果443端口被封禁了，可以修改`listen 443 ssl`部分，然后通过https://you.cn:你的自定义端口/ 访问，这样 SSL协议就成功部署到了该网站，再也不会有不安全弹窗了。








+++
date = '2024-12-22T14:23:49+08:00'
draft = true
title = '验证网络自动验证服务（校园网/公司网络适用）'
tags = 'tech'
show_toc = false
twikoo = true
keywords = ['经验']
description = "验证网络自动验证服务（校园网/公司网络适用）"

+++

## 使用场景

​	连接到校园网或公司认证网络时，有时候网络断开可能会导致需要重新进行 web 认证，真的很烦人，为了解决这一问题，实现一个自动验证的脚本，该脚本目前适用于 Ubuntu 系统

## Python 实现

```python
#!/usr/bin/env python3
import requests
import time
import subprocess
import logging
from urllib.parse import urlencode

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    filename='network_auth.log'
)

class NetworkAuthenticator:
    def __init__(self, auth_url, username, password):
        """
        初始化认证器
        auth_url: 认证页面的URL
        username: 用户名/学号
        password: 密码
        """
        self.auth_url = auth_url
        self.username = username
        self.password = password
        self.session = requests.Session()
        
    def check_internet(self):
        """
        检查是否能够访问互联网
        返回 True 如果能访问，否则返回 False
        """
        try:
            # 尝试访问百度（也可以换成其他可靠的网站）
            response = requests.get("http://www.baidu.com", timeout=5)
            return response.status_code == 200
        except requests.RequestException:
            return False

    def is_auth_page(self):
        """
        检查是否被重定向到认证页面
        """
        try:
            response = self.session.get("http://detectportal.firefox.com", timeout=5)
            return "login" in response.url.lower() or "auth" in response.url.lower()
        except requests.RequestException:
            return False

    def authenticate(self):
        """
        执行认证流程
        """
        try:
            # 构造认证数据
            auth_data = {
                'username': self.username,
                'password': self.password,
                'action': 'login'
            }
            
            # 发送认证请求
            response = self.session.post(
                self.auth_url,
                data=auth_data,
                headers={'Content-Type': 'application/x-www-form-urlencoded'},
                timeout=10
            )
            
            if response.status_code == 200:
                logging.info("认证请求成功发送")
                return True
            else:
                logging.error(f"认证失败，状态码: {response.status_code}")
                return False
                
        except requests.RequestException as e:
            logging.error(f"认证过程出错: {str(e)}")
            return False

    def monitor_and_auth(self):
        """
        持续监控网络状态并在需要时进行认证
        """
        while True:
            if not self.check_internet():
                logging.info("检测到网络不可用")
                if self.is_auth_page():
                    logging.info("检测到需要认证")
                    if self.authenticate():
                        logging.info("认证成功")
                    else:
                        logging.error("认证失败")
            time.sleep(43200)  # 每12 小时检查一次

def main():
    # 配置信息
    AUTH_URL = "https://net.tsinghua.edu.cn/auth/login"  # 根据实际情况修改
    USERNAME = "你的学号"
    PASSWORD = "你的密码"
    
    authenticator = NetworkAuthenticator(AUTH_URL, USERNAME, PASSWORD)
    
    try:
        authenticator.monitor_and_auth()
    except KeyboardInterrupt:
        logging.info("程序被用户终止")
        
if __name__ == "__main__":
    main()
```

## 使用方法

使用方法：

1. 首先安装所需的依赖：

```bash
pip3 install requests
```

2. 修改脚本中的配置信息：

- AUTH_URL：认证页面的 URL
- USERNAME：你的学号
- PASSWORD：你的密码

3. 给脚本添加执行权限：

```bash
chmod +x network_auth.py
```

4. 运行脚本：

```bash
./network_auth.py
```

> 为了让脚本在后台运行，你可以使用：
>
> ```
> nohup ./network_auth.py &

## 挂载为系统服务

### 设置系统启动单元

```
[Unit]
Description=Automatic Network Authentication Service
After=network.target
Wants=network-online.target

[Service]
Type=simple
User=YOUR_USERNAME
Group=YOUR_USERNAME
Environment="USERNAME=your_student_id"
Environment="PASSWORD=your_password"
ExecStart=/usr/local/bin/network_auth.py
Restart=always
RestartSec=30

[Install]
WantedBy=multi-user.target
```

1. 首先，将之前的 Python 脚本移动到系统目录：
```bash
sudo mv network_auth.py /usr/local/bin/
sudo chmod +x /usr/local/bin/network_auth.py
```

2. 创建 systemd 服务配置文件：
```bash
sudo nano /etc/systemd/system/network-auth.service
```
将上面创建的配置内容复制到这个文件中。

3. 修改配置文件中的参数：
   - 将 `YOUR_USERNAME` 替换为你的 Linux 用户名
   - 设置环境变量中的学号和密码

4. 重新加载 systemd 配置：
```bash
sudo systemctl daemon-reload
```

5. 启用并启动服务：
```bash
sudo systemctl enable network-auth
sudo systemctl start network-auth
```

6. 检查服务状态：
```bash
sudo systemctl status network-auth
```

7. 查看服务日志：
```bash
journalctl -u network-auth -f
```

> 服务配置说明：
> - `After=network.target`：确保在网络服务启动后再启动此服务
> - `Wants=network-online.target`：表明此服务需要网络连接
> - `Type=simple`：最基本的服务类型
> - `Restart=always`：服务崩溃时自动重启
> - `RestartSec=300`：重启间隔为 300 秒
> - 使用环境变量存储敏感信息，比直接写在脚本中更安全
>
> 如果你想要修改配置：
> 1. 编辑服务文件
> 2. 重新加载配置：`sudo systemctl daemon-reload`
> 3. 重启服务：`sudo systemctl restart network-auth`

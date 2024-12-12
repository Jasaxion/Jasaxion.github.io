+++
date = '2024-12-12T11:43:49+08:00'
draft = false
title = 'Conda 指定安装目录｜完全修改huggingface/torch等框架的.cache目录'
tags = 'tech'
show_toc = false
twikoo = true
keywords = ['经验分享', '环境配置']
description = "Conda 指定安装目录｜完全修改huggingface/torch等框架的.cache目录"

+++

## 为什么要这么做？

起因是实验室的机器将数据磁盘和用户目录完全分离了，也就是说\~/用户目录并不能放很多东西，需要另外到/data/\~目录下才能大的文件和环境。

这样会破坏很多现有的环境相关的包依赖，这篇推文当做一个踩坑记录了。

## 自定义conda 安装目录

1. 首先下载 miniconda

```shell
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

2. 使用 `-b` 和 `-p` 参数进行静默安装，并指定安装路径

```shell
bash Miniconda3-latest-Linux-x86_64.sh -p /data/user/miniconda3
```

> ⚠️/data/user/miniconda3 记得改成你自己的数据目录

3. 初始化conda

```shell
conda init
```

## 修改所有可能的.cache目录

现在conda 已经移动到/datda 目录了，但是现在运行代码时，经常会遇到模型和数据集又给下载到~/用户目录了，该怎么办呢？

现在我们修改～/.bashrc 文件

```shell
#这一部分是Conda环境的初始化，一般conda init 后会自动生成
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/data/user/miniconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/data/user/miniconda3/etc/profile.d/conda.sh" ]; then
        . "/data/user/miniconda3/etc/profile.d/conda.sh"
    else
        export PATH="/data/user/miniconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<

#下面是相关变量配置
#huggingface镜像源
export HF_ENDPOINT=https://hf-mirror.com

#XDG cache 目录
export XDG_CACHE_HOME="/data/zhansx/.cache"

#Huggingface
export HF_HOME="/data/zhansx/.cache/huggingface"
export TRANSFORMERS_CACHE="/data/zhansx/.cache/huggingface/transformers"
export HF_DATASETS_CACHE="/data/zhansx/.cache/huggingface/datasets"

# PyTorch
export TORCH_HOME="/data/zhansx/.cache/torch"

# Conda
export CONDA_ENVS_PATH="/data/zhansx/.cache/conda/envs"
export CONDA_PKGS_DIRS="/data/zhansx/.cache/conda/pkgs"

# pip
export PIP_CACHE_DIR="/data/zhansx/.cache/pip"

# TensorFlow
export KERAS_HOME="/data/zhansx/.cache/keras"
export TENSORFLOW_CACHE_DIR="/data/zhansx/.cache/tensorflow"

#下面是代理设置，设置后只需要输入proxy_on或proxy_off来开启关闭代理
proxy_on() {
        export http_proxy=http://127.0.0.1:7890
        export https_proxy=http://127.0.0.1:7890
        export no_proxy=127.0.0.1,localhost
        export HTTP_PROXY=http://127.0.0.1:7890
        export HTTPS_PROXY=http://127.0.0.1:7890
        export NO_PROXY=127.0.0.1,localhost
        echo -e "\033[32m[√] 已开启代理\033[0m"
}

# 关闭系统代理
proxy_off(){
        unset http_proxy
        unset https_proxy
        unset no_proxy
        unset HTTP_PROXY
        unset HTTPS_PROXY
        unset NO_PROXY
        echo -e "\033[31m[×] 已关闭代理\033[0m"
}
```










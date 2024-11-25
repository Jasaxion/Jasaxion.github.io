+++
date = '2024-11-25T14:01:52+08:00'
draft = true
title = '动手学 Transformers'
tags = 'notes'
show_toc = false
twikoo = true
keywords = ['Transformers', 'NLP', 'LLM']
description = "动手学习 Transformers"
+++

### Torch手写模型模板

> idea面试的时候问到了

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
#一些常见的torch包的引入方式

#torch模型定义的模板
class Net(nn.Module):
    def __init__(self,input_dim,layer1_dim,layer2_dim,output_dim):  
        super().__init__() #继承nn.Module
        #self.flatten = nn.Flatten() #定义一个展平层，使得维度一致，输入为(N,input_dim)
        self.layer1 = nn.Sequential(nn.Linear(input_dim,layer1_dim),nn.ReLU())
        #全连接线型层1（输入input_dim维，输出layer1_dim维）+Relu层
        self.layer2 = nn.Sequential(nn.Linear(layer1_dim,layer2_dim),nn.ReLU())
        #全连接线型层2（输入layer1_dim维，输出layer2_dim维）+Relu层
        self.out = nn.Sequential(nn.Linear(layer2_dim,output_dim),nn.ReLU())
        #输出层（输入layer2_dim维，输出output_dim维）+Relu层
 
    def forward(self,x):
    #前向传播函数
        x = self.flatten(x)
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.out(x)
        return x
```


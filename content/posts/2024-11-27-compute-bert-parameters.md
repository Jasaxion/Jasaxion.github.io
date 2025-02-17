+++
date = '2024-11-27T08:36:46+08:00'
draft = false
title = '[大模型面试]手推 Bert 模型的参数量'
tags = 'notes'
show_toc = false
twikoo = true
keywords = ['面试', '大模型', '经验']
description = "IDEA 研究院 大模型算法岗位的面试题，当场手推 bert 模型的参数量"

+++

><img src="https://pve.digikamc.cn:8343/i/2024/11/26/zgq3s3-0.jpeg" alt="Bert 模型架构图- Genspark" style="zoom:50%;" />

> Bert 模型主要用的倒是左侧编码器部分

- BERT-base 模型的主要架构参数：

- Layers (L) = 12 个Transformer层

- Hidden size (H) = 768

- Attention heads (A) = 12

- Vocabulary size (V) ≈ 30,522 (for BERT-base-uncased)

这几个关键参数需要牢记

让我们分层计算参数：

1. **Embedding 层参数**：
   1. Token Embeddings: V × H = 30,522 × 768
   2. Position Embeddings: 512 × 768 (最大序列长度为512 [Max_position_length])
   3. Segment Embeddings: 2 × 768 (句子A/B嵌入)
   4. Layer Normalization: 2 × 768 (gamma和beta参数)

2. **每个Transformer层的参数**：

   1. Self-Attention:
      1. Query/Key/Value matrices: 3 × (768 × 768)
      2. Output projection: 768 × 768
      3. Attention层的偏置项: 4 × 768

   2. Feed Forward Network:
   
      > 这里包含两个全连接层，首先由768维升到3072 维，然后再由3072 维度降到 768 维「4*d_model 是 transformers 的标准中间层标准」
      >
      > Input (768维) → FFN1 (3072维) → GELU → FFN2 (768维)
      >
      > 在高维空间中：
      >
      > [数据点之间的距离更容易区分]
      >
      > [特征之间的关系更容易被线性分离]
      >
      > [非线性变换（如GELU）在高维空间中更有效]
   
      1. First layer: 768 × 3072 + 3072 (权重+偏置)
   
      2. Second layer: 3072 × 768 + 768 (权重+偏置)
   
      3. Layer Normalization (2个):
   
         每个Layer Norm: 2 × 768 (gamma和beta参数)
   

> 其实这里的 FFN 操作也可以类比人的思考过程：
>
> 1 先展开思考（768→3072）：考虑所有可能性
>
> 2 深入分析（GELU）：在更大的空间中处理信息
>
> 3 总结归纳（3072→768）：提取最重要的信息

可以通过代码进行计算

```python
def calculate_bert_base_params():
    # Model dimensions
    hidden_size = 768
    num_layers = 12
    vocab_size = 30522
    max_position = 512
    
    # Embedding parameters
    embedding_params = (
        vocab_size * hidden_size +  # Token embeddings
        max_position * hidden_size +  # Position embeddings
        2 * hidden_size +  # Segment embeddings (Segment A/ Segment B)->用于标志句子的先后顺序，用于 NSP 任务
        2 * hidden_size  # Layer norm parameters
    )
    
    # Parameters for one transformer layer
    attention_params = (
        4 * hidden_size * hidden_size +  # QKV matrices + output projection
        4 * hidden_size  # Biases
    )
    
    ffn_params = (
        hidden_size * (4 * hidden_size) +  # First FFN layer (hidden_size -> 4*hidden_size)
        4 * hidden_size +  # First layer bias
        (4 * hidden_size) * hidden_size +  # Second FFN layer (4*hidden_size -> hidden_size)
        hidden_size  # Second layer bias
    )
    
    layer_norm_params = 4 * hidden_size  # 2 layer norms per transformer layer
    
    # Parameters per layer
    params_per_layer = attention_params + ffn_params + layer_norm_params
    
    # Total transformer layers parameters
    transformer_params = params_per_layer * num_layers
    
    # Total parameters
    total_params = embedding_params + transformer_params
    
    return total_params

total = calculate_bert_base_params()
print(f"BERT-base total parameters: {total:,}")
```










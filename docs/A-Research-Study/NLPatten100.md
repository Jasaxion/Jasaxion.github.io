# 100 NLP问答|注意力部分|注意力机制访谈|从入门到专家

> https://medium.com/@milana.shxanukova15/100-nlp-questions-answers-attention-part-bf86e07251de

@Jasaxion - 精做每一道题 NLPer

## 经典NLP 时代

### TF-IDF & 机器学习方法

#### TF-IDF「多文档方法」

- $T_f$：术语在文档总术语中出现的比例
- $IDF$: 逆文档频率「IDF 的核心思想是：如果一个词在文档集合中出现的频率越低，那么它对区分文档的能力就越强。换句话说，如果一个词在大多数文档中都出现，那么它可能是一个常见的词（如“的”、“是”），对区分文档的贡献不大；而如果一个词只在少数文档中出现，那么它可能是一个具有较高信息量的词，对区分文档的贡献较大。」

简单来说
$$
TF-IDF(t,d)=\frac{TF(t,d)}{DF(t)} = TF(t,d)·IDF(t) \\
t 表示单词，d 表示文档，TF(t,d)表示t在d 中的出现频次\\
DF(t)表示有多少篇文档包含t，DF 的倒数就是IDF 逆文档排序
$$
现在来说做了一些优化：
$$
Tf-Idf(t, d, D) = Tf(t, d) * IDF(t, d)
$$

$$
Tf = \frac{\text{Number of occurrences of term } t \text{ in document } d}{\text{Total number of terms in document } d}
$$

$$
\text{IDF} = \log_e \left( \frac{\text{Total number of documents in the corpus}}{\text{Number of documents with term } t \text{ in them}} \right)
$$

$$
Tf-Idf(t, d) = tf(t, d) * log(\frac{N}{df + 1}) \\
t 表示某个词\\
N 表示文档集合中的文档总数 \\
df(t) 表示包含词t的文档数 \\
log 函数用于平滑IDF 的值，避免极端值的影响
$$

```python
# legit - https://www.askpython.com/python/examples/tf-idf-model-from-scratch

import numpy as np
from nltk.tokenize import word_tokenize 
from typing import List, Dict


def create_counts(texts: List):
    sentences = []
    word_set = []
    
    for sent in texts:
        # split into words / разбиваем пословно только слова
        x = [i.lower() for  i in word_tokenize(sent) if i.isalpha()]
        
        sentences.append(x)
        for word in x:
            if word not in word_set:
                word_set.append(word)
    
    # set a vocab of unique words / создаем словарь уникальных слов 
    word_set = set(word_set)
    total_documents = len(sentences)
 
    # Creating an index for each word in our vocab / каждому слову уникальный индекс 
    index_dict = {} 
    i = 0
    for word in word_set:
        index_dict[word] = i
        i += 1
        
    return sentences, word_set, total_documents, index_dict


def count_dict(sentences: List, word_set: set) -> Dict:
    """
    Counts of words.
    @sentences: the list of sentences 
    @word_set: all words without their unique ids

    return: frequencies of each word
    """
    word_count = {}
    for word in word_set:
        word_count[word] = 0
        for sent in sentences:
            if word in sent:
                word_count[word] += 1
    return word_count


def termfreq(document: List, word: str) -> float:
    """
    Count the term frequency according to the formula 
    (num of term occurencies in the doc d) / (num of non-unique terms in doc d)

    @document: a list of words in the doc
    @word: a unique word

    return: TF value
    """
    # occurance = len([token for token in document if token == word])
    occurance = document.count(word)
    return occurance / len(document)


def inverse_doc_freq(word: str, total_documents: int, word_count: Dict):
    """
    Count the IDF according to the formula
    log (num of docs / num of docs with term t)

    @word: a unique word
    @total_documents: num of docs in corpus
    @word_count: word frequencies {word: number of docs with word}

    return: IDF value
    """
    word_occurance = word_count.get(word, 0) + 1
    return np.log(total_documents / word_occurance)

def tf_idf(sentence: List[str], vector_shape: int, index_dict: Dict, total_documents: int, word_count: Dict) -> np.array:
    """
    Get the sentence tf-idf vector

    @sentence: list of words in a sentence
    @vector_shape: number of unique words in corpus
    @index_dict: ids of words
    @total_documents: num of docs in corpus
    @word_count: word frequencies {word: number of docs with word}

    return: tf-idf vector as np.array
    """
    tf_idf_vec = np.zeros((vector_shape, ))
    for word in sentence:
        tf = termfreq(sentence, word)
        idf = inverse_doc_freq(word, total_documents, word_count)
         
        tf_idf_vec[index_dict[word]] = tf * idf 
    return tf_idf_vec

def create_vectors(texts: List):
    vectors = []
    sentences, word_set, total_documents, index_dict = create_counts(texts)
    vector_shape = len(word_set)
    word_count = count_dict(sentences, word_set)

    for sent in sentences:
        vec = tf_idf(sent, vector_shape, index_dict, total_documents, word_count)
        vectors.append(vec)
    vectors = np.array(vectors)
    return vectors, index_dict

sentences = ['This is the first document.',
        'This document is the second document.',
        'And this is the third one.',
        'Is this the first document?',]

vectors, word2id = create_vectors(sentences)
vectors.shape
```

#### BM25 算法

TF-IDF 衡量的是单个词语在文档中的重要程度，而在搜索引擎中，查询串（query）往往是由多个词语构成的。如何衡量多个词语与文档的关联程度，就是BM25 所解决的问题。

对于查询语句$Q$，由关键字$q_1,q_2...q_n$组成。$D$为一个被检索的文档，它们之间的相似度BM25 的度量定义如下:
$$
BM25(D,Q)=\sum_{i=1}^nIDF(q_i)·\frac{TF(q_i,D)·(k_1+1)}{TF(q_i,D)+k_1·(1-b+b·\frac{|D|}{avgDL})}\\
avgDL 表示所有文档的平均长度
$$

> BM25 的大意是对查询语句中所有单词的IDF 加权求和，两个常数参数与TF 可视为调整IDF 权重的参数。$k_1$越大，TF 对文档得分的正面影响越大。$b$越大，文档长度对得分的负面影响越大。

注：当$k_1=b=0$时，BM25 完全等价于所有单词的 IDF 之和。而在TF-IDF 中，当IDF 固定时，得分正比于TF，这样长文档先天更有优势，并不公平。BM25 这种处理TF 的方式显得更为精细。

BM25 的实现算法：

```python




```

#### 什么是TF-IDF 中的标准化？

TF - IDF 标准化可以在函数本身的框架内理解。 TF 代表文档中的术语频率。在较长的文档中，TF 值可能会更高，因为文档中的单词较多。

通过文档长度标准化，我们可以考虑像“cat”这样的单词，它在 1000 字的文本中出现 10 次，与像“cat”这样的单词在 500 字的文本中出现 5 次一样重要。

在sklearn中的TF-IDF向量化器中，我们还可以在计算所有分数后使用归一化。如果我们使用 L2 归一化，我们可以使用两个向量之间的余弦相似度作为点积。

> - TF-IDF 标准化的目的是消除文档长度或词汇频率对 TF-IDF 值的影响，使得不同文档或不同词汇之间的 TF-IDF 值更具可比性。「显然并不能取代BM25」

> [!NOTE]
>
> Sklearn: https://scikit-learn.org/stable/modules/generated/sklearn.feature_extraction.text.TfidfVectorizer.html

#### 为何在当今时代你需要了解TF-IDF，以及如何在复杂模型中应用它？





#### 解释朴素贝叶斯是如何工作的。你可以用它做什么？







#### 支持向量机（SVM）为何容易出现过拟合？





#### 解释文本预处理的可能方法（词形还原和词干提取）。你知道哪些相关算法，以及在什么情况下会使用它们？



#### 你知道哪些文本相似度的度量指标？





#### 解释余弦相似度和余弦距离之间的区别。这些值中哪一个可以是负的？你会如何使用它们？







### 指标





### 词嵌入Word2Vec





### RNN & CNN 时代





## NLP 大模型时代

### 注意力机制和Transformer 架构









### Transformer 模型类型





### 位置编码







### 预训练Pretraining





### 分词器Tokenizers







### 训练Training







### 推理Inference





### 大模型LLM

#### 模型参数量的计算





#### VAE



#### VQ







## 额外分析问题










































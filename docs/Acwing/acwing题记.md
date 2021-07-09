#### 3729.改变数组元素 2021年6月25日

> 给定一个空数组 V 和一个整数数组 a1,a2,…,an。
>
> 现在要对数组 V 进行 n 次操作。
>
> 第 i 次操作的具体流程如下：
>
> 从数组 V 尾部插入整数 0。
> 将位于数组 V 末尾的 ai 个元素都变为 1（已经是 1 的不予理会）。
> 注意：
>
> ai 可能为 0，即不做任何改变。
> ai 可能大于目前数组 V 所包含的元素个数，此时视为将数组内所有元素变为 1。
> 请你输出所有操作完成后的数组 V。
>
> 输入格式
> 第一行包含整数 T，表示共有 T 组测试数据。
>
> 每组数据第一行包含整数 n。
>
> 第二行包含 n 个整数 a1,a2,…,an。
>
> 输出格式
> 每组数据输出一行结果，表示所有操作完成后的数组 V，数组内元素之间用空格隔开。
>
> ##### 数据范围<!-- {docsify-ignore} -->
>
> 1≤T≤20000,
> 1≤n≤2x10^5,
> 0≤ai≤n,
> 保证一个测试点内所有 n 的和不超过  2×10^5 。
>
> ##### 输入样例：<!-- {docsify-ignore} -->
>
> ```
> 3
> 6
> 0 3 0 0 1 3
> 10
> 0 0 0 1 0 5 0 0 0 2
> 3
> 0 0 0
> ```
>
> ##### 输出样例：<!-- {docsify-ignore} -->
>
> ```
> 1 1 0 1 1 1
> 0 1 1 1 1 1 0 0 1 1
> 0 0 0
> ```

> TIP：直接模拟超时了TLE
> 采用巧妙的方法；从后往前进行判断
>
> [L,R]表示要改变数字为1的区间
>
> 如果当前位置位于要改变的区间内，则将此处的a[i]改变成1.

```C++
#include <iostream>
#include <cstring>

using namespace std;
const int N = 200010;

int main()
{
    int T;
    scanf("%d",&T);
    while(T--)
    {
        int n;
        int a[N];
        int w[N];
        int x;
        scanf("%d",&n);
        memset(w,0,sizeof w);
        int pos = 0;
        for(int i = 0; i < n; i ++)
        {
            scanf("%d",&a[i]);
        }
        //倒着输出 O(n)
        int max_l = N;
        for(int i = n - 1; i >= 0; i --)
        {
            max_l = min(max_l, i - a[i] + 1); //更新边界
            if(max_l <= i) a[i] = 1; //如果在边界内则此处a[i]改为1
        }
        for(int i = 0; i < n; i ++) printf("%d ",a[i]);
        printf("\n");
        
        
        /*!TLE超时
        for(int i = 0; i < n; i ++)
        {
            scanf("%d",&x);
            if (x == 0)
            {
                a[i] = 0;
                continue;
            }
            if (x != 0)
            {
                for(int j = i; j > i - x; j --)
                {
                    if(j < 0) break;
                    a[j] = 1;
                }
            }
        }
        for(int i = 0; i < n; i ++) printf("%d ",a[i]);
        printf("\n");
        */
    }
    return 0;
}
```

#### 3731.序列凑零 2021年6月30日

> 给定一个长度为 n 的整数序列 a1,a2,…,an。
>
> 所有 ai 都是非零整数并且绝对值不超过 100。
>
> 另外，n 是偶数。
>
> 现在，请你构造另一个整数序列 b1,b2,…,bn，使得 a1×b1+a2×b2+…+an×bn=0 成立。
>
> 要求，所有 bi 都是非零整数并且绝对值不超过 100。
>
> 输入格式
> 第一行包含整数 T，表示共有 T 组测试数据。
>
> 每组数据第一行包含整数 n。
>
> 第二行包含 n 个整数 a1,a2,…,an。
>
> 输出格式
> 每组数据输出一行 b1,b2,…,bn。
>
> 可以证明答案一定存在。
>
> 如果答案不唯一，输出任意合理方案均可。
>
> ##### 数据范围<!-- {docsify-ignore} -->
>
> 1≤T≤1000,
> 2≤n≤100,
> |ai|≤100,ai≠0,
> |bi|≤100,bi≠0
>
> ##### 输入样例：<!-- {docsify-ignore} -->
>
> ```
> 2
> 2
> 1 100
> 4
> 1 2 3 6
> ```
>
> ##### 输出样例：<!-- {docsify-ignore} -->
>
> ```
> -100 1
> 1 1 1 -1
> ```

> 首先读题一定要细心，
>
> 要确保找准题干中的关键字，要耐得住寂寞，坐得下板凳。
>
> <img src=".\acwing题记.assets\image-20210630153938471.png" alt="image-20210630153938471" style="zoom:65%;" />

```C++
#include <iostream>

using namespace std;

const int N = 110;
int a[N];
int b[N];

int main()
{
    int T;
    scanf("%d",&T);
    int n;
    while(T--)
    {
        scanf("%d",&n);
        for(int i = 0; i < n; i ++) scanf("%d",&a[i]);
        for(int i = 0; i < n; i = i + 2)
        {
            b[i+1] = -a[i];
            b[i] = a[i + 1];
        }
        for(int i = 0; i < n ; i ++)
        {
            printf("%d ",b[i]);
        }
        printf("\n");
    }
    return 0;
}
```

#### 3732.矩阵复原 2021年6月30日

> 一个 n×m 的整数矩阵，已知其每一行从左到右拥有哪些元素，每一列从上到下拥有哪些元素。
>
> 但是，行和列的具体顺序并不确定。
>
> 请你根据已知的信息，将矩阵复原并输出。
>
> 输入格式
> 第一行包含整数 T，表示共有 T 组测试数据。
>
> 每组数据第一行包含两个整数 n,m。
>
> 接下来 n 行，每行包含 m 个整数，表示其中一行从左到右的所有元素。
>
> 接下来 m 行，每行包含 n 个整数，表示其中一列从上到下的所有元素。
>
> 输出格式
> 每组数据输出一个 n 行 m 列的矩阵。
>
> 可以证明一定存在唯一解。
>
> 数据范围
> 1≤T≤105,
> 1≤n,m≤500,
> 一个测试点的所有测试数据的 n×m 之和不超过 250000。
> 矩阵中包含 1∼n×m 中的每个数恰好一次。
> 矩阵的每一行和每一列的信息都保证恰好给出一次。
>
> #### 输入样例：<!-- {docsify-ignore} -->
>
> ```
> 2
> 2 3
> 6 5 4
> 1 2 3
> 1 6
> 2 5
> 3 4
> 3 1
> 2
> 3
> 1
> 3 1 2
> ```
>
> #### 输出样例：<!-- {docsify-ignore} -->
>
> ```
> 1 2 3 
> 6 5 4 
> 3 
> 1 
> 2 
> ```

> 因为输入数据的位置并不知晓。
>
> 可以巧妙记录，可以在记录数据的时候
>
> 按行输入的时候，可以额外记录每个数据的y坐标的位置
>
> 按列输入的时候，可以额外记录每个数据的x坐标的位置
>
> `typedef pair<int,int> PII`的巧妙使用

```C++
#include <bits/stdc++.h>
using namespace std;

typedef pair<int,int> PII;
const int N = 250010;
const int M = 510;
PII a[N];
int w[M][M];

int main()
{
    int T;
    scanf("%d",&T);
    int n,m;
    while(T--)
    {
        scanf("%d%d",&n,&m);
        int cur;
        for(int i = 1; i <= n; i ++)
        {
            for(int j = 1; j <= m; j++)
            {
                scanf("%d",&cur);
                a[cur].second = j;
            }
        }
        for(int i = 1; i <= m; i ++)
        {
            for(int j = 1; j <= n; j ++)
            {
                scanf("%d",&cur);
                a[cur].first = j;                
            }
        }
        for(int i = 1; i <= n * m; i ++)
        {
            w[a[i].first][a[i].second] = i;
        }
        for(int i = 1; i <= n; i ++)
        {
            for(int j = 1; j <= m ; j ++)
            {
                printf("%d ",w[i][j]);
            }
            printf("\n");
        }
    }
    return 0;
}
```

#### 3761.唯一最小数

> 给定一个长度为 n 的整数数组 a1,a2,…,an。
>
> 请你找到数组中只出现过一次的数当中最小的那个数。
>
> 输出找到的数的索引编号。
>
> a1 的索引编号为 1，a2 的索引编号为 2，…，an 的索引编号为 n。
>
> 输入格式
> 第一行包含整数 T，表示共有 T 组测试数据。
>
> 每组数据第一行包含整数 n。
>
> 第二行包含 n 个整数 a1,a2,…,an。
>
> 输出格式
> 每组数据输出一行结果，即满足条件的数的索引编号，如果不存在满足条件的数，则输出 −1。
>
> 数据范围
> 1≤T≤2×104,
> 1≤n≤2×105,
> 1≤ai≤n,
> 同一测试点内的所有 n 的和不超过 2×105。
>
> #### 输入样例：<!-- {docsify-ignore} -->
>
> ```
> 6
> 2
> 1 1
> 3
> 2 1 3
> 4
> 2 2 2 3
> 1
> 1
> 5
> 2 3 2 4 2
> 6
> 1 1 5 5 4 4
> ```
>
> #### 输出样例：<!-- {docsify-ignore} -->
>
> ```
> -1
> 2
> 4
> 1
> 2
> -1
> ```

> 思路：
>
> 统计一个数出现的次数的话——>联想到哈希表
>
> 1.统计出现次数为1的数
> 2.找出统计的数字中的最小的数

```C++
#include <iostream>
#include <cstring>

using namespace std;
const int N = 200010;

int cnt[N],d[N];

int main()
{
    int T;
    scanf("%d",&T);
    while(T--)
    {
        int n;
        int res = -1;
        memset(cnt,0,(n+1)*4); //memset以内存为单位，这里更新一下前n+1个数，*4是因为int占4个字节
        scanf("%d",&n);
        for(int i = 1; i <= n; i ++)
        {
            scanf("%d",&d[i]);
            cnt[d[i]]++;
        }
        for(int i = 1; i <= n; i ++)
        {
            if(cnt[d[i]] == 1)
            {
                if(res == -1 || d[res] > d[i])
                {
                    res = i;
                }
            }
        }
        printf("%d\n",res);
    }
    return 0;
}
```


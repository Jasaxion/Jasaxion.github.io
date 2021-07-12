### 2021年7月12日

#### P1090 [NOIP2004 提高组] 合并果子 / [USACO06NOV] Fence Repair G

> https://www.luogu.com.cn/problem/P1090

> 思路：
>
> 堆排序，可以利用小根堆来解决这个问题
> 每次取出堆里面的2个数字，然后存入两个数字的和
>
> 想法Ⅰ：小根堆模板，每次取出最小的两个取出后相应位置变成0，然后计算两者之和，然后将之和重新压入到堆里面。
> 这里每次进行一次出堆和入堆的操作，都完整地进行一次堆排序的过程，时间复杂度较高
>
> 想法Ⅱ：小根堆排序优化版
>
> ```C++
> //注意：以下是从1~n进行编号的。
> //堆的初始化操作：
> len = 0;
> memeset(heap, 0 , sizeof(heap));
> //将元素压入堆的操作
> void push(int x)
> {
>     heap[++len] = x;
>     int son = len;
>     int parent = son / 2;
>     while(heap[son] < heap[parent] && parent >= 1)
>     {
>         swap(heap[son], heap[parent]);
>         son = parent;
>         parent = son / 2;
>     }
> }
> //压入的同时建好堆
> //将元素从堆中取出来
> void pop()
> {
>     swap(heap[1], heap[len]);
>     henp[len -- ] = 0;
>     int parent = 1;
>     int son = 2;
>     while(son <= len)
>     {
>         if(son < len && heap[son] > heap[son + 1]) son ++;
>         if(heap[parent] > heap[son])
>         {
>             swap(heap[parent], heap[son]);
>             parent = son;
>             son = parent * 2;
>         }else break;
>     }
> }
> ```

```C++
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <algorithm>
#include <cstring>

using namespace std;
const int N = 10010;
int n;
int a[N];
int len;
void pop()
{
    swap(a[1],a[len]);
    a[len -- ] = 0;
    int parent = 1;
    int son = 2;
    while(son <= len)
    {
        if(son < len && a[son] > a[son + 1]) son ++;
        if(a[parent] > a[son])
        {
            swap(a[parent],a[son]);
            parent = son;
            son = parent * 2;
        }else break;
    }
}
void push(int x)
{
    a[++len] = x;
    int son = len , parent = son / 2;
    while(a[son] < a[parent] && parent >= 1)
    {
        swap(a[son],a[parent]);
        son = parent,
        parent = son / 2;
    }
}
int main()
{
    int res = 0;
    int x;
    scanf("%d", &n);
    len = 0;
    memset(a,0,sizeof(a));
    for(int i = 1 ; i <= n ; i ++)
    {
        scanf("%d", &x);
        push(x);
    }
    while(len > 1)
    {
        int x,y;
        x = a[1]; pop();
        y = a[1]; pop();
        push(x+y);
        res += x+y;
    }
    printf("%d",res);
    return 0;
}
```



#### P1190 [NOIP2010 普及组] 接水问题

>  https://www.luogu.com.cn/problem/P1190

> 思路：
>
> 要从根本上发现，什么叫模拟，要去思考去模拟算法实现的全过程，去发现隐含条件

```C++
#include <iostream>
#include <cstdio>
#include <cstdlib>

using namespace std;
const int N = 11000;
const int M = 110;
int w[N];
int p[M];
int main()
{
    int n,m;
    scanf("%d%d", &n, &m);
    for(int i = 1; i <= n ; i ++)
    {
        scanf("%d",&w[i]);
    }
    int ans = 0;
    for(int i = 1; i <= m; i ++)
    {
        p[i] = w[i];
    }
    int next = m + 1;
    while(next <= n + m ) // 此处设置n + m的目的是之后如果所有都完毕后，只需要把当前水量全部流完就行了。当前有m个盆
    {
        for(int i = 1; i <= m; i ++)
        {
            p[i] --;
            if(p[i] == 0)
            {
                p[i] = w[next];
                next++;
            }
        }
        ans++;
    }
    printf("%d", ans);
    return 0;
}
```

#### P7427 [THUPC2017] 玩游戏

> https://www.luogu.com.cn/problem/P7427

> 构造题&&SPJ类题
>
> *//TODO:本题为构造题，SPJ问题，末尾不能有多余的空格和回车*
>
> *//只需要找到一种满足要求的情况即可*
>
> *//构造题发现，只有1+2+3+4+....+i == a + b的时候，才有解*
>
> *//且次数的操作次数是i次*
>
> *//然后对于a而言，在1 ~ i之间*
>
> *//如果a == 1~i之间的某个数那么就直接输出这个数j*
>
> //👆此时结束操作，可以证明当a == j的时候可获得唯一解，且此时的操作i次已经完成
>
> //如果a > 1 ~ i 之间的最大值j ，那么a = a - j 并输出j;然后再一个一个访问 j ~ 1之间的元素,直到a==j

```C++
#include <iostream>
#include <cstdlib>
#include <cstdio>
//特别注意：
//本题的数据量比较大，已经爆int
//因此本题应该采用long long来存储整型数据
using namespace std;
const int N = 100010;
typedef long long LL;
int main()
{
    LL a,b;
    scanf("%lld%lld", &a, &b);
    LL sum = a + b;
    LL n = 0;
    LL i = 1;
    while(1)
    {
        n += i;
        if(n == sum) //只有n == sum的时候才有解，此时的解就是i次
        {
            printf("%lld ",i);
            for(LL j = i; j >= 1; j --)
            {
                if(a == j) 
                {
                    printf("%lld",j);
                    break;
                }
                if(a > j)
                {
                    printf("%lld " ,j);
                    a = a - j;
                }
            }
            break;
        }
        if (n > sum)
        {
            printf("No");
            break;
        }
        i++;
    }
    return 0;
}
```

#### P1684 考验

> https://www.luogu.com.cn/problem/P1684

> 贪心算法正解：
>
> 由题意可知，满足条件的韵脚有
> AABB，ABBA，ABAB  ---> 两种不同的韵脚分别出现2次
>
> AAAA --->相同的韵脚出现4次
>
> --->注意每次获得一个满足条件的对。要清除一次数据。重新开始遍历
>
> 可以用STL库的map

```C++
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cstring>

using namespace std;
const int N = 4010;
int w[N];
int main()
{
    int n;
    scanf("%d", &n);
    int x;
    int temp = 0;
    int ans = 0;
    memset(w, 0, sizeof(w));
    for(int i = 1; i <= n; i ++)
    {
        scanf("%d", &x);
        w[x] ++;
        if(w[x] == 2) temp ++;
        if(temp == 2)
        {
            ans++;
            temp = 0;
            memset(w, 0, sizeof(w));
        }
        if(w[x] == 4)
        {
            ans ++;
            temp = 0;
            memset(w, 0, sizeof(w));
        }
    }
    printf("%d", ans);
    return 0;
}
```


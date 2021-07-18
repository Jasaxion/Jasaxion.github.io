> 让cin和scanf一样快吧！ 
>
> 主函数里面加上 `ios::sync_with_stdio(false);`

### 2021年7月12日

#### P1090 [NOIP2004 提高组] 合并果子 / [USACO06NOV] Fence Repair G

> 该题升级版P6033 [NOIP2004 提高组] 合并果子 加强版

> https://www.luogu.com.cn/problem/P1090

> 思路：
>
> 【也是一种哈夫曼编码为何取得最小值的证明过程】
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
>  heap[++len] = x;
>  int son = len;
>  int parent = son / 2;
>  while(heap[son] < heap[parent] && parent >= 1)
>  {
>      swap(heap[son], heap[parent]);
>      son = parent;
>      parent = son / 2;
>  }
> }
> //压入的同时建好堆
> //将元素从堆中取出来
> void pop()
> {
>  swap(heap[1], heap[len]);
>  henp[len -- ] = 0;
>  int parent = 1;
>  int son = 2;
>  while(son <= len)
>  {
>      if(son < len && heap[son] > heap[son + 1]) son ++;
>      if(heap[parent] > heap[son])
>      {
>          swap(heap[parent], heap[son]);
>          parent = son;
>          son = parent * 2;
>      }else break;
>  }
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

#### P6878 [JOI 2020 Final] JJOOII 2 [?]

> https://www.luogu.com.cn/problem/P6878

> 思路题解：

```C++
#include <bits/stdc++.h>
using namespace std;
const int MAXN=2e5+5;
char s[MAXN];
int n,k,ne[MAXN][3]; 
//ne数组存放删除了多少
int main(){
	scanf("%d%d%s",&n,&k,s+1);
    //s+1目的是为了让字符串从1开始
	int cur=1,num=0;
    //计算"J"有多少个
	while(cur<=n && num<k) num+=(s[cur++]=='J');
    cur--;
	for(int i=1;i<=n+1;i++){
		ne[i][0]=cur;
		if(s[i]=='J'){
			if(cur!=n+1) cur++;
			while(cur<=n&&s[cur]!='J') cur++;
		}
	}
	cur=1,num=0;
	while(cur<=n&&num<k) num+=(s[cur++]=='O');
    cur--;
	for(int i=1;i<=n+1;i++){
		ne[i][1]=cur;
		if(s[i]=='O'){
			if(cur!=n+1) cur++;
			while(cur<=n&&s[cur]!='O') cur++;
		}
	}
	cur=1,num=0;
	while(cur<=n&&num<k) num+=(s[cur++]=='I');
    cur--;
	for(int i=1;i<=n+1;i++){
		ne[i][2]=cur;
		if(s[i]=='I'){
			if(cur!=n+1) cur++;
			while(cur<=n&&s[cur]!='I') cur++;
		}
	}
	int ans=n+1;
	for(int i=1;i<=n;i++){
		int r=ne[i][0];
		if(r!=n+1) r=ne[r+1][1];
		if(r!=n+1) r=ne[r+1][2];
		if(r!=n+1) ans=min(ans,r-i+1-(k*3));
	}
    if(ans == n + 1)
    {
        printf("%d",-1);
    }
    else
    {
        printf("%d",ans);
    }
}
```

### 2021年7月13日

#### P3708 koishi的数学题

> https://www.luogu.com.cn/problem/P3708

> 思路与想法：
>
> 递推类型的题目：
>
> > 思考取模MOD运算所要满足的条件：
> >
> > 1. 求整数商：c = a / b;
> >
> > 2. 计算模或余数： r = a - c * b
> >
> >    > (a + b) % p = (a % p + b % p) % p 
> >    >
> >    > (a - b) % p = (a % p - b % p) % p 
> >    >
> >    > (a * b) % p = (a % p * b % p) % p 
> >    >
> >    > a ^ b % p = ((a % p)^b) % p 
> >    >
> >    > 结合律：
> >    >
> >    > ((a+b) % p + c) % p = (a + (b+c) % p) % p 
> >    >
> >    > ((a*b) % p * c)% p = (a * (b*c) % p) % p 
> >    >
> >    > 交换律：
> >    >
> >    > (a + b) % p = (b+a) % p 
> >    >
> >    > (a * b) % p = (b * a) % p 
> >    >
> >    > 分配律：
> >    >
> >    > ((a +b)% p * c) % p = ((a * c) % p + (b * c) % p) % p 
>
> 本题思路：[递推方式]
>
> $f(x)  = \sum_{i=1}^nx(mod\ i)$
>
> $f(x) = nx - \sum_{i=1}^n \lfloor \frac{x}{i}*i \rfloor$  <------ //代码中最后输出的是这个
>
> 直接运算时间复杂度会比较高
>
> //单独分析一下 $\sum_{i=1}^n \lfloor \frac{x}{i}*i \rfloor$
>
> 考虑递推方式:$f(x) - f(x-1) = \sum_{i=1}^ni*(\lfloor\frac{x}{i}\rfloor -\lfloor\frac{x-1}{i}\rfloor)$ 
>
> > 善于发现：对于后面一个式子，当i能被整除的时候，$\lfloor\frac{x}{i}\rfloor -\lfloor\frac{x-1}{i}\rfloor = 1 当其不能被整除的时候，由于整数部分相同，故其值为0$
> >
> > --> $\sum_{i=1}^ni*(\lfloor\frac{x}{i}\rfloor-\lfloor\frac{x-1}{i}\rfloor) = \sum_{d|x}^x = \xi(x)$
> >
> > $f(x) - f(x-1) = \xi(x)$
>
> 关于$\xi(x)$ 因为能够整除的时候其值为1，不能够被整除的时候其值为0，
> 所以其和$\sum$来说就是其所有因子总和。
>
> ```C++
> for(int i = 1; i <= n; i ++)
> {
>     for(int j = i; j <= n; j = j + i)
>     {
>         f[j] = f[j] + i;
>     }
> }
> //暴力筛：找能被整除的数 （也就是找因子）
> ```

```C++
#include <iostream>
#include <cstdio>
#include <cstdlib>

using namespace std;
const int N = 1000010;
typedef long long LL;

LL f[N],res[N];
int main()
{
    int n;
    scanf("%d",&n);
    //暴力筛选：目的是求出所有因子
    for(int i = 1; i <= n; i ++)
    {
        for(int j = i; j <= n; j = j + i)
        {
            f[j] = f[j] + i;
        }
    }
    //递推式后一部分就是该数的所有因子的和
    res[1] = 1;
    for(int i = 2; i <= n; i ++)
    {
        res[i] = res[i - 1] + f[i]; //递推式求解
    }
    //👆求出所有θ(X)
    for(int i = 1; i <= n; i ++)
    {
        printf("%lld ",(LL)n*(LL)i - res[i]); //根据分析得到的递推式求得其解
    }
    return 0;
}
```



#### P1255 数楼梯

> https://www.luogu.com.cn/problem/P1255

> 思路：
>
> 高精度与斐波那契数列结合

```C++
#include <bits/stdc++.h>
#include <vector>

using namespace std;
typedef long long LL;
const int N = 5010;
int num[N][5001];
//数组开太大容易MLE
//高精度加法+斐波那契数列
//斐波那契数列的非递归方式
int main()
{
    int n;
    int len = 1;
    scanf("%d",&n);
    num[1][1] = 1; //第1项
    num[2][1] = 2; //第2项
    for(int i = 3; i <= n; i ++) //从第三项开始
    {
        for(int j = 1; j <= len; j ++)
        {
            num[i][j] = num[i - 1][j] + num[i - 2][j]; //模拟斐波那契数列的由来
        }
        for(int j = 1; j <= len; j ++)//高精度加法
        {
            if(num[i][j] >= 10)//如果有一项大于10的话，则进位
            {
                num[i][j+1] += num[i][j] / 10;
                num[i][j] = num[i][j] % 10;
                if(num[i][len+1]) len++; //如果后一位不为0的话，则长度len++
            }
        }
    }
    for(int i = len; i >= 1; i --)//倒序输出
    {
        printf("%d",num[n][i]);
    }
    return 0;
}
/*
//另外的方法，似乎存在错误
//TPDO:废人一个🐻
int main()
{
    LL n;
    scanf("%lld", &n);
	num[1][N-1]=1;//第一项 
	num[2][N-1]=2;//第二项
	for(int i = 3; i <= n; i ++)
	{
		for(int j = N - 1; j >= 0; j --)
		{
			if((num[i-1][j]+num[i-2][j])>=10)
            {
				num[i][j-1]+=1;
            }
			num[i][j]=num[i][j]+(num[i-1][j]+num[i-2][j])%10; 
        } 
    } 
    int j = 0;
    while(num[n][j] == 0) j++;
    for(int i = j; i < N; i++)
    {
        printf("%lld",num[n][i]);
    }
	return 0;
}
*/
```



#### P1387 最大正方形

> https://www.luogu.com.cn/problem/P1387

> 思路：想法
>
> > 当然，该题可以用神仙动态规划解决
> >
> > > 动态规划，状转方程：
> > >
> > > ``if (a[i][j]==1) f[i][j]=min(min(f[i][j-1],f[i-1][j]),f[i-1][j-1])+1;``
> > >
> > > 说明：
> > >
> > > f[i][j]表示以节点i,j为右下角，可构成的最大正方形的边长。
> > >
> > > 只有a[i][j]==1时，节点i,j才能作为正方形的右下角；
> > >
> > > 对于一个已经确定的f[i][j]=x，它表明包括节点i，j在内向上x个节点，向左x个节点扫过的正方形中所有a值都为1；
> > >
> > > 对于一个待确定的f[i][j]，我们已知f[i-1][j]，f[i][j-1]，f[i-1][j-1]的值，如下：
> > >
> > > f数组:
> > >
> > > ```
> > > ? ? ? ?
> > > ? ? 2 1
> > > ? ? 3 ?
> > > ? ? ? ?
> > > ```
> > >
> > > 则说明原a数组：
> > >
> > > ```
> > > 1 1 1 0
> > > 1 1 1 1
> > > 1 1 1 1
> > > ? ? ? ?
> > > ```
> > >
> > > 由此得出状态转移方程：
> > >
> > > `if (a[i][j]==1) f[i][j]=min(min(f[i][j-1],f[i-1][j]),f[i-1][j-1])+1;`
> > >
> > > **for example:**
> > >
> > > ```
> > > a[i][j]:
> > > 0 0 0 1
> > > 1 1 1 1
> > > 0 1 1 1
> > > 1 1 1 1
> > > f[i][j]:
> > > 0 0 0 1
> > > 1 1 1 1
> > > 0 1 2 2
> > > 1 1 2 3
> > > ```
> > >
> > > ```cpp
> > > #include <iostream>
> > > #include <cstdio>
> > > using namespace std;
> > > int a[101][101],n,m,f[101][101],ans;
> > > int main()
> > > {
> > >     scanf("%d%d",&n,&m);//读入
> > >     for (int i=1;i<=n;++i)
> > >         for (int j=1;j<=m;++j)
> > >         {
> > >             scanf("%d",&a[i][j]);
> > >             //因为只需用到i，j上方，左方，左上方的信息，读入同步处理
> > >             if (a[i][j]==1) f[i][j]=min(min(f[i][j-1],f[i-1][j]),f[i-1][j-1])+1;
> > >             ans=max(ans,f[i][j]);//同步更新答案
> > >         }
> > >     printf("%d",ans);
> > > }
> > > ans=3
> > > ```
>
> 可惜我咋会动态规划，还是老老实实二维前缀和来进行求解吧~
>
> 利用二维前缀和，求得面积，最后判断面积是否能够构成正方形，若能的话，边长就是面积的开方
>
> 二维前缀和：
>
> `s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + a[i][j];`
>
> 二维前缀和（部分和） x1,y1 与x2,y2之间的和
>
> `s[x2][y2] - s[x2][y1 - 1] - s[x1 - 1][y2] + s[x1 - 1][y1 - 1]`

```C++
#include <bits/stdc++.h>
#include <cstring>
using namespace std;
const int N = 210;
int a[N][N];
int s[N][N];
int main()
{
    int n,m;
    scanf("%d%d", &n,&m);
    memset(s,0,sizeof(s));
    for(int i = 1; i <= n; i ++)
    {
        for(int j = 1; j <= m; j ++)
        {
            scanf("%d", &a[i][j]);
        }
    }
    for(int i = 1; i <= n; i ++)
    {
        for(int j = 1; j <= m; j ++)
        {
            s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + a[i][j];
        }
    }
    int ans = 0;

    //DEBUG
    /*
    for(int i = 0 ; i <= n; i ++)
    {
        for(int j = 0; j <= m; j ++)
        {
            cout << s[i][j] << " ";
        }
        cout << endl;
    }
    */
//求正方形边长，不是要你去求面积=c=
    for(int i = 1; i <= n; i ++)
    {
        for(int j = 1; j <= m; j ++)
        {
            int k = i;
            int p = j;
            int res = 0;
            while(k <= n && p <= m)
            {
                res = s[k][p] - s[i - 1][p] - s[k][j - 1] + s[i-1][j-1];
                int temp = (k - i + 1) * (p - j + 1);
                //DEBUG
                //cout << " RES : " << res << endl;
                if (res >= 0 && res == temp)
                {
                    res = sqrt(res); //求正方形边长
                    ans = max(ans, res);
                }
                k++;
                p++;
            }
        }
    }
    printf("%d", ans);
}
```



#### P2327 [SCOI2005]扫雷

> https://www.luogu.com.cn/problem/P2327

> 【递推】
>
> 举例子进行递推后，发现最终的结果只有三种情况：0、1、2
>
> 我们可以从第二列的第一个格子开始进行判断
> 分为两种情况，第一个格子有雷 || 第一个格子无雷
>
> b[1] = 0 or b[1] = 1;
>
> 从i = 2 开始，对b[i]进行判断求解
>
> b[i]的情况，每次以a[i-1]进行选取，b[i]的情况可以根据a[i-1],b[i-1],b[i-2]进行判断
>
> 需要特判：如果b[i]不是0或1的话，直接就是不满足条件
> 				   还需要特判一下到达b[n+1]的时候一定要为0，否则也不满足条件

```C++
#include<bits/stdc++.h>
using namespace std;
int i,j,k,m,n;
int ans=2;
int a[10010];
int b[10010];
//只有可能是0,1,2
//从第一个位置开始进行判断
//如果第一个位置有雷和无雷都能满足要求的话，那么ans=2;
//可以设最初ans=2;然后去进行特判。
int main()
{
    cin>>n;
    for (i=1;i<=n;i++)
    {
        cin>>a[i];
    }
    b[1]=1;
    //假设第一个有雷
    for(int i = 2;i <= n+1; i++)
    //从第二个位置开始比较
    {
        b[i] = a[i-1] - b[i-1] - b[i-2];
        if (!(b[i]==1||b[i]==0))
        {
            ans--;
            break;
        }
        if (i==n+1 && b[i]!=0)
        {
            ans--;
            break;
        }
    }
    b[1]=0;
    //假设第一个无雷
    for(int i  =2;i  <=n+1;i ++)
    {
        b[i] = a[i-1] - b[i-1] - b[i-2];
        if (!(b[i] == 1||b[i] == 0))
        {
            ans--;
            break;
        }
        if (i == n+1 && b[i] != 0)
        {
            ans--;
            break;
        }
    }
    cout<<ans;   
    return 0;    
}
```

#### P2004 领地选择

> https://www.luogu.com.cn/problem/P2004

> 思路：二维前缀和
> 		首先预处理一下，二位前缀和的值
> 		然后从每个开始计算一下，长度为c的前缀和的大小，选取最大的部分和的左上角的坐标为答案
>
> 注意：本题有情况，如可能出现负数为最大值，所以预处理的ans值应该为负无穷大
>
> ans = -0x3f3f3f3f
>
> //然后要搞清楚右下角的具体位置，相对于左上角 i + c - 1; j + c - 1;

```C++
#include <bits/stdc++.h>

using namespace std;
const int N = 1010;
int a[N][N];
int s[N][N];
int x;
int y;
int ans = -0x3f3f3f3f;
//4个3f
//要注意题目有可能是最大值是负数，所以初始化可以是负数
int main()
{
    ios::sync_with_stdio(false);
    int n,m,c;
    cin >> n >> m >> c;
    for(int i = 1; i <= n; i ++)
    {
        for(int j = 1; j <= m; j ++)
        {
            cin >> a[i][j];
        }
    }
    for(int i = 1; i <= n; i ++)
    {
        for(int j = 1; j <= m; j ++)
        {
            s[i][j] = s[i - 1][j] + s[i][j - 1] - s[i - 1][j - 1] + a[i][j];
        }
    }
    for(int i = 1; i <= n; i ++)
    {
        for(int j = 1; j <= m; j ++)
        {
            int k = i + c - 1;
            int p = j + c - 1;
            //这里要注意是 x + c - 1(要减去1)
            if(k > n || p > m) continue;
            int res = 0;
            res = s[k][p] - s[i - 1][p] - s[k][j - 1] + s[i-1][j-1];
            if(res > ans)
            {
                ans = res;
                x = i;
                y = j;
            }
        }
    }
    cout << x << " " << y;
}
```

#### P3131 [USACO16JAN]Subsequences Summing to Sevens S

#### P2697 宝石串

#### P1114 “非常男女”计划

> https://www.luogu.com.cn/problem/P3131
> https://www.luogu.com.cn/problem/P2697
> https://www.luogu.com.cn/problem/P1114

> 这三道题都是前缀和的做法，做法一模一样
>
> 需要注意点的是，是否超过INT范围，改用long long，以及为了降低时间复杂度可以在循环中设置退出循环的一些条件。
>
> 然后是一些低级错误要注意，比如要计算的部分和的范围问题，`s[j] - s[i - 1];` 以及区间`j - i + 1`

```C++
//P3131
#include <bits/stdc++.h>

using namespace std;
const int N = 1000010;
typedef long long LL;

LL s[N];
int main()
{
    int n;
    scanf("%d", &n);
    int t;
    for(int i = 1; i <= n; i ++)
    {
        scanf("%d", &t);
        s[i] = s[i - 1] + t;
    }
    LL maxc = 0;
    for(int i = 1; i <= n; i ++)
    {
        for(int j = n; j > i ; j --)
        {
            if(maxc > j - i + 1) break;
            //👆降低一点时间复杂度的操作
            LL temp = s[j] - s[i - 1];
            if(temp % 7 == 0)
            {
                maxc = max(maxc, (LL)j - i + 1);
            }
        }
    }
    printf("%lld", maxc);
    return 0;
}
```

#### P1192 台阶问题

> https://www.luogu.com.cn/problem/P1192

> 思路/解题方法： 【当然，也可以使用动态规划来解题】
>
> 递推题；
>
> 通过递推发现规律
>
> ```
> k=2 : 1 2 3 5 8 13 21 34...
> k=3 : 1 2 4 7 13 24 44 81...
> k=4 : 1 2 4 8 15 29 56 108...
> k=5 : 1 2 4 8 16 31 61 120...
> ```
>
> ```
> 规律： 
> 当n<=k时,第N项=(上一项*2)%100003;
> 当n>k时 ,第N项=(上一项*2-第n-1-k项)%100003;
> ```
>
> 注意：因为求得的值可能会比较大，故此应该进行取模运算

```C++
#include<iostream>
#include<cstdio>
using namespace std;
const int mod=100003;
int n,k,a[1000000],ans=0;
int main()
{
	cin>>n>>k;
	a[0]=a[1]=1;
	for(int i=2;i<=n;++i)
	{
		if(i<=k)
		{
			a[i]=(a[i-1]*2)%mod;
		}
		else 
		{
			a[i]=(a[i-1]*2-a[i-k-1])%mod;
		}
	}
	ans=(a[n]+mod)%mod;
    cout<<ans;
    return 0;
}
```

### 2021年7月14日

#### P1314 [NOIP2011 提高组] 聪明的质监员

> https://www.luogu.com.cn/problem/P1314

> 分析，该题隐藏了前缀和和二分两种算法知识
>
> 首先对于Y的求解，观察其有累加操作———>联想到前缀和
>
> 其次对于W的给定值
>
> ·当W取w[N]中最大的那一项的时候，Y此时等于0，Y < s 故为了使得|Y-s|最小，则应该增大Y，故应该减小W
>
> ·当W取w[N]中最小的那一项的时候，Y此时取得最大值，Y存在Y > s则应该减小Y，故应该增大W
>
> > 二分问题的边界处理真的是个折磨人的问题！！！
> >
> > > 第一遍边界问题没有处理好，没有通过全部样例。
> > > wl <= wr，
> > > wr = mid - 1;
> > > wl = mid + 1;

```C++
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 200010;

LL n,m,s;
LL w[N];
LL v[N];
LL ql[N],qr[N];
LL s_w[N];
LL s_v[N];
LL Y;
LL sum;
LL ans = 0x3f3f3f3f3f3f3f3f;
bool check(LL mid)
{
    Y = 0,sum = 0;
    memset(s_w, 0, sizeof s_w);
    memset(s_v, 0, sizeof s_v);
    //对于Y的计算，我们可以采用前缀和的方式
    for(int i = 1; i <= n; i ++)
    {
        if(w[i] >= mid)
        {
            s_w[i] = s_w[i-1] + 1;
            s_v[i] = s_v[i-1] + v[i];
        }
        else 
        {
            s_w[i] = s_w[i-1];
            s_v[i] = s_v[i-1];
        }
    }
    for(int i = 1; i <= m; i ++)
    {
        Y += (s_w[qr[i]] - s_w[ql[i] - 1]) * (s_v[qr[i]] - s_v[ql[i] - 1]);
    }
    //👆计算Y的值
    //然后开始进行二分
    sum = (LL)abs(Y - s);
    if(Y <= s) return true;
    else return false;
    //能够进行二分的条件判断
    //对于Y;
    //当W为w[N]中最大的那个的时候，Y=0，故应该减小W的值从而增大Y
    //当W为w[N]中最小的那个的时候，Y最大，可能Y>S故应该增大W的值从而减小Y
    //👆以上便是能够进行二分的判断方式
}
int main()
{
    ios::sync_with_stdio(false);
    cin >> n >> m >> s;
    LL wl = 0x3f3f3f3f3f3f3f3f;
    LL wr = 0;
    memset(w, 0, sizeof w);
    memset(v, 0, sizeof v);
    for(int i = 1; i <= n; i ++)
    {
        cin >> w[i] >> v[i];
        wl = min(wl,w[i]);
        wr = max(wr,w[i]);
    }
    for(int i = 1; i <= m ; i ++)
    {
        cin >> ql[i] >> qr[i];
    }
    //?????什么鬼这里改成wl<=wr wr = mid - 1 和 wl = mid + 1才能过
    //二分是真的头疼啊！！我滴妈....
    while(wl <= wr)
    {
        LL mid = wl + wr >> 1;
        if(check(mid)) wr = mid - 1;
        else wl = mid + 1;
        ans = min(ans,sum);
    }
    cout << ans;
    return 0;
}
```

##### 2021年7月14日 今日反思：

> > 做人一定不可好高骛远，一定要耐下心来，脸皮厚点没问题，毕竟我啥也不知道做。只能沉下心来努力积累。
> >
> > 当积累多了，日积月累，当量多了，量变一定会促成质变。你要相信自己！相信自己一定会有所收获！！！！！
> >
> > TODO：有时间的话，一定要找时间去再去练一下二分题。找准分界点，写好check()函数真的很重要！！！
> >
> > 每天一定要做到最晚出地下室的那一人！！！

### 2021年7月15日

#### P1044 栈的应用

> https://www.luogu.com.cn/problem/P1044

> 这道题就是一道卡特兰数的应用题，递推后发现规律，注意运用卡特兰数的递推
>
> > 递归公式1.
> > h(0)=h(1)=1h(0)=h(1)=1
> > h(n)=h(0)∗h(n−1)+h(1)∗h(n−2)+...+h(n−1)∗h(0)(n>=2)
> >
> > 递推公式2.
> > h(n)=h(n−1)∗(4∗n−2)/(n+1)
> >
> > 对于数据过大的情况可以采用组合数学的方式（组合数学也就是杨辉三角的情况）
> > 组合数公式1
> > h(n)=C(2n,n)/(n+1)(n=0,1,2,...)h(n)=C(2n,n)/(n+1)(n=0,1,2,...)
> > 卡特兰数可以与组合数联系起来，得到上面的公式
> >
> > 组合数公式2
> > h(n)=c(2n,n)−c(2n,n−1)(n=0,1,2,...)h(n)=c(2n,n)−c(2n,n−1)(n=0,1,2,...)
> > 与组合数公式1不同这个是两个组合数的减法

#### P1996 约瑟夫问题

> https://www.luogu.com.cn/problem/P1996

> 就是一道约瑟夫环问题，
>
> > 常规数据结构的解法，可以使用一个循环链表，不断更新值，如果报数=m的话，则删除该结点
>
> > 既然学算法了，于是用像个算法er的解法做了一次

```C++
#include <bits/stdc++.h>
using namespace std;
const int N = 110;

//i表示编号
//j表示报的号
int main()
{
    int n, m;
    cin >> n >> m;
    bool *out = new bool[N + 1];
    for(int i = 1; i <= n; i ++) *(out + i) = true;
    int i = 1;
    int j = 0;
    int count = 0;
    while(1)
    {
        if(*(out + i))
        {
            j ++;
            if(j == m)
            {
                *(out + i) = false;
                j = 0;
                cout << i << " ";
                count ++;
            }
            if(count == n)//如果所有人都出来了，那就结束
            {
                break;
            }
        }
        i ++;
        if(i > n) //复位一下~
        {
            i = 1;
        }
    }
    return 0;
}
```

#### P1631 序列合并

> https://www.luogu.com.cn/problem/P1631

> 善于利用原数组是递增的前提条件
>
> 利用堆排序（优先队列）的方式进行选取
>
> > > 自己想的那个方式无法过的样例信息
> > > 5
> > > 1 1 2 3 4
> > > 1 1 2 3 4

```C++
#include <bits/stdc++.h>
#include <queue>
using namespace std;
const int N = 100010;
typedef long long LL;
LL minx[N];
LL a[N];
LL b[N];

int main()
{
    int n;
    priority_queue<int> q;
    scanf("%d", &n);
    for(int i = 1; i <= n; i ++)
    {
        scanf("%lld",&a[i]);
    }
    for(int i = 1; i <= n; i ++)
    {
        scanf("%lld",&b[i]);
    }
    for(int i = 1; i <= n; i ++)
    {
        for(int j = 1; j <= n; j ++)
        {
            int x = a[i] + b[j];
            if(q.size() < n)
            {
                q.push(x);
            }
            else
            {
                if(q.top() > x)
                {
                    q.pop();
                    q.push(x);
                }
                else break;
            }
        }
    }
    for(int i = n; i >= 1; i--)
    {
        minx[i] = q.top();
        q.pop();
    }
    /*
    //TODO:分析一下我到底哪里错了
    minx[1] = a[1] + b[1];
    int j = 2;
    int pos = 2;
    for(int i = 2; i <= n; i ++)
    {
        LL res = a[i-1] +b[j];
        if(a[i] + b[j - 1] < res)
        {
            minx[pos++] = a[i] + b[j - 1];
            continue;
        }
        else
        {
            minx[pos++] = res;
            int k = j;
            k ++;
            res = a[i-1]+b[k];
            while(a[i] + b[j - 1] >= res && k <= n)
            {
                minx[pos++] = res;
                res = a[i-1]+b[k];
                k++;
            }
        }
    }
    */
    for(int i = 1; i <= n; i ++)
    {
        printf("%lld ", minx[i]);
    }
    return 0;
}
```

#### P1575 正误问题

> https://www.luogu.com.cn/problem/P1575

> 表达式求值问题
> <u>双栈进行处理，数栈和运算符栈</u>
>
> 首先得看看运算符的优先性、运算符是几元运算符等等..
>
> 很多需要特判的情况，然后可能存在的ERROR的情况

```C++
#include<bits/stdc++.h>
using namespace std;

string str;
stack<int> op;
stack<bool> num;
bool t,t1,t2;

//这类题之前先想想，运算符的次序
//同时也要想想运算符的性质
//比如这里not是一元运算符，故需要特判一下
//凡是不满足的时候，都要注意返回ERROR错误值
//exit(0)可以在某个地方直接停止程序
//while(cin >> str)也是一种很好的通过字符串的空格分隔字符的功能 <---发现C++内在的奥妙很重要！
void calc() 
{
	if(op.empty()) return;
	if(op.top()==3) //处理not的计算
    {
		if(num.size()<1)  //一元运算符，只需要看数栈里面是否有1个
        {
			printf("error\n");
			exit(0);
		}
		t=num.top();
		num.pop();
		t=!t;
		num.push(t);
	}
    else if(op.top()==2) //处理and的计算
    {
		if(num.size()<2) 
        { //二元运算符，需要看数栈里面是否有两个
			printf("error\n");
			exit(0);
		}
		t2=num.top();
		num.pop();
		t1=num.top();
		num.pop();
		t=(t1 && t2);
		num.push(t);
	}
    else if(op.top()==1)
    {
		if(num.size()<2) 
        {
			printf("error\n");
			exit(0);
		}
		t2=num.top();
		num.pop();
		t1=num.top();
		num.pop();
		t=(t1 || t2);
		num.push(t);
	}
	op.pop();//计算完毕后，记得运算符栈要出一次
}

int main() 
{
    //优先性 not > and > or
    //        3     2    1
    //发现优先性高的，那就进行出栈运算，计算完后再将新的运算符入栈
	while(cin>>str) //这种输入方式可以被空格隔断，故此可以提取出每个单独的内容
    {
		if(str=="not") op.push(3);
		else if(str=="and") 
        {
			if(num.empty())
            {
				printf("error\n");
				return 0;
			}
			while(!op.empty() && op.top() >= 2) calc();
			op.push(2);
		}
        else if(str=="or") 
        {
			if(num.empty())
            {
				printf("error\n");
				return 0;
			}
			while(!op.empty()) calc();
			op.push(1);
		}
        else if(str=="true") num.push(true);
		else if(str=="false") num.push(false);
	}
    //计算的时候是，每次存入运算符栈的时候，进行判断，如果运算符的优先性更大的话，则进行一次计算
    //最后再看运算符栈，如果运算符栈还没空的话，则继续计算，直到运算符栈空了
	while(!op.empty()) calc(); //如果运算符栈还没空的话，则继续进行计算
	if(num.size()==1)
    {
		if(num.top()) printf("true\n");
		else printf("false\n");
    }
	else printf("error\n");
	return 0;
}
```

#### P6033 [NOIP2004 提高组] 合并果子 加强版

> 升级版，数据范围更大了，堆排序、优先队列已经不再适用了，总的来说，需要在O(n)的时间复杂度内实现问题。 在O(n)时间复杂度内求解哈夫曼最小值
>
> > 思想不难，但处处设限

```C++
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 1e5+100;
const int M = 1e7+100;
//设置两个队列
//用两个队列来模拟优先队列操作
//一个队列放数组中的数，另外一个放之和的数
//每次操作比较两个队列中对头元素的大小
//桶排序+两个队列来模拟优先队列
queue<LL> q1,q2;
LL a[N];
LL readnum[M];
LL n;
//!这么大的数据一定要开long long
//因为数据量实在是太大了 10^7   10e7的巨大数据量
//所以使用快读函数进行数据的读取
inline int read(){
    int x=0,f=1;
    char ch=getchar();
    while(ch<'0'||ch>'9'){
        if(ch=='-')
            f=-1;
        ch=getchar();
    }
    while(ch>='0'&&ch<='9'){
        x=(x<<1)+(x<<3)+(ch^48);
        ch=getchar();
    }
    return x*f;
}

//作为内联函数访问更快
inline LL getnum()
{
    if(q2.empty() || (q1.front() < q2.front() && !q1.empty()))
    {
        LL x = q1.front();
        q1.pop();
        return x;
    }
    else
    {
        LL x = q2.front();
        q2.pop();
        return x;
    }
}

int main()
{
    n = read();
    LL ans = 0ll;
    memset(a, 0, sizeof a);
    for(int i = 1; i <= n; i ++)
    {
        a[readnum[i] = read()]++;
    }
    for(int i = 1; i <= 100000; i ++)
    {
        for(int j = 1; j <= a[i]; j ++)
        {
            q1.push(i);
        }
    }
    for(LL i = 1; i < n; i ++)
    {
        LL x = getnum();
        LL y = getnum();
        ans += (x+y);
        q2.push(x+y);
    }
    printf("%lld",ans);
    return 0;
}
```



### 2021年7月16日

> 搜索算法：BFS、DFS

#### P1219 [USACO1.5]八皇后 Checker Challenge

> https://www.luogu.com.cn/problem/P1219

> 又一典型的BFS、DFS
>
> > DFS关键的一步是找准次序，也就是把握好顺序，也要注意恢复现场
> >
> > 该题有两种DFS搜索方式：
> > 1、模板搜索
> > 2、根据本题题意进行的搜索

```C++
#include <bits/stdc++.h>
using namespace std;
const int N = 1000;
bool line[N],col[N];
bool lefteg[N],righteg[N];
int path[N];
int n;
int flag = 1;
int counts = 0;
//!搜索最重要的一步就是要想清楚顺序！！
void dfs(int u) //u表示第几层
{
    if(u == n)
    {
        if(flag == 1)
        {
            for(int i = 0; i < n; i ++)
            {
                cout << path[i] << " ";
            }
            if(counts == 2) flag = 0;
            cout << endl;
        }
        counts ++;
        return;
    }
    for(int i = 0; i < n; i ++)
    {
        if(!line[i] && !lefteg[u + i] && !righteg[n - u + i])
        {
            path[u] = i + 1;
            line[i] = lefteg[u + i] = righteg[n - u + i] = 1;
            dfs(u + 1);
            //恢复现场
            line[i] = lefteg[u + i] = righteg[n - u + i] = 0;
        }
    }
}

void dfs2(int x, int y, int s)
//更原始的搜索方式，从左上角开始进行搜索，s表示当前有多少个皇后
{
    if(y == n) y = 0, x ++;
    //表示到达最后一列了，现在返回到第一个位置

    if(x == n)//已经到达最后一行了
    {
        if(s == n) //当前皇后都摆完了
        {
            for(int i = 0; i < n; i ++ ) cout << path[i] << " ";
            counts ++;
            cout << endl;
        }
        return;
    }

    //如果这里不放皇后的话
    dfs2(x, y+1,s);//到下一个位置去放

    //如果放的话
    if(!line[x] && !col[y] && !lefteg[x + y] && !righteg[x - y + n])
    {
        path[x] = y + 1;
        line[x] = col[y] = lefteg[x + y] = righteg[x - y + n] = 1;
        dfs2(x, y + 1, s + 1);
        line[x] = col[y] = lefteg[x + y] = righteg[x - y + n] = 0;
    }
}

int main()
{
    memset(line, 0, sizeof line);
    memset(col, 0, sizeof col);
    memset(lefteg, 0, sizeof lefteg); //左对角线
    memset(righteg, 0, sizeof righteg); //右对角线
    cin >> n;
    dfs(0); //方法一
    dfs2(0,0,0); //更原始的方法
    cout << counts << endl;
    return 0;
}
```

#### P1443 马的遍历

> https://www.luogu.com.cn/problem/P1443

> DFS会出现超时，求最短路可换采用BFS

```C++
#include <bits/stdc++.h>
#include <queue>
using namespace std;
const int N = 500;
int n, m, x, y;
int st[N][N];
bool vis[N][N];
typedef pair<int, int> PII;
PII q[N*N];
int dx[9]={0,2,-2,2,-2,-1,1,-1,1};
int dy[9]={0,1,1,-1,-1,2,2,-2,-2};

/*
广度优先搜索dfs会有TLE，可以换采用宽度bfs
回溯、剪枝
int dfs(int x, int y, int s)
{
    st[x][y] = s;
    int nx,ny;
    for(int i = 1; i <= 8; i ++) //八个方向都走一走
    {
        nx = x + dx[i];
        ny = y + dy[i];
        //枚举下一个位置
        //检查一下下一个位置是否合法
        if((nx >= 1 && nx <= n && ny >= 1 && ny <= m)&& (s + 1 < st[nx][ny] || st[nx][ny] == -1))
        {
            //cout << "current position: " << nx << " " << ny <<endl;
            dfs(nx, ny, s + 1);
        }
    }
}
*/

void bfs(int x, int y, int s)
{
    st[x][y] = 0;
    int hh = 0, tt = 0;
    q[0] = {x,y};
    vis[x][y] = true;
    while(hh <= tt)
    {
        auto t = q[hh++];
        for(int i = 1; i <= 8; i ++)
        {
            int nx = t.first + dx[i];
            int ny = t.second + dy[i];
            if((nx > 0 && nx <= n && ny > 0 && ny <= m) && !vis[nx][ny])
            {
                st[nx][ny] = st[t.first][t.second] + 1;//为上一个位置多一个
                q[++ tt] = {nx,ny};
                vis[nx][ny] = true;
            }
        }
    }
}

int main()
{
    ios::sync_with_stdio(false);
    cin >>n >> m >> x >> y;
    memset(st, -1, sizeof st);
    memset(vis, false, sizeof vis);
    //dfs(x,y,0);
    bfs(x,y,0);
    for(int i = 1; i <= n; i ++)
    {
        for(int j = 1; j <= m; j ++)
        {
            cout << left << setw(4) << st[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}
```

#### P1135 奇怪的电梯

> https://www.luogu.com.cn/problem/P1135

> 与上题一样，不过该题BFS和DFS应该都可以撒
> spfa...还有好多算法没好好学好呢！！！

```C++
#include  <bits/stdc++.h>
using namespace std;
const int N = 2000;
int q[N];
int l[N];
int da[3] = {0,1,-1};
bool vis[N];
int n,a,b;

//最少按键次数，最小问题——>bfs
void bfs(int sa)
{
    int hh = 0, tt = 0;
    q[0] = sa; // 入队
    vis[sa] = true;
    int dis[N];
    int flag = 0;
    memset(dis, 0, sizeof dis);
    dis[0] = 0; //从sa开始到达每个点的距离
    while(hh <= tt)
    {
        int t = q[hh ++];
        if (t == b)
        {
            flag = 1;
            break;
        }
        for(int i = 1; i <= 2; i ++)
        {
            int na = t + da[i]*l[t];
            if(na > 0 && na <= n && vis[na] == false)
            {
                dis[na] = dis[t] + 1;
                q[++ tt] = na;
                vis[na] = true;
            }
        }
    }
    if(flag == 1) cout << dis[b];
    else cout << -1;
    return;
}
int main()
{
    ios::sync_with_stdio(false);
    cin >> n >> a >> b;
    memset(vis, false, sizeof vis);
    for(int i = 1; i <= n; i ++) cin >> l[i];
    bfs(a);
    return 0;
}
```

#### P1605 迷宫

> https://www.luogu.com.cn/problem/P1605

> 迷宫问题的DFS&BFS

```C++
#include <bits/stdc++.h>
using namespace std;
const int N = 110;
typedef pair<int,int> PII;
int g[N][N];
int n,m,x;
int stx,sty,enx,eny;
int dx[5] = {0, -1, 0, 1, 0};
int dy[5] = {0, 0, 1, 0, -1};
PII q[N*N];
int d[N][N];
int counts = 0;

//宽度优先搜索
void dfs(int xx, int yy)
{
    if(xx == enx && yy == eny)
    {
        counts++;
        return;
    }
    else
    {
        for(int i = 1; i <= 4; i ++)
        {
            int nx = xx + dx[i];
            int ny = yy + dy[i];
            if(nx > 0 && nx <= n && ny > 0 && ny <= m && g[nx][ny] == 0 && d[nx][ny] == -1)
            {
                d[xx][yy] = 1;
                dfs(xx+dx[i],yy+dy[i]);
                d[xx][yy] = -1;
            }
        }
    }
}
int bfs()
{
    int hh = 0, tt = 0;
    q[0] = {stx, sty};
    memset(d, -1, sizeof(d));
    d[1][1] = 1;
    while(hh <= tt)
    {
        auto t = q[hh++];
        for(int i = 1; i <= 4; i ++)
        {
            int x = t.first + dx[i];
            int y = t.second + dy[i];
            if(x > 0 && x <= n && y > 0 && y <= m && g[x][y] == 0 && d[x][y] == -1)
            {
                d[x][y] = 1;
                if(x == enx && y == eny)
                {
                    counts++;
                }
                q[++ tt] = {x,y};
            }
        }
    }
    return counts;
}
int main()
{
    ios::sync_with_stdio(false);
    cin >> n >> m >> x;
    cin >> stx >> sty >> enx >> eny;
    memset(g, 0, sizeof 0);
    memset(d, -1, sizeof(d));
    for(int i = 1; i <= x; i ++)
    {
        int t,p;
        cin >> t >> p;
        g[t][p] = 1;
    }
    //cout << bfs();
    dfs(stx, sty);
    cout << counts;
    return 0;
}
```

#### ❔P1379 八数码难题

> https://www.luogu.com.cn/problem/P1379

> 这是一道难度高的题
>
> 思路与想法:
>
> 
>
> 我们需要一种更为抽象化的思维方式：
>
> 可以把每一种状态看作 一个点
> 从而，从初始状态到最终状态可以转化为，在图中找最短路问题
> 难点：1、如何记录每个状态
> 			2、如何记录所走的距离
> 1状态表示可以使用字符串 
> 比如初始 283104765 ---> 203184765 ------> ..... --------> 最终状态
>
> 2对于如何记录所走的距离
> 可以采用哈希图hash_map、map、unorder_map、字典等数据结构进行保存
>
> `unordered_map<string,int> dist` 表示 状态string 的当前距离 int
>
> 3状态转移，可以以那个空位为研究对象，空位有4个移动方式，分别进行枚举
>
> > 启示：灵活运用STL库，可以事半功倍！STL也一定要花时间去好好了解
> > 关于unordered_map:
> > https://www.cnblogs.com/langyao/p/8823092.html
> >
> > ```C++
> > 成员函数：
> > =================迭代器========================= 
> > begin 　　返回指向容器起始位置的迭代器（iterator） 
> > end 　　   返回指向容器末尾位置的迭代器 
> > cbegin　   返回指向容器起始位置的常迭代器（const_iterator） 
> > cend 　　 返回指向容器末尾位置的常迭代器 
> > =================Capacity================ 
> > size  　　 返回有效元素个数 
> > max_size  返回 unordered_map 支持的最大元素个数 
> > empty        判断是否为空 
> > =================元素访问================= 
> > operator[]  　　   访问元素 
> > at  　　 　　　　访问元素 
> > =================元素修改================= 
> > insert  　　插入元素 
> > erase　　 删除元素 
> > swap 　　 交换内容 
> > clear　　   清空内容 
> > emplace 　构造及插入一个元素 
> > emplace_hint 按提示构造及插入一个元素 
> > ================操作========================= 
> > find 　　　　　　通过给定主键查找元素,没找到：返回unordered_map::end
> > count 　　　　　返回匹配给定主键的元素的个数 
> > equal_range 　　返回值匹配给定搜索值的元素组成的范围 
> > ================Buckets====================== 
> > bucket_count 　　　返回槽（Bucket）数 
> > max_bucket_count    返回最大槽数 
> > bucket_size 　　　   返回槽大小 
> > bucket 　　　　　　返回元素所在槽的序号 
> > load_factor　　　　 返回载入因子，即一个元素槽（Bucket）的最大元素数 
> > max_load_factor 　  返回或设置最大载入因子 
> > rehash　　　　　　 设置槽数 
> > reserve 　　　　　  请求改变容器容量
> > ```
>
> 其中有几个小技巧
> **如何从一维序号进行转化为x维序号**
> **又如何从x维序号转化回一维**

```C++
#include <bits/stdc++.h>
#include <unordered_map>
#include <cstring>
#include <queue>

using namespace std;
unordered_map<string,int> dist;
queue<string> q;

int dx[5] = {0,1,-1,0,0};
int dy[5] = {0,0,0,1,-1};

int bfs(string str)
{
    string z = "123804765";
    q.push(str);
    dist[str] = 0;
    while(!q.empty())
    {
        auto t = q.front();
        q.pop();
        int dis = dist[t];
        if(t == z) return dis; //如果已经满足条件则返回步数

        int po = t.find('0');//在字符串中寻找空位所在的位置
        //将一维度转化为三维
        int x = po / 3;
        int y = po % 3;

        for(int i = 1; i <= 4; i ++)
        {
            int nx = x + dx[i];
            int ny = y + dy[i];
            if(nx >= 0 && nx < 3 && ny >= 0 && ny < 3)
            {
                swap(t[po], t[nx*3+ny]);  //<---这里又有将三维情况转化成一维

                if(!dist.count(t)) //map操作，如果t没有出现过的话
                {
                    dist[t] = dis + 1;
                    q.push(t);
                }
                swap(t[po], t[nx*3+ny]);
            }
        }
    }
    return -1;
}
int main()
{
    string p_str;
    cin >> p_str;
    cout << bfs(p_str);
    return 0;
}
```

#### UVA572 油田 Oil Deposits

> https://www.luogu.com.cn/problem/UVA572
>
> > 搜索水题，搞清楚搜索过程就不难

```C++
#include <bits/stdc++.h>
#include <cstring>

using namespace std;
const int N = 110;
char g[N][N];
bool st[N][N];
int n,m;
int dx[9] = {0,1,1,1,0,0,-1,-1,-1};
int dy[9] = {0,0,1,-1,1,-1,0,1,-1};
void dfs(int x, int y)
{
    st[x][y] = true;
    if(x <= 0 || x > n || y <= 0 || y > m) return;
    for(int i = 1; i <= 8; i ++)
    {
        int nx = x + dx[i];
        int ny = y + dy[i];
        if(g[nx][ny] == '@' && !st[nx][ny])
        {
            dfs(nx,ny);
        }
    }
}
int main()
{
    while(cin >> n >> m)
    {
        memset(st, false, sizeof st);
        int counts = 0;
        if(n == 0|| m == 0) return 0;
        for(int i = 1; i <= n; i ++)
        {
            for(int j = 1; j <= m; j ++)
            {
                cin >> g[i][j];
            }
        }
        for(int i = 1; i <= n; i ++)
        {
            for(int j = 1; j <= m; j ++)
            {
                if(g[i][j] == '@' && !st[i][j])
                {
                    counts++;
                    dfs(i,j);
                }
            }
        }
        cout << counts << endl;
    }
    return 0;
}
```

#### P5194 [USACO05DEC]Scales S

> https://www.luogu.com.cn/problem/P5194
>
> > 注意思考顺序&&题意获取的方式
> >
> > > 利用题干的隐含条件——【不降序】——可以利用前缀和进行剪枝，从高到低进行枚举
> >
> > 防止TLE--->注意去剪枝！

```C++
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 1010;
bool st[N];
LL a[N];
LL sa[N];
LL ans;
int n,s;

void dfs(int u, LL sum)
{
    ans = max(ans,sum);
    if(u == 0) return; //退出条件-->到达边界
    //👇进行剪枝
    if(sa[u] + sum <= s)//继续枚举下去，肯定都是会比这个sa[u]+sum小的，故直接剪枝优化算法
    {
        ans = max(ans, sa[u] + sum);
        return;
    }//如果u前缀和的项目+sum <= 标准值的话，则更新一下ans，也就是u之前的砝码都可以取用了
    if(a[u] + sum <= s)
    {
        dfs(u - 1, sum + a[u]);
    }//如果当前这个位置的值a[u] + sum <= s的话，取一下当前位置  <---也像一个剪枝
    dfs(u - 1, sum); //都不满足的话，那就继续递归下一个
}

int main()
{
    cin >> n >> s;
    for(int i = 1 ; i <= n; i ++) cin >> a[i];
    for(int i = 1 ; i <= n; i ++) sa[i] = sa[i - 1] + a[i];
    dfs(n,0);
    cout << ans;
    return 0;
}
```

#### UVA11624 Fire!

> https://www.luogu.com.cn/problem/UVA11624

> 两个BFS进行搜索，双向BFS
>
> 有很多需要注意的细节
>
> > 1.火源可能有多个，应该记录最早火蔓延的时间
> > 2.J走到的时候一定要满足火还没蔓延到，也就是J和火不能同时到
> > 3.到达边界即可结束，注意要多+1
> >
> > 一堆细节和代码能力

```C++
#include <bits/stdc++.h>
#include <queue>
using namespace std;
typedef pair<int,int> PII;
const int N = 1010;
char g[N][N];
int n,m;
int dx[5] = {0,1,0,-1,0};
int dy[5] = {0,0,1,0,-1};
bool flag = false;
int F_time[N][N];
int curtime[N][N];

void bfs_F(int x, int y)
{
    //PII q2[N*N];
    queue<PII> q2;
    bool vis[N][N];
    memset(vis, false, sizeof vis);
    F_time[x][y] = 0;
    vis[x][y] = true;
    q2.push(PII(x,y));
    //q2[0] = {x, y};
    int hh = 0, tt = 0;
    while(!q2.empty())
    {
        auto t = q2.front();
        hh++;
        q2.pop();
        for(int i = 1; i <= 4; i ++)
        {
            int nx = t.first + dx[i];
            int ny = t.second + dy[i];
            if(nx > 0 && nx <= n && ny > 0 && ny <= m && g[nx][ny] != '#' && g[nx][ny] != 'F' && !vis[nx][ny])
            {
                if(F_time[nx][ny] == 0)
                {
                    F_time[nx][ny] = F_time[t.first][t.second] + 1;
                }
                else
                {
                    F_time[nx][ny] = min(F_time[nx][ny],F_time[t.first][t.second] + 1);
                }
                vis[nx][ny] = true;
                q2.push(PII(nx,ny));
                ++tt;
                //q2[++tt] = {nx,ny};
            }
        }
    }
}
bool check_J(int x, int y, int curtime)
{
    if(x > 1 && x < n && y > 1 && y < m && g[x][y] != '#' && F_time[x][y] < curtime + 1)
    {
        return true;
    }
    else return false;
}
void bfs_J(int x,int y)
{
    //PII q1[N*N];
    queue<PII> q1;
    //int dist[N][N];
    bool vis[N][N];
    memset(vis, false, sizeof vis);
    vis[x][y] = true;
    q1.push(PII(x,y));
    //q1[0] = {x,y};
    curtime[x][y] = 0;
    int hh = 0, tt = 0;
    while(!q1.empty())
    {
        auto t = q1.front();
        hh++;
        q1.pop();
        for(int i = 1; i <= 4; i ++)
        {
            int nx = t.first + dx[i];
            int ny = t.second + dy[i];
            if(nx > 0 && nx <= n && ny > 0 && ny <= m && g[nx][ny] != '#' && g[nx][ny] != 'F' && !vis[nx][ny])
            {
                curtime[nx][ny] = curtime[t.first][t.second] + 1;
                vis[nx][ny] = true;
                q1.push(PII(nx,ny));
                ++tt;
            }
        }
    }
}

int bfs_JF(int x,int y)
{
    //PII q3[N*N];
    queue<PII> q3;
    q3.push(PII(x,y));
    //q3[0] = {x,y};
    int hh = 0, tt = 0;
    if(x == 1 || x == n || y == 1 || y == m)
    {
        flag = 1;
        return 1;
    }
    while(!q3.empty())
    {
        auto t = q3.front();
        hh++;
        q3.pop();
        if(t.first == 1 || t.first == n || t.second == 1 || t.second == m)
        {
            flag = true;
            return curtime[t.first][t.second] + 1;
        }
        for(int i = 1; i <= 4; i ++)
        {
            int nx = t.first + dx[i];
            int ny = t.second + dy[i];
            if(curtime[nx][ny] < F_time[nx][ny])
            {
                q3.push(PII(nx,ny));
                ++tt;
            }
        }
    }
    if(curtime[x][y] == 0)
    {
        flag = false;
    }
    return curtime[x][y] + 1;
}

int main()
{
    ios::sync_with_stdio(false);
    int T;
    cin >> T;
    while(T --)
    {
        cin >> n >> m;
        int j_x,j_y;
        memset(F_time,0,sizeof F_time);
        memset(curtime,0,sizeof curtime);
        memset(g,'.',sizeof g);
        for(int i = 1; i <= n; i ++)
        {
            for(int j = 1; j <= m; j ++)
            {
                cin >> g[i][j]; 
                if(g[i][j] == 'J')
                {
                    j_x = i;
                    j_y = j;
                }
            }
        }
        for(int i = 1; i <= n; i ++)
        {
            for(int j = 1; j <= m; j ++)
            {
                if(g[i][j] == 'F')
                {
                    bfs_F(i, j);
                }
            }
        }
        bfs_J(j_x, j_y);
        int c = bfs_JF(j_x,j_y);
        if(flag)
        {
            cout << c << endl;
        }
        else
        {
            cout << "IMPOSSIBLE" << endl;
        }
    }
    return 0;
}
```

### 2021年7月17日 总结&周赛

#### P7095 [yLOI2020] 不离

> https://www.luogu.com.cn/problem/P7095

> 题解&思路：
>
> 善于发现：初始额能力值如果越大的话，越有可能穿上所有装备
> ----->> 决策具有单调性 ------->> 满足二分的性质
>
> > 细化问题、简化思考方式
>
> 一、对于力量值
>
> 对于力量值，发现初始力量越多，穿的也就越多，可以用二分的方法来解决！
>
> 二、对于精神值
>
> 在选定了满足条件的力量值后，然后模拟穿着装备的过程，一件一件穿，找出满足条件的精神值
>
> 可以使用一个堆（优先队列）来维护还未穿着的装备

```C++
#include <bits/stdc++.h>
#include <queue>
#define int long long
using namespace std;

struct Node
{
    int a,b,c,d;
    bool operator < (Node y) const
    {
        return b > y.b;
    }
}a[100001];
int n;
bool cmp(Node x, Node y)
{
    if(x.a == y.a)
    {
        return x.b < y.b;
    }
    return x.a < y.a;
}

bool check(int mid)
{
    for(int i = 1; i <= n; i ++)
    {
        if(mid < a[i].a) return 0;
        mid += a[i].c;
    }
    return 1;
}
int get_b(int ac) //再已经获得最合适的力量值的前提下找精神值，第二次贪心
{
    //利用堆来维护还未穿的装备
    int ret = 0, sum = 0;
    priority_queue<Node> q;
    int i = 1;
    while(a[i].a <= ac && i <= n)
    {
        q.push(a[i]);
        i++;
    }
    while(!q.empty())
    {
        Node cur = q.top();
        q.pop();
        ret = max(ret, cur.b - sum);
        sum += cur.d;
        ac += cur.c;
        while(a[i].a <= ac && i <= n)
        {
            q.push(a[i]);
            i++;
        }
    }
    return ret;
}
int main()
{
    int T;
    cin >> T;
    cin >> n;
    if(n == 0)
    {
        cout << "0 0" << endl;
        exit(0);
    }
    int sum = 0;
    for(int i = 1; i <= n; i++)
    {
        cin >> a[i].a >> a[i].b >> a[i].c >> a[i].d;
        sum += a[i].a; //初始总力量
    }
    sort(a+1,a+n+1,cmp); //将结构体中以a为准进行排列
    int l = 0, r = sum * 2;
    int ans = 0;
    //一次贪心
    while(l <= r) //!目的是找到最小的满足条件的初始力量值
    {
        int mid = l+r>>1;
        if(check(mid))
        {
            ans = mid;
            r = mid - 1;
        }
        else l = mid + 1;
    }
    //找到完最小的满足条件的力量值后
    //然后模拟穿装备，找到最合适的精神值
    //二次贪心
    cout << ans << " " << get_b(ans);
    return 0;
}
```

#### P4058 [Code+#1]木材

> https://www.luogu.com.cn/problem/P4058

> -->观察题目的数据范围 $1 ≤ S,L ≤ 10^18$
>
> --> long long $10^9$  故应该采用 因为数据量都是正数 unsigned long long 无符号long long满足题目的数据范围
>
> 本题目的是找最少需要等几个月，不妨采用二分方法
>
> 1.考虑二分的端点—— 可能一开始就满足条件，可令左端点为0，
> 对于右端点，我们因为有两个约束条件：一个是单根的长度，另外一个是总长度。
>
> > 我们去比较要求的单根长度和把总任务分配到每一根的需求长度，取最大值就是实际的约束条件；那么二分的右端点**实际上就是每棵树长高到约束条件的时间中的最大值**
>
> 本题的几个难点：
> 		1.数据范围非常大，应该采用unsigned long long 进行存储
> 		2.二分进行查找，右端点的选取

```C++
#include <bits/stdc++.h>

using namespace std;
const int N = 200200;
unsigned long long h[N],a[N];
unsigned long long n,m,s,i,j,k,minn = 0,maxn = 0,l,r,q;

//快读函数，快速读入整数
inline int rd(){
    int x=0;
    bool f=true;
    char c;
    c=getchar();
    while(c<'0'||c>'9'){
        if(c=='-') f=false;
        c=getchar();
    }
    while(c>='0'&&c<='9'){
        x=(x<<1)+(x<<3)+(c^48);
        c=getchar();
    }
    return f?x:-x;
}

bool check(unsigned long long mid) //二分check函数
{
    unsigned long long sum = 0;
    bool flag = 1;
    for(i = 1; i <= n; i ++)
    {
        if(h[i] + a[i] * mid >= minn)
        {
            if(flag) sum += h[i] + a[i] * mid;
            if(sum >= s) return true;
        }
    }
    return false;
}

int main()
{
    scanf("%lld%lld%lld",&n,&s,&minn);
    for(i = 1; i <= n; i ++) h[i] = rd();
    for(i = 1; i <= n; i ++) a[i] = rd();
    q = max(minn, s/n+1);
    for(i = 1; i <= n; i++)
    {
        if(h[i] < q) maxn = max(maxn,(q-h[i])/a[i]+1);
    }//找右端点
    l = 0;
    r = maxn;
    //开始二分枚举
    while(l < r)
    {
        unsigned long long mid = l + r >> 1;
        if(check(mid))
        {
            r = mid;
        }
        else
        {
            l = mid + 1;
        } 
    }
    printf("%lld",l);
    return 0;
}
```

#### P2331 ❔[SCOI2005]最大子矩阵

> https://www.luogu.com.cn/problem/P2331

> 该题要用到动态规划，等啥时候学到动态规划的时候回来再看看吧



#### P2853 [USACO06DEC]Cow Picnic S

> https://www.luogu.com.cn/problem/P2853

> (lll￢ω￢)，就是一个dfs，从每个给定的地方开始进行一次dfs，如果能够到达，则该点++，能够到达的点等于所要求的数量，则ans++;
>
> > 纯粹用y总的模板写完的题
>
> > > 不过还是得注意一下数据范围以及cin速度太慢了，最好换成scanf进行输入

```C++
#include <bits/stdc++.h>

using namespace std;
const int N = 10010;
int k,n,m;
int h[N],e[N],ne[N],idx;
int st[N];
int x[N];
int start[N];
void add(int a,int b)
{
    e[idx] = b;
    ne[idx] = h[a];
    h[a] = idx++;
}
void dfs(int u)
{
    st[u] = 1;
    x[u] ++;
    for(int i = h[u]; i != -1; i = ne[i])
    {
        int j = e[i];
        if(!st[j])
        {
            dfs(j);
        }
    }
    return;
}
int main()
{
    ios::sync_with_stdio(false);
    scanf("%d%d%d", &k,&n,&m);
    //cin >> k >> n >> m;
    idx = 0;
    int ans = 0;
    memset(h, -1, sizeof h);
    memset(x, 0, sizeof x);
    memset(st, 0, sizeof st);
    for(int i = 1; i <= k; i ++)
    {
        scanf("%d", &start[i]);
        //cin >> start[i];
    }
    for(int i = 1; i <= m; i ++)
    {
        int in,to;
        scanf("%d%d", &in,&to);
        //cin >> in >> to;
        add(in,to);
    }
    for(int i = 1; i <= k ; i ++)
    {
        memset(st, 0, sizeof st);
        dfs(start[i]);
    }
    for(int i = 1; i <= n; i ++)
    {
        if(x[i] == k) ans++;
    }
    cout << ans;
    return 0;
}
```

#### P2937 [USACO09JAN]Laserphones S

> https://www.luogu.com.cn/problem/P2937

> 看到最短路问题，想到BFS，要满足bfs中的“拐弯数”最少，需要进行特判以及更多约束

> :joy: 通过这一题，我以最快的速度学会了在BFS中记录路径，以及输出BFS所获得的路径
>
> ```C++
> //注意一下，多维情况如何转化为一个一维情况
> //以及从一维情况转化到多维情况的计算方式 （注意避免麻烦还是下标从0开始吧QAQ）
> void printpre(int x,int y )
> {
>     if(pre[x*n+y] != -1)
>     {
>         printpre(pre[x*n+y]/n, pre[x*n+y]%n);
>     }
>     printf("(%d, %d)\n",x,y);
> }
> 
> int pre[N]; //用于存储前一个位置
> memset(pre, 0, sizeof pre);
> pre[stx*n+sty] = -1;//多维转一维
> if(t.first == enx && t.second == eny)
> {
> 	printpre(enx,eny); //递归进行输出
>     return;
> }
> ```

> 显然最短路的路径可能有多条，每条的拐弯数都不相同。所以这种方式是不行的，但能够学习到BFS输出最短路的路径还是很值得的

> 换一种思路：
>
> > 对于对每个格子进行标记（也就是染色）可以采用DFS
>
> ```C++
> ....... 
> ......C 
> ......* 
> *****.*     
> ....*.. 
> ....*.. 
> .C..*.. 
> ....... 
> ---->>//也是利用类似贪心的方法，记录每个点能够到达的话，需要的最少的拐弯次数
> ......1 
> 111111C 
> ......* 
> *****.* 
> ....*..   为1的地方无需拐弯
> ....*.. 
> .C..*.. 
> ....... 
>  
> 然后对每个点都进行延申
> 2222221 
> 111111C 
> 222222* 
> *****2* 
> ....*2.   为2的地方需要拐弯1次
> ....*2. 
> .C..*2. 
> .....2.
>     
> 2222221 
> 111111C 
> 222222* 
> *****2* 
> ....*23   为3的地方需要拐弯2次
> ....*23 
> .C..*23 
> 3333323
>     
> 2222221 
> 111111C 
> 222222* 
> *****2* 
> 4444*23   为4的地方需要拐弯3次
> 4444*23 
> 4C44*23 
> 3333323
> ```

```C++
#include <bits/stdc++.h>
#include <queue>
#define inf 0x3f3f3f3f
using namespace std;
int n,m;
int a[110][110];//保存地图 //将字符地图转化为整型地图
struct node
{
    int x,y;
    int num;
}s,t;
queue<node> q;

void dfs(int fx,node u) //在宽搜中每种延申方式就是一种广搜
{ 
    //fx记录方向（1上2下3左4右） u为当前所在点 
    int x=u.x,y=u.y,p=u.num; 
    if(a[x][y]<p || a[x][y]==inf) return;
    if(x<1 || y<1 || x>n || y>m) return;

    //判断延申方向
    if(fx==1)
    {
        a[x][y]=p;
        q.push((node){x,y,p});
        dfs(1,(node){x-1,y,p});
    }
    if(fx==2)
    {
        a[x][y]=p;
        q.push((node){x,y,p});
        dfs(2,(node){x+1,y,p});
    }
    if(fx==3)
    {
        a[x][y]=p;
        q.push((node){x,y,p});
        dfs(3,(node){x,y-1,p});
    }
    if(fx==4)
    {
        a[x][y]=p;
        q.push((node){x,y,p});
        dfs(4,(node){x,y+1,p});
    }
}

void bfs(){
    while(!q.empty())
    {
        node u=q.front(),v=q.front();
        q.pop();
        u.num++;
        v=u; v.x=u.x-1;//上 
        dfs(1,v);
        v=u; v.x=u.x+1;//下 
        dfs(2,v);
        v=u; v.y=u.y-1;//左 
        dfs(3,v);
        v=u; v.y=u.y+1;//右 
        dfs(4,v);
    }
}

int main(){
    cin>>m>>n;
    char zwh;
    memset(a,inf,sizeof(a));
    for(int i=1;i<=n;i++)for(int j=1;j<=m;j++) a[i][j]=inf-1;
    //如果地图范围全部是比答案小的数字（比如0），那么在dfs染色的时候就会直接返回，导致错误。
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            scanf(" %c",&zwh);
            if(zwh=='C') //这一步找起点和终点
            {
                if(s.x) t.x=i,t.y=j,t.num=0;//找到起点和终点
                else s.x=i,s.y=j,s.num=0;
            }
            if(zwh=='*')
            {//如果是墙的话那就设置为无穷大
                a[i][j]=inf;
            }
            
        }
    }
    q.push(s); //队列中将起点入队
    bfs(); //进行宽搜
    cout<<a[t.x][t.y]-1;//注意减一
    return 0;
}
```

#### P1031 [NOIP2002 提高组] 均分纸牌

> https://www.luogu.com.cn/problem/P1031

> 嘤嘤嘤，这道签到题，我居然思路出现的错误，嘤嘤嘤，还是得坐得下板凳！要努力去学习才行。
> 一定要对能够学到新的东西，充满求知欲，对未知充满期待，加油！努力！终会有所收获

> 这道题很简单，因为移动只能从相邻的位置进行移动;
> 首先我们需要先求一下平均值ave;
>
> 然后从第一堆开始，如果a[i] == ave 的话那就直接下一个;
>
> 如果a[i] != ave的话， 那么此时需要进行一次操作，也就是从i+1个位置搬运过来纸牌，或者从i位置向i+1的位置搬运纸牌
> a[i + 1] += a[i] - ave 具体是从i-->i+1 还是i+1-->i，主要看a[i]-ave是正还是负。反正不管怎样，这里都算操作一次，故此counts++;

```C++
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 110;
LL a[N];
int main()
{
    ios::sync_with_stdio(false);
    int n;
    scanf("%d", &n);
    LL sum = 0;
    for(int i = 1; i <= n; i ++)
    {
        scanf("%lld", &a[i]);
        sum += a[i];
    }
    LL ave = sum / n;
    LL counts = 0;
    for(int i = 1; i <= n - 1; i ++)
    {
        if(a[i] - ave != 0)
        {
            counts++;
            a[i+1] += a[i] - ave;
        }
    }
    printf("%lld",counts);
    return 0;
}
```

#### P7404 [JOI 2021 Final] とてもたのしい家庭菜園 4

> https://www.luogu.com.cn/problem/P7404

> 思路与题解
>
> 数据量巨大，可采用【差分】进行求解
>
> 对于差分数组
>
> $b_i = a_{i+1} - a_i$
> 因为题目的操作，只能对给定的区间进行“+1”运算
>
> `可以有个结论，bi差分数组的正负情况与ai,ai+1的递增还是递减情况对应`
>
> 对于前半段，要满足恒递增的情况，
> 对于$b_i$如果 $b_i$ <=0 的话，对答案有贡献，此时必须进行一次操作； $x_i←x_{i−1}+∣bi∣+1$；
> 对于$b_i$如果$b_i$  > 0 的话，对答案没有贡献，无需进行操作；
>
> 对于后半段，要满足恒递减的情况，
> 对于$b_i$如果 $b_i$ < 0 的话，对答案没有贡献，无需进行操作；
> 对于$b_i$如果$b_i$  >= 0 的话，对答案有贡献，此时必须进行一次操作；
>
> > 定义front[N],behind[N];
> >
> > - front数组，$front_i$ 表示从$1 \rightarrow i$ 严格递增所需的步数
> > - $behind$数组，$behind_i$表示从 $ i + 1 \rightarrow n$ 严格递增所需的步数
> >
> > 可知：$ans = min{max(x_i,y_{i+1})} ~~~from~~i~~to~~n$

```C++
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 200010;
LL a[N],b[N];
LL front[N],behind[N];
int n;
LL ans = 0x3f3f3f3f3f3f3f3f;
int main()
{
    scanf("%d", &n);
    for(int i = 1; i <= n; i ++)
    {
        scanf("%lld", &a[i]);
        b[i] = a[i] - a[i - 1];
    }
    for(int i = 2,j = n; i <= n; i ++, j --)
    {
        if(b[i] <= 0)
        {
            front[i] = front[i - 1] - (b[i] - 1);//front[i]表示需要进行多少次操作才能让其大于前一项
        }
        else front[i] = front[i - 1]; //无需操作就让其与前一个相等

        if(b[j] >= 0)
        {
            behind[j] = behind[j + 1] + (b[j] + 1);//behind[i]表示需要进行多少次操作才能让其小于前一项
        }
        else behind[j] = behind[j + 1]; //无需操作就让其与前一个相等
    }
    for(int i = 1; i <= n; i ++)
    {
        ans = min(ans, max(front[i],behind[i+1])); //找出最小的满足条件的步数
    }
    printf("%lld",ans);
    return 0;
}
```

#### P6155 修改

> https://www.luogu.com.cn/problem/P6155

> 题解&思路：
>
> **贪心 + 数据结构[栈]**
>
> > 首先，如果没有 b_i的限制。我们可以用一个队列，枚举每个位置，如果这个位置上有点，则将这个位置的所有 a_i加入。然后，将一个 a_i放在这个位置。
> >
> > 举个例子。
> > 假如有 2,2,3 三个点：
> > 枚举位置 1，没有点。
> > 枚举位置 2，将两个 2 加入队列，将一个 2 弹出。
> > 枚举位置 3，将 3 加入队列，将另一个 2 弹出。
> > 枚举位置 4，将 3 弹出。
> > 每个点被修改的次数即为 出队时间 -− 入队时间。然后按修改的次数排序再乘上 b_i即可。
> >
> > 但有时有多种选择，比如在上述样例中，时间 3 时，既可以弹出 2 又可以弹出 3 ，但弹出 2 肯定是更优的，因为2的入队时间比 3 靠前，乘上的 b_i一定比 3 少，所以多修改一次 2的代价更小。
> > 所以将上述的队列改为栈。
> > 但时间复杂度还是 O*(*n*log*n*+max*a_i) 的。
> > 但可以发现，其实很多时候栈都是空的，优化就是在栈为空的时候跳到下一个 a_i。
> > 可以证明栈有值的点至多有 2n个。
> > 总复杂度 O*(*n*log*n*) (排序)。

```C++
#include <bits/stdc++.h>
#define re register
#include <stack>
//? 结果很大 需要对2^64进行取模？？？
using namespace std;
typedef long long LL;
struct node{
	int x,id;
};
struct d{
	int ans,pos;
}p[1000002];
int n,a[1000002],b[1000002],x,l;
unsigned long long ans;
inline int read(){
	int t=0;
	char v=getchar();
	while(v<'0')v=getchar();
	while(v>='0'){
		t=(t<<3)+(t<<1)+v-48;
		v=getchar();
	}
	return t;
}
inline bool cmp(d x,d y){
	return x.ans>y.ans;
}
stack <node> q;
signed main(){
	n=read();
	for(re int i=1;i<=n;++i)a[i]=read();
	sort(a+1,a+n+1);
	for(re int i=1;i<=n;++i)b[i]=read();
	sort(b+1,b+n+1);
	l=1;
	x=1;
	while(1){
		if(q.empty()){
			if(l<=n)
			x=a[l];
			else break;
		}
		while(a[l]==x){
			q.push(node{a[l],l});
			++l;
		}
		node tmp=q.top();
		q.pop();
		p[tmp.id].ans=x-tmp.x;
		++x;
	}
	sort(p+1,p+n+1,cmp);
	for(re int i=1;i<=n;++i)
    {
        ans+=1llu*p[i].ans*b[i];
	}
	printf("%llu",ans);
}
```

> 仍存在疑惑：https://www.luogu.com.cn/problem/solution/P6155

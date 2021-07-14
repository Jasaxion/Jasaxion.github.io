> 让cin和scanf一样快吧！ 
>
> 主函数里面加上 `ios::sync_with_stdio(false);`

### 2021年7月12日

#### P1090 [NOIP2004 提高组] 合并果子 / [USACO06NOV] Fence Repair G

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

> > 2021年7月14日 今日反思：
> >
> > 做人一定不可好高骛远，一定要耐下心来，脸皮厚点没问题，毕竟我啥也不知道做。只能沉下心来努力积累。
> >
> > 当积累多了，日积月累，当量多了，量变一定会促成质变。你要相信自己！相信自己一定会有所收获！！！！！
> >
> > TODO：有时间的话，一定要找时间去再去练一下二分题。找准分界点，写好check()函数真的很重要！！！
> >
> > 每天一定要做到最晚出地下室的那一人！！！


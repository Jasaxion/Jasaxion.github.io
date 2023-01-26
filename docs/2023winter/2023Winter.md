# 2023-01-寒假-冲刺阶段

[TOC]

## Acwing周赛

### 1月14日

> 题目链接：https://www.acwing.com/problem/content/description/4264/

> **本题思路**：
>
> 假设我们现在单独枚举G的条件：
>
> HHHHHGHHHHH
>
> 设左侧有l个H，右侧有r个H，那么：
>
> 1. l * r —>l>0 && r >0 ==>乘法原理
> 2. l-1 –>r = 0，左边至少有2个H才能构成，故有l-1种情况
> 3. r-1 –>l = 0，同2
>
> ==思路清晰后也要会写代码，写代码能力还是要加强==

```cpp
#include<iostream>
#include<cstring>

using namespace std;
const int N = 500010;
int l[N],r[N];
long long ans = 0;
char a[N];
int n;

int main()
{
    scanf("%d", &n);
    scanf("%s", a);
  	//获取左边的情况
  	//巧妙使用h和g变量来记录连续的h或g的个数
    for(int i = 0, h = 0, g = 0; i < n; i ++){
        if(a[i] == 'G') l[i] = h, h = 0, g ++;
        else{
            l[i] = g, g = 0, h ++;
        }
    }
  	//获取右边的情况
    for(int i = n - 1, h = 0, g = 0; i >= 0; i --){
        if(a[i] == 'G') r[i] = h, h = 0, g ++;
        else r[i] = g, g = 0, h ++;
    }
  	//sum将三种情况进行合并
    for(int i = 0; i < n; i ++){
        ans += (long long)l[i] * r[i] + (l[i] - 1 > 0?l[i] - 1:0) + (r[i] - 1 >0?r[i]-1:0);
    }
    printf("%lld\n",ans);
    return 0;
}
```

### 1月20日

#### 3400. 统计次数

> https://www.acwing.com/problem/content/description/3403/

> 多种解法

- 暴力枚举

```cpp
#include<bits/stdc++.h>

using namespace std;
int n,k;
long long ans = 0;
int main()
{
    scanf("%d%d",&n,&k);
    for(int i = 1; i <= n; i ++)
    {
        int t = i;
        while(t){
            int cur = t % 10;
            // cout << cur << endl;
            if(cur == k) ans ++;
            t /= 10;
        }
    }
    printf("%lld\n",ans);
    return 0;
}
```

- 递归法

```cpp
int count (int x, int k)
{
    return x ? count (x / 10, k) + (x % 10 == k) : 0;
}
```

- 记忆化递归

```cpp
int f[N];
bool v[N] = {1};

int count (int x, int k)
{
    if (v[x])
    {
        return f[x];
    }
    f[x] = count (x / 10, k) + (x % 10 == k), v[x] = 1;
    return f[x];
}
```

- 数位DP

> 其中$f_i$表示$i$中有几个$k$。观察可以得到其状态转移方程为：$f_i=f_{\lfloor\frac{i}{10}\rfloor}+b_{i\ mod \ 10}$其中$b_j$表示$j$是否等于$k$

```cpp
for (int i = 1; i <= n; i ++)
{
    f[i] = f[i / 10] + (i % 10 == k);
}
```

#### 4366. 上课睡觉

> https://www.acwing.com/problem/content/description/4369/

> ：平均来讲的话，每个数的约数个数为$logn$个
>
> ：int范围内，约数最多的有1600左右个，如果在$10^6$内的话720720最多
>
> 取整个段段总和长为sum，我们去枚举所有的所有的count，这个count是sum的约数，且count越小越好，并且还需要判断count的合理性，也就是说，必须是否是相邻的进行合并的（也就是说是否能将原来的段分解为若干个段，使得每一段段长度为count）

```cpp
#include <bits/stdc++.h>

using namespace std;
typedef long long ll;
const int N = 100010;
int T;
int n,a[N];
// 判断是否满足相邻段段条件
bool check(int x){
    ll tmp = 0;
    for(int i = 0; i < n; i ++)
    {
        tmp += a[i];
        if(i == n - 1 && tmp < x) return false;
        if(tmp == x){
            tmp = 0;
        }
        if(tmp > x) return false;
    }
    return true;
}
int main(){
    scanf("%d",&T);
    while(T --){
        ll sum = 0;
        int ans = 0;
        scanf("%d",&n);
        for(int i = 0; i < n; i ++) scanf("%d",&a[i]), sum += a[i];
        
        //枚举sum的所有约数
        for(int i = 1; i <= sum; i ++)
        {
            if(sum % i == 0 && check(i)){
                ans = n - (sum / i);
                break;
            }
        }
        printf("%d\n",ans);
    }
    return 0;
}
```

### 1月22日

#### 4645. 选数异或

> https://www.acwing.com/problem/content/description/4648/

> **思路：**
>
> 对于一段序列 L———a——b———R，我们需要找到a\^b=x，根据异或运算的规则，可以得到a=b\^x，也就是说，对于一个数b，我们只需要在其左边寻找一个最靠近的a也就是b\^x即可，并且要满足b\^x>=l，那么此时就能成立。
>
> > 对于这一段，我们可以只考虑右端点R的信息，从而简化问题。
>
> 1. 注意时间复杂度，对于第一项$10^5$，如果进行遍历的话，那么时间复杂度将会达到$10^{10}$显然已经TLE，故此在寻找b的左边的满足条件的最大的b^x时，需要进行一下优化处理；
>
> 2. 对于序列中的每个数，我们用哈希表$f$来存放当前数所对应的最靠右的下标（因为我们只考虑右边），每次更新都会更新其下标位置。
>
> 3. 定义下标数组$g$，表示当前位置的左边最大的满足条件的数所在的下标位置：
>
>    显然有：$g[i]=max(g[i-1],f[b\oplus x])$
>
> 4. 对于每次询问，先要判断L!=R，如果L==R，此时只有一个数，无法构成一个数对，其次再来判断g[R]是否大于等于L，满足条件则输出yes.

```cpp
#include<bits/stdc++.h>

using namespace std;
const int N = 100010;
const int M = 1000010;
typedef long long ll;
int n,m;
ll x;
int a[N];
int g[M];
// ll f[M];
unordered_map<int, int> f;
int main()
{
    scanf("%d%d%lld",&n,&m,&x);
    for(int i = 1; i <= n; i ++){
        scanf("%d",&a[i]);
        ll t = a[i] ^ x; //存下a^x的值
        g[i] = max(g[i - 1], f[t]);
        f[a[i]] = i;    
    }
    while(m --){
        int l, r;
        scanf("%d%d",&l,&r);
        if(l != r && g[r] >= l) printf("yes\n");
        else printf("no\n");
    }
    
    return 0;
}
```

#### 4644. 求和

> https://www.acwing.com/problem/content/description/4647/

> 气死了，以后凡是long long参与的运算，全部都强制数据类型转换！！！

```cpp
#include<bits/stdc++.h>

using namespace std;
const int N = 200010;
typedef long long ll;
int a[N];
ll s[N];
ll ans;
int n;
int main()
{
    scanf("%d",&n);
    for(int i = 1; i <= n; i ++){
        scanf("%d",&a[i]);
        s[i] = s[i-1] + a[i];
    }
    for(int i = 1; i < n; i ++){
        ans += (ll)a[i] * (ll)(s[n] - s[i]); 
    }
    printf("%lld\n",ans);
    return 0;
}
```

#### 4653. 数位排序

> https://www.acwing.com/problem/content/description/4656/

>本题总结：尽可能不要在排序里面放运算（因为这样会很影响原来排序的时间复杂度），尽可能把运算提出来。

```cpp
#include<bits/stdc++.h>

using namespace std;
int n,m;
const int N = 1000010;
int a[N];
int g[N];
bool cmp(int a, int b){
    if(g[a] < g[b]) return true;
    else if(g[a] == g[b] && a < b) return true;
    else return false;
}
int main()
{
    scanf("%d%d",&n,&m);
    for(int i = 1; i <= n; i ++){
        a[i] = i;   
        int t = a[i];
        while(t){
            g[i] += t % 10;
            t /= 10;
        }
    }
    sort(a+1,a+n+1,cmp);
    printf("%d\n",a[m]);
    return 0;
}
```

#### 4655. 重新排序

> https://www.acwing.com/problem/content/4658/

> **思路**：自己首先想到的是区间交叉取交叉次数最多的区间，但显然这样做更麻烦。转换思路我们可以获得每个数被加了多少次，这里可以用差分来进行优化。然后贪心求最大值。
>
> 一定要时刻注意运算数据范围。

```cpp
#include <bits/stdc++.h>

using namespace std;
typedef long long ll;
const int N = 100010;
int n,m;
int a[N],b[N];
ll s[N];
ll res = 0;
ll res2 = 0;
void insert(int l,int r,int c){
    b[l] += c;
    b[r + 1] -= c;
}
int main()
{
    scanf("%d",&n);
    for(int i = 1; i <= n; i ++)
    {
        scanf("%d",&a[i]);
        s[i] = s[i - 1] + a[i];
    }
    scanf("%d",&m);
    while(m --){
        int l,r;
        scanf("%d%d",&l,&r);
        insert(l,r,1);
        res += (ll)(s[r] - s[l - 1]);
    }
    for(int i = 1; i <= n; i ++) b[i] += b[i - 1];
    
    sort(b+1,b+n+1);
    sort(a+1,a+n+1);
    for(int i = n; i > 0; i --){
        res2 += (ll)a[i] * b[i];
    }
    printf("%lld\n",res2 - res);
    return 0;
}
```

### 1月22日

#### 4656. 技能升级⭐️

> https://www.acwing.com/problem/content/description/4659/

> **多路归并困难题：**
>
> > 其他例题：一些不需要二分优化的基础多路归并：LC264. 丑数II，LC313. 超级丑数，LC373. 查找和最小的K对数字，LC378. 有序矩阵中第K小的元素

> 思路：
>
> 每次能够增加的攻击指数可以为: 10, 9, 9, 7,5,2 ….
> 我们不难发现，要满足最大攻击收益，那么这里每次都应该取得最大的攻击增加的值，并且每次取的值一定是递减的，我们可以求出一个$L$ ，凡是大于$L$的攻击数值，我们都需要取的，而等于$L$的应该另外讨论，主要是讨论其是否会超出能升级的技能的次数。
>
> 对于如何求$L$，由于这里有很明显的单调性，故此可以采用二分的方法，对于取得最大的值，可以采用大根堆的方法每次取最大的攻击指数。

```cpp
#include <bits/stdc++.h>
#include <queue>
#define x first 
#define y second 
using namespace std;
const int N = 100010;
typedef long long ll;
typedef pair<int,int> PII;
int n;
ll m;
int a[N],b[N];

bool check(int x){
    ll cur = 0;
    for(int i = 1; i <= n; i ++){
        if(a[i] < x) continue;
        int cnt = (a[i] - x) / b[i] + 1;
        cur += cnt;
    }
    return cur <= m;
}

int main()
{
    scanf("%d%lld",&n,&m);
    for(int i = 1; i <= n; i ++)
    {
        scanf("%d%d",&a[i],&b[i]);
    }
    //二分求L
    int l = 1,r = 1e6,mid,ans2;
    while(l <= r){
        mid = (l + r) / 2;
        if(check(mid)){
            r = mid - 1;
            ans2 = mid;
        }
        else{
            l = mid + 1;
        }
    }
    //取最大次数并求取当前的攻击值
    ll ans = 0;
    for(int i = 1; i <= n; i ++){
        if(a[i] < l) continue;
        int cnt = (a[i] - l) / b[i] + 1;
        ans += (ll)(a[i] + a[i] - (cnt - 1) * b[i]) * cnt / (ll)2;
        a[i] -= b[i] * cnt;
        m -= cnt;
        if(m <= 0) break;
    }
    //m如果还有剩下的话，那么可以用大根堆来处理剩下的次数
    priority_queue<PII> q; //大根堆，主要是存放最大的收益
    for(int i = 1; i <= n; i ++){
        q.push({a[i], b[i]});
    }
    while(m --){
        PII t = q.top();
        q.pop();
        if(t.x <= 0) break;
        ans += (ll)t.x;
        t.x -= t.y;
        
        if(t.x > 0) q.push({t.x, t.y});
    }
    printf("%lld\n",ans);
    return 0;
}
```

> **多路合并问题:**
>
> 简单：丑数II ——使用多指针分三路进行合并
>
> ```cpp
> class Solution {
> public:
>     int nthUglyNumber(int n) {
>         int *arr = new int[n+1];
>         arr[1] = 1;
>         for(int x=1,y=1,z=1,idx=2;idx <= n; idx++){
>             int a = arr[x] * 2;
>             int b = arr[y] * 3;
>             int c = arr[z] * 5;
>             int m = min(a,min(b,c));
>             if(m == a) x ++;
>             if(m == b) y ++;
>             if(m == c) z ++;
>             arr[idx]=m;
>         }
>         int ans = arr[n];
>         delete[] arr;
>         return ans;
>     }
> };
> ```
>
> 鱼塘钓鱼:https://www.acwing.com/problem/content/1264/  本题是技能升级到简化版，不用二分优化。
>
> > 这道题我们枚举最后走到哪个鱼塘`for (int k = 1; k <= n; k++)`。这就意味着，前面`k`个鱼塘我们都走过了（后面的鱼塘暂时不管，这里是枚举终点），所以前面`k`个鱼塘赶路的时间用前缀和``T[i]``处理即可
> >
> > 所以每循环一次k，前k个鱼塘就都走到了，那么除去你走路的时间，剩下钓鱼的时间就是``fish_time = Time - T[k]``。剩下的时间全部用来钓鱼（走路的时间已经去掉了），所以用大根堆来维护当前哪个池塘能钓最多的鱼
>
> ```cpp
> #include <bits/stdc++.h>
> #include <queue>
> #define x first
> #define y second
> 
> using namespace std;
> 
> typedef pair<int, int> PII;
> 
> const int N = 110;
> 
> int n;
> int num[N], d[N], T[N]; // num：第一分钟能钓到的鱼，d：每分钟减少的数量，T：走到下一个需要的时间
> 
> int main()
> {
>     cin >> n;
>     for (int i = 1; i <= n; i++) cin >> num[i];
>     for (int i = 1; i <= n; i++) cin >> d[i];
>     // 默认走到第一个鱼塘的时间是0，所以前缀和从2开始算
>     for (int i = 2; i <= n; i++)
>     {
>         cin >> T[i];
>         T[i] += T[i - 1];
>     }
>     int Time;
>     cin >> Time;
> 
>     int ans = -1;
> 
>     // 只在前k个鱼塘钓鱼
>     for (int k = 1; k <= n; k++)
>     {
>         int fish_time = Time - T[k]; // 除去鱼塘之间赶路的时间，剩下的钓鱼的时间
>         priority_queue<PII> q; // 用大根堆维护当前能钓的最多的鱼
>         for (int i = 1; i <= k; i++)
>             q.push({num[i], i}); // 前k个鱼塘的鱼的数量的大根堆， 后面跟一个下标方便后续的计算
> 
>         int fish = 0; // 前k个鱼塘能钓到的鱼
>         while (q.size() && fish_time > 0) // 要有鱼可以钓，并且有时间钓鱼才循环
>         {
>             PII t = q.top();
>             q.pop();
>             int var = t.y;
> 
>             fish += t.x;
>             fish_time--; // 钓鱼时间减1
>             t.x -= d[var]; // 钓完鱼之后，根据题意减去部分鱼
> 
>             if (t.x > 0) q.push({t.x, var}); // 如果池塘钓不到鱼了，也就不需要入队了
>         }
> 
>         ans = max(ans, fish);
>     }
> 
>     cout << ans << endl;
> 
>     return 0;
> }
> ```

### 1月26日

#### 4700. 何以包邮？

> https://www.acwing.com/problem/content/description/4703/

> **思路一：转化为背包DP问题**
>
> 转换思路：背包问题的m为当前区间，满足包邮条件下，最多还需要买一本书，具体买的哪本书的价格定义为x + max_a[i]为背包问题下的m值。
>
> dp[i]表示的是邮费定为i时，所需要购买书本的最小花费。
>
> 获取dp数组后，我们循环遍历，从最小邮费x开始循环求取其最小值即可。
>
> 注意细节：1.需要初始化dp数组为无穷大；2.需要初始化ans为无穷大；3.需要初始化dp[0]=0;
>
> **思路二：转化为0/1背包问题**——逆向转化，这里背包容量不是x，而是sum-x，我们这里转化为最多能去掉多少个物品！
>
> 将原问题向背包问题进行转化，背包容量为 sum - x，每个物品的体积：w[i]，每个物品的价值：w[i]；
>
> 也就是说我们需要选择一些物品，似的总体积不超过sum - x的条件下，总价值最大。 ——转化为0/1背包问题——时间复杂度 物品数量*总容量 $9 * 10^6$
>
> **思路三：转化为装箱DP问题**
>
> > 装箱问题：https://www.luogu.com.cn/problem/P1049
>
> <img src="./2023Winter.assets/%E6%88%AA%E5%B1%8F2023-01-26%2016.06.19.png" alt="截屏2023-01-26 16.06.19" style="zoom:50%;" />

```cpp
//方法一：传统背包DP思路
#include <bits/stdc++.h>
using namespace std;
const int N = 10010;
const int M = 300010;
typedef long long ll;
int a[N];
int dp[M];
ll x;
int n;
int main()
{
    scanf("%d%lld",&n,&x);
    memset(dp,0x3f,sizeof(dp));
    dp[0] = 0;
    for(int i = 1; i <= n; i ++){
        scanf("%d", &a[i]);
    }
    for(int i = 1; i <= n; i ++){
        for(int j = x + 10010; j >= a[i]; j --){
            dp[j] = min(dp[j], dp[j - a[i]] + a[i]);
        }
    }
    int ans = 0x3f3f3f3f;
    for(int i = x; i <= x + 10010; i ++){
        ans = min(ans,dp[i]);
    }
    printf("%d\n",ans);
    
    return 0;
}
```

```cpp
//思路二：0/1背包问题的转化
#include<bits/stdc++.h>

using namespace std;
const int N = 10010;
const int M = 300010;
int a[N];
int n,m;
int dp[M];
long long sum = 0;
int main()
{
    scanf("%d%d",&n,&m);
    for(int i = 1; i <= n; i ++){
        scanf("%d",&a[i]);
        sum += a[i];
    }
    m = sum - m; //表示最多去除的“体积”
    for(int i = 1; i <= n; i ++){
        for(int j = m; j >= a[i]; j --){
            dp[j] = max(dp[j], dp[j - a[i]] + a[i]); //这里求最大值的目的是求取最多去掉的书本中的最大价值
        }
    }
    printf("%d\n",sum - dp[m]); //sum-dp[m]则就表示剩下的就是满足条件的最小价值
    
    return 0;
}
```

```cpp
//装箱问题的转化
#include <cstdio>
#define N 35
#define M 310005
using namespace std;

int n, m, a[N], f[M];

int main ()
{
    scanf ("%d%d", &n, &m), f[0] = 1;
    for (int i = 1; i <= n; i ++)
    {
        scanf ("%d", &a[i]);
        for (int j = m + 10000; j >= a[i]; j --)
        {
            f[j] |= f[j - a[i]];
        }
    }
    for (int i = m; ; i ++)
    {
        if (f[i])
        {
            printf ("%d", i);
            return 0;
        }
    }
    return 0;
}
```

#### 4510. 寻宝！大冒险！

> https://www.acwing.com/problem/content/4513/

> **优化思路：**
>
> <img src="./2023Winter.assets/%E6%88%AA%E5%B1%8F2023-01-26%2020.07.44.png" alt="截屏2023-01-26 20.07.44" style="zoom:40%;" />

```cpp
//O2优化，100分
#pragma GCC optimize(3)
#pragma GCC optimize(2)
//TLE map映射 70分  暴力枚举
#include <bits/stdc++.h>
#include <map>
using namespace std;
typedef pair<int,int> PII;
map<PII,int> mp;
int n,S;
int g[110][110];
typedef long long ll;
ll L;
int ans = 0;
int main()
{
    scanf("%d%lld%d",&n,&L,&S);
    for(int i = 0; i < n; i ++){
        int x,y;
        scanf("%d%d",&x,&y);
        mp[{x,y}] = 1;
    }
    memset(g,-1,sizeof g);
    for(int i = S; i >= 0; i --)
    {
        for(int j = 0; j <= S; j ++)
        {
            scanf("%d",&g[i][j]);
        }
    }
    map<PII, int>::iterator iter;
    for (iter = mp.begin(); iter != mp.end(); iter++) {
        auto t = iter->first;
        int tmpx = t.first, tmpy = t.second;
        int flag = 0;
        for(int i = 0; i <= S; i ++){
            if(flag) break;
            for(int j = 0; j <= S; j ++){
                int nextx = tmpx + i;
                int nexty = tmpy + j;
                if(nextx > L || nexty > L){
                    flag = 1;
                    break;
                }
                if(mp.count({nextx,nexty}) != g[i][j]){
                    flag = 1;
                    break;
                }
            }
        }
        if(!flag){
            ans ++;
        }
    }
    printf("%d\n",ans);
    return 0;
}
```

```cpp
//优化思路——比较巧妙
//枚举左下角的树
//看该区域内的树是否等于one
#include <bits/stdc++.h>
using namespace std;

const int N = 1009;
int n, l, s;
int x[N], y[N], b[N][N];
int main()
{
    cin >> n >> l >> s;
    for (int i = 1; i <= n; i++)
        cin >> x[i] >> y[i];

    int one = 0;
    for (int i = s; i >= 0; i--)
        for (int j = 0; j <= s; j++)
            cin >> b[i][j], one += b[i][j];

    int ans = 0;
    for (int i = 1; i <= n; i++)
    {
        if (x[i] + s > l || y[i] + s > l)
            continue;
        int cnt = 0;
        for (int j = 1; j <= n; j++)
        {
            if (cnt == -1)
                break;
            if (x[j] >= x[i] && x[j] <= x[i] + s && y[j] >= y[i] && y[j] <= y[i] + s)
            {
                b[x[j] - x[i]][y[j] - y[i]] ? cnt++ : cnt = -1;
            }
        }
        ans += (cnt == one ? 1 : 0);
    }
    cout << ans << '\n';
    return 0;
}
```

#### 3422. 左孩子右兄弟—🌲二叉树⭐️

> https://www.acwing.com/problem/content/3425/

> **思路**：多叉树转化为二叉树
>
> > **左孩子右兄弟转化法：**——数组模拟临接表
>
> <img src="./2023Winter.assets/%E6%88%AA%E5%B1%8F2023-01-26%2022.38.44.png" alt="截屏2023-01-26 22.38.44" style="zoom:20%;" />

```cpp
#include <bits/stdc++.h>

using namespace std;
const int N = 100010;
int h[N],e[N],ne[N],idx;
int n,p;
void add(int a, int b){
    e[idx] = b;
    ne[idx] = h[a];
    h[a] = idx++;
}
int dfs(int u){
    int hmax = 0; //当前节点的最大高度
    int cnt = 0; //子节点的个数
    for(int i = h[u]; ~i; i = ne[i]){
        int j = e[i];
        hmax = max(hmax, dfs(j));
        cnt ++;
    }
    
    return hmax + cnt; //当前的最大高度+子节点个数为最大高度
}
int main()
{
    scanf("%d",&n);
    memset(h, -1, sizeof h);
    for(int i = 2; i <= n; i ++){ 
        scanf("%d",&p); //输入父节点编号，连接子节点与父节点
        add(p,i); //临接表进行存储和连接边
    }
    printf("%d", dfs(1));
    return 0;
}
```

#### 反素数（求约数个数最大的数）📖数论

> https://www.acwing.com/problem/content/description/200/

> **思路：通过数学方法摸清性质**
>
> <img src="./2023Winter.assets/%E6%88%AA%E5%B1%8F2023-01-26%2021.43.14.png" alt="截屏2023-01-26 21.43.14" style="zoom:40%;" />
>
> ```
> 如果 N = p1^c1 * p2^c2 * ... *pk^ck
> 约数个数： (c1 + 1) * (c2 + 1) * ... * (ck + 1)
> 约数之和： (p1^0 + p1^1 + ... + p1^c1) * ... * (pk^0 + pk^1 + ... + pk^ck)
> ```

```cpp
#include<bits/stdc++.h>

using namespace std;
typedef long long ll;
ll primes[11]={1,2,3,5,7,11,13,17,19,23,29},n;
ll maxd; //枚举到的当前的拥有最大约数个数的数字
ll sum_cnt; //当前最大的约数个数
//u表示当前枚举的素数
//last表示枚举的素数的次数
void dfs(int u, ll last, ll p, int s){
    if(s > sum_cnt || s == sum_cnt && p < maxd){
        sum_cnt = s;
        maxd = p;
    }
    if(u > 10) return;
    for(int i = 1; i <= last; i ++){
        if((ll)p * primes[u] > n) return;
        p *= primes[u];
        //这里为什么s*(i+1)，是利用的求约数个数的公式
        dfs(u + 1, i, p, s * (i + 1));
    }
}

int main()
{
    cin >> n;
    dfs(0, 30, 1, 1);
    cout << maxd << "\n";
    return 0;
}
```
















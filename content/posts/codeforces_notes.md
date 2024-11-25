+++
date = '2022-11-25T13:43:58+08:00'
draft = false
title = 'Codeforces 刷题归档'
tags = 'notes'
show_toc = true
twikoo = true
keywords = ['Codeforces', '算法', 'Algorithm']
description = "Codeforces 的刷题笔记归档"
+++



#### CF371C Hamburgers

> https://codeforces.com/problemset/problem/371/C

> Polycarpus loves hamburgers very much. He especially adores the hamburgers he makes with his own hands. Polycarpus thinks that there are only three decent ingredients to make hamburgers from: a bread, sausage and cheese. He writes down the recipe of his favorite "Le Hamburger de Polycarpus" as a string of letters 'B' (bread), 'S' (sausage) и 'C' (cheese). The ingredients in the recipe go from bottom to top, for example, recipe "ВSCBS" represents the hamburger where the ingredients go from bottom to top as bread, sausage, cheese, bread and sausage again.
>
> Polycarpus has *n**b* pieces of bread, *n**s* pieces of sausage and *n**c* pieces of cheese in the kitchen. Besides, the shop nearby has all three ingredients, the prices are *p**b* rubles for a piece of bread, *p**s* for a piece of sausage and *p**c* for a piece of cheese.
>
> Polycarpus has *r* rubles and he is ready to shop on them. What maximum number of hamburgers can he cook? You can assume that Polycarpus cannot break or slice any of the pieces of bread, sausage or cheese. Besides, the shop has an unlimited number of pieces of each ingredient.
>
> Input
>
> The first line of the input contains a non-empty string that describes the recipe of "Le Hamburger de Polycarpus". The length of the string doesn't exceed 100, the string contains only letters 'B' (uppercase English B), 'S' (uppercase English S) and 'C' (uppercase English C).
>
> The second line contains three integers *n**b*, *n**s*, *n**c* (1 ≤ *n**b*, *n**s*, *n**c* ≤ 100) — the number of the pieces of bread, sausage and cheese on Polycarpus' kitchen. The third line contains three integers *p**b*, *p**s*, *p**c* (1 ≤ *p**b*, *p**s*, *p**c* ≤ 100) — the price of one piece of bread, sausage and cheese in the shop. Finally, the fourth line contains integer *r* (1 ≤ *r* ≤ 1012) — the number of rubles Polycarpus has.
>
> Please, do not write the %lld specifier to read or write 64-bit integers in С++. It is preferred to use the cin, cout streams or the %I64d specifier.
>
> Output
>
> Print the maximum number of hamburgers Polycarpus can make. If he can't make any hamburger, print 0.
>
> Examples
>
> input
>
> ```
> BBBSSC
> 6 4 1
> 1 2 3
> 4
> ```
>
> output
>
> ```
> 2
> ```
>
> input
>
> ```
> BBC
> 1 10 1
> 1 10 1
> 21
> ```
>
> output
>
> ```
> 7
> ```
>
> input
>
> ```
> BSC
> 1 1 1
> 1 1 3
> 1000000000000
> ```
>
> output
>
> ```
> 200000000001
> ```

> 这道题就是一道二分的例题
>
> 这里我们可以模拟二分能够制作的汉堡包的数目
>
> 设置 最少能制作0个，最多能制作INF(无穷多个)，如何进行二分枚举
>
> 这里需要注意的是，应该用long long 类型，其次是无穷大的设置应该尽可能大。
> 然后此处check()函数就是判断当前能够制作的汉堡包的数目（减去原料后）去商店进行购买(这里计算每个原料所要花的钱cb,cs,cc)，看身上带的钱是否足够，然后这里也需要特别注意一下：可能会出现负数（也就是说已有的原料已经足够制作相应数目的汉堡包了，此时重置当前原料所要的花费为0）

```cpp
#include <bits/stdc++.h>

using namespace std;
const int N = 110;
char str[N];
typedef long long LL;
LL b=0,s=0,c=0;
LL nb,ns,nc;
LL pb,ps,pc;
LL r;

bool check(LL sum_humber)//判断身上带的钱是否足够
{
    LL cb = (LL)(b*sum_humber - nb)*pb;
    LL cs = (LL)(s*sum_humber - ns)*ps;
    LL cc = (LL)(c*sum_humber - nc)*pc;
    if(cb < 0) cb = 0;
    if(cs < 0) cs = 0;
    if(cc < 0) cc = 0;
    //如果钱够的话则返回true，否则false
    if((LL)cb + cs + cc <= r) return true;
    else return false;
}
int main()
{
    ios::sync_with_stdio(false);
    cin >> str;
    cin >> nb >> ns >> nc;
    cin >> pb >> ps >> pc;
    cin >> r;
    LL len = strlen(str);
    for(LL i = 0; i < len; i ++) //字符串处理
    {
        if(str[i] == 'S') s++;
        else if (str[i] == 'C') c++;
        else b++;
    }
    //二分能够做得面包数目
    //一开始设置最少买0个，最多买无限多个
    LL l = 0;
    LL r = 0x3f3f3f3f3f3f; //<---为了能够AC,这里的无穷大应再弄大一点
    while(l < r)//开始二分进行查找
    {
        LL mid = l + r + 1 >> 1;
        if(check(mid)) l = mid;
        else r = mid - 1;
    }
    cout << l;
    return 0;
}
```



#### CF1512G Short Task

> 这道题一定要深入了解欧拉筛；
>
> 首先利用欧拉筛，求出所有和
> 先用欧拉筛筛出 1→10000000 所有数的因数和（调和级数枚举也可以），然后遍历一遍统计就可以了。
>
> > > 欧拉筛筛约数
> > >
> > > ![image-20210722161048939](http://pve.digikamc.cn:8010/i/2024/11/25/m88s76-0.png)
>
> > 1. *i* 为素数，f*(*i*)=*i*+1
> > 2. i不可被 p_j整除, f*(*i*×*pj)=f(i*)+*f*(*i*)×*pj。因为乘上 p_j就使原数的因子数增加了一倍，增加的因子是原数每个因子分别乘上 p**j* 。
> > 3. i 可被 p_j整除，f*(*i*×*pj)=f(i)+(f(i)−f(i/pj*))×*pj 。因为 i/pj 中的每个因子乘上 p_j都会造成因子的重复计算，所以要去掉重复出现的因子。
>
> `拓展知识点还请查看“我的算法笔记” - 数论 章节`

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long LL;
const int N = 10000005;
LL sum[N];
int cnt;
int prime[N];
int ans[N];
bool st[N];
void getsum()
{
    ans[1] = sum[1] = 1;
    for(int i = 2; i < N; i ++)
    {
        ans[i] = -1;
    }
    for(int i = 2; i < N; i ++)
    {
        if(!st[i])
        {
            prime[++cnt] = i;
            sum[i] = i + 1;
            //如果此时是质数的话
            //那么sum[n]=n+1;
            //例如 2 是质数， 2 = 1 + 3;
        }
        //从目前所有的已找到的质数中查找
        for(int j = 1; j <= cnt&& prime[j] <= N/i;j++)
        {
            st[i*prime[j]] = 1;//pj为i的最小质因子
            if(i%prime[j] == 0) //如果能够被整除的话
            {
                sum[i*prime[j]] = sum[i] +(sum[i]-sum[i/prime[j]])*prime[j];
                break;
            }
            sum[i*prime[j]] = sum[i] +sum[i]*prime[j]; //如果不能被整除的话
        }
    }
}
int main()
{
    int T;
    int n;
    getsum();
    //先用欧拉筛筛出1~1e7的所有数的因数和
    for(int i = 2; i < N; i ++)
    {
        if(sum[i] > N) continue;
        if(ans[sum[i]] == -1) //替换一下-1所对应的值
        {
            ans[sum[i]] = i;
        }
    }
    scanf("%d",&T);
    while(T -- )
    {
        scanf("%d",&n);
        printf("%d\n",ans[n]);
    }
}
```



#### CF-Hello2022_B

> Problem B - Integers Shop
>
> https://codeforces.com/contest/1621/problem/B

> 思路一定要清晰！！！！
> 不要好高骛远！

```cpp
#include <bits/stdc++.h>

using namespace std;
int T;
const int N = 100010;
const int INF = 2e9+10;

int main()
{
    scanf("%d",&T);
    while(T --)
    {
        int n;
        scanf("%d",&n);
        int l,r,c,minl,maxr;
        int ansl,ansr;
        int ans;
        int anst = INF;
        minl=INF;
        maxr=0;
        while(n--)
        {
            scanf("%d%d%d",&l,&r,&c);
            if(l < minl){
                minl = l;
                ansl = c;
                anst = INF;
            }
            else if(l == minl){
                ansl = min(ansl, c);
            }

            if(r > maxr){
                maxr = r;
                ansr = c;
                anst = INF;
            }
            else if(r == maxr){
                ansr = min(ansr, c);
            }

            if(minl == l && maxr == r)
            {
                anst = min(anst, c);
            }
            ans = ansl+ansr;
            printf("%d\n", min(anst,ans));
        }

    }
    return 0;
}
```



### 2022年3月31日

#### Codeforces Round #780 (Div. 3)

##### B. Vlad and Candies

> https://codeforces.com/contest/1660/problem/B
>
> 题意就是：给定一串糖果数字，$a_1,a_2,...,a_n$
> 可以从这里面最多里面挑选一个，挑选完后改糖果-1，要满足，每次选的糖果都不一样，
> 并且最后要能把所有糖果都吃完，也就是每一项最后都为0

> 分类讨论：
>
> ```
> 1.a1=a2，那么可以这样 1，2，1，2，dot,1,2-->满足条件
> 2.a1=a2+1,那么可以先吃一个糖果1，然后再按序列2,1,2,1...,2,1总是按这个规则
> 3.a1>a2+1,我们先吃一个糖果1，但是现在最多的糖果仍然是1，那么答案就不存在
> 故此只需要排序，只需要看最大的元素和次大的元素的关系即可
> ```

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 200010;
typedef long long ll;
int n,T;
int main()
{
    scanf("%d",&T);
    while(T --){
        ll a[N];
        scanf("%d", &n);
        for(int i = 0; i < n; i ++){
            scanf("%lld",&a[i]);
        }
        sort(a,a+n);
        if(n == 1){
            if(a[0] > 1){
                printf("NO\n");
            }
            else{
                printf("YES\n");
            }
            continue;
        }
        if(a[n-1] <= a[n-2] + 1){
            printf("YES\n");
        }
        else{
            printf("NO\n");
        }
    }
    return 0;
}
```

##### C. Get an Even String

> https://codeforces.com/contest/1660/problem/C

> 题意：
>
> 给定一串字符串，你可以删除其中的字符让其出现的每个字符都连续出现偶数次。
> 输出是删除的字符的最小数目

> 采用贪心的策略
> 首先用哈希表存下来二十六个字母的出现情况，st[26]表示字母是否有出现
> 我们一对一对看其已出现的字母
>
> 遍历整个字符串，记录$st[i]$表示$str[i]$出现过一次
> 如果$st[i] = 0$ 令其 $st[i] = 1, 则 ans +1$
> 如果$st[i]=1$ 则之前已经出现过了，之前出现过的那个和当前这个可以组成一对，那么$ans-1$，然后将$st[N]数组置为0即可$
> 可以证明   	$这样操作能够使得，字符串对的长度最小，从而删除的字符的数目最少$

```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 200010;
int st[26],n;
string str;
int main()
{
    ios::sync_with_stdio(false);
    cin >> n;
    while(n --){
        //scanf("%s",&str[0]);
        cin >> str;
        int ans = 0;
        memset(st,0,sizeof st);
        int len = str.size();
        for(int i = 0; i < len; i ++){
            if(!st[str[i] - 'a']){
                st[str[i] - 'a'] ++;
                ans ++;
            }
            else{
                memset(st,0,sizeof st);
                ans --;
            }
        }
        cout << ans << endl;
    }
    return 0;
}
```

##### D. Maximum Product Strikes Back

> https://codeforces.com/contest/1660/problem/D

> 咱先好好理解一下题意，大致就是说
> 给定一串数字序列，$a_1,a_2,a_3,...a_n$
>
> 你可以在前面和后面进行删除元素操作，你也可以删除全部元素（这样的话令他的结果为1），
> 要使得最后所有元素乘积达到最大值。

> 首先，我们假设把整个序列的元素全部删除，那么此时的值为1。
>
> 因此，我们要保留下来的数，必须要为正数，并且乘积大于1，如果要为正数的话，那么肯定不能有0存在
> 故此，凡是有0的全部移除。
>
> 最后获得，最有两边全是非零的序列。
> 如果这个非零序列的乘积不是负数的话——那么这就是最佳的答案
> 如果是负数的话，那就不断移除，直到移除一个负数为止——构成最佳答案

> 即便知道做法了，代码能力不行，还是做的不好

```cpp
#include<bits/stdc++.h>

using namespace std;
const int N = 200010;
int a[N],n,T;
int main()
{
    scanf("%d",&T);
    while(T --){
        scanf("%d",&n);
        memset(a,0,sizeof a);
        int ans = 0;
        int ansl = n;
        int ansr = 0;
        for(int i = 0; i < n; i ++){
            scanf("%d",&a[i]);
        }
        for(int i = 0, l = -1; i <= n; i ++){
            if(i == n || a[i] == 0){
                int cnt = 0;
                bool neg = 0;
                int left = -1, right = -1;
                int cl = 0, cr = 0;
                for(int j = l + 1; j < i; j ++){
                    neg ^= a[j] < 0;
                    if(a[j] < 0){
                        right = j;
                        cr = 0;
                    }
                    if(abs(a[j]) == 2){
                        cnt ++ ,cr ++;
                        if(left == -1) cl ++;
                    }
                    if(a[j] < 0 && left == -1){
                        left = j;
                    }
                }
                if(neg){
                    if(cnt - cl > cnt - cr){
                        right = i;
                        cnt -= cl;
                    }
                    else{
                        left = l;
                        cnt -= cr;
                    }
                }
                else{
                    left = l;
                    right = i;
                }
                if(ans < cnt){
                    ans = cnt;
                    ansl = left + 1;
                    ansr = n - right;
                }
                l = i;
            }
        }
        printf("%d %d\n", ansl, ansr);
    }
    return 0;
}
```

##### E. Matrix and Shifts

> https://codeforces.com/contest/1660/problem/E

> 题意：目的是把所有矩阵变成主对角线全是1其他位置全是0的矩阵
>
> 首先进行操作，这一步是不需要花费的，可以将矩阵进行 向上下左右进行平移
>
> 之后，计数将多少个1变成0以及将多少个0变成1，才能使得主对角线全为1 ，并且其他地方全为0
> （每一次将0变成1，或者1变成0都需要花费1）
>
> 输出最小的花费

> 思路：抽象推导公式求解，最后考验代码能力
>
> 1.首先找到`1`出现次数最多的对角线，把他当作基准，假设有$MAX$个1
> 2.然后把该对角线中的0 变成1  花费 $n-MAX$
> 3.然后把其他地方的1全部变成0 花费 $sum - MAX$ ($sum是记录整个矩阵中有多少个1$)
>
> 故此，最终答案为：$n+sum-2MAX$

```cpp
#include<bits/stdc++.h>

using namespace std;
int T,n;
const int N = 2010;
int main(){
    cin >> T;
    while(T --){
        cin >> n;
        int cnt1 = 0;
        vector<int> cnt (n, 0);
        for(int i = 0; i < n; i ++){
            string s; cin >> s;
            for (int j = 0, k = (n - i) % n; j < n; j++, k = (k + 1 == n ? 0 : k + 1)) if (s[j] == '1') {
                cnt1++;
                cnt[k]++;
            }
        }

        int ans = INT_MAX >> 1;
        for(int i = 0; i < cnt.size(); i ++){
            ans = min(ans, cnt1 - cnt[i] + (n - cnt[i]));
        }
        printf("%d\n", ans);
    }

    return 0;
}
```

##### F1. Promising String (easy version)

> https://codeforces.com/contest/1660/problem/F1 

> 题意：
>
> 给定一串由 "+" "-" 构成的字符串
> 计数有多少个子串，满足，"+" "-" 的数目相等，可以将连续两个"-"将其合成为一个"+"，满足这样的子串也可以算作一个平衡子串

```
根据抽屉原理。
当“-”的个数比“+”的个数多两个时，则必然存在一对相邻的"-“号，"--"
--当我们要去将两个相邻的负号转化成一个”+“时，那么当前串的平衡指数就会下降3.
如  -+--- 平衡指数 3
	-++-  平衡指数 0
因此我们只需要去找子串中平衡指数是3的倍数的，然后应用如上操作直到平衡指数为0为止。
=>该部分的平衡指数等于右边的平衡指数减去左边的平衡指数 （此处我们可以用前缀和来实现O(1)的时间复杂度）
=>用一个前缀和数组b[N] 存放是时 不平衡指数，通过 b[j] - b[i - 1] 可以的到 [i,j]部分的不平衡指数
```

```cpp
#include <bits/stdc++.h>
using namespace std;
int T,n;
const int N = 3010;
int main(){
    ios::sync_with_stdio(false);
    cin >> T;
    while(T --){
        cin >> n;
        string str;
        cin >> str;
        int b[N]; //记录每个为止的平衡指数，
        memset(b,0,sizeof b);
        int balance = n; 
        b[0] = balance; 
        int ans = 0;
        for(int i = 1; i <= n; i ++){
            //计算当前为止的平衡指数
            if(str[i-1] == '+'){
                balance ++; //那么平衡指数则加1
            }
            else{
                balance --;//那么则减1
            }

            b[i] = balance;

            //分析此时的子串
            for(int j = 0; j < i; j ++){
                if(b[j] >= b[i] && (b[j] - b[i]) % 3 == 0){
                    ans ++;
                }
            }
        }
        cout << ans << endl;
    }
    return 0;
}
```

##### F2. Promising String (hard version)

> https://codeforces.com/contest/1660/problem/F2

### 2023年2月15日

#### A. Yet Another Promotion

>贪心思路，第一天每次购买m kg，那么将会赠送1kg，这样就有m+1 kg，求第一种情况，尽可能多的赠送，那么最多可以赠送$n/(m+1)$次$m$kg，剩下的看第一天和第二天哪天比较便宜就全部哪天购买；
>
>贪心求解：
>$$
>ans:答案;a:第一天价格;b:第二天价格;需要购买nkg，每购买mkg送1kg
>\\
>1.ans1=a*n 全部在第一天购买\\
>2.ans2=b*n 全部在第二天购买\\
>3.ans3=a * n/(m+1) * m + min(a,b) * (n \% (m+1)) 尽可能多的送，剩下的花最少的钱\\
>ans = min(ans1,ans2,ans3);
>$$

```cpp
#include<bits/stdc++.h>

using namespace std;
int T;
typedef long long ll;
int main()
{
    scanf("%d",&T);
    while(T--){
        ll a,b,n,m;
        scanf("%lld%lld",&a,&b);
        scanf("%lld%lld",&n,&m);
        ll cnt = 0x3f3f3f3f3f3f3f3f;
        cnt = min(cnt, a*n);
        cnt = min(cnt, b*n);
        ll t = n / (m + 1);
        ll c = n % (m + 1);
        cnt = min(cnt, t * m * a + min(a,b)*c);
        printf("%lld\n",cnt);
    }
    return 0;
}
```


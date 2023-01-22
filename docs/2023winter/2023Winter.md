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














































# CCF-CSP历届真题

### 第二十四次 2021年12月

#### 1.序列查询

> 模拟一遍就行辽，直接暴力求解

#### 2.序列查询新解

> 暴力法：
>
> 直接求出f[i], g[i] ，枚举每一位
>
> 显然这里需要枚举$10^9$ 注定超时了

```C++
#include <bits/stdc++.h>

using namespace std;
const int N = 100010;
typedef long long ll;
ll n, m;
ll a[N];
ll f[N],g[N];
int main()
{
    scanf("%lld%lld",&n,&m);
    for(ll i = 1; i <= n; i ++){
        scanf("%lld", &a[i]);
    }
    int cur = 0;
    int r = m / (n + 1);
    ll error = 0;
    for(ll i = 0; i < m; i ++){
        f[i] = cur;
        if(a[cur+1] <= i + 1 && cur < n) cur++;
        g[i] = i / r;
        error += abs(f[i] - g[i]);
    }
    printf("%lld", error);
    return 0;
}
```

> 咱就是说，得想办法进行优化
>
> 思考优化的方法===>将外层需要枚举的数目减少

> 前缀和思想：
>
> 观察规律发现：
>
> 1. $f(x)在每个A[i]处+1,在A[i]~A[i+1]中相等$
> 2. $x>=A[n]时，f(x)=n$
> 3. $g(x)每r个数+1$ ---> $g(x)=\lfloor \frac{x}{r} \rfloor$ 每经过r个数+1
>
> > 总的思想就是：把握f和g的变化规律，减少枚举的次数，直接x区间大小得到error的值

```C++
#include <bits/stdc++.h>

using namespace std;
const int N = 100010;
typedef long long ll;
ll n, m;
ll a[N];
ll f[N],g[N];
int main()
{
    scanf("%lld%lld",&n,&m);
    for(ll i = 1; i <= n; i ++){
        scanf("%lld", &a[i]);
    }
    a[n+1]=m; //省去特判：特判就是如果此时x>=a[n]后，后面的所有f(x)的值都等于n
    int r = m / (n + 1);
    int cur_g = 0;
    int next_g = r;
    ll error = 0;
    //暴力解法：超时
    // for(ll i = 0; i < m; i ++){
    //     f[i] = cur;
    //     if(a[cur+1] <= i + 1 && cur < n) cur++;
    //     g[i] = i / r;
    //     error += abs(f[i] - g[i]);
    // }
    for(int i = 1; i <= n + 1; i ++){
        int left = a[i-1]; //当前区间左端点的值
        while(1){
            //此时的f不变的区间，看看g是否发生变化
            if(a[i] <= next_g){
                //f = i-1, g = cur_g, 区间长度 cnt = a[i] - left
                error += (ll)abs((i-1) - cur_g) * (ll)(a[i] - left);
                break;
            }
            else{
                //g不变的区间|f-g|固定
                error += (ll)abs((i - 1) - cur_g) * (ll)(next_g - left);
                //区间移动
                left = next_g;
                next_g += r;
                cur_g ++;
            }
        }
    }
    printf("%lld", error);
    return 0;
}
```



#### 3.登机牌条码

> **大模拟**：一定要相当耐心把题目用思维导图的形式梳理起来！！！按部就班进行分析！！！

> 常规的40分容易得到，要加快做题的速度才行

> 傻孩子，跟你说下这个 ≡ 的含义
>
> ​					$x^kd(x) ≡ q(x)g(x)-r(x) 的含义其实就是多项式出发，r(x)就是多项式除法的余数$

> 【拓展】多项式除法的一般做法
>
> 

```C++

```



#### 4.磁盘文件操作





#### 5.极差路径




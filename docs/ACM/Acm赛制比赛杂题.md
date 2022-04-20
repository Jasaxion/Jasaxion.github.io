### 2022年4月20日

```
让cin输入空格
getline(cin,string,'\n')
std::getline(std::cin, myWords, '\n');
std::cout << myWords << std::endl;

输入输出加速方法
ios::sync_with_stdio(0);
cin.tie(0);
cout.tie(0);
```

#### 算法编程saikr赛——冬季赛B题Error

> Description
>
> 刚进入富土康的 Yassin 在进行对 iPhone 的零件设计，众所周知，测量总是有误差的。现在 Yassin 需要对他的误差进行一定的计算。
>
> 现在已经给定的图纸中标定了 *n* 个零件的大小，我们不妨将其即为 ${a_n}$ 而 Yassin 需要确定一个最小误差 e**p**s*, 并用误差范围内的数据来从小到大生产一系列零件。
>
> 具体而言，需要确定一个最小的 eps*e**p**s*, 使得存在这样一个 *上升* 的正整数序列 ${b_n}$, 满足对于任意的 $1 \leq i \leq n$, 均有 $|a_i - b_i| \leq eps$
>
> Sample Input 1 
>
> ```
> 6
> 7 9 5 1 3 2
> ```
>
> Sample Output 1
>
> ```
> 6
> ```
>
> Hint
>
> $n \leq 50$
>
> 数据保证答案小于等于 10^9

> 思路：
>
> 仔细发现，答案具有单调性——故可以采用二分求解的方法。
> 分析$b_i$可以发现，$b_i$中的每个数显然有一个确定的上界或者下界，同时要保证后面的合法，每次$b_i$应贪心取得其中的最小值，同时要满足要求的话一定要注意$b_{i} \ge b_{i-1} + 1$ 也就是这一定是一个严格上升的序列。

```cpp
#include<bits/stdc++.h>

using namespace std;
typedef long long ll;
const int N = 100010;
const int inf = 1e9;
ll a[N], bl[N], br[N], b[N];
ll n;
ll ans = 0x3f3f3f3f3f3f3f3f;
int check(int x)
{
    memset(bl,0,sizeof bl);
    memset(br,0,sizeof br);
    //确定b数组中每一个数的上下界
    for(int i = 1; i <= n; i ++){
        bl[i] = max(0ll,a[i]-x);
        br[i] = a[i] + x;
    }
    //根据上下界确定b数组
    for(int i = 1; i <= n; i ++){
        b[i] = max(bl[i], b[i-1] + 1);
    }
    //判断当前的eps是否满足条件
    for(int i = 1; i <= n; i ++){
        if(abs(a[i] - b[i]) > x) return 0;
    }
    return 1;
}
int main()
{
    scanf("%lld",&n);
    for(int i = 1;i <= n; i ++)
    {
        scanf("%lld", &a[i]);
    }
    ll l=0, r=inf;
    while(l < r){
        ll mid = l + r >> 1;

        if(check(mid)) r = mid;
        else l = mid + 1;
    }
    return 0;
}
```


# 王道计算机——机试指南

> 打响机试必胜的第一站✌️

### 前缀和

#### 3956.截断数组

> https://www.acwing.com/problem/content/description/3959/
>
> 不要想当然的做题，一定要善于分析，懂得思考，善于进行抽象思维，固定一刀的情况，去枚举另外的切割方式，思路见代码中的注释。
>
> **思路：利用前缀和，固定第二刀，分析第一刀的可能情况即可**，凡是涉及累加运算的，一定要想到前缀和！

```cpp
#include<bits/stdc++.h>

using namespace std;
const int N = 100010;
typedef long long ll;
ll n,sum;
ll a[N],s[N];
int main()
{
    scanf("%lld",&n);
    for(int i = 1; i <= n; i ++){
        scanf("%lld",&a[i]);
        s[i] = s[i-1] + a[i];
    }
    //如果不能被分为三段则表示有0种方案
    if(s[n] % 3 != 0){
        printf("0\n");
        return 0;
    }
    //为了降低时间复杂度，我们单独枚举第二刀的位置即可
    //固定第二刀位置，我们分析第一刀恰好为num的情况，计为cnt
    //如果第二刀之前总和为2*num，那么此时的情况数应该为已有的情况数+cnt
    ll num = s[n] / 3;
    ll cnt = 0, res = 0;
    for(int i = 2; i < n; i ++){
        if(s[i - 1] == num) cnt ++; //表示第一刀的可能情况
        if(s[i] == num * 2) res += cnt; //此时放置第二刀
    }
    printf("%lld\n",res);
    return 0;
}
```


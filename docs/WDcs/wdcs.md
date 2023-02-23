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

#### 1230. K倍区间

> 很巧妙的一道题，这里我们采用前缀和的方式存放余数
> $$
> s[i] = (s[i-1] + a[i])\%k\ -->余数前缀和\\
> if \ s[i] == 0 \ -->表示1～i其区间本身就是一个满足条件的解\\
> if \ (s[R] - s[L - 1])\%k == 0\ (表示L-R区间满足条件)\\
> \ 	也就是说，s[R]\%k == s[L-1]\%k \ 如果两个区间的余数相同，那么也能构成一个k倍区间\\
> answer=sum(s[0]) + C_{cnt(余数相同的个数)}^2
> $$
> 大概思路如上所示，在编写代码的时候有几个很巧妙的地方
> ```
> 例如：设置初始值cnt[0]=1
> -ans += cnt[s[i]];
> -cnt[s[i]]++;
> 这两行代码的顺序不能变更，这样还不需要用组合公示，虽然理解难度增加了，但代码长度和时间复杂度减少一个常数
> ```

```cpp
#include <bits/stdc++.h>

using namespace std;
typedef long long ll;
const int N = 100010;
ll a[N],s[N];
int cnt[N];
ll ans;
int n,k;
int main()
{
    scanf("%d%d",&n,&k);
    cnt[0] = 1; //如果余数为0的话，那么其本身就是一个合法的区间
    for(int i = 1; i <= n; i ++){
        scanf("%lld",&a[i]);
        s[i] = (s[i-1] + a[i])%k; //用前缀和的方法存下其模的余数
    }
    for(int i = 1;i <= n; i ++){
        ans += cnt[s[i]];  //这里两行代码不能更改顺序，这里的处理方法类似于组合C^2_n
        cnt[s[i]]++; //此时余数相等的情况+1
    }
    printf("%lld\n",ans);
    return 0;
}
```

> 类题：https://www.acwing.com/problem/content/101/
>
> **注意点：**1.不能开long long；2.注意给出的坐标的下标是从0开始的；3.时刻注意数组的范围，不要想当然做题；

```cpp
#include<bits/stdc++.h>

using namespace std;
typedef long long ll;
int ans;
const int N = 5010;
int s[N][N]; //注意这里不要开long long,否则会MLE，要学会自己计算Memory
int n;
int r;
int maxx,maxy;
int main()
{
    scanf("%d%d",&n,&r);
    r = min(r, 5001); //考虑周到
    maxx = maxy = r; //限制初始边界
    for(int i = 0; i < n; i ++){
        int x,y,w;
        scanf("%d%d%d",&x,&y,&w);
        x++,y++;//注意前缀和算法要从下标为1开始！！！！粗心大意
        s[x][y]+=w;
        maxx = max(maxx,x);
        maxy = max(maxy,y);
    }
    for(int i = 1; i <= maxx; i ++){ //二维前缀和
        for(int j = 1; j <= maxy; j ++){
            s[i][j] = s[i - 1][j] + s[i][j - 1] + s[i][j] - s[i - 1][j - 1];
        }
    }
    for(int i = r; i <= maxx; i ++){ //二维前缀和的求解，枚举右下角的端点
        for(int j = r; j <= maxy; j ++){
            ans = max(ans, s[i][j] - s[i-r][j] - s[i][j-r] + s[i-r][j-r]);
        }
    }
    printf("%lld\n",ans);
    return 0;
}
```


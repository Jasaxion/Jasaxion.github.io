# CCF-CSP历届真题

### 第二十五次 2022年3月 —— 请自我反思

#### 1.未初始化警告



#### 2.出行计划



#### 3.计算资源调度器



#### 4.通信系统管理



#### 5.博弈论与石子合并



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

> 难点就在校验码
>
> 1. 需要把g(x),d(x)求出来
>    	在求g(x)的系数的时候，**过程中需要MOD929 否则会爆**
> 2. f(x) / g(x) 进行多项式除法，过程中用vector记录对应位置的系数
> 3. 注意**除法余项的系数需要取反**，因为题目中是$-r(x)$ 
>
> > $g(x)$的求法：
> >
> > $g(x)=(x+3)*(x+3^2)...$
> > 一步一步进行计算
>
> > $r(x)的求法$：
> >
> > 模拟竖式除法，每次根据$f(x)和g(x)$的最高次系数计算当前位的商t，然后计算$f(x)$的余项，直到$f(x)$的最高次小于$g(x)$，剩下的$f(x)就是-r(x)$

```C++
#include <bits/stdc++.h>
#include <vector>
using namespace std;
const int N = 5050;
const int MOD = 929;
int w,s;
char str[N];
vector<int> da;
vector<int> sj;
vector<int> ans;
int k = 0;
int st = 0;
//0 A | 1 0 | 2 a
//A - a > 27  A - 0 > 28
//a - A  (a - 0 - A)  a - 0 > 28
//0 - A 28
int main()
{
    ios::sync_with_stdio(false);
	cin.tie(0);
	cout.tie(0);
    cin >> w >> s;
    cin >> str;
    int len = strlen(str);
    //常规读入
    for(int i = 0; i < len; i ++)
    {
        char c = str[i];
        if(c >= 'A' && c <= 'Z'){
            if(st == 0){
                da.push_back(c - 'A');
            }
            else{
                if(st == 1){
                    da.push_back(28);
                    da.push_back(c - 'A');
                    st = 0;
                }
                if(st == 2){
                    da.push_back(28);
                    da.push_back(28);
                    da.push_back(c - 'A');
                    st = 0;
                }
            }
        }
        if(c >= '0' && c <= '9'){
            if(st == 1){
                da.push_back(c - '0');
            }
            else{
                if(st == 0){
                    da.push_back(28);
                    da.push_back(c - '0');
                    st = 1;
                }
                if(st == 2){
                    da.push_back(28);
                    da.push_back(c - '0');
                    st = 1;
                }
            }
        }
        if(c >= 'a' && c <= 'z'){
            if(st == 2){
                da.push_back(c - 'a');
            }
            else{
                if(st == 0){
                    da.push_back(27);
                    da.push_back(c - 'a');
                    st = 2;
                }
                if(st == 1){
                    da.push_back(27);
                    da.push_back(c - 'a');
                    st = 2;
                }
            }
        }
    }
    //读入完后进行处理
    if(da.size() % 2 != 0) da.push_back(29); //如果不是偶数则填充29
    //计算校验码的个数
    if(s > -1) k = pow(2, s + 1);
    else k = 0;
    //依据公式 D = 30*H + L计算有效码字
    for(int i = 0; i < da.size(); i += 2)
    {
        sj.push_back(da[i]*30+da[i+1]);
    }

    int t = sj.size() + 1 + k; //k表示校验码的个数
    while(t % w != 0){ //这里看要填充多少个数 也就是占满有效数据宽度
        t ++;
    }
    ans.push_back(t - k); //长度码字就是一共的码字个数减去校验码
    for(int i = 0; i < sj.size(); i ++){
        ans.push_back(sj[i]);
    }
    for(int i = ans.size(); i < t - k; i ++) //t-k表示填充的码字个数
    {
        ans.push_back(900);
    }

    if(k == 0){
        for(int i = 0; i < ans.size(); i ++)
        {
            cout << ans[i] << endl;
        }
        return 0;
    }

    //计算校验码
    vector<int> dx(ans.size() + k);
    for(int i = 0; i < dx.size(); i ++){
        dx[i] = 0;
    }
    //首先我们把g(x),d(x)根据公式写出
    //1.计算g(x)
    // 一项一项乘，vector保留系数
    vector<int> gx(k+1);
    for(int i = 0; i < k + 1; i ++){
        gx[i] = 0;
    }
    // g * (x + pow3) = g * x + g * pow3
    gx[k] = -3;
    gx[k - 1] = 1;
    int pow3 = -9;
    // 一共有k项，前i项相乘有（i+1）个参数（从k往前）
    for(int i = 0; i < k - 1; i ++)
    {
        vector<int> tt(k+1);

        //复制
        for(int j = k - i - 1; j <= k; j ++){
            tt[j] = gx[j];
        }
        //g = g * pow3
        for(int j = k - i - 1; j <= k; j ++){
            gx[j] = ((gx[j] % MOD) * (pow3 % MOD))%MOD;
        }

        //g = g + tt * x ((tt向左移动一位))
        for(int j = k - i - 1; j < k; j ++){
            gx[j] = (gx[j] % MOD + tt[j + 1] % MOD) % MOD;
        }
        gx[k - i - 2] = 1; // 最高次一定是1

        pow3 *= 3;
        pow3 %= MOD;
    }

    //计算dx
    //dx[0] = ans.size();
    for(int i = 0; i < ans.size(); i ++){
        dx[i] = ans[i];
        dx[i] %= MOD;
    }

    //计算Rx
    for(int i = 0; i < dx.size()-k; i ++){
        int t = dx[i];
        for(int j = 0; j < gx.size(); j ++){
            dx[i + j] = (dx[i + j] - (gx[j] * t)% MOD) % MOD;
        }
    }
    for(int i = dx.size() - gx.size() + 1; i < dx.size(); i ++){
        if(-dx[i] < 0){
            ans.push_back(MOD + (-dx[i] % MOD));
        }
        else{
            ans.push_back(-dx[i] % MOD);
        }
    }

    //从头开始输出结果
    for(int i = 0; i < ans.size(); i ++)
    {
        cout << ans[i] << endl;
    }
    return 0;
}
```



#### 4.磁盘文件操作





#### 5.极差路径



### 第二十三次 2021年9月

#### 1.数组推导

> 家人们咱就是说要，沉下心来看题才行，不要好高骛远

```C++
#include <bits/stdc++.h>

using namespace std;
const int N = 100010;
typedef long long ll;
ll b[N];
ll n;
ll ansl,ansr;
int main()
{
    cin >> n;
    for(ll i = 1; i <= n; i ++){
        cin >> b[i];
        ansr += b[i];

        if(b[i] > b[i - 1]){
            ansl += b[i];
        }
    }
    cout << ansr << endl;
    cout << ansl;
    return 0;
}
```

#### 2.非零段划分

> 1.暴力枚举——n^2 绝对超时

> 2.岛屿问题——海平面下降  【巧妙思维】
>
> > 假设现在海平面就是p值，很大。降低p值就是降低海平面
> >
> > 每当一个凸峰出现，岛屿数就会多一个；
> > 每当一个凹谷出现，原本相邻的两个岛屿就被这个凹谷连在一起了，岛屿数减少一个
> >
> > 过程中存储最大值即可
> >
> > > 注意细节与STL函数的相关使用
> > >
> > > 判重，因为所有相同的元素可以看作是一个整体
> > >
> > > > unique返回的是处理判重后的位置的下一个位置，将其减去1 就能得到长度。

```C++
#include<bits/stdc++.h>

using namespace std;
const int N = 500010;
int n;
int a[N];
int cnt[N];
int p = 10010;

int main()
{
    cin >> n;
    for(int i = 1; i <= n; i ++){
        cin >> a[i];
    }
    //去重可以免于特判
    n = unique(a, a + 2 + n) - a - 1;//返回去重后的长度n
    a[0] = 0;
    a[n + 1] = 0;
    for(int i = 1; i <= n; i ++){
        if(a[i] > a[i - 1] && a[i] > a[i + 1]){
            cnt[a[i]] ++;
        }
        else if (a[i] < a[i-1] && a[i] < a[i + 1]){
            cnt[a[i]] --;
        }
    }
    int res = 0, sum = 0;
    for(int i = p; i; i --)
    {
        sum += cnt[i];
        res = max(sum, res);
    }
    cout << res << endl;
    return 0;
}
```

> 3.差分+前缀和综合使用

> 观察可以得到：$如果a[i] > a[i-1]$意味着当p取到$a[i-1]+1到a[i]之间的值时$ 非零段+1
> 使用数组$cnt[]$，$cnt[i]表示p从i-1上升到i时，非零段数量的变化$
> 从正向前缀和中找出最大值就是所要的结果。

```C++
#include<bits/stdc++.h>

using namespace std;
const int N = 500050;
int p = 50500;
int a[N], cnt[N];
int n;
int main()
{
    cin >> n;
    for(int i = 1;i <= n; i ++)
    {
        cin >> a[i];
        if(a[i] > a[i - 1]){
            cnt[a[i-1]+1] ++;
            cnt[a[i]+1] --;
        }
    }
    int sum = 0,res = 0;
    for(int i = 1; i < p; i ++)
    {
        sum += cnt[i];
        res = max(res, sum);
    }
    cout << res << endl;
    return 0;
}
```



#### 3.脉冲神经网络

> 大模拟>必须仔细分析！





#### 4. 收集卡牌



#### 5.箱根山岳险天下

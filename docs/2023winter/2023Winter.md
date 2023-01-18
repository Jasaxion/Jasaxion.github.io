# 2023-01-寒假-冲刺阶段

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


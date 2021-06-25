# Acwing每日一题

##### 3729.改变数组元素 2021年6月25日

> 给定一个空数组 V 和一个整数数组 a1,a2,…,an。
>
> 现在要对数组 V 进行 n 次操作。
>
> 第 i 次操作的具体流程如下：
>
> 从数组 V 尾部插入整数 0。
> 将位于数组 V 末尾的 ai 个元素都变为 1（已经是 1 的不予理会）。
> 注意：
>
> ai 可能为 0，即不做任何改变。
> ai 可能大于目前数组 V 所包含的元素个数，此时视为将数组内所有元素变为 1。
> 请你输出所有操作完成后的数组 V。
>
> 输入格式
> 第一行包含整数 T，表示共有 T 组测试数据。
>
> 每组数据第一行包含整数 n。
>
> 第二行包含 n 个整数 a1,a2,…,an。
>
> 输出格式
> 每组数据输出一行结果，表示所有操作完成后的数组 V，数组内元素之间用空格隔开。
>
> 数据范围
> 1≤T≤20000,
> 1≤n≤2x10^5,
> 0≤ai≤n,
> 保证一个测试点内所有 n 的和不超过  2×10^5 。
>
> #### 输入样例：
>
> ```
> 3
> 6
> 0 3 0 0 1 3
> 10
> 0 0 0 1 0 5 0 0 0 2
> 3
> 0 0 0
> ```
>
> #### 输出样例：
>
> ```
> 1 1 0 1 1 1
> 0 1 1 1 1 1 0 0 1 1
> 0 0 0
> ```

> TIP：直接模拟超时了TLE
> 采用巧妙的方法；从后往前进行判断
>
> [L,R]表示要改变数字为1的区间
>
> 如果当前位置位于要改变的区间内，则将此处的a[i]改变成1.

```C++
#include <iostream>
#include <cstring>

using namespace std;
const int N = 200010;

int main()
{
    int T;
    scanf("%d",&T);
    while(T--)
    {
        int n;
        int a[N];
        int w[N];
        int x;
        scanf("%d",&n);
        memset(w,0,sizeof w);
        int pos = 0;
        for(int i = 0; i < n; i ++)
        {
            scanf("%d",&a[i]);
        }
        //倒着输出 O(n)
        int max_l = N;
        for(int i = n - 1; i >= 0; i --)
        {
            max_l = min(max_l, i - a[i] + 1); //更新边界
            if(max_l <= i) a[i] = 1; //如果在边界内则此处a[i]改为1
        }
        for(int i = 0; i < n; i ++) printf("%d ",a[i]);
        printf("\n");
        
        
        /*!TLE超时
        for(int i = 0; i < n; i ++)
        {
            scanf("%d",&x);
            if (x == 0)
            {
                a[i] = 0;
                continue;
            }
            if (x != 0)
            {
                for(int j = i; j > i - x; j --)
                {
                    if(j < 0) break;
                    a[j] = 1;
                }
            }
        }
        for(int i = 0; i < n; i ++) printf("%d ",a[i]);
        printf("\n");
        */
    }
    return 0;
}
```


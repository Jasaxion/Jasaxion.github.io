

### 2022年3月27日

> https://leetcode-cn.com/problems/k-th-smallest-in-lexicographical-order/
>
> 字典序中第K小的数字，要擅于编写搜索代码。以及搜索递归等思维方式
>
> 思考过程：
> <img src="LeetCode%E9%A2%98%E8%AE%B0.assets/EBE85B5611246F29CC6807CD4FC283AB.png" alt="img" style="zoom:50%;" />

```
根据思考过程，显然我们需要解决几个问题：
1.如何确定一个前缀下所有子节点的个数？
2.如果第k个数在当前的前缀下，如何继续往下面的子节点进行寻找？
3.如果第k个数不在当前的前缀下，如何扩大前缀，增大寻找的范围？
```

> 1.确定一个前缀下所有子节点的个数

```cpp
int getcount(int x, int n){ //x表示当前的前缀
    int cur = x;
    int next = x + 1;//表示下一个前缀
    int count = 0;//计数
    while(cur <= n){
        //count += next - cur; //下一个前缀的起点减去当前前缀的起点
        //*容易发现，这样的话可能会存在边界问题！ 就是next > n的话-不是满二叉树//容易出问题
        //修改为
        count += min(next, n + 1) - cur; //边界问题n+1是包括了根节点
        cur *= 10;
        next *= 10;
        //-->这里是按层计数的
        // 如果说刚刚cur是1，next是2，那么现在分别变成10和20
        // 1为前缀的子节点增加10个，十叉树增加一层, 变成了两层
        
        // 如果说现在cur是10，next是20，那么现在分别变成100和200，
        // 1为前缀的子节点增加100个，十叉树又增加了一层，变成了三层
    }
}
```

> 2.如果第k个数在当前的前缀下，如何继续往下面的子节点进行寻找？

```C++
//若在当前前缀子树，则不断往这个子树里面进行查找
x *= 10;
```

> 3.如果第k个数不在当前的前缀下，如何扩大前缀，增大寻找的范围？

```C++
//若不在当前子树-->扩大子树就好了
x ++;
```

> 完整代码

```cpp
int main()
{
    cin >> n >> k;
    int root = 1;
    int cur = root;
    k --;
    while(k > 0){
        int left = cur; //表示当前计数的前缀的首项
        int right = cur + 1; //表示当前计数的前缀的下一个的首项
        int count = 0;
        while(left <= n){
            count += min(right, n + 1) - left;
            left *= 10;
            right *= 10;
        }
        
        if(count <= k){//如果不在当前的子树的话，前往下一个前缀子树
            k -= count; //减掉当前子树的个数，往下一个子树去查找
            cur ++;  //移动到下一个子树
        }
        else{
            k --;
            cur *= 10;
        }
    }
    cout << cur;
    return 0;
}
```

### 2022年4月6日

> 动态规划：https://leetcode-cn.com/problems/regular-expression-matching/

> 动态规划类：
> 1.思考状态方程： $d[i][j] 表示s的前i个能否被p的前j个匹配$
>
> 2.属性：布尔值bool，True or False 表示是否能被匹配
>
> 3.状态转移：
>
> ``` 
> 1. s[i] == p[j] : dp[i][j] = dp[i-1][j-1]
> 2. p[j] == '.' : dp[i][j] = dp[i-1][j-1]
> 3. p[j] == '*'  //DP难点
> 	3.1 s[i] != p[j-1]: dp[i][j] = dp[i][j-2]
> 	3.2 s[i] == p[j-1] or p[j-1] == '.'
> 		dp[i][j] = dp[i-1][j] || dp[i][j] = dp[i][j-1] || dp[i][j] = dp[i][j-2]
> 3.1 如果s[i]与p[j-1]不匹配的话
> 此时p[j] = '*'  p[j-1]为某一个字符
> 那么直接忽略掉 该字符和*号 所以：dp[i][j] = dp[i][j-2];
> 3.2如果s[i] == p[j-1]或者p[j-1]='.'的话
> 则说明 #* 能够对s[i]进行匹配
> 难点二：如何进行匹配，只要满足其中一个条件既可以匹配
> 1.#*匹配0个， 也就是可以直接去掉#*一样的道理，所以，dp[i][j] = dp[i][j-2]
> 2.#*匹配1个，也就是去掉*，去匹配#号，所以，dp[i][j] = dp[i][j-1]
> 3.#*匹配多个，这样的话，可以相当于在s中查看#是否多出了#，相当于去掉s[i]，看s[i-1]是否匹配，所以 dp[i][j] = dp[i-1][j]
> 第三种情况的话，举个例子就是看 s 里 b 多不多， ### 和 ###b * 是否匹配，一旦匹配，s 后面再添个 b 也不影响，因为有 * 在，也就是 ###b 和 ###b *也会匹配。
> ```

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        s = ' ' + s;
        p = ' ' + p;
        int slen = s.size();
        int plen = p.size();
        const int N = 500;
        bool f[N][N];
        memset(f,false,sizeof f);
        f[0][0] = 1;
        //要满足无后效性的原则，故此要从i-1,j-1去推导i,j！！！
        for(int i = 1; i <= slen; i ++){
            for(int j = 1; j <= plen; j ++){
                if((s[i - 1] == p[j - 1]) || (p[j - 1] == '.')){
                    f[i][j] = f[i-1][j-1];
                }
                else if(p[j - 1] == '*'){
                    if(s[i - 1] != p[j - 2] && p[j - 2] != '.'){
                        f[i][j] = f[i][j-2];
                    }
                    else{
                        f[i][j] = f[i][j-1] || f[i][j-2] || f[i-1][j];
                    }
                }
            }
        }
        return f[slen][plen];
    }
};
```


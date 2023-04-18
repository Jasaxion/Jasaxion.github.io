

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



### 2022年11月8日

#### [816. 模糊坐标](https://leetcode.cn/problems/ambiguous-coordinates/)

> 这道题也不是说有多难，思路很简单，难点在于编码能力。——**这是一道很简单又很难的题**
>
> **STL和string库的使用能力**、**很经典的拆分笛卡尔积的代码实现方法**、**C++的过硬语法能力**
>
> 一些迭代方法
>
> ```cpp
> for(auto &x : a){}
> =;
> for(int i = 0; i < a.size(); i ++){x = a[i]}
> ```
>
> 

```cpp
class Solution {
public:
    vector<string> ambiguousCoordinates(string s) {
        int n = s.size();
        vector<string> res;
        // 枚举分隔线
        for (int k = 1; k <= n - 3; k++) {
            string l = s.substr(1, k);
            string r = s.substr(k + 1, n - 2 - k);
            vector<string> left = f(l);
            vector<string> right = f(r);
            for (string &x : left) {
                for (string &y : right) {
                    res.push_back("(" + x + ", " + y + ")");
                }
            }
        }
        return res;
    }
    
private:
    vector<string> f(string &s) {
        int n = s.size();
        
      //这里return 回去也是返回一个string集合return {}
        // 如果只有一个数，则不能加小数点
        if (n == 1) return {s};
        
        // 如果前后都是 0，则不合法
        if (s[0] == '0' && s[n - 1] == '0') return {};
        
        // 如果最后一个数是 0，则不能加小数点
        if (s[n - 1] == '0') return {s};
        
        // 如果有前导零，则只能以 0. 开头
        if (s[0] == '0') return {"0." + s.substr(1)};

        vector<string> res;
        // 不加小数点
        res.push_back(s);
        // 加小数点
        for (int i = 1; i <= n - 1; i++) {
            string a = s.substr(0, i);
            string b = s.substr(i);
            res.push_back(a + "." + b); 
        }
        return res;
    }
};
```

### 2023年4月17日

回溯搜索法的学习使用—[282. 给表达式添加运算符](https://leetcode.cn/problems/expression-add-operators/)

```
给定一个仅包含数字 0-9 的字符串 num 和一个目标值整数 target ，在 num 的数字之间添加 二元 运算符（不是一元）+、- 或 * ，返回 所有 能够得到 target 的表达式。

注意，返回表达式中的操作数 不应该 包含前导零。
```

> 思路：**「回溯」**
> 难点在于对于 乘法的处理，这里乘法的优先度要大于+-，故此需要存下上一次进行的数
>
> 本题最难最难的就是处理乘法了，由于**乘法的优先级比加、减法高**，所以在**遇到乘号时需要回退到上一步**，然后将上一步的操作数与乘法进行运算。**比如：num = "232"，target = 8，在计算完2+3=5后，我们在3后面添加\*2，然而\*的优先级高，所以我们需要返回到上一步val(5)-mult(3)=2，然后计算上一步的结果与乘法运算的结果2+mult(3)*n(2)=8。**
> 注：mult保存的是上一步的操作数。

```cpp
class Solution {
public:
    vector<string> addOperators(string num, int target) {
        vector<string> result;
        string track="";
        backtrack(num,target,0,0,1,result,track);
        return result;
    }
    //注：mult表示的上一步的操作数
    void backtrack(string num,int target,int index,long val,long mult,vector<string>& result,string& track)
    {
        if(index==num.size())
        {
            if(val==target)result.push_back(track);
            return;
        }
        int len = track.size();
	    for (int i = index; i < num.length(); i++) 
        {
            //转换数字
		    string sVal = num.substr(index, i - index + 1);
		    long n = stol(sVal);
            //第一个数字，不需要加符号
		    if (index == 0) {
			    track += sVal;
			    backtrack(num,target,i+1,n,n,result,track);
			    track.resize(len);//回溯恢复现场
		    } else {
			    // +
			    track += "+" + sVal;
			    backtrack(num,target,i+1,val+n,n,result,track);
			    track.resize(len);//回溯恢复现场
			    // -
			    track += "-" + sVal;
                backtrack(num,target,i+1,val-n,-n,result,track);
			    track.resize(len);//回溯恢复现场
			    // *
			    track += "*" + sVal;
                //由于乘法的优先级比加、减法高，所以需要回退到上一步，即把上一步的操作数与乘法进行运算
                //比如2+3*2，我们在3后面添加*，然而*的优先级高，所以val(5)-mult(3)返回上一步，然后2+3*2=8
			    backtrack(num,target,i+1,val-mult+mult*n,mult*n,result,track);
			    track.resize(len);//回溯恢复现场
		    }
		    if (n==0) return;
        }
    }
};
```

> 回溯类似题——「剑指Offer」矩阵中的路径
>
> 一定要深刻理解回溯中的恢复现场操作
>
> https://www.acwing.com/problem/content/description/21/

```cpp
class Solution {
public:
    bool hasPath(vector<vector<char>>& matrix, string str) {
        for (int i = 0; i < matrix.size(); i ++ )
            for (int j = 0; j < matrix[i].size(); j ++ )
                if (dfs(matrix, str, 0, i, j))
                    return true;
        return false;
    }

    bool dfs(vector<vector<char>> &matrix, string &str, int u, int x, int y) {
        if (matrix[x][y] != str[u]) return false;
        if (u == str.size() - 1) return true;
        int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
        char t = matrix[x][y];
        matrix[x][y] = '*';
        for (int i = 0; i < 4; i ++ ) {
            int a = x + dx[i], b = y + dy[i];
            if (a >= 0 && a < matrix.size() && b >= 0 && b < matrix[a].size()) {
                if (dfs(matrix, str, u + 1, a, b)) return true;
            }
        }
        matrix[x][y] = t;//恢复现场
        return false;
    }
};
```




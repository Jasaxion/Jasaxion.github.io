

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



### 大整数专题，超大整数A+B、A-B、A*B 「|A|，|B| $<= 10^{400}$」

```cpp
#include <bits/stdc++.h>
using namespace std;
vector<int> printnum(vector<int> &num){
    for(int i = num.size() - 1; i >= 0; i --){
        cout << num[i];
    }
    cout << "\n";
}
bool cmpad(vector<int> &A, vector<int> &B){
    if(A.size()!=B.size()) return A.size()>B.size();
    for(int i=A.size()-1;i>=0;i--)
        if(A[i]!=B[i])
            return A[i]>B[i];
    return true;
}
vector<int> add(vector<int> &A, vector<int> &B){
    vector<int> C;
    for(int i=0,t=0;i<A.size() || i<B.size() || t;i++)
    {
        if(i<A.size()) t+=A[i];
        if(i<B.size()) t+=B[i];
        C.push_back(t%10);
        t/=10;
    }
    return C;
}
vector<int> sub(vector<int> &A, vector<int> &B){
    vector<int> C;
    for(int i=0,t=0;i<A.size();i++)
    {
        t=A[i]-t;
        if(i<B.size()) t-=B[i];
        C.push_back((t+10)%10);
        if(t<0) t=1;
        else t=0;
    }
    while(C.size()>1 && C.back()==0) C.pop_back();
    return C;
}
//重点关注！！！！
vector<int> mul(vector<int> &A, vector<int> &B){
    vector<int> C(A.size()+B.size(),0); //A*B必须这样进行初始化
    for(int i=0;i<A.size();i++)
        for(int j=0;j<B.size();j++)
            C[i+j] += A[i]*B[j];
    for(int i=0,t=0;i<C.size();i++)
    {
        t+=C[i];
        C[i]=t%10;
        t/=10;
    }
    while(C.size()>1 && C.back()==0) C.pop_back();
    return C;
}
int main()
{
    vector<int> A,B;
    vector<int> C1,C2,C3;
    string a,b;
    cin >> a >> b;
    for(int i = a.size() - 1; i >= 0; i --) A.push_back(a[i] - '0');
    for(int i = b.size() - 1; i >= 0; i --) B.push_back(b[i] - '0');
    int flag1 = 0, flag2 = 0;
    if(a[0] == '-'){
        flag1 = 1;
        A.pop_back();
    }
    if(b[0] == '-'){
        flag2 = 1;
        B.pop_back();
    }
    //A + B;
    if(flag1 == 0 && flag2 == 0){
        C1 = add(A,B);
        for(int i = C1.size() - 1; i >= 0; i --) cout << C1[i]; cout << "\n";
        if(cmpad(A,B)){
            C2 = sub(A,B);
            for(int i = C2.size() - 1; i >= 0; i --) cout << C2[i]; cout << "\n";
        }
        else{
            C2 = sub(B,A);
            cout << "-";
            for(int i = C2.size() - 1; i >= 0; i --) cout << C2[i]; cout << "\n";
        }
        C3 = mul(A,B);
        for(int i = C3.size() - 1; i >= 0; i --) cout << C3[i]; cout << "\n";
    }
    else if(flag1 == 1 && flag2 == 1){
        //ADD
        cout << "-"; //加法
        C1 = add(A,B);
        for(int i = C1.size() - 1; i >= 0; i --) cout << C1[i]; cout << "\n";
        if(cmpad(A,B)){
            cout << "-";
            C2 = sub(A,B);
            for(int i = C2.size() - 1; i >= 0; i --) cout << C2[i]; cout << "\n";
        }
        else{
            C2 = sub(B,A);
            for(int i = C2.size() - 1; i >= 0; i --) cout << C2[i]; cout << "\n";
        }
        C3 = mul(A,B);
        for(int i = C3.size() - 1; i >= 0; i --) cout << C3[i]; cout << "\n";
    }
    else if(flag1 == 1 && flag2 == 0){
        if(cmpad(A,B)){
            cout << "-";
            C1 = sub(A, B);
            for(int i = C1.size() - 1; i >= 0; i --) cout << C1[i]; cout << "\n";
        }
        else{
            C1 = sub(B, A);
            for(int i = C1.size() - 1; i >= 0; i --) cout << C1[i]; cout << "\n";
        }
        cout << "-";
        C2 = add(A,B);
        for(int i = C2.size() - 1; i >= 0; i --) cout << C2[i]; cout << "\n";
        C3 = mul(A,B);
        if(C3.size() != 1 || C3[0] != 0) cout << "-";
        for(int i = C3.size() - 1; i >= 0; i --) cout << C3[i]; cout << "\n";
    }
    else if(flag1 == 0 && flag2 == 1){
        if(cmpad(A,B)){
            C1 = sub(A,B);
            for(int i = C1.size() - 1; i >= 0; i --) cout << C1[i]; cout << "\n";
        }
        else{
            cout << "-";
            C1 = sub(B,A);
            for(int i = C1.size() - 1; i >= 0; i --) cout << C1[i]; cout << "\n";
        }
        C2 = add(A,B);
        for(int i = C2.size() - 1; i >= 0; i --) cout << C2[i]; cout << "\n";
        C3 = mul(A,B);
        if(C3.size() != 1 || C3[0] != 0) cout << "-";
        for(int i = C3.size() - 1; i >= 0; i --) cout << C3[i]; cout << "\n";
    }
    return 0;
}
```

## LeetCode HOT100「专为机试准备」

### 一、哈希

#### 1. 两数之和 「暴力枚举or哈希表」

> 最容易想到的方法是枚举数组中的每一个数 x，寻找数组中是否存在 target - x。
>
> 当我们使用遍历整个数组的方式寻找 target - x 时，需要注意到每一个位于 x 之前的元素都已经和 x 匹配过，因此不需要再进行匹配。而每一个元素不能被使用两次，所以我们只需要在 x 后面的元素中寻找 target - x。
>
> **机试可能常常会考到的内容：擅于使用哈希表来降低时间复杂度**

```cpp
class Solution {
public:
  	//方法一：暴力
    // vector<int> twoSum(vector<int>& nums, int target) {
    //     vector<int> ans;
    //     for(int i = 0; i < nums.size(); i ++){
    //         for(int j = i + 1; j < nums.size(); j ++){
    //             if(nums[i] + nums[j] == target){
    //                 ans.push_back(i);
    //                 ans.push_back(j);
    //                 return ans;
    //             }
    //         }
    //     }
    //     return ans;
    // }
  //方法二：哈希表
    vector<int> twoSum(vector<int>& nums, int target) {
        map<int,int> mp;
        vector<int> ans;
        for(int i = 0; i < nums.size(); i ++){
            if(mp.count(target - nums[i])){
                ans.push_back(mp[target - nums[i]]);
                ans.push_back(i);
                break;
            }
            mp[nums[i]] = i;
        }
        return ans;
    }
};
```

#### 2. [字母异位词分组](https://leetcode.cn/problems/group-anagrams/) 「常回来复习」

> 方法一：哈希方法一：直接对于每个字符串进行排序，然后将其作为关键字使用到哈希表中，注意STL库的正确使用！！「`emplace能用则用,emplace()只支持加载一个值，能够在索引的前面加入一个值` 」「`emplace_back()支持加载多个值`」
>
> 方法二：使用长度为26的数字字符串表示一个单词中不同字母出现的频数当作哈希的键，原始字符串作为哈希的值。「这里对于字符串的操作其实挺巧妙的，注意进行学习」

```cpp
//方法一：
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> ans;
        map<string, vector<string>> mp;
        for(auto str: strs){
            string tmp = str;
            sort(tmp.begin(), tmp.end()); //对每个字符串进行排序
            mp[tmp].emplace_back(str); //将排序结果作为键
        } 
        for(auto it = mp.begin(); it != mp.end(); ++ it){
            ans.emplace_back(it -> second);//将每一个键后的值全部加载到ans
        }
        return ans;
    }
};
```

```cpp
//方法二：
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> ans;
        map<string, vector<string>> mp;
        for(auto str : strs){
            string sts = string(26, '0'); //00000000000000000000000000
            for(auto c : str) ++ sts[c - 'a']; //真的值得好好学习一下STL的用法
            //例如eat，最终sts为：100010000000000000010000000
            mp[sts].emplace_back(str);
        }
        for(auto i : mp) ans.emplace_back(i.second); //引用的方式加载数据
        return ans;
    }
};
```

#### [128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)

> 思路：首先使用哈希表进行去重，然后对于每个数枚举其前面一个数，如果在集合中则继续，「仅循环枚举没有前驱的的第一个数」从而达到降低时间复杂度的效果
>
> $O(n)$ //当然也可以直接排序$O(nlogn)$

```cpp
//官解
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> num_set;
        for (const int& num : nums) {
            num_set.insert(num);
        }

        int longestStreak = 0;

        for (const int& num : num_set) {
            if (!num_set.count(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                while (num_set.count(currentNum + 1)) {
                    currentNum += 1;
                    currentStreak += 1;
                }

                longestStreak = max(longestStreak, currentStreak);
            }
        }

        return longestStreak;           
    }
};
```

### 二、双指针

#### [283. 移动零](https://leetcode.cn/problems/move-zeroes/)

> 「个人愚笨」：队列做法]
>
> 「Leetcode优化」：双指针
>
> - **一次遍历**
>   - 使用前驱指针记录所有的非0元素，最后将剩下的0元素进行补全即可
> - **二次遍历**
>   - 类似于快速排序的思想，使用后驱指针对数字进行遍历，前驱指针始终指向0，当后驱指针直到非0元素时，交换前后驱指针的值。

```cpp
//26ms
class Solution {
public:
    void moveZeroes(vector<int>& nums){
        int length = nums.size();
        int j = 0;
        //首先统计非0 元素 
        for(int i = 0; i < length; i ++){
            if(nums[i] != 0){
                nums[j ++] = nums[i];
            }
        }
        //然后将剩下的0元素补全
        for(int i = j; i < length; i ++){
            nums[i] = 0;
        }
    }
};
```

```cpp
//一次遍历：类似于快速排序的思想 16ms
class Solution {
public:
    void moveZeroes(vector<int>& nums){
        int length = nums.size();
        int j = 0;
        for (int i = 0; i < length; i++) {
            if(nums[i] != 0) {//类似于快排的思想，交换0元素与非0 元素的位置
                if(i > j) {
                    nums[j] = nums[i];
                    nums[i] = 0;
                }
                j++;
            }
        }
    }
};
```

#### [11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)

> **思路**：总的来说，前驱指针从0开始遍历，后取指针从末尾开始，这样的话可以保证长度是最大的，现在我们需要让高度也尽可能最大。
>
> 那么如何才能让高度尽可能最大呢，前驱和后驱指针移动的时候，应该尽可能让比较高的高度保留下来，然后移动较低高度的指针，这样能够保证每次所留下来的面积尽可能大。遍历所有情况，取最大值作为问题的解。时间复杂度$O(N)$

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        typedef long long ll;
        ll ans = 0;
        //暴力 TLE
        // for(int i = 0; i < height.size(); i ++){
        //     for(int j = 0; j < height.size(); j ++){
        //         ll cnt = (j - i)*min(height[i],height[j]);
        //         ans = max(ans, cnt);
        //     }
        // }
        int len =height.size();
        for(int i = 0, j = len - 1; i < j;){
            ll cur_area = (j - i) * min(height[i], height[j]);
            ans = max(ans, cur_area);

            if(height[i] < height[j]) i ++;
            else j --;
        }
        return ans;
    }
};
```

#### [15. 三数之和](https://leetcode.cn/problems/3sum/)

> **思路：**对于该题的话，我觉得一定要脑子里面一直有数组的指针到底指向哪的这个概念，不能鲁莽行事，要不然很容易出现指针溢出的情况。
>
> 解题：首先将原数组进行排序，如果排序后第一个数就已经大于0的话「不可以≥0，因为[0,0,0]是合法答案」，那么就一定不存在答案，故此特判直接返回。
> 此时，对于每个枚举的结果$i$，另左指针$l=i+1$，右指针$r=n-1$进行枚举，
>
> - 如果此时$nums[i]+nums[l]+nums[r]>0$则说明结果偏大，右指针应该减小；
> - 如果此时$nums[i]+nums[l]+nums[r]<0$则说明结果偏小，左指针应该增大；
> - 如果相等的话，将答案加入进去，然后对于$L$指针进行去重处理，再对$R$指针进行去重处理，最后对于枚举的$i$指针进行去重处理。

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> ans;
        if(nums.size() < 3) return ans; //特判1
        sort(nums.begin(), nums.end());
        int len = nums.size();
        if(nums[0] > 0) return ans;
        for(int i = 0; i < len; i ++){
            if(nums[i] > 0) break;
            int l = i + 1, r = len - 1;
            while(l < r){
                int tmp = nums[i] + nums[l] + nums[r];
                if(tmp > 0) r --;
                else if(tmp < 0) l ++;
                else{
                    ans.push_back({nums[i], nums[l], nums[r]});
                    while(l < r && nums[l] == nums[l + 1]) l ++; //去重L
                    while(l < r && nums[r] == nums[r - 1]) r --; //去重R
                    l ++;
                    r --;
                }
            }
            while(i + 1 < len && nums[i] == nums[i + 1]) i ++; //去重i；注意细节防止溢出！！⚠️
        }
        return ans;
    }
};
```

#### [42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)

> - 解法一：
>   - 首先存下左边的最大值以及右边的最大值数组，然后每次取左右两边最小的高度减去当前的高度即为所能手机的最多的水。「求每一列的水，我们只需要关注当前列，以及左边最高的墙，右边最高的墙就够了。」
>   - <img src="./LeetCode%E9%A2%98%E8%AE%B0.assets/image-20230509165753513.png" alt="image-20230509165753513" style="zoom:25%;" />
> - 解法二：
>   - 按行求，对于每一行，看能有装载多少水，比较暴力的方法。「从下往上，一行一行求」时间复杂度$O(maxheight*n)$
>   - <img src="./LeetCode%E9%A2%98%E8%AE%B0.assets/image-20230509165453700.png" alt="image-20230509165453700" style="zoom:33%;" />
> - 解法三：解法一中左右两边最高的墙仅仅用到的一次，故此可以采用双指针算法，不必存下所有最高的墙，左指针指向左边最高的墙，右指针指向右边最高的墙
>   - 
> - 解法四：「类比括号匹配问题」——使用栈来求解该问题
>   - <img src="./LeetCode%E9%A2%98%E8%AE%B0.assets/image-20230510093156367.png" alt="image-20230510093156367" style="zoom:33%;" />
>   - <img src="./LeetCode%E9%A2%98%E8%AE%B0.assets/image-20230510093240473.png" alt="image-20230510093240473" style="zoom:33%;" />
>   - 类比括号匹配问题⬆️，使用栈来进行匹配，如果当前元素要大于栈内的元素，那么就取得改部分所有水的面积累加到答案内：要点：水的宽度*水的高度，栈内存储的是枚举的下标「这样便于求宽度」

```cpp
//解法一：
class Solution {
public:
    int trap(vector<int>& height) {
        int ans = 0;
        int n = height.size();
        vector<int> l(n),r(n); //这一步(n)表示初始化容器，要有这一步才能随机访问容器元素
        for(int i = 1; i < height.size(); i ++){ //存放左边的最大值
            l[i] = max(l[i-1], height[i-1]);
        }
        for(int i = height.size() - 2; i >= 0; i --){ //存放右边的最大值
            r[i] = max(r[i + 1], height[i + 1]);
        }
        for(int i = 0; i < height.size(); i ++){
            int level = min(l[i], r[i]); //每次获取左右两边的最小值
            ans += max(0,level - height[i]); //求能容纳的水的最大值
        }
        return ans;
    }
};
```

```cpp
//解法三：双指针
class Solution {
public:
    int trap(vector<int>& height) {
        int ans = 0;
        int n = height.size();
        int l = 0, r = 0; //分别存在左右最高的墙
        int li = 1, ri = height.size() - 2; //左右指针
        for(int i = 1; i < height.size() - 1; i ++){
            if(height[li - 1] < height[ri + 1]){
                l = max(l , height[li - 1]);
                if(l > height[li]){
                    ans += (l - height[li]);
                }
                li ++;
            }
            else{
                r = max(r, height[ri + 1]);
                if(r > height[ri]){
                    ans += (r - height[ri]);
                }
                ri --;
            }
        }
        return ans;
    }
};
```

```cpp
//解法四：栈
class Solution {
public:
    int trap(vector<int>& height) {
        int ans = 0;
        int n = height.size();
        stack<int> stk;
        for(int i = 0; i < n; i ++){
            while(!stk.empty() && height[i] > height[stk.top()]){//如果栈不空且当前元素要大于栈顶元素的话
                int t = height[stk.top()]; //去除栈顶元素
                stk.pop();
                if(stk.empty()) break; //如果此时栈为空 直接退出
                int distance = i - stk.top() - 1; //求水的宽度
                int minheight = min(height[stk.top()], height[i]); //求最小的水高度
                ans += distance * (minheight - t);  //求该区域的大小「矩形面积」
            }
            stk.push(i); //压入当前元素
        }
        return ans;
    }
};
```

### 三、滑动窗口

#### [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

> 滑动窗口的方法解题，不过本题还要注意使用一个哈希表来存放滑动窗口内已经存在了哪些元素，必须要保证窗口内不能出现重复元素

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int ans = 0;
        deque<int> q;
        map<char,int> mp; //哈希表 记录当前窗口内有哪些已有元素
        for(int i = 0; i < s.size(); i ++){
            char c = s[i];
            while( (!q.empty() && s[q.front()] == c) || mp[c] == 1){ //滑动窗口,如果队列不空，并且队头元素等于当前元素，或者当前元素已经在滑动窗口中出现了
                mp[s[q.front()]] --; //哈希表中去除该元素
                q.pop_front(); //那么去除队头
            }
            q.push_back(i); //推入队尾
            mp[c] ++; //哈希表更新该元素
            int cur = q.size();
            ans = max(ans, cur); //ans记录最大的滑动窗口的大小
        }
        return ans;
    }
};
```

#### [438. 找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/)

> **个人解法：**哈希表+滑动窗口，在这里哈希表使用字符串存储——>方便比较频数
>
> **其他解法：**初始化p的字符数组然后维护数组每个元素不小于0。 开始向右滑动窗口，减去并相应字符，如果频率小于0就收缩左侧边界直到频率不再小于0。窗口长度与p长度一致时达成条件。
>
> **官方解法：**类似于个人解法，不过不使用字符串哈希表的方式进行比较的，也是使用的vector进行比较，使用一个新的变量differ表示是否相同，如果differ=0，表示与p串相等，如果不等于0表示不等。

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> ans;
        int cur;
        deque<int> dq;
        string sts1 = string(26, '0'); //哈希方式存放字符串p中各字符的频数
        string sts2 = string(26, '0'); //哈希方式存放字符串s中各字符的频数
        for(int i = 0; i < p.size(); i ++){ //更新sts1,p串中各字符的频数
            ++ sts1[p[i] - 'a'];
        }
        for(int i = 0; i < s.size(); i ++){ //枚举s
            char c = s[i];
            dq.push_back(i);
            ++ sts2[s[i] - 'a']; //更新s的字符出现频数
            while(dq.size() == p.size() && sts1 != sts2){ //如果窗口大小一致，但出现频数不一致的话，则弹出队头
                -- sts2[s[dq.front()] - 'a'];
                dq.pop_front();
            }
            if(dq.size() == p.size()){ //如果此时队列大小与p串的大小一致的话，则将队头元素作为答案
                ans.emplace_back(dq.front());
                -- sts2[s[dq.front()] - 'a'];
                dq.pop_front();
            }
        }
        return ans;
    }
};
```

```cpp
//其他解法：枚举的是滑动窗口的左右两边
//初始化p的字符数组然后维护数组每个元素不小于0。 开始向右滑动窗口，减去并相应字符，如果频率小于0就收缩左侧边界直到频率不再小于0。窗口长度与p长度一致时达成条件。
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int m = s.size(), n = p.size();
        if(m < n) return {};
        vector<int> hashTable(26);
        for(auto ch : p) ++hashTable[ch - 'a'];
        vector<int> ret;
        for(int l = 0, r = 0; r < m; ++r) {
            --hashTable[s[r] - 'a'];
            while(hashTable[s[r] - 'a'] < 0) {
                ++hashTable[s[l] - 'a'];
                ++l;
            }
            if(r - l + 1 == n) ret.push_back(l);
        }
        return ret;
    }
};
```

### 四、子串

#### [560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)

> 方法一：哈希表+前缀和「暴力方法的优化」
> 	定义哈希表存放，可能的前缀和的情况，定义$前缀和数组pre[i]$
> $pre[i] - pre[j-1] = k$时则满足情况，移项可得：$pre[j-1] == pre[i] -k $
>
> <img src="./LeetCode%E9%A2%98%E8%AE%B0.assets/image-20230511142844236.png" alt="image-20230511142844236" style="zoom:33%;" />
>
> > 为什么要不能用滑动窗口缩减边界的方法进行求解？
> > 答：因为在本题中存在负数和0，也就是说右指针`i`向后移1位不能保证区间会增大，左指针`j`向后移1位也不能保证区间和会减小。给定`j`，`i`的位置没有二段性

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int ans = 0;
        map<int,int> mp //哈希表
        mp[0] = 1; //因为存在负数，故此当sum=0时，需要定义mp[0]=1
        int sum = 0;
        for(auto num : nums){
            sum += num; //前缀和
            if(mp.count(sum - k)) ans += mp[sum - k]; //ans += [pre[i] - k]的数量
            mp[sum] ++; //当前前缀和++
        }
        return ans;
    }
};
```

> 暴力方法：
>
> ```cpp
> class Solution {
> public:
>     int subarraySum(vector<int>& nums, int k) {
>         int count = 0;
>         for (int start = 0; start < nums.size(); ++start) {//定义区间和-->sum
>             int sum = 0;
>             for (int end = start; end >= 0; --end) {
>                 sum += nums[end];
>                 if (sum == k) { //如果相等时则cnt++
>                     count++;
>                 }
>             }
>         }
>         return count;
>     }
> };
> ```

#### [239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)

```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> ans;
        deque<int> dq; //滑动窗口
        for(int i = 0; i < nums.size(); i ++){
            while(!dq.empty() && nums[i] > nums[dq.back()]){
                dq.pop_back(); //如果当前元素大于队尾元素，则弹出队尾元素-->保证队头元素永远最大
            }
            dq.push_back(i);
            //如果滑动窗口超过大小，并且队头元素与滑动窗口元素相等的话，则说明超出滑动窗口大小则弹出队头
            if(i - k + 1 > 0 && nums[dq.front()] == nums[i - k]){ //检测是否超过滑动窗口的大小，需要注意的是下标的变化
                dq.pop_front(); //那么就弹出队头元素，
            }
            if(i - k + 1 >= 0) ans.push_back(nums[dq.front()]);
        }
        return ans;
    }
};
```

#### [76. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)

> 又是滑动窗口的变题思想：
> 对于这一道题，我们采用的是缩减滑动窗口的左右两边的边界进行求解，
>
> 1. 首先记录所需要的t中字符串中的字符数量
> 2. 然后枚举字符串s，固定l=r=0，然后开始对于右边界进行枚举
>    1. 使用`cnt`变量，表示当前窗口内所需要的t的字符的数量
>    2. 当`cnt==0`时说明此时窗口内已经包含了全部所需要的字符
> 3. 对左端点进行处理，枚举左端点，直到左端点再移动一次就导致窗口内不满足要求为止
>    1. 记录左端点和右端点，更新最大的长度`size`
>    2. 将左端点进行移，然后更新所需要的`cnt`数量
> 4. 反复操作直到`r == m`
>
> <img src="./LeetCode%E9%A2%98%E8%AE%B0.assets/image-20230511162226866.png" alt="image-20230511162226866" style="zoom:50%;" />

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        string ans = "";
        int m = s.size(), n = t.size();
        if(m < n) return ans;
        unordered_map<int,int> need;
        for(auto c : t){
            need[c] ++;
        }
        int cnt = n;
        int l = 0, size = INT_MAX, start = 0;
        for(int r = 0; r < m; r ++){ //枚举滑动窗口的右端点
            if(need[s[r]] > 0){ //如果此时的字符在t字符串以内
                cnt --; //那么还需要的t字符串长度--
            }
            need[s[r]] --; //需要的字符减去该字符，在这里还包括无关字符
            if(!cnt){ //如果需要的全部字符都已经在窗口内的话
                while(l < r && need[s[l]] < 0){ //保证l<r，l去掉无关字符「在t字符串中不存在字符」
                    need[s[l]] ++;
                    l ++;
                }
                if(r - l  + 1 < size){ //更新最小的size
                    size = r - l + 1;
                    start = l; //字符串子串的开始位置应该是l
                }
                //遍历完后，那么就使得其不满足条件
                //所需要的t的字符数量+1
                need[s[l]] ++;
                l ++;
                cnt ++;
            }
        }
        size == INT_MAX ? ans="" : ans = s.substr(start, size); //注意，如果size没有发生变化的话，则直接输出“”空字符串
        return ans;
    }
};
```

### 五、普通数组

#### [53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

> 方法一：动态规划：定义属性：dp[i]表示以nums[i]结尾的子序列的最大的和
> 状态转移方程：
> $$
> dp[i]=max(nums[i], dp[i-1]+nums[i])
> $$
> 方法二：分治法：

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int ans = nums[0];
        int sum = 0;
        for(auto num : nums){
            if(sum > 0) sum += num;
            else sum = num;
            ans = max(ans, sum);
        }
        return ans;
    }
};
```

```cpp
class Solution {
public:
    struct Status {
        int lSum, rSum, mSum, iSum;
    };

    Status pushUp(Status l, Status r) {
        int iSum = l.iSum + r.iSum;
        int lSum = max(l.lSum, l.iSum + r.lSum);
        int rSum = max(r.rSum, r.iSum + l.rSum);
        int mSum = max(max(l.mSum, r.mSum), l.rSum + r.lSum);
        return (Status) {lSum, rSum, mSum, iSum};
    };

    Status get(vector<int> &a, int l, int r) {
        if (l == r) {
            return (Status) {a[l], a[l], a[l], a[l]};
        }
        int m = (l + r) >> 1;
        Status lSub = get(a, l, m);
        Status rSub = get(a, m + 1, r);
        return pushUp(lSub, rSub);
    }

    int maxSubArray(vector<int>& nums) {
        return get(nums, 0, nums.size() - 1).mSum;
    }
};
```

#### [189. 轮转数组](https://leetcode.cn/problems/rotate-array/)

> 思路一：额外数组
>
> 思路二：一个变量代替额外数组
>
> <img src="./LeetCode%E9%A2%98%E8%AE%B0.assets/image-20230513201959860.png" alt="image-20230513201959860" style="zoom:50%;" />
>
> 思路三：翻转数组
>
> <img src="./LeetCode%E9%A2%98%E8%AE%B0.assets/image-20230513202022130.png" alt="image-20230513202022130" style="zoom:60%;" />

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        vector<int> newArr(n);
        for (int i = 0; i < n; ++i) {
            newArr[(i + k) % n] = nums[i];
        }
        nums.assign(newArr.begin(), newArr.end());
    }
};
```

```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k = k % n;
        int count = gcd(k, n);
        for (int start = 0; start < count; ++start) {
            int current = start;
            int prev = nums[start];
            do {
                int next = (current + k) % n;
                swap(nums[next], prev);
                current = next;
            } while (start != current);
        }
    }
};
```

```cpp
class Solution {
public:
    void reverse(vector<int>& nums, int start, int end) {
        while (start < end) {
            swap(nums[start], nums[end]);
            start += 1;
            end -= 1;
        }
    }

    void rotate(vector<int>& nums, int k) {
        k %= nums.size();
        reverse(nums, 0, nums.size() - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.size() - 1);
    }
};
```

#### [238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/)

> 「不能使用除法｜时间复杂度在O(n)」
> 方法：常规很容易想到全部累乘，然后处于当前位置的数，但不能使用除法操作，故此我们可以采用累乘对应位置的左侧的累乘和右侧的累乘，对应位置的值就是$L[i-1]*R[i+1]*$；
>
> 「将空间复杂度控制在O(1)以内」
> 方法：在上面的方法中，关于L[N]和R[N]数组，显然每次计算只用到了当前位置的一次，故此只需要单独存取上一次用到的L和R的值就行了。

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n,1);
        vector<int> L(n,1);
        vector<int> R(n,1);
        L[0]=nums[0],R[n-1] = nums[n-1]; //特判第一个位置和最后一个位置
        for(int i = 1; i < n - 1; i ++){
            L[i] = L[i - 1] * nums[i];
            R[n - i - 1] = R[n - i] * nums[n - 1 - i];
        }
        ans[0] = 1*R[1];//特判第一个位置和最后一个位置
        ans[n-1] = L[n-2] * 1;
        for(int i = 1; i < n - 1; i ++){
            ans[i] = L[i-1] * R[i+1];
        }
        return ans;
    }
};
```

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n,1);
        int L = 1, R = 1; //动态更新L,R的值，节省空间的消耗
        for(int i = 0; i < n; i ++){
            ans[i] = ans[i] * L;
            L = L * nums[i];

            ans[n - 1 - i] = ans[n - 1 - i] * R;
            R = R * nums[n - 1 - i];
        }
        return ans;
    }
};
//更容易理解的版本
//两次遍历：第一次遍历求左边的累乘，第二次倒序遍历求右边的累乘
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int length = nums.size();
        vector<int> answer(length);

        // answer[i] 表示索引 i 左侧所有元素的乘积
        // 因为索引为 '0' 的元素左侧没有元素， 所以 answer[0] = 1
        answer[0] = 1;
        for (int i = 1; i < length; i++) {
            answer[i] = nums[i - 1] * answer[i - 1];
        }

        // R 为右侧所有元素的乘积
        // 刚开始右边没有元素，所以 R = 1
        int R = 1;
        for (int i = length - 1; i >= 0; i--) {
            // 对于索引 i，左边的乘积为 answer[i]，右边的乘积为 R
            answer[i] = answer[i] * R;
            // R 需要包含右边所有的乘积，所以计算下一个结果时需要将当前值乘到 R 上
            R *= nums[i];
        }
        return answer;
    }
};
```

#### [41. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/)

> 哈希哈希——神奇的哈希表的空间优化「打标记」
>
> <img src="./LeetCode%E9%A2%98%E8%AE%B0.assets/image-20230514110126982.png" alt="image-20230514110126982" style="zoom:50%;" />

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for(auto& num : nums){
            if(num <= 0) num = n + 1; //把所有的负数进行处理
        }
        for(auto num : nums){ //类似于哈希映射，
            int t = abs(num);
            if(t <= n) nums[t - 1] = -abs(nums[t - 1]); //-1的原因是下标从0开始
        }
        for(int i = 0; i < n; i ++){
            if(nums[i] > 0) return i + 1;
        }
        return n + 1;
    }
};
```

### 六、矩阵

#### [73. 矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/)

> 大概方法都是在原来数组上打上需要清零0的行和列的标记，我的方法是使用集合存下需要清零的行列
>
> 优化方法：使用矩阵的第一行和第一列来本身进行标记，这样就不需要额外的空间了，但要注意用这种方法时需要注意是否原来的第一行与第一列含有0

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        set<int> qi,qj;
        int n = matrix.size();
        int m = matrix[0].size();
        for(int i = 0; i < n; i ++){
            for(int j = 0; j < m; j ++){
                if(!matrix[i][j]){
                    qi.insert(i);
                    qj.insert(j);
                }
            }
        }
        for(set<int>::iterator it = qi.begin(); it != qi.end(); it ++){
            int curi = (*it);
            for(int j = 0; j < m; j ++){
                matrix[curi][j] = 0;
            }
        }
        for(set<int>::iterator it = qj.begin(); it != qj.end(); it ++){
            int curj = (*it);
            for(int i = 0; i < n; i ++){
                matrix[i][curj] = 0;
            }
        }
    }
};
```

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size();
        int n = matrix[0].size();
        int flag_col0 = false, flag_row0 = false;
        for (int i = 0; i < m; i++) {
            if (!matrix[i][0]) {
                flag_col0 = true;
            }
        }
        for (int j = 0; j < n; j++) {
            if (!matrix[0][j]) {
                flag_row0 = true;
            }
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (!matrix[i][j]) {
                    matrix[i][0] = matrix[0][j] = 0;
                }
            }
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (!matrix[i][0] || !matrix[0][j]) {
                    matrix[i][j] = 0;
                }
            }
        }
        if (flag_col0) {
            for (int i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }
        if (flag_row0) {
            for (int j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }
    }
};
作者：LeetCode-Solution
链接：https://leetcode.cn/problems/set-matrix-zeroes/solution/ju-zhen-zhi-ling-by-leetcode-solution-9ll7/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

#### [54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)

> 我吐了，简单模拟一下过程就行了，不要硬生生把他想那么难！！！！
> 「有时候暴力>一切」

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> ans;
        if(matrix.empty()) return ans;
        int top = 0;
        int left = 0;
        int down = matrix.size() - 1;
        int right = matrix[0].size() - 1;
        while(1){
            for(int i = left; i <= right; i ++) ans.emplace_back(matrix[top][i]);
            if(++top > down) break;
            for(int i = top; i <= down; i ++) ans.emplace_back(matrix[i][right]);
            if(--right < left) break;
            for(int i = right; i >= left; i --) ans.emplace_back(matrix[down][i]);
            if(--down < top) break;
            for(int i = down; i >= top; i --) ans.emplace_back(matrix[i][left]);
            if(++left > right) break;
        }
        return ans;
    }
};
```

#### [48. 旋转图像](https://leetcode.cn/problems/rotate-image/)

> 正确理解其数学对应关系，这题就挺容易的，主要提升在于没有使用额外的矩阵存储，而是使用临时变量存放下一个的位置以及值进行更新，优化了空间复杂度

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        int k = n / 2;
        for(int i = 0; i < k; i ++){
            for(int j = i; j < n - i - 1; j ++){
                int nexi = j;
                int nexj = n - i - 1;
                int t = matrix[i][j];
                for(int p = 0; p < 4; p ++){
                    int temp = matrix[nexi][nexj];
                    matrix[nexi][nexj] = t;
                    t = temp;
                    int ti = nexi;
                    nexi = nexj;
                    nexj = n - ti - 1;
                }
            }
        }
    }
};
```

#### [240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)

> 方法一：对每一行进行二分搜索；
> 方法二：Z字形搜索「详细分析见代码注释」

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        for (const auto& row: matrix) { //遍历每一行
            auto it = lower_bound(row.begin(), row.end(), target); //在该行内进行STL的二分搜索
            if (it != row.end() && *it == target) { //如果在该行找到target则返回true
                return true;
            }
        }
};
```

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int x = 0, y = n - 1; //初始化从矩阵的右上角进行搜
        while (x < m && y >= 0) { //没有超过搜索矩阵的范围
            if (matrix[x][y] == target) { //如果此时找到，则直接返回true
                return true;
            }
            if (matrix[x][y] > target) { //如果现在搜索的位置比目标值大的话，由于严格递增序列，故此>=y列的所有元素都不满足要求，故此此时y--
                --y;
            }
            else { //否则如果比目标值小的话，那么比x行小的所有元素都不满足要求，故此x++
                ++x;
            }
        }
        return false;
    }
};
```





### 十七、技巧

#### [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)

> 常规方法：
>
> 1. 哈希表：O(n), O(n)
> 2. 排序：O(nlogn), O(1);
> 3. 异或：O(n), O(1)!!!!!!异或之妙！！

```cpp
int ans = nums[0];
if (nums.length > 1) {
   for (int i = 1; i < nums.length; i++) {
      ans = ans ^ nums[i];
   }
 }
 return ans;
```


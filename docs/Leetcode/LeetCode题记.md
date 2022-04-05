

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

```C++
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

```C++
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


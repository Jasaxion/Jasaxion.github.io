document.addEventListener('DOMContentLoaded', function() {
  // 为所有代码块添加折叠功能
  document.querySelectorAll('pre code').forEach(function(block) {
    // 添加默认折叠类
    block.classList.add('collapsed');
    
    // 添加点击事件
    block.addEventListener('click', function(e) {
      // 如果点击的是代码块本身而不是展开/折叠按钮,则不处理
      if (e.target === this) {
        // 切换折叠/展开状态
        this.classList.toggle('collapsed');
        this.classList.toggle('expanded');
      }
    });
  });
});
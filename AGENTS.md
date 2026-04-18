# AlgoViz - 数据结构与算法可视化学习平台

## 项目概览

AlgoViz 是一个交互式的数据结构和算法可视化学习网站，帮助用户通过动画深入理解常见数据结构和经典算法的执行过程。

## 技术栈

- **前端**: 原生 HTML5 + CSS3 + JavaScript (ES6+)
- **样式**: 自定义 CSS (无框架依赖)
- **字体**: Inter (正文) + Fira Code (代码)
- **服务器**: Python SimpleHTTPServer (端口 5000)

## 目录结构

```
/workspace/projects/
├── index.html                    # 首页
├── pages/
│   ├── datastructures.html       # 数据结构页面
│   └── algorithms.html           # 算法演示页面
├── styles/
│   ├── main.css                  # 全局样式
│   ├── datastructures.css        # 数据结构页样式
│   └── algorithms.css            # 算法页样式
└── js/
    ├── main.js                   # 首页脚本
    ├── datastructures.js         # 数据结构页控制器
    ├── algorithms.js             # 算法页控制器
    ├── visualizations/
    │   ├── base.js               # 基类和配置
    │   ├── array.js              # 数组可视化
    │   ├── linkedlist.js         # 链表可视化
    │   ├── stack.js              # 栈可视化
    │   ├── queue.js              # 队列可视化
    │   ├── tree.js               # 二叉树可视化
    │   ├── hash.js               # 哈希表可视化
    │   ├── graph.js              # 图可视化
    │   └── heap.js               # 堆可视化
    └── algorithms/
        ├── sorting.js            # 排序算法
        ├── searching.js          # 查找算法
        ├── traversal.js          # 树遍历
        ├── graph.js              # 图遍历
        └── dijkstra.js            # Dijkstra算法
```

## 功能特性

### 数据结构可视化

1. **数组 (Array)** - 支持访问、查找、插入、删除操作
2. **链表 (Linked List)** - 单链表，支持遍历、搜索、插入
3. **栈 (Stack)** - LIFO，支持入栈、出栈、查看栈顶
4. **队列 (Queue)** - FIFO，支持入队、出队、查看队首
5. **二叉树 (Binary Tree)** - 支持前序、中序、后序、层序遍历
6. **哈希表 (Hash Table)** - 链地址法解决冲突
7. **图 (Graph)** - 支持 DFS/BFS 遍历
8. **堆 (Heap)** - 最大堆/最小堆，支持插入、提取、排序

### 算法演示

1. **排序算法**:
   - 冒泡排序 (Bubble Sort)
   - 选择排序 (Selection Sort)
   - 插入排序 (Insertion Sort)
   - 快速排序 (Quick Sort)
   - 归并排序 (Merge Sort)
   - 堆排序 (Heap Sort)

2. **查找算法**:
   - 二分查找 (Binary Search)

3. **遍历算法**:
   - 树的遍历 (前序、中序、后序、层序)
   - 图的遍历 (DFS、BFS)
   - 最短路径 (Dijkstra)

### 动画控制

- 播放 / 暂停
- 单步执行 (前进/后退)
- 速度调节
- 重置

### 信息展示

- 算法/数据结构简介
- 时间/空间复杂度
- 核心思路说明
- 伪代码高亮

## 启动方式

```bash
# 开发环境已自动启动在端口 5000
# 访问 http://localhost:5000
```

## 访问地址

- 首页: `http://localhost:5000/`
- 数据结构: `http://localhost:5000/pages/datastructures.html`
- 算法演示: `http://localhost:5000/pages/algorithms.html`

## 使用说明

1. **数据结构页面**: 选择数据结构类型 → 输入或随机生成数据 → 选择操作 → 观看动画
2. **算法页面**: 选择算法 → 设置数据 → 点击播放 → 观看执行过程

## 注意事项

- 使用随机数据生成时，数据会在页面刷新后重置
- 动画速度调节范围: 50ms - 1500ms
- 图算法使用圆形布局自动计算节点位置

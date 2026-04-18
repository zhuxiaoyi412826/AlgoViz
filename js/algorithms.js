/**
 * 算法页面主控制器
 */

// 可视化器实例
let visualizers = {};

// 当前选中的算法
let currentAlgo = 'bubbleSort';

// 动画控制器
let animationController = null;

// DOM元素
const elements = {};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    initEventListeners();
    initVisualizers();
    selectAlgorithm('bubbleSort');
});

// 初始化DOM元素
function initElements() {
    elements.algoButtons = document.querySelectorAll('.algo-btn');
    elements.arraySizeSlider = document.getElementById('arraySizeSlider');
    elements.arraySizeValue = document.getElementById('arraySizeValue');
    elements.algoRandomBtn = document.getElementById('algoRandomBtn');
    elements.algoDataInput = document.getElementById('algoDataInput');
    elements.searchTargetSection = document.getElementById('searchTargetSection');
    elements.searchTarget = document.getElementById('searchTarget');
    elements.graphConfigSection = document.getElementById('graphConfigSection');
    elements.generateGraphBtn = document.getElementById('generateGraphBtn');
    elements.algoPlayBtn = document.getElementById('algoPlayBtn');
    elements.algoPauseBtn = document.getElementById('algoPauseBtn');
    elements.algoStepBackBtn = document.getElementById('algoStepBackBtn');
    elements.algoStepForwardBtn = document.getElementById('algoStepForwardBtn');
    elements.algoResetBtn = document.getElementById('algoResetBtn');
    elements.algoSpeedSlider = document.getElementById('algoSpeedSlider');
    elements.algoSpeedValue = document.getElementById('algoSpeedValue');
    elements.algoVisualizationCanvas = document.getElementById('algoVisualizationCanvas');
    elements.algoPseudocodeContent = document.getElementById('algoPseudocodeContent');
    elements.algoVizStatus = document.getElementById('algoVizStatus');
    elements.algoTitle = document.getElementById('algoTitle');
    elements.algoDescription = document.getElementById('algoDescription');
    elements.algoTimeBest = document.getElementById('algoTimeBest');
    elements.algoTimeAvg = document.getElementById('algoTimeAvg');
    elements.algoTimeWorst = document.getElementById('algoTimeWorst');
    elements.algoSpace = document.getElementById('algoSpace');
    elements.algoCoreIdea = document.getElementById('algoCoreIdea');
}

// 初始化事件监听
function initEventListeners() {
    // 算法选择
    elements.algoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const algo = btn.dataset.algo;
            selectAlgorithm(algo);
        });
    });

    // 数组大小
    elements.arraySizeSlider.addEventListener('input', () => {
        const size = parseInt(elements.arraySizeSlider.value);
        elements.arraySizeValue.textContent = size;
        generateRandomData();
    });

    // 随机数据
    elements.algoRandomBtn.addEventListener('click', generateRandomData);

    // 生成图
    elements.generateGraphBtn?.addEventListener('click', () => {
        if (visualizers.graphTraversal) {
            visualizers.graphTraversal.generateRandom();
        }
        if (visualizers.dijkstra) {
            visualizers.dijkstra.generateRandom();
        }
    });

    // 播放控制
    elements.algoPlayBtn.addEventListener('click', play);
    elements.algoPauseBtn.addEventListener('click', pause);
    elements.algoStepBackBtn.addEventListener('click', stepBack);
    elements.algoStepForwardBtn.addEventListener('click', stepForward);
    elements.algoResetBtn.addEventListener('click', reset);

    // 速度控制
    elements.algoSpeedSlider.addEventListener('input', updateSpeed);
}

// 初始化可视化器
function initVisualizers() {
    visualizers.sorting = new SortingVisualizer('algoVisualizationCanvas');
    visualizers.searching = new SearchingVisualizer('algoVisualizationCanvas');
    visualizers.treeTraversal = new TraversalVisualizer('algoVisualizationCanvas');
    visualizers.graphTraversal = new GraphTraversalVisualizer('algoVisualizationCanvas');
    visualizers.dijkstra = new DijkstraVisualizer('algoVisualizationCanvas');

    // 设置默认数据
    visualizers.sorting.setData([23, 45, 12, 67, 34, 89, 56, 78, 90, 15]);
    visualizers.searching.setData([10, 20, 30, 40, 50, 60, 70, 80, 90]);
    visualizers.treeTraversal.fromArray([50, 30, 70, 20, 40, 60, 80]);
    visualizers.graphTraversal.generateRandom(6);
    visualizers.dijkstra.generateRandom(6);
}

// 选择算法
function selectAlgorithm(algo) {
    // 更新按钮状态
    elements.algoButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.algo === algo);
    });

    currentAlgo = algo;

    // 更新信息面板
    updateInfoPanel(algo);

    // 更新伪代码
    updatePseudocode(algo);

    // 更新配置选项
    updateConfigOptions(algo);

    // 更新可视化器
    updateVisualizer(algo);

    // 重置状态
    updateStatus('ready');
}

// 更新信息面板
function updateInfoPanel(algo) {
    const info = ALGO_INFO[algo];
    if (!info) return;

    elements.algoTitle.textContent = info.title;
    elements.algoDescription.textContent = info.description;
    elements.algoCoreIdea.textContent = info.coreIdea;

    if (info.timeComplexity.best) {
        elements.algoTimeBest.textContent = `最优 ${info.timeComplexity.best}`;
        elements.algoTimeAvg.textContent = `平均 ${info.timeComplexity.average}`;
        elements.algoTimeWorst.textContent = `最坏 ${info.timeComplexity.worst}`;
    } else {
        elements.algoTimeBest.textContent = `时间 ${info.timeComplexity}`;
        elements.algoTimeAvg.textContent = '';
        elements.algoTimeWorst.textContent = '';
    }

    elements.algoSpace.textContent = `空间 ${info.spaceComplexity}`;
}

// 更新伪代码
function updatePseudocode(algo) {
    const code = PSEUDOCODES[algo] || PSEUDOCODES.bubbleSort;
    
    elements.algoPseudocodeContent.innerHTML = code.map((line, index) => `
        <div class="pseudocode-line" data-line="${index}">
            ${line}
        </div>
    `).join('');
}

// 高亮伪代码行
function highlightPseudocodeLine(lineIndex) {
    document.querySelectorAll('#algoPseudocodeContent .pseudocode-line').forEach((el, i) => {
        el.classList.toggle('highlight', i === lineIndex);
    });
}

// 更新配置选项
function updateConfigOptions(algo) {
    // 隐藏所有特殊配置
    elements.searchTargetSection.style.display = 'none';
    elements.graphConfigSection.style.display = 'none';
    
    // 显示相关配置
    if (algo === 'binarySearch') {
        elements.searchTargetSection.style.display = 'block';
    }
    
    if (algo === 'graphDFS' || algo === 'graphBFS' || algo === 'dijkstra') {
        elements.graphConfigSection.style.display = 'block';
    }
}

// 更新可视化器
function updateVisualizer(algo) {
    // 隐藏所有可视化器
    Object.values(visualizers).forEach(viz => {
        if (viz.container) {
            viz.container.style.display = 'none';
        }
    });

    // 显示当前算法对应的可视化器
    let viz = null;
    
    switch (algo) {
        case 'bubbleSort':
        case 'selectionSort':
        case 'insertionSort':
        case 'quickSort':
        case 'mergeSort':
        case 'heapSort':
            viz = visualizers.sorting;
            break;
        case 'binarySearch':
            viz = visualizers.searching;
            break;
        case 'treeInorder':
        case 'treePreorder':
        case 'treePostorder':
            viz = visualizers.treeTraversal;
            break;
        case 'graphDFS':
        case 'graphBFS':
            viz = visualizers.graphTraversal;
            break;
        case 'dijkstra':
            viz = visualizers.dijkstra;
            break;
    }

    if (viz && viz.container) {
        viz.container.style.display = 'block';
        viz.render();
        animationController = viz;
        
        viz.onStepChange = () => {
            updateStatus('running');
        };
        viz.onComplete = () => {
            updateStatus('completed');
            updateControlButtons(false);
        };
    }
}

// 生成随机数据
function generateRandomData() {
    const size = parseInt(elements.arraySizeSlider.value);
    
    // 检查是否是排序算法
    if (['bubbleSort', 'selectionSort', 'insertionSort', 'quickSort', 'mergeSort', 'heapSort'].includes(currentAlgo)) {
        visualizers.sorting.setData(Utils.randomArray(size, 1, 99));
    } else if (currentAlgo === 'binarySearch') {
        visualizers.searching.setData(Utils.randomArray(size, 1, 99).sort((a, b) => a - b));
    } else if (['treeInorder', 'treePreorder', 'treePostorder'].includes(currentAlgo)) {
        visualizers.treeTraversal.fromArray(Utils.randomArray(size, 1, 99));
    } else if (currentAlgo === 'graphDFS' || currentAlgo === 'graphBFS') {
        visualizers.graphTraversal.generateRandom(6);
    } else if (currentAlgo === 'dijkstra') {
        visualizers.dijkstra.generateRandom(6);
    }

    updateStatus('ready');
}

// 运行算法
function runAlgorithm() {
    switch (currentAlgo) {
        case 'bubbleSort':
            visualizers.sorting.bubbleSort();
            break;
        case 'selectionSort':
            visualizers.sorting.selectionSort();
            break;
        case 'insertionSort':
            visualizers.sorting.insertionSort();
            break;
        case 'quickSort':
            visualizers.sorting.quickSort();
            break;
        case 'mergeSort':
            visualizers.sorting.mergeSort();
            break;
        case 'heapSort':
            visualizers.sorting.heapSort();
            break;
        case 'binarySearch':
            const target = parseInt(elements.searchTarget.value) || Math.floor(Math.random() * 100);
            elements.searchTarget.value = target;
            visualizers.searching.binarySearch(target);
            break;
        case 'treeInorder':
            visualizers.treeTraversal.inorder();
            break;
        case 'treePreorder':
            visualizers.treeTraversal.preorder();
            break;
        case 'treePostorder':
            visualizers.treeTraversal.postorder();
            break;
        case 'graphDFS':
            visualizers.graphTraversal.dfs('A');
            break;
        case 'graphBFS':
            visualizers.graphTraversal.bfs('A');
            break;
        case 'dijkstra':
            visualizers.dijkstra.run('A');
            break;
    }
}

// 播放
function play() {
    if (animationController) {
        animationController.play();
        updateStatus('running');
        updateControlButtons(true);
    } else {
        runAlgorithm();
        animationController.play();
        updateStatus('running');
        updateControlButtons(true);
    }
}

// 暂停
function pause() {
    if (animationController) {
        animationController.pause();
        updateStatus('paused');
        updateControlButtons(false);
    }
}

// 上一步
function stepBack() {
    if (animationController) {
        animationController.stepBack();
    }
}

// 下一步
function stepForward() {
    if (animationController) {
        animationController.stepForward();
    }
}

// 重置
function reset() {
    if (animationController) {
        animationController.reset();
        animationController.render();
        updateStatus('ready');
        updateControlButtons(false);
    }
}

// 更新速度
function updateSpeed() {
    const value = parseInt(elements.algoSpeedSlider.value);
    const speed = 1500 - value + 50;
    
    if (animationController) {
        animationController.setSpeed(speed);
    }
    
    const speedText = (value / 500).toFixed(1) + 'x';
    elements.algoSpeedValue.textContent = speedText;
}

// 更新状态显示
function updateStatus(status) {
    const statusEl = elements.algoVizStatus;
    statusEl.className = 'viz-status';
    
    switch (status) {
        case 'ready':
            statusEl.textContent = '就绪';
            break;
        case 'running':
            statusEl.textContent = '运行中';
            statusEl.classList.add('running');
            break;
        case 'paused':
            statusEl.textContent = '已暂停';
            statusEl.classList.add('running');
            break;
        case 'completed':
            statusEl.textContent = '完成';
            statusEl.classList.add('completed');
            break;
    }
}

// 更新控制按钮状态
function updateControlButtons(isPlaying) {
    elements.algoPlayBtn.disabled = isPlaying;
    elements.algoPauseBtn.disabled = !isPlaying;
}

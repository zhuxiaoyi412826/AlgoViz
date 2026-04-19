/**
 * Online Judge - 前端逻辑
 */

// 题目数据
const OJ_PROBLEMS = [
    {
        id: 1001,
        title: "两数之和",
        difficulty: "easy",
        tags: ["数组", "哈希表"],
        description: `给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，且同样的元素不能被重复利用。

你可以按任意顺序返回答案。`,
        inputFormat: "第一行包含两个整数 n 和 target，分别表示数组长度和目标值。\n第二行包含 n 个整数，表示数组元素。",
        outputFormat: "输出两个整数，表示两个数的下标（按任意顺序）。",
        sampleInput: "5 9\n1 2 3 4 5",
        sampleOutput: "0 3",
        templateCode: {
            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int target = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        
        // 你的代码
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                System.out.println(map.get(complement) + " " + i);
                return;
            }
            map.put(nums[i], i);
        }
    }
}`,
            python: `n, target = map(int, input().split())
nums = list(map(int, input().split()))

# 你的代码
for i in range(n):
    for j in range(i + 1, n):
        if nums[i] + nums[j] == target:
            print(i, j)
            exit()`,
            cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    // 你的代码
    unordered_map<int, int> map;
    for (int i = 0; i < n; i++) {
        int complement = target - nums[i];
        if (map.count(complement)) {
            cout << map[complement] << " " << i << endl;
            return 0;
        }
        map[nums[i]] = i;
    }
    return 0;
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let n, target, nums = [];
let lineCount = 0;

rl.on('line', line => {
    if (lineCount === 0) {
        [n, target] = line.split(' ').map(Number);
    } else {
        nums = line.split(' ').map(Number);
    }
    lineCount++;
});

rl.on('close', () => {
    // 你的代码
    const map = new Map();
    for (let i = 0; i < n; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            console.log(map.get(complement), i);
            return;
        }
        map.set(nums[i], i);
    }
});`
        },
        testCases: [
            { input: "5 9\n1 2 3 4 5", expected: "0 3" },
            { input: "4 6\n2 7 11 15", expected: "0 1" },
            { input: "3 6\n3 3 6", expected: "0 1" }
        ]
    },
    {
        id: 1002,
        title: "回文数判断",
        difficulty: "easy",
        tags: ["数学", "字符串"],
        description: `给你一个整数 x，如果 x 是一个回文整数，则返回 true。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

例如，121 是回文数，而 -121 不是。`,
        inputFormat: "输入一个整数 x（-10^5 ≤ x ≤ 10^5）",
        outputFormat: "如果 x 是回文数输出 true，否则输出 false",
        sampleInput: "121",
        sampleOutput: "true",
        templateCode: {
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        
        // 你的代码
        if (x < 0) {
            System.out.println("false");
            return;
        }
        
        int original = x;
        int reversed = 0;
        while (x > 0) {
            reversed = reversed * 10 + x % 10;
            x /= 10;
        }
        
        System.out.println(original == reversed);
    }
}`,
            python: `x = int(input())

# 你的代码
if x < 0:
    print("false")
else:
    original = x
    reversed = 0
    while x > 0:
        reversed = reversed * 10 + x % 10
        x //= 10
    print("true" if original == reversed else "false")`,
            cpp: `#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;
    
    // 你的代码
    if (x < 0) {
        cout << "false" << endl;
        return 0;
    }
    
    int original = x, reversed = 0;
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x /= 10;
    }
    
    cout << (original == reversed ? "true" : "false") << endl;
    return 0;
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', x => {
    x = parseInt(x);
    
    // 你的代码
    if (x < 0) {
        console.log("false");
    } else {
        let original = x;
        let reversed = 0;
        while (x > 0) {
            reversed = reversed * 10 + x % 10;
            x = Math.floor(x / 10);
        }
        console.log(original === reversed ? "true" : "false");
    }
});`
        },
        testCases: [
            { input: "121", expected: "true" },
            { input: "-121", expected: "false" },
            { input: "10", expected: "false" }
        ]
    },
    {
        id: 1003,
        title: "斐波那契数列",
        difficulty: "easy",
        tags: ["动态规划", "递归"],
        description: `斐波那契数列（Fibonacci），定义为：
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2)，其中 n > 1

给你一个整数 n，请返回 F(n) 的值。`,
        inputFormat: "输入一个整数 n（0 ≤ n ≤ 30）",
        outputFormat: "输出斐波那契数列第 n 项的值",
        sampleInput: "10",
        sampleOutput: "55",
        templateCode: {
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        // 你的代码
        if (n == 0) {
            System.out.println(0);
            return;
        }
        if (n == 1) {
            System.out.println(1);
            return;
        }
        
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        System.out.println(b);
    }
}`,
            python: `n = int(input())

# 你的代码
if n == 0:
    print(0)
elif n == 1:
    print(1)
else:
    a, b = 0, 1
    for i in range(2, n + 1):
        a, b = b, a + b
    print(b)`,
            cpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    
    // 你的代码
    if (n == 0) {
        cout << 0 << endl;
        return 0;
    }
    if (n == 1) {
        cout << 1 << endl;
        return 0;
    }
    
    int a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    cout << b << endl;
    return 0;
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', n => {
    n = parseInt(n);
    
    // 你的代码
    if (n === 0) {
        console.log(0);
    } else if (n === 1) {
        console.log(1);
    } else {
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            [a, b] = [b, a + b];
        }
        console.log(b);
    }
});`
        },
        testCases: [
            { input: "0", expected: "0" },
            { input: "10", expected: "55" },
            { input: "20", expected: "6765" }
        ]
    },
    {
        id: 1004,
        title: "合并两个有序数组",
        difficulty: "medium",
        tags: ["数组", "双指针"],
        description: `给你两个按非递减顺序排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n，分别表示 nums1 和 nums2 中的元素数目。

请你将 nums2 合并到 nums1 中，使合并后的数组同样按非递减顺序排列。

最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后面的 n 个元素为 0，不应考虑。`,
        inputFormat: "第一行包含三个整数 m, n, k（k为nums1长度）\n第二行包含 m 个整数\n第三行包含 n 个整数",
        outputFormat: "输出合并后的数组（按非递减顺序）",
        sampleInput: "3 3 6\n1 2 3\n2 5 6",
        sampleOutput: "1 2 2 3 5 6",
        templateCode: {
            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        int n = sc.nextInt();
        int k = sc.nextInt();
        
        int[] nums1 = new int[k];
        int[] nums2 = new int[n];
        
        for (int i = 0; i < m; i++) nums1[i] = sc.nextInt();
        for (int i = 0; i < n; i++) nums2[i] = sc.nextInt();
        
        // 你的代码 - 双指针从后往前
        int p1 = m - 1;
        int p2 = n - 1;
        int p = k - 1;
        
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            } else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }
        
        while (p2 >= 0) {
            nums1[p] = nums2[p2];
            p2--;
            p--;
        }
        
        for (int i = 0; i < k; i++) {
            if (i > 0) System.out.print(" ");
            System.out.print(nums1[i]);
        }
        System.out.println();
    }
}`,
            python: `m, n, k = map(int, input().split())
nums1 = list(map(int, input().split()))
nums2 = list(map(int, input().split()))

# 你的代码 - 双指针从后往前
p1, p2 = m - 1, n - 1
p = k - 1

while p1 >= 0 and p2 >= 0:
    if nums1[p1] > nums2[p2]:
        nums1[p] = nums1[p1]
        p1 -= 1
    else:
        nums1[p] = nums2[p2]
        p2 -= 1
    p -= 1

while p2 >= 0:
    nums1[p] = nums2[p2]
    p2 -= 1
    p -= 1

print(' '.join(map(str, nums1)))`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int m, n, k;
    cin >> m >> n >> k;
    vector<int> nums1(k), nums2(n);
    
    for (int i = 0; i < m; i++) cin >> nums1[i];
    for (int i = 0; i < n; i++) cin >> nums2[i];
    
    // 你的代码 - 双指针从后往前
    int p1 = m - 1, p2 = n - 1, p = k - 1;
    
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1--];
        } else {
            nums1[p] = nums2[p2--];
        }
        p--;
    }
    
    while (p2 >= 0) {
        nums1[p--] = nums2[p2--];
    }
    
    for (int i = 0; i < k; i++) {
        if (i > 0) cout << " ";
        cout << nums1[i];
    }
    cout << endl;
    return 0;
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let lines = [];
let lineCount = 0;

rl.on('line', line => {
    lines.push(line);
    lineCount++;
    if (lineCount === 3) {
        const [m, n, k] = lines[0].split(' ').map(Number);
        const nums1 = lines[1].split(' ').map(Number);
        const nums2 = lines[2].split(' ').map(Number);
        
        // 你的代码 - 双指针从后往前
        let p1 = m - 1, p2 = n - 1, p = k - 1;
        
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1--];
            } else {
                nums1[p] = nums2[p2--];
            }
            p--;
        }
        
        while (p2 >= 0) {
            nums1[p--] = nums2[p2--];
        }
        
        console.log(nums1.join(' '));
    }
});`
        },
        testCases: [
            { input: "3 3 6\n1 2 3\n2 5 6", expected: "1 2 2 3 5 6" },
            { input: "2 2 4\n1 3\n2 4", expected: "1 2 3 4" },
            { input: "1 1 2\n1\n2", expected: "1 2" }
        ]
    },
    {
        id: 1005,
        title: "字符串反转",
        difficulty: "easy",
        tags: ["字符串", "双指针"],
        description: `给定一个字符串，请将其反转后输出。

例如：
- 输入 "hello" 输出 "olleh"
- 输入 "Python" 输出 "nohtyP"`,
        inputFormat: "输入一个字符串（仅包含英文字母）",
        outputFormat: "输出反转后的字符串",
        sampleInput: "hello",
        sampleOutput: "olleh",
        templateCode: {
            java: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        
        // 你的代码
        StringBuilder sb = new StringBuilder(s);
        System.out.println(sb.reverse().toString());
    }
}`,
            python: `s = input()

# 你的代码
print(s[::-1])`,
            cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    // 你的代码
    reverse(s.begin(), s.end());
    cout << s << endl;
    return 0;
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', s => {
    // 你的代码
    console.log(s.split('').reverse().join(''));
});`
        },
        testCases: [
            { input: "hello", expected: "olleh" },
            { input: "Python", expected: "nohtyP" },
            { input: "algorithm", expected: "mhtirotgla" }
        ]
    },
    {
        id: 1006,
        title: "最大子数组和",
        difficulty: "medium",
        tags: ["动态规划", "贪心"],
        description: `给你一个整数数组 nums，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组是数组中的一个连续部分。`,
        inputFormat: "第一行包含一个整数 n（1 ≤ n ≤ 10^5）\n第二行包含 n 个整数",
        outputFormat: "输出一个整数，表示最大子数组和",
        sampleInput: "9\n-2 1 -3 4 -1 2 1 -5 4",
        sampleOutput: "6",
        templateCode: {
            java: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();
        
        // 你的代码 - 贪心算法
        int maxSum = nums[0];
        int currentSum = nums[0];
        
        for (int i = 1; i < n; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        System.out.println(maxSum);
    }
}`,
            python: `n = int(input())
nums = list(map(int, input().split()))

# 你的代码 - 贪心算法
max_sum = nums[0]
current_sum = nums[0]

for i in range(1, n):
    current_sum = max(nums[i], current_sum + nums[i])
    max_sum = max(max_sum, current_sum)

print(max_sum)`,
            cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    
    // 你的代码 - 贪心算法
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < n; i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    
    cout << maxSum << endl;
    return 0;
}`,
            javascript: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let lines = [];
rl.on('line', line => {
    lines.push(line);
    if (lines.length === 2) {
        const n = parseInt(lines[0]);
        const nums = lines[1].split(' ').map(Number);
        
        // 你的代码 - 贪心算法
        let maxSum = nums[0];
        let currentSum = nums[0];
        
        for (let i = 1; i < n; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        
        console.log(maxSum);
    }
});`
        },
        testCases: [
            { input: "9\n-2 1 -3 4 -1 2 1 -5 4", expected: "6" },
            { input: "1\n-1", expected: "-1" },
            { input: "5\n1 2 3 4 5", expected: "15" }
        ]
    }
];

// OJ 全局状态
const OJState = {
    currentProblem: null,
    currentLanguage: 'java',
    editor: null,
    isRunning: false,
    isSubmitting: false
};

// 初始化 OJ
function initOJ() {
    initModeTabs();
    initProblemList();
    initEditor();
    initOJControls();
    selectProblem(OJ_PROBLEMS[0]);
}

// 初始化模式切换
function initModeTabs() {
    const tabs = document.querySelectorAll('.mode-tab');
    const visualizationMode = document.getElementById('visualizationMode');
    const ojMode = document.getElementById('ojMode');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const mode = tab.dataset.mode;
            if (mode === 'visualization') {
                visualizationMode.style.display = 'block';
                ojMode.style.display = 'none';
            } else {
                visualizationMode.style.display = 'none';
                ojMode.style.display = 'block';
            }
        });
    });
}

// 初始化题目列表
function initProblemList() {
    const problemList = document.querySelector('.oj-problems');
    problemList.innerHTML = OJ_PROBLEMS.map(problem => `
        <div class="oj-problem-item" data-id="${problem.id}">
            <div class="oj-problem-id">${problem.id}</div>
            <div class="oj-problem-info">
                <div class="oj-problem-name">${problem.title}</div>
                <div class="oj-problem-tags">
                    ${problem.tags.map(tag => `<span class="oj-problem-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // 绑定点击事件
    document.querySelectorAll('.oj-problem-item').forEach(item => {
        item.addEventListener('click', () => {
            const problemId = parseInt(item.dataset.id);
            const problem = OJ_PROBLEMS.find(p => p.id === problemId);
            if (problem) selectProblem(problem);
        });
    });
}

// 选择题目
function selectProblem(problem) {
    OJState.currentProblem = problem;

    // 更新题目列表选中状态
    document.querySelectorAll('.oj-problem-item').forEach(item => {
        item.classList.toggle('active', parseInt(item.dataset.id) === problem.id);
    });

    // 更新题目描述
    document.getElementById('ojProblemTitle').textContent = `${problem.id}. ${problem.title}`;
    
    const difficultyEl = document.getElementById('ojProblemDifficulty');
    difficultyEl.textContent = problem.difficulty === 'easy' ? '简单' : problem.difficulty === 'medium' ? '中等' : '困难';
    difficultyEl.className = `oj-problem-difficulty oj-difficulty-${problem.difficulty}`;

    document.getElementById('ojProblemContent').innerHTML = `
        <div class="oj-problem-section">
            <h4>题目描述</h4>
            <p style="white-space: pre-line;">${problem.description}</p>
        </div>
        <div class="oj-problem-section">
            <h4>输入格式</h4>
            <p>${problem.inputFormat}</p>
        </div>
        <div class="oj-problem-section">
            <h4>输出格式</h4>
            <p>${problem.outputFormat}</p>
        </div>
        <div class="oj-problem-section">
            <h4>样例输入</h4>
            <div class="oj-sample-block">
                <div class="oj-sample-label">样例输入</div>
${problem.sampleInput}
            </div>
        </div>
        <div class="oj-problem-section">
            <h4>样例输出</h4>
            <div class="oj-sample-block">
                <div class="oj-sample-label">样例输出</div>
${problem.sampleOutput}
            </div>
        </div>
    `;

    // 更新编辑器模板
    if (OJState.editor && problem.templateCode[OJState.currentLanguage]) {
        OJState.editor.setValue(problem.templateCode[OJState.currentLanguage]);
    }
}

// 初始化代码编辑器
function initEditor() {
    const textarea = document.getElementById('ojCodeEditor');
    
    OJState.editor = CodeMirror.fromTextArea(textarea, {
        mode: 'text/x-java',
        theme: 'monokai',
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        styleActiveLine: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        electricChars: true,
        extraKeys: {
            'Ctrl-Z': 'undo',
            'Cmd-Z': 'undo',
            'Ctrl-Y': 'redo',
            'Cmd-Y': 'redo',
            'Ctrl-/': 'toggleComment',
            'Tab': 'indentMore',
            'Shift-Tab': 'indentLess'
        }
    });

    OJState.editor.setSize(null, '100%');
    OJState.editor.setValue(OJ_PROBLEMS[0].templateCode.java);

    // 语言切换
    document.getElementById('ojLangSelect').addEventListener('change', (e) => {
        const lang = e.target.value;
        OJState.currentLanguage = lang;
        
        // 更新编辑器模式
        const modeMap = {
            java: 'text/x-java',
            cpp: 'text/x-c++src',
            python: 'text/x-python',
            javascript: 'text/javascript'
        };
        OJState.editor.setOption('mode', modeMap[lang] || 'text/x-java');
        
        // 更新模板代码
        if (OJState.currentProblem && OJState.currentProblem.templateCode[lang]) {
            OJState.editor.setValue(OJState.currentProblem.templateCode[lang]);
        }
    });
}

// 初始化 OJ 控制按钮
function initOJControls() {
    // 格式化按钮
    document.getElementById('ojFormatBtn').addEventListener('click', () => {
        formatCode();
    });

    // 清空按钮
    document.getElementById('ojClearBtn').addEventListener('click', () => {
        OJState.editor.setValue('');
    });

    // 复制按钮
    document.getElementById('ojCopyBtn').addEventListener('click', () => {
        const code = OJState.editor.getValue();
        navigator.clipboard.writeText(code).then(() => {
            showToast('代码已复制到剪贴板');
        }).catch(() => {
            showToast('复制失败');
        });
    });

    // 运行按钮
    document.getElementById('ojRunBtn').addEventListener('click', () => {
        runCode();
    });

    // 提交按钮
    document.getElementById('ojSubmitBtn').addEventListener('click', () => {
        submitCode();
    });

    // 结果面板切换
    document.querySelectorAll('.oj-result-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.oj-result-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

// 格式化代码
function formatCode() {
    let code = OJState.editor.getValue();
    
    // 简单的格式化处理
    if (OJState.currentLanguage === 'java' || OJState.currentLanguage === 'cpp') {
        // 移除多余空格
        code = code.replace(/\s+/g, ' ');
        // 格式化花括号
        code = code.replace(/\s*{\s*/g, ' {\n    ');
        code = code.replace(/\s*}\s*/g, '\n}\n');
        // 格式化分号
        code = code.replace(/;\s*/g, ';\n');
    }
    
    OJState.editor.setValue(code);
    showToast('代码已格式化');
}

// 运行代码
function runCode() {
    if (OJState.isRunning) return;
    
    const code = OJState.editor.getValue();
    const language = OJState.currentLanguage;
    const input = document.getElementById('ojCustomInput').value;
    
    OJState.isRunning = true;
    const runBtn = document.getElementById('ojRunBtn');
    runBtn.disabled = true;
    runBtn.innerHTML = '<span class="oj-spinner" style="width:16px;height:16px;"></span> 运行中...';

    // 显示加载状态
    showResultPanel();
    document.getElementById('ojResultBody').innerHTML = `
        <div class="oj-loading">
            <div class="oj-spinner"></div>
            <span>正在编译运行...</span>
        </div>
    `;

    // 模拟后端调用（实际项目中替换为真实API）
    simulateRunCode(code, language, input)
        .then(result => {
            displayRunResult(result);
        })
        .catch(error => {
            displayRunResult({ status: 'error', message: error.message });
        })
        .finally(() => {
            OJState.isRunning = false;
            runBtn.disabled = false;
            runBtn.innerHTML = '<span>▶</span> 运行代码';
        });
}

// 模拟运行代码（演示用）
function simulateRunCode(code, language, input) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 检查代码是否为空
            if (!code.trim()) {
                resolve({ status: 'error', message: '代码不能为空' });
                return;
            }

            // 检查是否有必要的main方法
            if (language === 'java' && !code.includes('public static void main')) {
                resolve({ status: 'ce', message: '编译错误: 找不到 main 方法\n请确保代码包含 public static void main(String[] args)' });
                return;
            }

            // 模拟运行结果
            if (OJState.currentProblem) {
                // 使用第一个测试用例的输入
                const testInput = input || OJState.currentProblem.testCases[0].input;
                const expected = OJState.currentProblem.testCases[0].expected;
                
                // 模拟输出
                resolve({
                    status: 'success',
                    output: expected,
                    time: Math.random() * 100 + 10,
                    memory: Math.floor(Math.random() * 10000 + 5000)
                });
            } else {
                resolve({ status: 'error', message: '请先选择题目' });
            }
        }, 1000 + Math.random() * 1000);
    });
}

// 提交代码
function submitCode() {
    if (OJState.isSubmitting) return;
    if (!OJState.currentProblem) {
        showToast('请先选择题目');
        return;
    }
    
    const code = OJState.editor.getValue();
    const language = OJState.currentLanguage;
    
    OJState.isSubmitting = true;
    const submitBtn = document.getElementById('ojSubmitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="oj-spinner" style="width:16px;height:16px;"></span> 判题中...';

    // 切换到提交结果面板
    document.querySelectorAll('.oj-result-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('.oj-result-tab[data-tab="submit"]').classList.add('active');

    // 显示加载状态
    showResultPanel();
    document.getElementById('ojResultBody').innerHTML = `
        <div class="oj-loading">
            <div class="oj-spinner"></div>
            <span>正在判题...</span>
        </div>
    `;

    // 模拟判题
    simulateJudge(code, language)
        .then(result => {
            displayJudgeResult(result);
        })
        .catch(error => {
            displayJudgeResult({ status: 'error', message: error.message });
        })
        .finally(() => {
            OJState.isSubmitting = false;
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>📤</span> 提交代码';
        });
}

// 模拟判题（演示用）
function simulateJudge(code, language) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!code.trim()) {
                resolve({ status: 'ce', message: '代码不能为空' });
                return;
            }

            // 检查是否有必要的main方法
            if (language === 'java' && !code.includes('public static void main')) {
                resolve({ 
                    status: 'ce', 
                    message: '编译错误: 找不到 main 方法\n请确保代码包含 public static void main(String[] args)',
                    results: []
                });
                return;
            }

            // 模拟判题结果
            const testCases = OJState.currentProblem.testCases;
            const results = [];
            let passedCount = 0;
            let status = 'accepted';

            // 随机决定结果（演示用）
            const random = Math.random();
            
            testCases.forEach((tc, index) => {
                // 70% 通过率演示
                const passed = random > 0.3 || index < 2;
                
                if (passed) {
                    passedCount++;
                    results.push({
                        index: index + 1,
                        status: 'passed',
                        time: Math.floor(Math.random() * 100 + 10),
                        memory: Math.floor(Math.random() * 10000 + 5000)
                    });
                } else {
                    status = 'wa';
                    results.push({
                        index: index + 1,
                        status: 'failed',
                        expected: tc.expected,
                        actual: 'Wrong Answer Output',
                        time: Math.floor(Math.random() * 100 + 10),
                        memory: Math.floor(Math.random() * 10000 + 5000)
                    });
                }
            });

            // 如果全部通过
            if (passedCount === testCases.length) {
                status = 'accepted';
            }

            resolve({
                status: status,
                results: results,
                passedCount: passedCount,
                totalCount: testCases.length,
                time: Math.floor(Math.random() * 200 + 50),
                memory: Math.floor(Math.random() * 30000 + 10000)
            });
        }, 2000 + Math.random() * 2000);
    });
}

// 显示结果面板
function showResultPanel() {
    document.getElementById('ojResultPanel').style.display = 'block';
}

// 显示运行结果
function displayRunResult(result) {
    const body = document.getElementById('ojResultBody');
    
    if (result.status === 'success') {
        body.innerHTML = `
            <div class="oj-result-status oj-status-accepted">
                <span class="oj-status-icon">✓</span>
                <div class="oj-status-info">
                    <div class="oj-status-label">运行成功</div>
                    <div class="oj-status-detail">耗时: ${result.time.toFixed(2)}ms | 内存: ${result.memory}KB</div>
                </div>
            </div>
            <div class="oj-sample-block" style="margin-top: 1rem;">
                <div class="oj-sample-label">运行输出</div>
${result.output}
            </div>
        `;
    } else if (result.status === 'ce') {
        body.innerHTML = `
            <div class="oj-result-status oj-status-error">
                <span class="oj-status-icon">⚠</span>
                <div class="oj-status-info">
                    <div class="oj-status-label">编译错误</div>
                </div>
            </div>
            <div class="oj-error-output oj-compile-error" style="margin-top: 1rem;">
${result.message}
            </div>
        `;
    } else if (result.status === 're') {
        body.innerHTML = `
            <div class="oj-result-status oj-status-error">
                <span class="oj-status-icon">⚠</span>
                <div class="oj-status-info">
                    <div class="oj-status-label">运行错误</div>
                </div>
            </div>
            <div class="oj-error-output" style="margin-top: 1rem;">
${result.message || 'Runtime Error: ArrayIndexOutOfBoundsException'}
            </div>
        `;
    } else {
        body.innerHTML = `
            <div class="oj-result-status oj-status-error">
                <span class="oj-status-icon">✗</span>
                <div class="oj-status-info">
                    <div class="oj-status-label">发生错误</div>
                    <div class="oj-status-detail">${result.message}</div>
                </div>
            </div>
        `;
    }
}

// 显示判题结果
function displayJudgeResult(result) {
    const body = document.getElementById('ojResultBody');
    
    const statusConfig = {
        'accepted': { icon: '✓', label: '通过', class: 'oj-status-accepted' },
        'wa': { icon: '✗', label: '答案错误', class: 'oj-status-wrong' },
        'ce': { icon: '⚠', label: '编译失败', class: 'oj-status-error' },
        're': { icon: '⚠', label: '运行崩溃', class: 'oj-status-error' },
        'tle': { icon: '⏱', label: '超时', class: 'oj-status-timeout' }
    };

    const config = statusConfig[result.status] || statusConfig['wa'];

    let html = `
        <div class="oj-result-status ${config.class}">
            <span class="oj-status-icon">${config.icon}</span>
            <div class="oj-status-info">
                <div class="oj-status-label">${config.label}</div>
                <div class="oj-status-detail">
                    ${result.passedCount !== undefined ? 
                        `通过 ${result.passedCount}/${result.totalCount} 个测试用例 | ` : ''}
                    耗时: ${result.time}ms | 内存: ${result.memory}KB
                </div>
            </div>
        </div>
    `;

    // 显示测试用例详情
    if (result.results && result.results.length > 0) {
        html += '<div class="oj-test-results">';
        
        // 进度条
        const progress = (result.passedCount / result.totalCount) * 100;
        html += `
            <div class="oj-progress">
                <div class="oj-progress-bar">
                    <div class="oj-progress-fill" style="width: ${progress}%"></div>
                </div>
                <span class="oj-progress-text">${result.passedCount}/${result.totalCount}</span>
            </div>
        `;

        // 测试用例列表
        result.results.forEach(tc => {
            const isPassed = tc.status === 'passed';
            html += `
                <div class="oj-test-item">
                    <span class="oj-status-icon ${isPassed ? 'oj-test-passed' : 'oj-test-failed'}">
                        ${isPassed ? '✓' : '✗'}
                    </span>
                    <span>测试用例 #${tc.index}</span>
                    <span style="color: var(--text-muted); margin-left: auto;">
                        ${tc.time}ms | ${tc.memory}KB
                    </span>
                </div>
            `;
        });

        html += '</div>';
    }

    // 显示错误信息
    if (result.message) {
        html += `
            <div class="oj-error-output ${result.status === 'ce' ? 'oj-compile-error' : ''}" style="margin-top: 1rem;">
${result.message}
            </div>
        `;
    }

    body.innerHTML = html;
}

// 显示提示
function showToast(message) {
    // 简单的提示实现
    const toast = document.createElement('div');
    toast.className = 'oj-toast';
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-card);
        border: 1px solid var(--primary);
        color: var(--text-primary);
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initOJ);

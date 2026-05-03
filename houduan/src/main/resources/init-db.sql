-- 创建用户表
CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    avatar TEXT DEFAULT '👤',
    gender TEXT DEFAULT '未知',
    nickname TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入测试数据
INSERT INTO user (username, email, password, avatar, gender, nickname) VALUES
('admin', 'admin@example.com', 'admin123', '👨', '男', '管理员'),
('user1', 'user1@example.com', 'user123', '👤', '未知', '用户1');

-- 创建商品表
CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id TEXT UNIQUE NOT NULL,
    product_name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    category TEXT,
    icon TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建订单表
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT UNIQUE NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    amount INTEGER NOT NULL,
    user_id INTEGER,
    status TEXT DEFAULT 'PENDING',
    wechat_trade_no TEXT,
    wechat_transaction_id TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pay_time TIMESTAMP,
    update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

-- 插入商品测试数据（使用REPLACE避免重复插入）
REPLACE INTO product (product_id, product_name, description, price, category, icon) VALUES
('notes-basic', '算法基础笔记', '包含常见数据结构和算法的详细笔记，适合初学者', 2990, 'notes', '📝'),
('notes-advanced', '高级算法笔记', '包含高级算法和复杂数据结构的深入解析', 4990, 'notes', '📚'),
('tutorial-basic', '算法入门教程', '零基础入门算法，包含视频讲解和实战练习', 9990, 'tutorial', '🎓'),
('tutorial-advanced', '算法进阶教程', '针对面试和竞赛的高级算法教程', 14990, 'tutorial', '🚀'),
('project-basic', '算法可视化项目', '基于AlgoVize的算法可视化项目源码', 19990, 'project', '💻'),
('project-advanced', 'AI辅助算法项目', '结合AI技术的智能算法分析系统', 29990, 'project', '🌟');

-- ==================== 管理后台表结构 ====================

-- 创建管理员表
CREATE TABLE IF NOT EXISTS admin (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    nickname TEXT NOT NULL,
    password TEXT NOT NULL,
    avatar TEXT,
    email TEXT,
    phone TEXT,
    role TEXT DEFAULT 'content_admin',
    status TEXT DEFAULT 'active',
    last_login_time TIMESTAMP,
    last_login_ip TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入默认管理员（密码: admin123）
REPLACE INTO admin (id, username, nickname, password, role, status) VALUES
('1', 'admin', '超级管理员', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EH', 'super_admin', 'active');

-- 创建登录日志表
CREATE TABLE IF NOT EXISTS login_log (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    ip TEXT NOT NULL,
    device TEXT,
    location TEXT,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'success',
    fail_reason TEXT
);

-- 创建操作日志表
CREATE TABLE IF NOT EXISTS operation_log (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    module TEXT NOT NULL,
    action TEXT NOT NULL,
    detail TEXT,
    ip TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建系统配置表
CREATE TABLE IF NOT EXISTS system_config (
    key TEXT PRIMARY KEY,
    value TEXT,
    type TEXT DEFAULT 'string',
    label TEXT,
    description TEXT,
    config_group TEXT DEFAULT 'basic'
);

-- 插入系统配置默认值
REPLACE INTO system_config (key, value, type, label, description, config_group) VALUES
('site_title', '算法可视化平台', 'string', '网站标题', '网站标题配置', 'basic'),
('theme_mode', 'light', 'string', '主题模式', '默认主题模式', 'theme'),
('api_cors_enabled', 'true', 'boolean', 'CORS开关', '是否启用CORS代理', 'api'),
('rate_limit_enabled', 'true', 'boolean', '频率限制', '是否启用频率限制', 'security');

-- 创建数据结构配置表
CREATE TABLE IF NOT EXISTS data_structure (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'enabled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建算法配置表
CREATE TABLE IF NOT EXISTS algorithm (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    time_complexity TEXT,
    space_complexity TEXT,
    pseudocode TEXT,
    status TEXT DEFAULT 'enabled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建OJ题目表
CREATE TABLE IF NOT EXISTS oj_problem (
    id TEXT PRIMARY KEY,
    problem_no TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    difficulty TEXT DEFAULT 'easy',
    tags TEXT,
    description TEXT,
    template TEXT,
    status TEXT DEFAULT 'online',
    submission_count INTEGER DEFAULT 0,
    ac_rate REAL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建测试用例表
CREATE TABLE IF NOT EXISTS test_case (
    id TEXT PRIMARY KEY,
    problem_id TEXT NOT NULL,
    input TEXT NOT NULL,
    output TEXT NOT NULL,
    score INTEGER DEFAULT 100,
    is_sample BOOLEAN DEFAULT 0,
    FOREIGN KEY (problem_id) REFERENCES oj_problem(id)
);

-- 创建AI提示词表
CREATE TABLE IF NOT EXISTS ai_prompt (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    usage_count INTEGER DEFAULT 0,
    status TEXT DEFAULT 'enabled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建小程序用户表
CREATE TABLE IF NOT EXISTS app_user (
    id TEXT PRIMARY KEY,
    openid TEXT UNIQUE NOT NULL,
    nickname TEXT,
    avatar TEXT,
    bind_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'active',
    ds_visits INTEGER DEFAULT 0,
    algo_visits INTEGER DEFAULT 0,
    oj_visits INTEGER DEFAULT 0,
    ai_dialogues INTEGER DEFAULT 0,
    last_visit_time TIMESTAMP
);

-- 创建统计表
CREATE TABLE IF NOT EXISTS statistics (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    dau INTEGER DEFAULT 0,
    wau INTEGER DEFAULT 0,
    mau INTEGER DEFAULT 0,
    ds_visits INTEGER DEFAULT 0,
    algo_visits INTEGER DEFAULT 0,
    oj_submissions INTEGER DEFAULT 0,
    oj_ac_rate REAL DEFAULT 0,
    ai_dialogues INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建公告表
CREATE TABLE IF NOT EXISTS announcement (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    type TEXT DEFAULT 'notice',
    is_top BOOLEAN DEFAULT 0,
    publish_time TIMESTAMP,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建反馈表
CREATE TABLE IF NOT EXISTS feedback (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    user_nickname TEXT,
    type TEXT DEFAULT 'other',
    content TEXT NOT NULL,
    images TEXT,
    status TEXT DEFAULT 'pending',
    reply TEXT,
    reply_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==================== 新增功能表结构 ====================

-- 创建支付记录表
CREATE TABLE IF NOT EXISTS payment_record (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    amount INTEGER NOT NULL,
    payment_method TEXT DEFAULT 'wechat',
    transaction_id TEXT,
    status TEXT DEFAULT 'pending',
    refund_status TEXT DEFAULT 'none',
    refund_reason TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    pay_time TIMESTAMP,
    refund_time TIMESTAMP
);

-- 创建文件存储表
CREATE TABLE IF NOT EXISTS file_storage (
    id TEXT PRIMARY KEY,
    file_name TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_type TEXT,
    file_size INTEGER DEFAULT 0,
    file_path TEXT NOT NULL,
    storage_type TEXT DEFAULT 'local',
    bucket_name TEXT,
    download_url TEXT,
    uploader_id TEXT,
    uploader_name TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建API日志表
CREATE TABLE IF NOT EXISTS api_log (
    id TEXT PRIMARY KEY,
    api_path TEXT NOT NULL,
    http_method TEXT NOT NULL,
    status_code INTEGER DEFAULT 200,
    response_time INTEGER DEFAULT 0,
    client_ip TEXT,
    request_body TEXT,
    response_body TEXT,
    error_message TEXT,
    user_id TEXT,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


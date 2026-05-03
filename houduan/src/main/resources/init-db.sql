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

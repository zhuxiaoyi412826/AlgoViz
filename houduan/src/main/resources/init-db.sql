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

-- 反馈表
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    username VARCHAR(100),
    email VARCHAR(255),
    type VARCHAR(50),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    reply TEXT,
    reply_time DATETIME,
    create_time DATETIME NOT NULL,
    update_time DATETIME NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);

-- 公告表
CREATE TABLE IF NOT EXISTS announcement (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'DRAFT',
    sort_order INTEGER DEFAULT 0,
    publish_time DATETIME,
    create_time DATETIME NOT NULL,
    update_time DATETIME NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_announcement_status ON announcement(status);
CREATE INDEX IF NOT EXISTS idx_announcement_sort_order ON announcement(sort_order);

-- 提交记录表
CREATE TABLE IF NOT EXISTS submission (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    submission_id VARCHAR(50) UNIQUE NOT NULL,
    problem_id INTEGER NOT NULL,
    problem_title VARCHAR(200),
    user_id INTEGER,
    username VARCHAR(100),
    code TEXT NOT NULL,
    language VARCHAR(50),
    status VARCHAR(20) DEFAULT 'PENDING',
    runtime INTEGER,
    memory INTEGER,
    error_message TEXT,
    judge_log TEXT,
    submit_time DATETIME NOT NULL,
    judge_time DATETIME
);
CREATE INDEX IF NOT EXISTS idx_submission_problem_id ON submission(problem_id);
CREATE INDEX IF NOT EXISTS idx_submission_user_id ON submission(user_id);
CREATE INDEX IF NOT EXISTS idx_submission_status ON submission(status);
CREATE INDEX IF NOT EXISTS idx_submission_submit_time ON submission(submit_time);

-- 订单表增加退款相关字段
ALTER TABLE orders ADD COLUMN IF NOT EXISTS refund_status VARCHAR(20) DEFAULT 'NONE';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS refund_time DATETIME;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS refund_reason VARCHAR(500);

-- 用户表增加字段
ALTER TABLE user ADD COLUMN IF NOT EXISTS nickname VARCHAR(100);
ALTER TABLE user ADD COLUMN IF NOT EXISTS avatar VARCHAR(500);
ALTER TABLE user ADD COLUMN IF NOT EXISTS gender VARCHAR(10);
ALTER TABLE user ADD COLUMN IF NOT EXISTS last_login_at DATETIME;

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_orders_refund_status ON orders(refund_status);
CREATE INDEX IF NOT EXISTS idx_user_nickname ON user(nickname);
CREATE INDEX IF NOT EXISTS idx_submission_submission_id ON submission(submission_id);
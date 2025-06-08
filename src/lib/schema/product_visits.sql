CREATE TABLE IF NOT EXISTS product_visits (
    id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(36) NOT NULL,
    platform VARCHAR(20) NOT NULL, -- 'web', 'android', 'ios', etc.
    user_agent TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_platform (product_id, platform),
    INDEX idx_created_at (created_at)
); 
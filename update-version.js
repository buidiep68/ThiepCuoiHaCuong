#!/usr/bin/env node

/**
 * Script tự động cập nhật version cho CSS và JS files
 * Chạy script này mỗi khi deploy để đảm bảo cache busting
 */

const fs = require('fs');
const path = require('path');

// Tạo version dựa trên timestamp hiện tại
const version = new Date().toISOString().slice(0, 10).replace(/-/g, '');

console.log(`🔄 Cập nhật version: ${version}`);

// Đọc file index.html
const indexPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf8');

// Cập nhật CSS version
htmlContent = htmlContent.replace(
    /href="styles\.css\?v=\d+"/g,
    `href="styles.css?v=${version}"`
);

// Cập nhật JS version
htmlContent = htmlContent.replace(
    /src="script\.js\?v=\d+"/g,
    `src="script.js?v=${version}"`
);

// Nếu chưa có version, thêm vào
if (!htmlContent.includes('styles.css?v=')) {
    htmlContent = htmlContent.replace(
        'href="styles.css"',
        `href="styles.css?v=${version}"`
    );
}

if (!htmlContent.includes('script.js?v=')) {
    htmlContent = htmlContent.replace(
        'src="script.js"',
        `src="script.js?v=${version}"`
    );
}

// Ghi lại file
fs.writeFileSync(indexPath, htmlContent);

console.log('✅ Đã cập nhật version cho CSS và JS files');
console.log(`📅 Version mới: ${version}`);

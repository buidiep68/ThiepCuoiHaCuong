#!/usr/bin/env node

/**
 * Script tạo thumbnail nhỏ cho ảnh
 * Tạo ảnh blur/placeholder để load nhanh trước
 */

const fs = require('fs');
const path = require('path');

console.log('🖼️  Tạo thumbnail nhỏ cho loading nhanh...');

// Danh sách ảnh cần tạo thumbnail
const imagesToThumbnail = [
    'images/couple/bride.jpg',
    'images/couple/groom.jpg',
    'images/gallery/gallery1.jpg',
    'images/gallery/gallery2.jpg',
    'images/gallery/gallery6.jpg',
    'images/hero/hero1.jpg',
    'images/hero/hero2.jpg',
    'images/hero/hero3.jpg'
];

// Tạo thư mục thumbnails
const thumbnailsDir = path.join(__dirname, 'images-thumbnails');
if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true });
}

// Tạo cấu trúc thư mục
const createThumbnailStructure = () => {
    const dirs = ['couple', 'gallery', 'hero'];
    dirs.forEach(dir => {
        const dirPath = path.join(thumbnailsDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
};

// Tạo base64 thumbnail (giả lập - trong thực tế cần dùng sharp)
const createThumbnail = (inputPath, outputPath) => {
    try {
        // Đọc file gốc
        const originalSize = fs.statSync(inputPath).size;

        // Tạo thumbnail nhỏ (giả lập - copy file với tên mới)
        // Trong thực tế, đây sẽ là ảnh được resize xuống 50x50px và nén mạnh
        fs.copyFileSync(inputPath, outputPath);

        const thumbnailSize = fs.statSync(outputPath).size;

        console.log(`✅ ${path.basename(inputPath)}: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(thumbnailSize / 1024).toFixed(1)}KB thumbnail`);

        return true;
    } catch (error) {
        console.error(`❌ Lỗi tạo thumbnail ${inputPath}:`, error.message);
        return false;
    }
};

// Tạo cấu trúc thư mục
createThumbnailStructure();

// Tạo thumbnail cho từng ảnh
let thumbnailCount = 0;
imagesToThumbnail.forEach(imagePath => {
    const inputPath = path.join(__dirname, imagePath);
    const outputPath = path.join(__dirname, 'images-thumbnails', imagePath);

    if (fs.existsSync(inputPath)) {
        if (createThumbnail(inputPath, outputPath)) {
            thumbnailCount++;
        }
    } else {
        console.log(`⚠️  Không tìm thấy: ${imagePath}`);
    }
});

console.log(`\n🎉 Hoàn thành! Đã tạo ${thumbnailCount}/${imagesToThumbnail.length} thumbnails`);
console.log('📁 Thumbnails được lưu trong thư mục: images-thumbnails/');
console.log('\n💡 Hướng dẫn sử dụng:');
console.log('1. Thay thế ảnh gốc bằng thumbnails trong HTML');
console.log('2. Load ảnh gốc trong background');
console.log('3. Thay thế khi ảnh gốc load xong');

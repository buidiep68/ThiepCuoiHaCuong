# Thiệp Cưới Online

Website thiệp cưới online với giao diện đẹp và nhiều tính năng hữu ích.

## Tính năng chính

- 🎨 Giao diện responsive, đẹp mắt
- 📅 Đếm ngược đến ngày cưới
- 🖼️ Album ảnh với lightbox
- 📝 Form RSVP và sổ lưu bút
- 🗺️ Tích hợp Google Maps
- 🎵 Nhạc nền
- 📱 Tương thích mobile

## ✨ Tính năng mới: Quản lý ảnh (Image Manager)

### Cách sử dụng

1. **Mở Image Manager**: Click vào nút hình ảnh màu xanh ở góc phải dưới màn hình

2. **Upload ảnh**:
   - Tab "Upload ảnh": Kéo thả ảnh hoặc click để chọn từ thư mục
   - Hỗ trợ nhiều định dạng: JPG, PNG, GIF, WebP
   - Ảnh sẽ được lưu vào localStorage của trình duyệt

3. **Quản lý ảnh**:
   - Tab "Quản lý": Xem tất cả ảnh đã upload
   - Tìm kiếm ảnh theo tên
   - Lọc theo danh mục
   - Thay đổi danh mục cho từng ảnh
   - Xóa ảnh không cần thiết

4. **Gán ảnh vào website**:
   - Tab "Gán ảnh": Chọn ảnh cho từng phần của website
   - **Banner chính (Hero)**: Ảnh hiển thị ở đầu trang
   - **Album ảnh (Gallery)**: Ảnh trong phần album
   - **Ảnh cặp đôi**: Ảnh avatar cho cô dâu và chú rể

### Danh mục ảnh

- **Hero**: Ảnh banner chính, sẽ thay thế carousel ở đầu trang
- **Gallery**: Ảnh album, sẽ hiển thị trong phần gallery
- **Couple**: Ảnh cặp đôi, sẽ thay thế avatar mặc định
- **Other**: Ảnh chưa phân loại

### Lưu ý quan trọng

- Ảnh được lưu trong localStorage của trình duyệt
- Dung lượng lưu trữ có giới hạn (thường 5-10MB)
- Ảnh sẽ mất khi xóa cache trình duyệt
- Khuyến nghị sử dụng ảnh có kích thước vừa phải để tiết kiệm dung lượng

## Cài đặt

1. Clone hoặc download project
2. Mở file `index.html` trong trình duyệt
3. Tùy chỉnh thông tin trong file `script.js` (phần config)

## Tùy chỉnh

### Thay đổi thông tin cơ bản

Sửa file `script.js`, phần config:

```javascript
const config = {
    brideName: 'Tên cô dâu',
    groomName: 'Tên chú rể',
    weddingDateISO: '2025-10-20T10:30:00+07:00',
    // ... các thông tin khác
};
```

### Thay đổi giao diện

Sửa file `styles.css` để tùy chỉnh màu sắc, font chữ, layout.

## Hỗ trợ trình duyệt

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Giấy phép

Dự án này được phát hành dưới giấy phép MIT.

## Hỗ trợ

Nếu có vấn đề hoặc cần hỗ trợ, vui lòng tạo issue hoặc liên hệ trực tiếp. # ThiepCuoiHaCuong
# ThiepCuoiHaCuong

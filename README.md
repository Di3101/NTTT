# 🎂 Website Chúc Mừng Sinh Nhật 💖

## Hướng Dẫn Sử Dụng

### 📋 Chuẩn Bị

#### 1. Thêm Ảnh Của Người Yêu
- Mở thư mục `images/`
- Thêm 4 ảnh với tên: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg`
- Có thể thêm nhiều ảnh hơn (chỉnh trong file `index.html`)

#### 2. Thêm Nhạc Nền (Tùy chọn)
- Mở thư mục `audio/`
- Thêm file nhạc với tên: `birthday-song.mp3`
- Nếu không có nhạc, website vẫn chạy bình thường

#### 3. Chỉnh Sửa Nội Dung Cá Nhân

**File: `index.html`**

##### Thay đổi tiêu đề và tên:
- Dòng 26-27: Thay "Em Yêu Của Anh" thành tên người yêu bạn

##### Chỉnh sửa Timeline (Mốc thời gian):
- Dòng 64-99: Thay đổi các ngày tháng và nội dung kỷ niệm:
  - Lần đầu gặp gỡ
  - Ngày bắt đầu yêu nhau
  - Các sự kiện đặc biệt khác

##### Chỉnh sửa Thư Tình:
- Dòng 104-144: Viết lại thư tình của riêng bạn
- Thay đổi danh sách lời chúc (dòng 118-124)
- Thay chữ ký (dòng 130)

##### Chỉnh sửa Món Quà:
- Dòng 158-165: Viết về món quà bạn sẽ tặng thật
  - Ví dụ: "Một chuyến du lịch Đà Lạt"
  - "Một bữa tối lãng mạn tại nhà hàng..."
  - "Một món quà đặc biệt em luôn mong muốn"

### 🚀 Cách Mở Website

#### Cách 1: Mở Trực Tiếp
1. Mở thư mục `birthday-website`
2. Double-click vào file `index.html`
3. Website sẽ mở trong trình duyệt

#### Cách 2: Dùng VS Code (Khuyến nghị)
1. Mở VS Code
2. Cài extension "Live Server"
3. Right-click vào `index.html` → chọn "Open with Live Server"
4. Website sẽ mở với đường dẫn localhost

#### Cách 3: Dùng Python
```bash
cd birthday-website
python -m http.server 8000
```
Sau đó mở trình duyệt: `http://localhost:8000`

### 🎨 Tính Năng Website

✨ **Trang Chào Mừng**
- Hiệu ứng gõ chữ
- Mô hình 3D trái tim xoay
- Particles bay lượn

📸 **Gallery Ảnh**
- 4 ảnh với hiệu ứng 3D
- Click vào ảnh để phóng to
- Hover để xem caption

💑 **Timeline Tình Yêu**
- Các mốc thời gian quan trọng
- Animations xuất hiện khi scroll
- Icon đẹp mắt

💌 **Thư Tình**
- Thiết kế giống thư thật
- Danh sách lời chúc
- Chữ ký tình cảm

🎁 **Hộp Quà Bất Ngờ**
- Click vào hộp quà để mở
- Hiệu ứng pháo hoa confetti
- Tiết lộ món quà thật

### 🎵 Điều Khiển

- **Nút nhạc** (góc trên phải): Bật/tắt nhạc nền
- **Nút "Tiếp Theo"**: Chuyển sang section tiếp theo
- **Phím mũi tên phải/Enter**: Sang section tiếp
- **Phím mũi tên trái**: Quay lại section trước
- **Click chuột**: Tạo hiệu ứng trái tim bay

### 🎨 Tùy Chỉnh Màu Sắc

**File: `css/style.css`** (dòng 9-16)

```css
--primary-color: #ff6b9d;      /* Màu hồng chính */
--secondary-color: #c06c84;    /* Màu hồng phụ */
--accent-color: #f67280;       /* Màu nhấn */
```

Thay đổi mã màu theo sở thích!

### 📱 Responsive

Website tự động điều chỉnh cho:
- Desktop (máy tính)
- Tablet (máy tính bảng)
- Mobile (điện thoại)

### 🐛 Xử Lý Lỗi Thường Gặp

#### Ảnh không hiển thị:
- Kiểm tra tên file ảnh đúng: `photo1.jpg`, `photo2.jpg`, etc.
- Kiểm tra ảnh có trong thư mục `images/`
- Kiểm tra phần mở rộng (.jpg, .jpeg, .png)

#### Nhạc không phát:
- Kiểm tra file `birthday-song.mp3` trong thư mục `audio/`
- Click nút nhạc để bật
- Một số trình duyệt chặn autoplay, phải click nút nhạc

#### Mô hình 3D không hiển thị:
- Cần kết nối internet (sử dụng CDN Three.js)
- Hoặc tải Three.js về local

### 💡 Mẹo Hay

1. **Test trước khi tặng**: Mở và kiểm tra mọi thứ hoạt động
2. **Chụp màn hình**: Backup ảnh quan trọng
3. **Viết thật lòng**: Nội dung thư tình là quan trọng nhất
4. **Thêm bất ngờ**: Thêm ảnh hoặc video bí mật vào
5. **Chia sẻ link**: Có thể host lên Netlify/Vercel để chia sẻ online

### 🌐 Deploy Online (Nâng cao)

#### Netlify (Miễn phí):
1. Tạo tài khoản tại netlify.com
2. Drag & drop thư mục `birthday-website`
3. Nhận link website online
4. Gửi link cho người yêu

#### GitHub Pages:
1. Tạo repository trên GitHub
2. Upload toàn bộ files
3. Enable GitHub Pages trong Settings
4. Website sẽ có địa chỉ: `username.github.io/repo-name`

### 🎁 Checklist Trước Khi Tặng

- [ ] Đã thêm đủ 4 ảnh vào thư mục `images/`
- [ ] Đã thay đổi tên người yêu trong HTML
- [ ] Đã chỉnh sửa các ngày kỷ niệm trong Timeline
- [ ] Đã viết lại thư tình của riêng mình
- [ ] Đã mô tả món quà thật trong section cuối
- [ ] Đã test website trên trình duyệt
- [ ] Đã thêm nhạc nền (nếu có)
- [ ] Tất cả hiệu ứng hoạt động mượt mà

### 🆘 Cần Trợ Giúp?

Nếu gặp vấn đề:
1. Kiểm tra console (F12 trong trình duyệt)
2. Đọc lại hướng dẫn từng bước
3. Kiểm tra đường dẫn file
4. Thử trình duyệt khác (Chrome khuyến nghị)

---

## 💝 Lời Kết

Chúc bạn tạo được món quà ý nghĩa nhất cho người yêu!
Website này được làm với tất cả tình yêu và công sức.

**Chúc mừng sinh nhật người yêu của bạn! 🎂❤️**

---

### 📁 Cấu Trúc Project

```
birthday-website/
│
├── index.html              # File HTML chính
├── README.md              # File hướng dẫn này
│
├── css/
│   └── style.css          # Styling và animations
│
├── js/
│   ├── script.js          # Logic chính
│   ├── three-scene.js     # Mô hình 3D
│   └── confetti.js        # Hiệu ứng confetti
│
├── images/
│   ├── photo1.jpg         # Ảnh 1 (BẠN CẦN THÊM)
│   ├── photo2.jpg         # Ảnh 2 (BẠN CẦN THÊM)
│   ├── photo3.jpg         # Ảnh 3 (BẠN CẦN THÊM)
│   └── photo4.jpg         # Ảnh 4 (BẠN CẦN THÊM)
│
└── audio/
    └── birthday-song.mp3  # Nhạc nền (TÙY CHỌN)
```

### 🔧 Công Nghệ Sử Dụng

- **HTML5**: Cấu trúc website
- **CSS3**: Styling và animations
- **JavaScript ES6**: Logic và tương tác
- **Three.js**: Đồ họa 3D (trái tim xoay)
- **Particles.js**: Hiệu ứng particles
- **AOS**: Animate On Scroll
- **Canvas API**: Confetti animation

Tất cả đều được tích hợp sẵn, không cần cài đặt thêm!

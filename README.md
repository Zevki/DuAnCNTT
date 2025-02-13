1. CÔNG CỤ CẦN THIẾT
Để khởi động dự án, quý giảng viên vui lòng cài đặt một số công cụ cần thiết để thuận tiện cho việc chạy dự án.
Các ứng dụng, công cụ cần thiết:
- Visual Studio Code
- Node.js
- Yarn
- Hardhat
- MetaMask

2. CHẠY SOURCE CODE
Khi đã có source trên máy tính và cài đặt đầy đủ các công cụ cần thiết, hãy làm theo các bước sau đây để có thể chạy được dự án.
 Bước 1: Mở foler source code trên Visual Studio Code.
 Bước 2: Mở terminal và chạy lệnh "yarn install" để tiến hành cài đặt các thư viện cần thiết.
 Bước 3: Ở màn hình terminal chạy lệnh "yarn hardhat node" để khởi chạy một mạng Ethereum cục bộ.
 Bước 4: Split terminal để mở 1 terminal song song và chạy lệnh "yarn hardhat run scripts/deploy.js" để triển khai hợp đồng thông minh của dự án.
 Bước 5: Sau khi triển khai hợp đồng thông minh thành công hãy chạy lệnh "yarn dev" để khởi chạy dự án.

3. SỬ DỤNG ỨNG DỤNG
- Để sử dụng được các chức năng của website dự án, cần sử dụng các tài khoản giả lập được cung cấp khi chạy lệnh "yarn hardhat node".
- Để sử dụng được các tài khoản giả lập cần import chúng vào MetaMask.
Thực hiện các bước sau để import tài khoản giả lập vào MetaMask.

Tạo mạng lưới thử nghiệm (testnet) thủ công trong ví MetaMask:
 Bước 1: Mở tiện ích MetaMask trên trình duyệt.
 Bước 2: Đăng nhập vào tài khoản MetaMask chưa đăng nhập. 
 Bước 3: Nhấp vào biểu tượng vòng tròn tài khoản ở góc trên cùng bên phải của MetaMask.
 Bước 4: Trong menu xuất hiện, chọn "Settings".
 Bước 5: Trong phần cài đặt, chọn "Networks".
 Bước 6: Trong phần "Networks", nhấp vào nút "Add Network" hoặc "Add a network manually" nếu MetaMask phiên bản mới.
 Bước 7: Điền các thông số sau vào các ô tương ứng.
	- Network Name: Có thể đặt tên bất kì.
	- New RPC URL: URL được cung cấp khi chạy lệnh "yarn hardhat node". Thông thường sẽ là 'http://127.0.0.1:8545'
	- Chain ID: ID của chuỗi mạng. Thông thường sẽ là '31337'
	- Currency Symbol: Ký hiệu tiền tệ, thường là ETH cho mạng Ethereum.
 Bước 8: Sau khi nhập các thông số, nhấp vào nút "Save".
 Bước 9: Chuyển đổi sang mạng này bằng cách nhấp vào tên mạng ở góc trên cùng giữa của giao diện MetaMask và chọn mạng vừa thêm.

Import tài khoản thử nghiệm vào ví MetaMask:
 Bước 1: Sau khi đã vào ví MetaMask, nhấp vào biểu tượng vòng tròn tài khoản ở góc trên cùng bên phải, sau đó chọn "Import Account".
 Bước 2: Một cửa sổ sẽ xuất hiện yêu cầu nhập private key của tài khoản thử nghiệm chuẩn bị import.
 Bước 3: Sao chép và dán private key của tài khoản thử nghiệm vào ô "Private Key".
 Bước 4: Nhấp vào "Import" để hoàn tất.

Lưu ý!!!: 
Để tài khoản thử nghiệm có số dư vô hạn thì cần chuyển sang mạng thử nghiệm phù hợp đã hướng dẫn bên trên.
Trong quá trình sử dụng ứng dụng nếu gặp lỗi quý giảng viên vui lòng làm theo các bước sau để sửa lỗi:
 Bước 1: Nhấp vào biểu tượng vòng tròn tài khoản ở góc trên cùng bên phải của MetaMask.
 Bước 2: Trong menu xuất hiện, chọn "Settings".
 Bước 3: Trong phần cài đặt, chọn "Advanced".
 Bước 4: Trong vần "Advanced", chọn "Clear activity tab data".

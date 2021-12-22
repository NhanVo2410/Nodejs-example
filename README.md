# repo_demo_helpdesk
Using Mean Fullstack javascript and we have 3 conllections : 

tblHelpDesk_User: ID, FullName, UserName, Password, Status, Created

tblHelpDesk_Ticket: ID, Title, Description, AssignUserID, Status, Creted

tblHelpDesk_TicketDetail: ID, TicketID, Description, Note, Created

Structure folder 
- src
--- app
----- controller  <!-- nới gọi service và nhận kết quả , trả lỗi (res) -->
----- models    <!-- model dùng để khai báo các collection  -->
----- routes <!-- khai báo các url,routes cho ứng dụng, thông thường được gọi từ file index.js bên ngoài -->
----- service <!-- Nơi query các hàm function như CRUD được package mongoose hổ trợ -->
--- config
----- db  
------- connection.js <!-- chưa đường dẫn db nơi chọn db to connect -->
----- passport.js <!-- Cấu hình các cài đặt và xử lý cho Passport -->
--- public
--- resource
----- css
----- views <!--- Chứa các file ejs template-->
--- test <!--- nơi viết các testcase--->
--- util
- .env <!-- File sẽ lưu trữ các thông tin để yêu cầu xác thực từ fb, tw, hay google. Bao gồm clientId, secretKey -->
- package.json <!-- Cấu hình ứng dụng và các packages chúng ta sẽ dùng -->
- index.js <!-- Cài đặt ứng dụng và sẽ là file thực thi -->

Package i to create passport :

cookie-parser
connect-flash
ejs
express-session
passport
passport-local

Get key 
node src/config/generateKeypair.js
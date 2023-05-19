1. Render là gì?
Render theo google dịch có nghĩa là "kết xuất". Dịch ra tức là gom lại rồi xuất ra. Theo ý hiểu này, thì trong reactjs ta sẽ lấy phần tử phần tử( element) khác rồi nhét vào 1 phần tử khác ( cụ thể là nhét vào "root")
2. Vậy element là gì?
Chính là cái mà chúng ta thấy trên màn hình, ví dụ trong trang shoppe thì đây có thể coi là 1 phần tử:
!["anh element"](./images/anh_element_shopee.png)
Các element khác tương tự, nhưng khac ảnh và nội dung, khi code thì bọn mình sẽ viết mã của những phần tử này.
3. React chỉ cập nhật những gì cần thiết
React DOM so sánh các element và thành phần children của nó với phiên bản trước. Nó chỉ cập nhật DOM khi cảm thấy cần thiết. Tức là nó thấy cái mình mới viết thêm vào khác thì nó mới cập nhật. 


Để render một React element thì chúng ta cần

1. Truyền DOM element (DOM thật) vào `ReactDOM.createRoot()` 
2. Truyền React element vào `root.render()`

ví dụ:
```jsx
const root = ReactDOM.createRoot(document.getElementById('root')) // lấy ra thằng root, code như trong file index.js
const element = <h1>Hello, world</h1> // tạo element này
root.render(element) // câu lệnh render, tức nhét thằng element vào root ấy. như trong file index.js
```


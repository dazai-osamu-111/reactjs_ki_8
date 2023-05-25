List: danh sách, vẫn như cách bọn mk hiểu. Ý muốn nói là render() ra một danh sách thôi.
Key: Khóa, key-value ấy.
# Rendering Multiple Components
Bạn có thể xây dựng các collection of element ( bộ các phần tử) và đưa chúng vào JSX bằng cách sử dụng dấu ngoặc nhọn {}.

Bên dưới, chúng tôi lặp qua mảng số bằng cách sử dụng hàm JavaScript map(). Chúng tôi trả về một phần tử <li> cho mỗi mục. Cuối cùng, chúng ta gán mảng kết quả gồm các phần tử cho listItems:
Ví dụ:
```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```
Sau đó, chúng ta có thể bao gồm toàn bộ mảng listItems bên trong phần tử <ul>:
```html
<ul>{listItems}</ul>
```
# Basic List Component

Thông thường, bạn sẽ hiển thị danh sách bên trong một thành phần.

Chúng ta có thể cấu trúc lại ví dụ trước thành một component chấp nhận một mảng số và xuất ra một danh sách các phần tử.
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NumberList numbers={numbers} />);
```
Code này cũng ko có gì cả, mọi người đọc sẽ hiểu

Khi bạn chạy mã này, bạn sẽ nhận được cảnh báo rằng khóa phải được cung cấp cho các mục trong danh sách. “Khóa” là một thuộc tính chuỗi đặc biệt mà bạn cần đưa vào khi tạo danh sách các phần tử. Chúng ta sẽ thảo luận tại sao nó lại quan trọng trong phần tiếp theo.

Hãy gán một khóa cho các mục trong danh sách của chúng ta bên trong numbers.map() và khắc phục sự cố thiếu khóa.
```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
```
# Key
Các phím giúp React xác định mục nào đã thay đổi, được thêm vào hoặc bị xóa. Các khóa nên được trao cho các phần tử bên trong mảng để cung cấp cho các phần tử một danh tính ổn định:
```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```
Cách tốt nhất để chọn một khóa là sử dụng một chuỗi xác định duy nhất một mục danh sách trong số các anh chị em của nó. Thông thường, bạn sẽ sử dụng ID từ dữ liệu của mình làm khóa:
```jsx
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```
Khi bạn không có ID ổn định cho các mục được kết xuất, bạn có thể sử dụng chỉ mục mục làm khóa như là phương án cuối cùng:
```jsx
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```
Không đề xuất dùng cách này lắm nhé, vì sẽ sinh ra một số lỗi không mong muốn. Cái này khi code mọi người sẽ gặp nên t sẽ không giải thích ở đây nữa.
Nói chung phần này trên docs nó có thêm mấy thứ mà t nghĩ ko cần lắm, nên đến đây thôi nhé. Ngắn gọn dễ hiểu.

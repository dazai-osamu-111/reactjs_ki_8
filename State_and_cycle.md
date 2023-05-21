Xét ví dụ
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);
```
Bọn mk có thể thấy, đồng hồ có thể cập nhật thời gian là do hàm setInterval(tick, 1000). Nhưng lí tưởng là đồng hồ có thể tự cập nhật thơi gian mà không cần hàm đó. Chính vì thế, chúng ta mới cần đến state.

You can convert a function component like Clock to a class in five steps:

  1. Create an ES6 class, with the same name, that extends React.Component.

  2. Add a single empty method to it called render().
  3. Move the body of the function into the render() 4ethod.
  4. Replace props with this.props in the render() body.
  5. Delete the remaining empty function declaration.
  ( ae tự đọc nhé, rèn luyện tiếng anh.)


Đây là kết quả:
```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
Clock giờ sẽ được định nghĩa như 1 class
Render() sẽ được gọi mỗi khi có update 
đoạn code này chạy sẽ có lỗi đấy, đoạn dưới này mới đầy đủ.

# Thêm local state vào 1 class
```jsx
class Clock extends React.Component {
  // Thêm constructor
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```
Khi chạy lên thì sẽ được cái đồng hồ, mỗi lần tải lại thì sẽ được thời gian cập nhật. Tiếp theo thì sẽ làm đồng hồ cập nhật mỗi giây, nhưng là ngày mai nhé.
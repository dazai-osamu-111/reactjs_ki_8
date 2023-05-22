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

# Đây chính là phần của ngày mai
Có vẻ đây là 1 series khá dài, mỗi ngày t chỉ có thể đưa thêm 1 ít để đảm bảo không quá tải.
Hôm nay sẽ giới thiệu về life cycles của 1 component và các ví dụ cụ thể.
Trước hết là life cycles.

!["lifecycles"](./images/life_cycles.webp)

Giải thích chút nhỉ:
Sơ đồ được chia làm 3 phần: Mounting, Updating, Unmounting tương ứng mang ý nghĩa là: Khởi tạo, cập nhật thông tin và không sử dụng nữa ( nói theo ngôn ngữ của t là thế cho dễ hiểu).

1. Mounting
Khi khởi tạo thì constructor được chạy đầu tiên, Sau đó đến getDrivedStateFromProps ( load thuộc tính thôi, ko có gì) -> render( chính là load các component đấy) -> Update DOM thật ( tức là cái hiển thị trên web localhost đấy) -> thực thi hàm componentDidMount.
Đúng theo thứ tự nhé. tức sau khi component được render ra trên DOM thật ( phân biệt với DOM của reactjs) thì nó mới chạy.
2. Updating:Thay đổi thì cũng thực hiện các hàm theo trình tự. Thay đổi ở đây tức là khi component thay đổi. Ví dụ đổi thành tên khác, ảnh khác. Mỗi khi có sự thay đổi thì hàm componentDidUpdate lại chạy.
3. Unmounting: Khi ko dùng component nữa thì thằng componentWillUnmount sẽ chạy. 
Chú ý: componentDidMount, componentDidUpdate, componentWillUnmount là tên cố định như kiểu keyword ấy, nên cứ đặt tên theo vậy mà dùng. 
# Ví dụ cụ thể
Vẫn là đồng hồ.
```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() { // được chạy sau khi component được render ra DOM, rất thích hợp để đặt giờ.
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
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
Bây giờ đồng hồ đã chạy từng giây rồi.
1. Giải thích luồng code: Khi Clock được truyền tới root.render(), React sẽ gọi constructor của component Clock. Vì Clock cần display thời gian hiện tại, nó khởi tạo this.state với 1 đối tượng bao gồm thời gian hiện tại. Chúng ra sẽ cập nhật state này sau.
2. Sau đó, React sẽ gọi phương thức render() của Clock component. Đây chính là phương thức mà cho biết cái gì sẽ được show ra trên màn hình. Sau đó React sẽ update DOM để phù hợp cho phù hợp với output của Clock render().
3. Khi Clock output được thêm vào DOM, React sẽ gọi componentDidMount(). Bên trong phương thức này đã gọi phương thức tick() mỗi giây.
4. Mỗi một giây trình duyệt sẽ gọi tick(). Tick() sử dụng hàm setState để cho React biết state đã thay đổi, và sẽ gọi lại render() 1 lần nữa để biết xem nên show cái gì ra màn hình. Lần gọi này thì this.state.date trong render() sẽ khác, vậy nên render output sẽ bao gồm thời gian đã được cập nhật. React cũng cập nhật DOM theo đó.
5. Nếu Clock component được loại khỏi DOM, React sẽ gọi componentWillUnmount() để bộ ddemss giờ được dừng.
##  (Bonus) Cách sử dụng State đúng.
Có 3 thứ mà bạn nên biết về setState()

1. Không sửa đổi state 1 cách trực tiếp
```jsx
// Wrong
this.state.comment = 'Hello';

// Correct
this.setState({comment: 'Hello'});
```
2. State Update sẽ là Asynchronous ( không đồng bộ)
React có thể gộp nhiều lệnh gọi setState() thành một bản cập nhật duy nhất để tăng hiệu suất.

Vì this.props và this.state có thể được cập nhật không đồng bộ, bạn không nên dựa vào các giá trị của chúng để tính toán trạng thái tiếp theo.

Ví dụ: mã này có thể không cập nhật bộ đếm:
```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
Để khắc phục, hãy sử dụng dạng setState() thứ hai chấp nhận một hàm chứ không phải một đối tượng. Hàm đó sẽ nhận trạng thái trước đó làm đối số đầu tiên và các đạo cụ tại thời điểm cập nhật được áp dụng làm đối số thứ hai:
```jsx
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
Chúng tôi đã sử dụng arrow function ở trên, nhưng nó cũng hoạt động với các hàm thông thường:
```jsx
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```
Dài quá, thôi để mai viết tiếp nhé.


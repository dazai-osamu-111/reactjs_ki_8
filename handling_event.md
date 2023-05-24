Xử lý các sự kiện với các phần tử React rất giống với việc xử lý các sự kiện trên các phần tử DOM. Có một số khác biệt về cú pháp:

Các sự kiện phản ứng được đặt tên bằng cách sử dụng camelCase, thay vì chữ thường.

Với JSX, bạn chuyển một hàm làm trình xử lý sự kiện, thay vì một chuỗi.
Ví dụ:
```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
Còn trong React thì:
```html
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
Một điểm khác biệt nữa là bạn không thể trả về false để ngăn hành vi mặc định trong React. Bạn phải gọi preventDefault một cách rõ ràng. Ví dụ: với HTML đơn giản, để ngăn hành vi gửi biểu mẫu mặc định, bạn có thể viết:
```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```
Trong react thì nó sẽ là:
```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```
Khi sử dụng React, thông thường bạn không cần gọi addEventListener để thêm các trình nghe vào một phần tử DOM sau khi nó được tạo. Thay vào đó, chỉ cần cung cấp một trình lắng nghe khi phần tử được hiển thị lần đầu.

Khi bạn định nghĩa một thành phần bằng cách sử dụng class ES6, một mẫu phổ biến là một trình xử lý sự kiện là một phương thức trên lớp. Ví dụ: Togger component hiển thị một nút cho phép người dùng chuyển đổi giữa trạng thái "ON" và "OFF":
```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```
#Passing Arguments to Event Handlers
Bên trong một vòng lặp, người ta thường muốn truyền một tham số bổ sung cho một trình xử lý sự kiện. Ví dụ: nếu id là row ID, thì hai cách sau sẽ hoạt động:
```html
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
Hai dòng trên là tương đương và sử dụng arrow functions và Function.prototype.bind tương ứng.

Trong cả hai trường hợp, đối số e đại diện cho sự kiện React sẽ được chuyển thành đối số thứ hai sau ID. Với một hàm mũi tên, chúng ta phải chuyển nó một cách rõ ràng, nhưng với ràng buộc, bất kỳ đối số nào khác sẽ tự động được chuyển tiếp.
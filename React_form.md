form trong react khác với form trong html một chút bởi vì nó có lưu trữ trạng thái.
Ví dụ: form này nhận 1 name
```jsx
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```
form này có hành vi form HTML mặc định là duyệt đến một trang mới khi người dùng gửi biểu mẫu. Nếu bạn muốn hành vi này trong React, nó sẽ hoạt động. Nhưng trong hầu hết các trường hợp, thật thuận tiện khi có một hàm JavaScript xử lý việc gửi biểu mẫu và có quyền truy cập vào dữ liệu mà người dùng đã nhập vào biểu mẫu. Cách tiêu chuẩn để đạt được điều này là sử dụng một kỹ thuật gọi là "controled components".

## Controlled Components
Trong HTML, các phần tử biểu mẫu như input, textarea và select thường duy trì trạng thái của riêng chúng và cập nhật nó dựa trên đầu vào của người dùng. Trong React, trạng thái có thể thay đổi thường được giữ trong thuộc tính trạng thái của các thành phần và chỉ được cập nhật với setState().

Chúng ta có thể kết hợp cả hai bằng cách làm cho trạng thái React trở thành “nguồn sự thật duy nhất”. Sau đó, thành phần React hiển thị một form cũng kiểm soát những gì xảy ra trong form đó khi người dùng nhập lần tiếp theo. Một phần tử biểu mẫu đầu vào có giá trị được React kiểm soát theo cách này được gọi là “controlled component”.

Ví dụ: nếu chúng ta muốn log tên cho ví dụ trước đó khi nó được gửi, chúng ta có thể viết biểu mẫu dưới dạng một controled component:
```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this); // bind để chạy đúng, cái này có giải thích ở bài trước rồi
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value); // tạo alert
    event.preventDefault(); // ngăn tải lại trang
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}> // gọi đến handleSubmid khi nhấn submit
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
Vì thuộc tính value được đặt trên phần tử biểu mẫu của chúng tôi, nên giá trị được hiển thị sẽ luôn là this.state.value, làm cho trạng thái React trở thành nguồn gốc của sự thật ( nguồn lấy dữ liệu thôi, ko có gì cao siêu cả). Vì handleChange chạy trên mỗi lần nhấn phím để cập nhật trạng thái React, nên giá trị được hiển thị sẽ cập nhật khi người dùng nhập.

Với một controlled component, giá trị của đầu vào luôn được điều khiển bởi trạng thái React. Mặc dù điều này có nghĩa là bạn phải nhập thêm một chút mã, nhưng giờ đây bạn cũng có thể chuyển giá trị cho các phần tử giao diện người dùng khác hoặc đặt lại giá trị đó từ các trình xử lý sự kiện khác.

tiếp tục là các ví dụ cụ thể

## The textarea Tag
```jsx
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
In React, a textarea uses a value attribute
Bằng cách này, một biểu mẫu sử dụng textarea có thể được viết rất giống với single-line input:

Lưu ý rằng this.state.value được khởi tạo trong hàm tạo để vùng văn bản bắt đầu với một số chữ trong đó. là gì thì chạy là biết nhé

## The file input Tag
Trong HTML, <input type="file"> cho phép người dùng chọn một hoặc nhiều tệp từ bộ lưu trữ thiết bị của họ để tải lên máy chủ hoặc được JavaScript thao tác thông qua  File API.
```html
<input type="file" />
```
Bởi vì giá trị của nó là chỉ đọc nên nó là một thành phần không được kiểm soát trong React. Nó được thảo luận cùng với các  uncontrolled component khác sau này trong tài liệu.

## Handling Multiple Inputs
Khi cần xử lý nhiều phần tử đầu vào được kiểm soát, bạn có thể thêm thuộc tính name cho từng phần tử và để hàm xử lý chọn việc cần làm dựa trên giá trị của event.target.name.

Ví dụ:
```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value // thằng name này hơi bị thú vị, nó là tên của phần tử mà gọi hàm handleInputChange, để hiểu thì mọi người có thể console.log ra là sẽ hiểu.
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```
Lưu ý cách chúng tôi sử dụng cú pháp tên thuộc tính được tính toán ES6 để cập nhật state key tương ứng với tên đầu vào đã cho:
```jsx
this.setState({
  [name]: value
});
```
It is equivalent to this ES5 code:
```jsx
var partialState = {};
partialState[name] = value;
this.setState(partialState); 
```
chỗ này viết vào thôi chứ chẳng cần hiểu đâu.

## Controlled Input Null Value
Việc chỉ định thuộc tính  value trên một controlled component sẽ ngăn người dùng thay đổi đầu vào trừ khi bạn muốn như vậy. Nếu bạn đã chỉ định một giá trị nhưng đầu vào vẫn có thể chỉnh sửa được, thì có thể bạn đã vô tình đặt giá trị thành undefined hoặc null.

Đoạn mã sau minh họa điều này. (Đầu vào bị khóa lúc đầu nhưng có thể chỉnh sửa được sau một khoảng thời gian ngắn.)
```jsx
ReactDOM.createRoot(mountNode).render(<input value="hi" />);

setTimeout(function() {
  ReactDOM.createRoot(mountNode).render(<input value={null} />);
}, 1000);
```

## Các lựa chọn thay thế cho Controlled Components
Đôi khi có thể rất tẻ nhạt khi sử dụng các thành phần được kiểm soát, bởi vì bạn cần viết một trình xử lý sự kiện cho mọi cách mà dữ liệu của bạn có thể thay đổi và chuyển tất cả trạng thái đầu vào thông qua một thành phần React. Điều này có thể trở nên đặc biệt khó chịu khi bạn đang chuyển đổi cơ sở mã có sẵn sang React hoặc tích hợp ứng dụng React với thư viện không phải React. Trong những tình huống này, bạn có thể muốn kiểm tra các uncontrolled components, một kỹ thuật thay thế để triển khai các biểu mẫu nhập liệu.
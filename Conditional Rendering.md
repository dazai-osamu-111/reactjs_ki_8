Bình thường mk render() ra mà chả có điều kiện gì đúng k?
Giờ cho thêm điều kiện, ví dụ: Login rồi thì chuyển cái nút login thành logout. 
Ví dụ:
Có 2 component
```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```
Chúng ta sẽ tạo một Greeting component hiển thị một trong hai thành phần này tùy thuộc vào việc người dùng có đăng nhập hay không:
```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
// Try changing to isLoggedIn={true}:
root.render(<Greeting isLoggedIn={false} />);
```
Dễ hiểu phải không?
# Element Variables
Bạn có thể sử dụng các biến để lưu trữ các phần tử. Điều này có thể giúp bạn render() một phần của component một cách có điều kiện trong khi phần còn lại của output không thay đổi.

Hãy xem xét hai componnet mới này đại diện cho các nút Logout và Login:
```jsx
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```
Trong ví dụ bên dưới, chúng tôi sẽ tạo một thành phần có trạng thái có tên là LoginControl.

Nó sẽ hiển thị <LoginButton /> hoặc <LogoutButton /> tùy thuộc vào state hiện tại của nó. Nó cũng sẽ hiển thị <Greeting /> từ ví dụ trước:
```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<LoginControl />);
```
code này ranh con thôi, ae có gì ko hiểu thì cứ nhắn vào nhóm nhé. 
ok rồi, đến đây xem như xong phân điều kiện, khá dễ nhỉ =)
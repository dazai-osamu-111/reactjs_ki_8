# Component và props?

Component cho phép chúng ta chia nhỏ UI thành những phần độc lập, có thể tái sử dụng.

Component có 2 loại là Function và Class


Ví dụ function component: ( component mà là function ấy)
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

Ví dụ class component ( component mà là class)
```jsx
class Welcome extends React.Component { // luôn phải extend React.Component
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

Cách đây khoản 3 năm thì người ta dùng class component vì lúc đó chưa có hook. Bây giờ thì hook đã phát triển mạnh mẽ nên class component dần dần không còn ai dùng nữa.


> Lưu ý: Luôn luôn bắt đầu tên component bằng chữ in hoa
> Nếu bắt đầu bằng chữ thường thì React sẽ coi component đó là một HTML tag.

## Render một component

Chúng ta đã học về cách render một React element như dưới đây

```jsx
const element = <div />
```

Tuy nhiên, element cũng có thể là một component

```jsx
const element = <Welcome name='Sara' />
```

## Props

Component nhận vào `props`, `props` ở đây là một object chứa các giá trị mà bạn truyền vào component.

```jsx
class Welcome extends React.Component {
  render() {
    console.log(this.props) // object
    return (
      <h1>Hello, {this.props.name}</h1>
      <h2>You are {this.props.age}</h2>
      )
  }
}

function App() {
  return (
    <div>
      <Welcome name='Sara' age={22}/>
    </div>
  )
}
// khi viết thế này thì kết quả thu được sẽ là Sara và 22.
```

Nhờ có component mà ta có thể tái sử dụng lại UI một cách dễ dàng.

```jsx
function App() {
  return (
    <div>
      <Welcome name='Sara' age={22} />
      <Welcome name='Helen' age={21} />
      <Welcome name='Alex' age={20} />
    </div>
  )
}
//class component welcome được định nghĩa bên trên đã được sử dụng
```

## Tách nhỏ các component

 Việc tách nhỏ giúp dễ quản lý và tái sử dụng cho sau này.

Ví dụ, ta có component `Comment`

```jsx
function Comment(props) {
  return (
    <div className='Comment'>
      <div className='UserInfo'>
        <img
          className='Avatar'
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className='UserInfo-name'>{props.author.name}</div>
      </div>
      <div className='Comment-text'>{props.text}</div>
      <div className='Comment-date'>{formatDate(props.date)}</div>
    </div>
  )
}
```

Có thể tách ra một component `Avatar` riêng

```jsx
function Avatar(props) {
  return (
    <img className='Avatar' src={props.user.avatarUrl} alt={props.user.name} />
  )
}
```

Component `Avatar` không cần biết bên trong `Comment` nó xử lý như thế nào, chỉ cần truyền vào props là `user` là đủ.

Chúng ta đặt tên cho props dựa vào ngữ cảnh cho phù hợp.

Bâu giờ `Comment` có vẻ ngắn lại chút

```jsx
function Comment(props) {
  return (
    <div className='Comment'>
      <div className='UserInfo'>
        <Avatar user={props.author} /> // author này sẽ phải gồm avatarURL, name thì component Avatar mới hiểu được
        <div className='UserInfo-name'>{props.author.name}</div>
      </div>
      <div className='Comment-text'>{props.text}</div>
      <div className='Comment-date'>{formatDate(props.date)}</div>
    </div>
  )
}
```

Chúng ta sẽ tiếp tục tách ra một component `UserInfo` để render `Avatar` bên trong đó.

```jsx
function UserInfo(props) {
  return (
    <div className='UserInfo'>
      <Avatar user={props.user} />
      <div className='UserInfo-name'>{props.user.name}</div>
    </div>
  )
}
```

Cuối cùng ta có thành quả là component `Comment` ngắn như thế này

```jsx
function Comment(props) {
  return (
    <div className='Comment'>
      <UserInfo user={props.author} />
      <div className='Comment-text'>{props.text}</div>
      <div className='Comment-date'>{formatDate(props.date)}</div>
    </div>
  )
}
```

Với cách viết như vậy thì khi sử dụng component comment, ta sẽ buộc phải khai báo thuộc tính author thì mới có thể render không có lỗi. ( theo t hiểu là như thế)
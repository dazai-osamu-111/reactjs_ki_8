const lastname = 'duc'

const sum = (a,b) => a + b

const element = (
  <h1>
    hello world! I am {lastname}
  </h1>
)

// Ten thuộc tính phải chuyển sang camelCase
const element2 = <a href = 'google.com' tabIndex='11' className='123' id='the-a'>Google</a>

const element3 = <h3/> // cách viết gọn

const element4 = <img src="" alt="" /> //cách viết gọn

const comment = <script>console.log("send token")</script>

const element6 = <h1 className="greeting">Hello world</h1>

//Babel biên dịch: tức từ element6 bên trên sau khi biên dịch nó sẽ có dạng như thế này
// const element6 = React.createElement(
//   'h1',
//   {className:"greeting"},
//   'Hello, world'
// )

Thông thường, một số thành phần cần phản ánh cùng một dữ liệu thay đổi. Chúng tôi khuyên bạn nên nâng trạng thái được chia sẻ lên thành tổ tiên chung gần nhất của chúng. Hãy xem cách nó hoạt động.

Trong phần này, chúng ta sẽ tạo một máy tính nhiệt độ để tính xem nước có sôi ở một nhiệt độ nhất định hay không.

Chúng ta sẽ bắt đầu với một component có tên là BoilingVerdict. Nó chấp nhận  tham số celsius và in liệu nó có đủ để đun sôi nước hay không:
```jsx
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}
```
Tiếp theo, chúng ta sẽ tạo một component có tên là Calculator. Nó render một input cho phép bạn nhập nhiệt độ và giữ giá trị của nó trong this.state.Temperature.

Ngoài ra, nó render BoilingVerdict cho giá trị đầu vào hiện tại.
```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset> // trường nhập dữ liệu thôi, ko có gì cả
        <legend>Enter temperature in Celsius:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
          // đây là cái mk vừa tạo bên trên đấy
        <BoilingVerdict  
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```
## Adding a Second Input ( thêm input thứ 2)
Yêu cầu mới của chúng tôi là ngoài đầu vào Celsius, chúng tôi còn cung cấp đầu vào Fahrenheit và chúng được giữ đồng bộ.

Chúng ta có thể bắt đầu bằng cách trích xuất TemperatureInput component từ Calculator. Chúng tôi sẽ thêm một tham số scale mà giá trị có thể là "c" hoặc "f":
```jsx
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
Bây giờ chúng ta có thể thay đổi Calculator để hiển thị hai đầu vào nhiệt độ riêng biệt:
```jsx
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" /> // đến đây vẫn khá dễ hiểu thôi
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```
Hiện chúng tôi có hai đầu vào, nhưng khi bạn nhập nhiệt độ vào một trong số chúng, đầu vào kia sẽ không cập nhật. Điều này mâu thuẫn với yêu cầu của chúng tôi: chúng tôi muốn giữ chúng đồng bộ.

Chúng tôi cũng không thể hiển thị BoilingVerdict từ Calculator. Calculator không biết nhiệt độ hiện tại vì nó được ẩn bên trong TemperatureInput.

## Writing Conversion Functions ( Viết các hàm chuyển đổi)
Đầu tiên, chúng ta sẽ viết hai hàm để chuyển đổi từ độ C sang độ F và ngược lại:
```jsx
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```
Hai hàm này chuyển đổi số. Chúng ta sẽ viết một hàm khác lấy nhiệt độ dạng string và hàm chuyển đổi làm đối số và trả về một chuỗi. Chúng tôi sẽ sử dụng nó để tính giá trị của một đầu vào dựa trên đầu vào khác.

Nó trả về một chuỗi rỗng ở nhiệt độ không hợp lệ và nó giữ đầu ra được làm tròn đến chữ số thập phân thứ ba:
```jsx
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```
Ví dụ: tryConvert('abc', toCelsius) trả về một chuỗi trống và tryConvert('10.22', toFahrenheit) trả về '50.396'.

## Lifting State Up
Hiện tại, cả hai component TemperatureInput đều độc lập giữ các giá trị của chúng ở trạng thái cục bộ:
```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```
Tuy nhiên, chúng tôi muốn hai đầu vào này đồng bộ với nhau. Khi chúng tôi cập nhật đầu vào độ C, đầu vào độ F sẽ phản ánh nhiệt độ được chuyển đổi và ngược lại.

Trong React, trạng thái chia sẻ được thực hiện bằng cách di chuyển nó đến tổ tiên chung gần nhất của các thành phần cần nó. Điều này được gọi là "lifting state up". Thay vào đó, chúng tôi sẽ xóa trạng thái cục bộ khỏi TemperatureInput  và chuyển nó vào Calculator.

Nếu Calculator sở hữu trạng thái được chia sẻ, nó sẽ trở thành “nguồn sự thật” cho nhiệt độ hiện tại ở cả hai đầu vào. Nó có thể hướng dẫn cả hai có các giá trị phù hợp với nhau. Vì các props của cả hai TemperatureInput component vào đều đến từ cùng một thành phần Calculator cha, nên hai đầu vào sẽ luôn đồng bộ.

Hãy xem làm thế nào điều này hoạt động từng bước.

Đầu tiên, chúng ta sẽ thay thế this.state.Temp bằng this.props.Temp trong thành phần TemperatureInput( để truyền vào ấy mà). Hiện tại, hãy giả sử rằng this.props.Temp đã tồn tại, mặc dù chúng ta sẽ cần chuyển nó từ Máy tính trong tương lai:
```jsx
 render() {
    // Before: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```
Chúng tôi biết rằng các đạo cụ là chỉ đọc. Khi nhiệt độ ở trạng thái cục bộ, TemperatureInput chỉ có thể gọi this.setState() để thay đổi nó. Tuy nhiên, bây giờ temperature đến từ cha mẹ như một prop, TemperatureInput không có quyền kiểm soát nó.

Trong React, điều này thường được giải quyết bằng cách làm cho một thành phần được “kiểm soát”(controled). Giống như DOM input chấp nhận cả value và  onChange prop, thì TemperatureInput có thể chấp nhận cả giá trị temperature  và giá trị onTemperatureChange từ Calculator cha của nó.

Bây giờ, khi TemperatureInput muốn cập nhật nhiệt độ của nó, nó sẽ gọi this.props.onTemperatureChange:
```jsx
handleChange(e) {
    // Before: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```
onTemperatureChange prop sẽ được cung cấp cùng với temperature prop bởi Calculator component cha. Nó sẽ xử lý thay đổi bằng cách sửa đổi trạng thái cục bộ của chính nó, do đó kết xuất lại cả hai đầu vào với các giá trị mới. Chúng ta sẽ sớm thấy Calculator mới.

Trước khi đi sâu vào các thay đổi trong Calculator, hãy tóm tắt lại các thay đổi của chúng tôi đối với TemperatureInput props. Chúng tôi đã xóa trạng thái cục bộ khỏi nó và thay vì đọc this.state.Temp, bây giờ chúng tôi đọc this.props.Temp. Thay vì gọi this.setState() khi chúng ta muốn thực hiện thay đổi, bây giờ chúng ta gọi this.props.onTemperatureChange(), sẽ được cung cấp bởi Calculator:
```jsx
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```
Bây giờ hãy chuyển sang Calculator component.

Chúng tôi sẽ lưu trữ temperature và scale của đầu vào hiện tại ở trạng thái cục bộ của nó. Đây là trạng thái mà chúng tôi đã “nâng lên” từ các đầu vào và nó sẽ đóng vai trò là “nguồn gốc của sự thật” cho cả hai. Nó là biểu diễn tối thiểu của tất cả dữ liệu chúng ta cần biết để hiển thị cả hai đầu vào.

Ví dụ: nếu chúng ta nhập 37 vào đầu vào độ C, trạng thái của Calculator sẽ là:\
```jsx
{
  temperature: '37',
  scale: 'c'
}
```
Nếu sau này chúng ta chỉnh sửa trường Fahrenheit thành 212, thì trạng thái của Calculator sẽ là:
```jsx
{
  temperature: '212',
  scale: 'f'
}
```
Chúng tôi có thể đã lưu trữ giá trị của cả hai đầu vào nhưng hóa ra là không cần thiết. Nó đủ để lưu trữ giá trị của đầu vào được thay đổi gần đây nhất và thang đo mà nó đại diện. Sau đó, chúng ta có thể suy ra giá trị của đầu vào khác chỉ dựa trên nhiệt độ và tỷ lệ hiện tại.

Các đầu vào luôn đồng bộ vì các giá trị của chúng được tính từ cùng một trạng thái:
```jsx
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```
Bây giờ, bất kể bạn chỉnh sửa đầu vào nào, this.state.Temperature và this.state.scale trong Máy tính đều được cập nhật. Một trong các đầu vào nhận giá trị nguyên trạng, vì vậy mọi đầu vào của người dùng đều được giữ nguyên và giá trị đầu vào khác luôn được tính toán lại dựa trên giá trị đó.

Hãy tóm tắt lại những gì xảy ra khi bạn chỉnh sửa đầu vào:

React gọi hàm được chỉ định là onChange trên DOM input. Trong trường hợp của chúng ta, đây là phương thức handleChange trong TemperatureInput.

Phương thức handleChange trong TemperatureInput gọi this.props.onTemperatureChange() với giá trị mong muốn mới. Các prop của nó, bao gồm cả onTemperatureChange, được cung cấp bởi thành phần mẹ của nó, Calculator.

Khi nó được render trước đó, Calculator đã chỉ định rằng onTemperatureChange của Celsius TemperatureInput là phương thức handleCelsiusChange của Calculator và onTemperatureChange của TemperatureInput Fahrenheit là phương thức handleFahrenheitChange của Calculato. Vì vậy, một trong hai phương thức Máy tính này được gọi tùy thuộc vào đầu vào mà chúng tôi đã chỉnh sửa.

Bên trong các phương thức này, thành phần Calculator yêu cầu React tự render lại bằng cách gọi this.setState() với giá trị đầu vào mới và tỷ lệ hiện tại của đầu vào mà chúng ta vừa chỉnh sửa.

React gọi phương thức render của thành phần Calculator để tìm hiểu giao diện người dùng trông như thế nào. Giá trị của cả hai đầu vào được tính toán lại dựa trên nhiệt độ hiện tại và thang đo hoạt động. Việc chuyển đổi nhiệt độ được thực hiện ở đây.

React gọi các phương thức render của các thành phần TemperatureInput đầu vào riêng lẻ với các prop mới do Calculator chỉ định. Nó tìm hiểu giao diện người dùng của họ sẽ trông như thế nào.

React gọi phương thức render của thành phần BoilingVerdict, chuyển nhiệt độ tính bằng độ C làm prop của nó.

React DOM cập nhật DOM với phán quyết sôi nổi và để khớp với các giá trị đầu vào mong muốn. Đầu vào chúng tôi vừa chỉnh sửa nhận giá trị hiện tại của nó và đầu vào khác được cập nhật theo nhiệt độ sau khi chuyển đổi.

Mọi cập nhật đều trải qua các bước giống nhau để đầu vào luôn đồng bộ.

## Kết quả thu được này.
!["shifting"](https://legacy.reactjs.org/ef94afc3447d75cdc245c77efb0d63be/react-devtools-state.gif)

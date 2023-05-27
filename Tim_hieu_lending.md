Hoạt động deposit và borrow tiền trên lending pool diễn ra như thế nào?
Ban đầu là P2P lending, sau nhờ giao thức Aave nên chuyển thành dạng pool-base.
Người cho vay cung cấp thanh khoản cho hệ thống bằng cách gửi tiền điện tử trong một pool contract.
collateral: tài sản thế chấp
Đồng thời, trong cùng 1 contract, tiền được trữ có thể được mượn bằng việc đặt tài sản thế chấp.
Các khoản vay không cần phải được đối sánh riêng lẻ, thay vào đó chúng dựa vào các khoản tiền được gộp lại, cũng như các tài sản đã vay và tài sản thế chấp của chúng

Lãi suât cho cả người vay và người mượn đều được quyết định theo thuật toán
Với người mượn, nó phụ thuộc vào giá trị của tiền - Lượng tiền có trong pool tại 1 thời điểm. Khi tiền được mượn khỏi pool, lượng tiền sẵn có sẽ giảm, lãi suất sẽ tăng.
Với người cho vay: lãi suất tương ứng với tỷ lệ kiếm được, với thuận toán bảo vệ  dự trữ thanh khoản để đảm bảo có thể vay tiền bất cứ lúc nào. 
Deposit: Người dùng có tiền điện tử muốn cho vay thì tiến hành gửi tiền vào lending pool và nhận lãi suất.
Lãi suất này phụ thuộc vào lượng tiền kiếm được từ việc cho vay của hệ thống.

Tài sản đặt cọc phải có giá trị lớn hơn khoản vay
Chỉ những đồng tiền có rủi ro thấp mới được xem xét để config như tài sản đặt cọc.
Lượng tiền mà 1 người có thể vay phụ thuộc vào các đồng tiền ảo sẵn có trong kho lưu trữ (reserve).
Mỗi reserve có 1 LTV ( loan to value)
Mỗi người vay có thể vay với lãi suất cố định hoặc không cố định
Các khoản vay không giới hạn thời gian, có thể trả nợ bất kì lúc nào
Các tham số của lending pool:
LTV: 60%
Liquidation ratio: 105%
Statble rate: 5%
Variable rate: 2%

trong trường hợp biến động giá, vị thế vay có thể được thanh lý
Việc thanh lý diễn ra khi giá của tài sản thế chấp hạ xuống dưới ngưỡng LQ, gọi là ngưỡng thanh lý.
Ở bất kì thời điểm nào thì, vị thế vay được đặc trưng bởi health factor (Hf)
Hf = ...
Bt = total borrow = 

Sự biến đổi của borrow và deposit có biểu đồ đấy.
Hành động vay( borrow) chuyển cho người dùng một lượng tài sản cơ bản cụ thể, để đổi lấy một tài sản thế chấp vẫn bị khóa

Tài sản thế chấp được khóa: Được khóa: Khi người dùng đặt cọc tài sản thế chấp vào Lending Pool, tài sản đó sẽ bị khóa và không thể rút ra cho đến khi họ trả lại khoản vay hoặc tiếp tục vay tài sản khác.

"reserve total borrows" là một tham số mà ghi nhận tổng số tiền mà người dùng đã vay từ Lending Pool cho mỗi tài sản cụ thể (reserve).

"accrued interest" (lãi tích luỹ) là số lãi mà người dùng đã kiếm được từ việc cho vay tài sản hoặc từ việc giữ aToken trong Lending Pool. Lãi tích luỹ được tính dựa trên thời gian mà người dùng đã nắm giữ tài sản hoặc aToken.

Trong giao thức Aave, "borrow index" là một tham số được sử dụng để theo dõi và tính toán lãi suất tích luỹ cho người dùng đã vay tiền trong Lending Pool.

Trong giao thức Aave, "liquidity index" là một tham số được sử dụng để theo dõi và tính toán lãi suất tích luỹ cho người dùng đang cung cấp thanh khoản (liquidity) trong Lending Pool.

"Reserve total liquidity" trong giao thức Aave là một tham số quan trọng, thể hiện tổng số tiền mà người dùng đã cung cấp vào Lending Pool cho mỗi tài sản cụ thể (reserve).

"Principal balance" là số tiền gốc (số tiền ban đầu) mà người dùng đang nợ trong một khoản vay hoặc một hợp đồng tài chính.

# Cách xác định lượng tiền đang deposit hoặc borrow của một user?

Deposit
Trong giao thức Aave, lượng tiền đang được gửi (deposit) của mỗi người dùng được xác định bằng cách theo dõi số lượng aToken mà người dùng sở hữu. Mỗi khi người dùng gửi tài sản vào Lending Pool, họ nhận được một số lượng aToken tương ứng với giá trị tài sản đã gửi.

aToken đại diện cho lượng tiền đang được gửi và tích luỹ lãi suất trong giao thức Aave. Giá trị của aToken tăng theo thời gian do tích luỹ lãi suất và phản ánh tổng giá trị tài sản mà người dùng đã gửi vào Lending Pool.

Khi người dùng muốn xác định lượng tiền đang deposit của mình, họ có thể xem số lượng aToken mà họ sở hữu thông qua ví hoặc giao diện người dùng của Aave. Điều này cho phép người dùng biết chính xác lượng tiền mà họ đã gửi vào Lending Pool và cũng là cơ sở để tính toán lãi suất tích luỹ mà họ đã kiếm được.

borrow
lượng tiền đang được vay (borrow) của mỗi người dùng được xác định bằng cách theo dõi số tiền vay hiện tại mà người dùng đang nợ lại Lending Pool.

Khi người dùng thực hiện giao dịch vay trong Aave, số tiền vay được ghi nhận trong hợp đồng thông minh của giao thức. Thông qua giao diện người dùng hoặc ví Aave, người dùng có thể xem số tiền vay hiện tại của mình.

Cơ chế xác định lượng tiền đang được vay trong Aave bao gồm các thành phần sau:

Lượng tiền vay: Đây là số tiền mà người dùng đã vay từ Lending Pool, được xác định bằng số tiền tương ứng với tài sản mà người dùng đã vay.

Lãi suất: Lượng lãi suất tích luỹ trên số tiền vay được tính dựa trên mức lãi suất áp dụng cho tài sản đó trong giao thức Aave. Lãi suất tích luỹ sẽ được tính toán và cập nhật liên tục theo thời gian.

Margin Call và Liquidation: Nếu giá trị tài sản thế chấp giảm đến một mức nhất định, người dùng có thể đối mặt với Margin Call và nếu không đáp ứng được yêu cầu, tài sản thế chấp có thể bị thanh lý để bù đắp khoản vay. Số tiền được vay cũng sẽ bị giảm tương ứng.

Nhờ cơ chế này, người dùng có thể xác định lượng tiền đang được vay và lãi suất tích luỹ mà họ đang nợ trong giao thức Aave.



# Cách tính lãi suất deposit và borrow

borrow thì có hàm rồi

deposit thì tìm mãi ko thấy

# token AAVE dùng để làm gì
Khi người dùng gửi tài sản vào Lending Pool, họ nhận được aToken tương ứng, đại diện cho tài sản đã gửi. Mỗi khi có hoạt động cho vay hoặc trả nợ diễn ra trong Lending Pool, lãi suất được tính và tích luỹ vào số lượng aToken mà người dùng sở hữu.

Bảo đảm (Collateral): Token AAVE có thể được sử dụng như một tài sản bảo đảm (collateral) trong hệ thống Aave. Người dùng có thể đặt cọc token AAVE để vay các tài sản tiền điện tử khác từ Lending Pool.

Giảm phí giao dịch: Khi người dùng sở hữu token AAVE, họ có thể sử dụng token này để giảm phí giao dịch trên nền tảng Aave. Sử dụng AAVE để thanh toán phí giao dịch giúp người dùng nhận được ưu đãi và giảm thiểu chi phí.

# Khi một user bị thanh lý khoản nợ, hoạt động diễn ra như thế nào
The liquidationcall contract allows any external actor to purchase part of a collateral at a discounted price. In
case of a liquidation event, a maximum of 50% of the loan can be liquidated, which will bring the health factor back
above 1.

dựa theo biểu đồ để nói thôi.

Trong giao thức Aave, "principal currency" là đơn vị tiền tệ chính mà được sử dụng để định giá và xử lý các giao dịch và khoản vay trong Lending Pool.

Mỗi tài sản trong Aave có thể có một principal currency riêng, đại diện cho đơn vị tiền tệ mà tài sản đó được giao dịch và tính toán. Ví dụ, trong trường hợp của ETH (Ethereum), principal currency sẽ là ETH. Tương tự, đối với DAI, principal currency sẽ là DAI.

Hành động "Decrease user principal borrow balance" trong hoạt động liquidity của giao thức Aave được thực hiện để giảm số dư nợ gốc (principal borrow balance) của người dùng.


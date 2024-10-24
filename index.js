const {Order} = require('./order');
const order = new Order();



order.newBuy(1, 98);
order.newSell(1, 96);
order.getOrder("buy_1")
order.getOrder("sell_1")


// order.printOrders();


// order.printOrders();

// buyOrderID = NewBuy(1, 98)
// // "buy_1"

// buyOrder = GetOrder(buyOrderID)
// // {
// //   id: "buy_1",
// //   type: "buy",
// //   status: "unfilled",
// //   limitPrice: 98,
// //   numContracts: 1,
// //   remainingContracts: 1,
// //   matches: []
// // }

// sellOrderID = NewSell(1, 96)
// // "sell_1"

// buyOrder = GetOrder(buyOrderID)
// // {
// //   id: "buy_1",
// //   type: "buy",
// //   status: "filled",
// //   limitPrice: 98,
// //   numContracts: 1,
// //   remainingContracts: 0,
// //   matches: [
// //     {id: "sell_1", numContracts: 1, executionPrice: 97}
// //   ]
// // }

// sellOrder = GetOrder(sellOrderID)
// // {
// //   id: "sell_1",
// //   type: "sell",
// //   status: "filled",
// //   limitPrice: 96,
// //   numContracts: 1,
// //   remainingContracts: 0,
// //   matches: [
// //     {id: "buy_1", numContracts: 1, executionPrice: 97}
// //   ]
// // }
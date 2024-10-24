const {mockOrders} = require ('./mocks/mock');

class Order {
  constructor() {
    this.orders = [];
  }

  printOrders = () => {
    console.log(this.orders);
  }

  //GetOrder(orderID string) → Order
  getOrder = (orderID) => {
    const order = this.orders.find(order => order.id == orderID); 
    if (!order) {
      return "Order not found";
    }
    console.log(order);
    return order;
  }

  


  //NewSell(numContracts int, limitPrice int) → string (unique ID for order)
  newSell = (numContracts, limitPrice) => {
    const unfulfilledBuyOrder = this.orders.find(order => {
      ["unfilled", "partially_filled"].includes(order.status) &&
      order.remainingContracts <= numContracts &&
      order.limitPrice > limitPrice &&
      order.type == "buy"
    }) 


    const remainingContracts = unfulfilledBuyOrder ? unfulfilledBuyOrder.remainingContracts - numContracts : numContracts;
    const newSell = {
      id: "sell_1", 
      type: "sell",
      limitPrice,
      numContracts,
      remainingContracts: remainingContracts,
      status: this.calcOrderStatus(remainingContracts, numContracts),
      matches: [
         {...unfulfilledBuyOrder, ...(unfulfilledBuyOrder && {executionPrice: limitPrice})}
      ]
    }
    if (!unfulfilledBuyOrder) {
      newSell.status == "unfilled";
      newSell.remainingContracts = numContracts;
    }
    if (unfulfilledBuyOrder?.id) this.updateOrderStatus(unfulfilledBuyOrder.id, this.calcOrderStatus(remainingContracts, numContracts), numContracts, newSell)
    this.orders.push(newSell);

    return newSell.id;
  }

 

  //NewBuy(numContracts int, limitPrice int) → string
  newBuy = (numContracts, limitPrice) => {
    const unfulfilledSellOrder = this.orders.find(order => {
      ["unfilled", "partially_filled"].contains(order.status) &&
      order.remainingContracts <= numContracts &&
      order.limitPrice < limitPrice &&
      order.type == "sell"
    }) 

    const remainingContracts = unfulfilledSellOrder ? unfulfilledSellOrder.remainingContracts - numContracts : numContracts;
    const newBuy = {
      id: "buy_1", 
      type: "buy",
      limitPrice,
      numContracts,
      remainingContracts: remainingContracts,
      status: this.calcOrderStatus(remainingContracts, numContracts),
      matches: [
        {...unfulfilledSellOrder, ...(unfulfilledSellOrder && {executionPrice: limitPrice})}
      ]
    }
    if (!unfulfilledSellOrder) {
      newBuy.status == "unfilled";
      newBuy.remainingContracts = numContracts;

    }
    
    if(unfulfilledSellOrder?.id) {
      this.updateOrderStatus(unfulfilledSellOrder.id, this.calcOrderStatus(remainingContracts, numContracts), numContracts, newBuy)
    }
    
    this.orders.push(newBuy);
    return newBuy.id;
  }



  calcOrderStatus = (remainingContracts, numContracts) => {
    if (remainingContracts == numContracts) {
      return "unfilled";
    }
    if (remainingContracts > 0) return "partially_filled";
    return "filled";
  }

  updateOrderStatus = (orderID, status, contracts, matchingOrder) => {
    const idx = this.orders.indexOf(order => order.id == orderID);
    const order = this.orders[idx];
    const remainingContracts = order.remainingContracts - contracts;
    const matches = [...this.order.matches, ...matchingOrder];
    this.orders[idx] = {
      ...order,
      remainingContracts,
      status,
      matches
    }
  }
  
}

module.exports = {
  Order
}

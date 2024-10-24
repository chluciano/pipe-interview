const mockOrders = [
  {
    // A globally unique ID: no two orders may have the same ID.
    id: "12345",

    // The type of the order
    type: "buy",

    // The initial parameters that created this order.
    limitPrice: 100,
    numContracts: 10,

    // The number of unmatched contracts. Initially equal to numContracts,
    // goes to zero as order gets filled.
    remainingContracts: 5,

    // Initially "unfilled"; see the order matching constraints below.
    status: "unfilled",

    // A list of all matches between this order and others. Initially empty.
    matches: [
      {
        // The ID of the order to which this match was made.
        id: "abc",
        // The number of contracts involved in the match.
        numContracts: 5,
        // The per-contract price these contracts were matched at.
        // It is the average price between the sell and buy limit price.
        executionPrice: 99,
      },
    ]
  },

  {
    // A globally unique ID: no two orders may have the same ID.
    id: "abc",

    // The type of the order
    type: "sell",

    // The initial parameters that created this order.
    limitPrice: 99,
    numContracts: 5,

    // The number of unmatched contracts. Initially equal to numContracts,
    // goes to zero as order gets filled.
    remainingContracts: 0,

    // Initially "unfilled"; see the order matching constraints below.
    status: "filled",

    // A list of all matches between this order and others. Initially empty.
    matches: [
      {
        // The ID of the order to which this match was made.
        id: "12345",
        // The number of contracts involved in the match.
        numContracts: 5,
        // The per-contract price these contracts were matched at.
        // It is the average price between the sell and buy limit price.
        executionPrice: 99,
      }
    ]
  },
]


module.exports = { 
  mockOrders
}
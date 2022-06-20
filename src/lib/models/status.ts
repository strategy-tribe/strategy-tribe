export enum BountyState {
  WaitingForFunds = 'Waiting for funds',
  Open = 'Open', //travel_explore
  PaymentNeeded = 'Payment needed', //change to 'ready to pay', price_check
  Closed = 'Closed', // lock
}

export enum SubmissionState {
  WaitingForReview = 'is waiting for review',
  NotAccepted = 'was not accepted',
  WaitingForPayment = "was accepted and it's waiting for payment",
  Accepted = 'was fully accepted',
}

export enum BountyState {
  WaitingForFunds = 'Waiting for funds',
  Open = 'Open', //travel_explore
  PaymentNeeded = 'Payment needed', //change to 'ready to pay', price_check
  Closed = 'Closed', // lock
}

export enum SubmissionState {
  WaitingForReview = 'Waiting for review',
  Rejected = 'Rejected',
  WaitingForPayment = 'Waiting for payment',
  Accepted = 'Accepted',
}

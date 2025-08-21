export enum TransactionType {
  SPEND = "SPEND", // Spend money in budget, pot or pay a bill
  DEPOSIT = "DEPOSIT", // Add money to balance, budget, or pot
  TRANSFER = "TRANSFER", // Transfer money between users, balances, budgets or pots
  WITHDRAWAL = "WITHDRAWAL", // Withdraw money from balance, budget or pot
  ALLOCATION = "ALLOCATION", // Create a budget, pot or recurring bill
}

export enum TransactionStatus {
  FAILED = "FAILED",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export enum TransactionSortBy {
  LATEST = "LATEST",
  OLDEST = "OLDEST",
  A_TO_Z = "A_TO_Z",
  Z_TO_A = "Z_TO_A",
  HIGHEST = "HIGHEST",
  LOWEST = "LOWEST",
}

import { Currency } from "../enums/currency"

export type Balance = {
  currency: Currency
  income: number
  expense: number
  balance: number
}

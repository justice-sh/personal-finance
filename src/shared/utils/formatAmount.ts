import { StringNumericLiteral } from "../types/number"
import { Currency, CurrencySymbol } from "../enums/currency"

export function formatAmount(
  amount: StringNumericLiteral,
  currency: Currency = Currency.USD,
  options?: Intl.NumberFormatOptions,
): string {
  const value = new Intl.NumberFormat("en-US", { style: "currency", currency, ...options }).format(amount)

  if (currency === Currency.NGN) return CurrencySymbol.NGN + value.replace(currency, "").trim()

  return value
}

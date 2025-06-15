import { Currency } from "../types/currency"
import { StringNumericLiteral } from "../types/number"

export function formatAmount(amount: StringNumericLiteral, currency: Currency = "USD", options?: Intl.NumberFormatOptions): string {
  const value = new Intl.NumberFormat("en-US", { style: "currency", currency, ...options }).format(amount)

  if (currency === "NGN") return "₦" + value.replace(currency, "").trim()

  return value
}

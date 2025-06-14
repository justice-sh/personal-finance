type StringNumericLiteral = number | bigint | `${number}` | "Infinity" | "-Infinity" | "+Infinity"

export function formatAmount(amount: StringNumericLiteral, currency = "USD", options?: Intl.NumberFormatOptions): string {
  const value = new Intl.NumberFormat("en-US", { style: "currency", currency, ...options }).format(amount)

  if (currency === "NGN") return "₦" + value.replace(currency, "").trim()

  return value
}

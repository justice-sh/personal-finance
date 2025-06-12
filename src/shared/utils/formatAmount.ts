export function formatAmount(amount: number, currency = "USD") {
  const value = new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)

  if (currency === "NGN") return "₦" + value.replace(currency, "").trim()

  return value
}

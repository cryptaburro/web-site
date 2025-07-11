export async function fetchLnurlPayDetails(lightningAddress: string) {
  const [username, domain] = lightningAddress.split("@")
  // LUD-16 specification for Lightning Addresses uses the .well-known/lnurlp endpoint
  const url = `https://${domain}/.well-known/lnurlp/${username}`
  const response = await fetch(url)
  if (!response.ok) {
    const errorBody = await response.text().catch(() => "No response body")
    throw new Error(
      `Failed to fetch LNURL-pay details from ${url}: ${response.status} ${response.statusText || ""}. Body: ${errorBody}`,
    )
  }
  return response.json()
}

export async function generateLnInvoice(callbackUrl: string, amountMsat: number, metadata: string) {
  const url = new URL(callbackUrl)
  url.searchParams.append("amount", amountMsat.toString())
  url.searchParams.append("metadata", metadata)

  const response = await fetch(url.toString())
  if (!response.ok) {
    const errorBody = await response.text().catch(() => "No response body")
    throw new Error(`Failed to generate invoice: ${response.status} ${response.statusText || ""}. Body: ${errorBody}`)
  }
  const data = await response.json()
  if (data.status === "ERROR") {
    throw new Error(data.reason || "Unknown error generating invoice")
  }
  return data.pr // Payment Request (invoice)
}

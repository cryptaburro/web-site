"use server"

import { fetchLnurlPayDetails, generateLnInvoice } from "@/lib/lnurl"

export async function createLightningInvoice(satsAmount: number) {
  if (satsAmount <= 0) {
    return { success: false, error: "Amount must be positive." }
  }

  const lightningAddress = "noe@coinos.io" // The specific lightning address to use
  const amountMsat = satsAmount * 1000 // Convert sats to millisatoshis

  try {
    // Fetch LNURL-pay details dynamically using the LUD-16 protocol
    const lnurlDetails = await fetchLnurlPayDetails(lightningAddress)

    // Basic validation of the LNURL-pay response
    if (lnurlDetails.tag !== "payRequest") {
      throw new Error("Invalid LNURL-pay response: tag is not 'payRequest'.")
    }
    if (!lnurlDetails.callback) {
      throw new Error("Invalid LNURL-pay response: missing callback URL.")
    }
    if (typeof lnurlDetails.minSendable === "undefined" || typeof lnurlDetails.maxSendable === "undefined") {
      throw new Error("Invalid LNURL-pay response: missing minSendable or maxSendable.")
    }

    const metadata = lnurlDetails.metadata
    const callbackUrl = lnurlDetails.callback

    // Ensure the requested amount is within the allowed range
    if (amountMsat < lnurlDetails.minSendable || amountMsat > lnurlDetails.maxSendable) {
      return {
        success: false,
        error: `Amount must be between ${lnurlDetails.minSendable / 1000} and ${lnurlDetails.maxSendable / 1000} sats.`,
      }
    }

    const invoice = await generateLnInvoice(callbackUrl, amountMsat, metadata)
    return { success: true, invoice }
  } catch (error: any) {
    console.error("Error generating invoice:", error)
    return { success: false, error: error.message || "Failed to generate invoice." }
  }
}

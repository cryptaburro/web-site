"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { TrendingUp, Shield, Zap, X } from "lucide-react"
import { useState, useActionState } from "react"
import { QRCodeSVG } from "qrcode.react" // Import QRCodeSVG
import { createLightningInvoice } from "@/app/invoice-action" // Import the server action

export default function Component() {
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isJourneyOpen, setIsJourneyOpen] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)
  const [isGetBitcoinNowOpen, setIsGetBitcoinNowOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false) // New state for invoice modal
  const [satsAmount, setSatsAmount] = useState<number | "">("") // State for sats input

  // useActionState for invoice generation
  const [invoiceState, createInvoiceAction, isInvoicePending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const amount = Number.parseInt(formData.get("satsAmount") as string)
      return await createLightningInvoice(amount)
    },
    { success: false, invoice: "", error: "" },
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-white text-white">
      {/* Header */}
      <header className="px-6 lg:px-8 h-20 flex items-center justify-between border-b border-orange-500/20">
        <div className="flex items-center space-x-3">
          <Dialog open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center space-x-3 cursor-pointer">
                {" "}
                {/* Make the logo and text clickable */}
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/45-MLWyp6jncm6TZNvDWdMYkHUao8NCzZ.webp"
                  alt="NOE 21 Logo"
                  width={65}
                  height={65}
                  className="h-16 w-16 rounded-full"
                />
                <h1 className="text-5xl font-oswald font-black tracking-tight text-white">NOE 21</h1>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-6 bg-black border-orange-500/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-oswald text-orange-500">Generate Lightning Invoice</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Enter the amount in sats to generate a Lightning Network invoice for 'nacho@coinos.io'.
                </DialogDescription>
              </DialogHeader>
              <form action={createInvoiceAction} className="space-y-4 mt-4">
                <div>
                  <label htmlFor="satsAmount" className="block text-sm font-bold text-gray-300 mb-2">
                    Amount in Sats
                  </label>
                  <Input
                    id="satsAmount"
                    name="satsAmount"
                    type="number"
                    value={satsAmount}
                    onChange={(e) => setSatsAmount(e.target.value === "" ? "" : Number.parseInt(e.target.value))}
                    placeholder="e.g., 1000"
                    min="1"
                    className="bg-gray-800 text-white border-orange-500/20 focus:border-orange-500"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-black font-oswald font-black"
                  disabled={isInvoicePending || satsAmount === "" || satsAmount <= 0}
                >
                  {isInvoicePending ? "Generating..." : "Generate Invoice"}
                </Button>
              </form>
              {invoiceState.error && <p className="text-red-500 text-sm mt-4">{invoiceState.error}</p>}
              {invoiceState.success && invoiceState.invoice && (
                <div className="mt-6 text-center">
                  <p className="text-lg font-bold text-orange-500 mb-2">Scan to Pay:</p>
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <QRCodeSVG value={invoiceState.invoice} size={200} level="H" />
                  </div>
                  <p className="text-sm text-gray-400 break-all mt-4">{invoiceState.invoice}</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
            <DialogTrigger asChild>
              <button className="text-lg font-oswald font-bold hover:text-orange-500 transition-colors">ABOUT</button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-none">
              <div className="relative w-full h-full flex items-center justify-center">
                <button
                  onClick={() => setIsAboutOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
                <Image src="/about-image.png" alt="About NOE 21" fill className="object-contain" priority />
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isServicesOpen} onOpenChange={setIsServicesOpen}>
            <DialogTrigger asChild>
              <button className="text-lg font-oswald font-bold hover:text-orange-500 transition-colors">
                SERVICES
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-none">
              <div className="relative w-full h-full flex items-center justify-center">
                <button
                  onClick={() => setIsServicesOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
                <Image src="/services-image.jpeg" alt="Bitcoin Services" fill className="object-contain" priority />
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
            <DialogTrigger asChild>
              <button className="text-lg font-oswald font-bold hover:text-orange-500 transition-colors">CONTACT</button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-none">
              <div className="relative w-full h-full flex items-center justify-center">
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
                <Image src="/contact-image.png" alt="La Crypta House" fill className="object-contain" priority />
              </div>
            </DialogContent>
          </Dialog>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 lg:py-32">
        <Image
          src="/bitcoin-watermark.png"
          alt="Bitcoin Watermark"
          fill
          className="object-contain opacity-5 -z-10"
          priority
        />
        <div className="max-w-4xl mx-auto text-center relative z-0">
          <h2 className="text-6xl lg:text-8xl font-oswald font-black mb-8 leading-tight">
            <span className="block text-orange-600 text-8xl lg:text-[10rem]">BITCOIN</span>
            <span className="block text-orange-500">IS FREEDOM</span>
          </h2>
          <p className="text-xl lg:text-2xl font-bold text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the revolution. Secure your future with the hardest money ever created.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Dialog open={isJourneyOpen} onOpenChange={setIsJourneyOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-black font-oswald font-black text-lg px-8 py-4 h-auto"
                >
                  START YOUR JOURNEY
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-none">
                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    onClick={() => setIsJourneyOpen(false)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                  <Image src="/journey-image.jpeg" alt="Bitcoin to the Moon" fill className="object-contain" priority />
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isLearnMoreOpen} onOpenChange={setIsLearnMoreOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-oswald font-black text-lg px-8 py-4 h-auto bg-transparent"
                >
                  LEARN MORE
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-none">
                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    onClick={() => setIsLearnMoreOpen(false)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                  <Image
                    src="/learn-more-image.jpeg"
                    alt="Bitcoin Education and Mining"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="px-6 lg:px-8 py-24 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl lg:text-6xl font-oswald font-black text-center mb-16">
            WHY <span className="text-orange-500">BITCOIN</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardContent className="p-8 text-center">
                <Shield className="h-16 w-16 text-orange-500 mx-auto mb-6" />
                <h4 className="text-2xl font-oswald font-black mb-4">SECURITY</h4>
                <p className="text-gray-300 font-bold text-lg">
                  Unbreakable cryptographic security protecting your wealth for generations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-16 w-16 text-orange-500 mx-auto mb-6" />
                <h4 className="text-2xl font-oswald font-black mb-4">GROWTH</h4>
                <p className="text-gray-300 font-bold text-lg">
                  Limited supply of 21 million coins. Digital scarcity drives value.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardContent className="p-8 text-center">
                <Zap className="h-16 w-16 text-orange-500 mx-auto mb-6" />
                <h4 className="text-2xl font-oswald font-black mb-4">FREEDOM</h4>
                <p className="text-gray-300 font-bold text-lg">
                  Be your own bank. No intermediaries. Complete financial sovereignty.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="px-6 lg:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="font-oswald font-black leading-tight mb-8 text-3xl text-black">
            "Y si no perdonó al mundo viejo, mas guardó á Noé, pregonero de justicia, con otras siete personas, trayendo
            el diluvio sobre el mundo de malvados"
          </blockquote>
          <cite className="text-xl font-oswald font-bold text-black">Peter 2:5</cite>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8 py-24 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl lg:text-6xl font-oswald font-black text-black mb-8">READY TO START?</h3>
          <p className="text-xl font-bold text-black mb-12 max-w-2xl mx-auto">
            Don't wait. Every day you delay is a day you're not protecting your wealth from inflation.
          </p>
          <Dialog open={isGetBitcoinNowOpen} onOpenChange={setIsGetBitcoinNowOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white font-oswald font-black text-xl px-12 py-6 h-auto"
              >
                GET BITCOIN NOW
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-none">
              <div className="relative w-full h-full flex items-center justify-center">
                <button
                  onClick={() => setIsGetBitcoinNowOpen(false)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
                <Image
                  src="/get-bitcoin-now-image.png"
                  alt="Veintiuno Bitcoin"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-12 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/45-MLWyp6jncm6TZNvDWdMYkHUao8NCzZ.webp"
              alt="NOE 21 Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            <span className="text-3xl font-oswald font-black text-black">NOE 21</span>
          </div>
          <div className="flex space-x-8">
            <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
              <DialogTrigger asChild>
                <button className="font-oswald font-bold text-black hover:text-orange-500 transition-colors">
                  PRIVACY
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-none">
                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    onClick={() => setIsPrivacyOpen(false)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                  <Image src="/skull-privacy-image.png" alt="Privacy Policy" fill className="object-contain" priority />
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
              <DialogTrigger asChild>
                <button className="font-oswald font-bold text-black hover:text-orange-500 transition-colors">
                  TERMS
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-none">
                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    onClick={() => setIsTermsOpen(false)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                  <Image src="/terms-image.jpeg" alt="Terms and Conditions" fill className="object-contain" priority />
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isSupportOpen} onOpenChange={setIsSupportOpen}>
              <DialogTrigger asChild>
                <button className="font-oswald font-bold text-black hover:text-orange-500 transition-colors">
                  SUPPORT
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-none">
                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    onClick={() => setIsSupportOpen(false)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                  <Image src="/bullshit.webp" alt="This is Bullshit" fill className="object-contain" priority />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-orange-500/20">
          <p className="font-bold text-black">© {new Date().getFullYear()} NOE 21. BITCOIN TO THE MOON.</p>
        </div>
      </footer>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-6 lg:px-8 h-20 flex items-center justify-between border-b border-orange-500/20">
        <div className="flex items-center space-x-3">
          <Image src="/icon-noe21.png" alt="NOE 21 Icon" width={52} height={52} className="h-13 w-13" />
          <h1 className="text-3xl font-black tracking-tight">NOE 21</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="#about" className="text-lg font-bold hover:text-orange-500 transition-colors">
            ABOUT
          </Link>
          <Link href="#services" className="text-lg font-bold hover:text-orange-500 transition-colors">
            SERVICES
          </Link>
          <Link href="#contact" className="text-lg font-bold hover:text-orange-500 transition-colors">
            CONTACT
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl lg:text-8xl font-black mb-8 leading-tight">
            BITCOIN
            <span className="block text-orange-500">IS FREEDOM</span>
          </h2>
          <p className="text-xl lg:text-2xl font-bold text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the revolution. Secure your future with the hardest money ever created.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-black font-black text-lg px-8 py-4 h-auto"
            >
              START YOUR JOURNEY
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black font-black text-lg px-8 py-4 h-auto bg-transparent"
            >
              LEARN MORE
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="px-6 lg:px-8 py-24 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl lg:text-6xl font-black text-center mb-16">
            WHY <span className="text-orange-500">BITCOIN</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardContent className="p-8 text-center">
                <Shield className="h-16 w-16 text-orange-500 mx-auto mb-6" />
                <h4 className="text-2xl font-black mb-4">SECURITY</h4>
                <p className="text-gray-300 font-bold text-lg">
                  Unbreakable cryptographic security protecting your wealth for generations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-16 w-16 text-orange-500 mx-auto mb-6" />
                <h4 className="text-2xl font-black mb-4">GROWTH</h4>
                <p className="text-gray-300 font-bold text-lg">
                  Limited supply of 21 million coins. Digital scarcity drives value.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <CardContent className="p-8 text-center">
                <Zap className="h-16 w-16 text-orange-500 mx-auto mb-6" />
                <h4 className="text-2xl font-black mb-4">FREEDOM</h4>
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
          <blockquote className="text-3xl lg:text-5xl font-black leading-tight mb-8">
            "BITCOIN IS THE APEX PROPERTY OF THE HUMAN RACE"
          </blockquote>
          <cite className="text-xl font-bold text-orange-500">— MICHAEL SAYLOR</cite>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-8 py-24 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl lg:text-6xl font-black text-black mb-8">READY TO START?</h3>
          <p className="text-xl font-bold text-black mb-12 max-w-2xl mx-auto">
            Don't wait. Every day you delay is a day you're not protecting your wealth from inflation.
          </p>
          <Button size="lg" className="bg-black hover:bg-gray-800 text-white font-black text-xl px-12 py-6 h-auto">
            GET BITCOIN NOW
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-8 py-12 border-t border-orange-500/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Image src="/icon-noe21.png" alt="NOE 21 Icon" width={31} height={31} className="h-8 w-8" />
            <span className="text-xl font-black">NOE 21</span>
          </div>
          <div className="flex space-x-8">
            <Link href="#" className="font-bold hover:text-orange-500 transition-colors">
              PRIVACY
            </Link>
            <Link href="#" className="font-bold hover:text-orange-500 transition-colors">
              TERMS
            </Link>
            <Link href="#" className="font-bold hover:text-orange-500 transition-colors">
              SUPPORT
            </Link>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-orange-500/20">
          <p className="font-bold text-gray-400">© {new Date().getFullYear()} NOE 21. BITCOIN TO THE MOON.</p>
        </div>
      </footer>
    </div>
  )
}

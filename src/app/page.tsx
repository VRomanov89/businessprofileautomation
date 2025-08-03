import { Calendar, Clock, MapPin, Zap } from "lucide-react";
import SignupForm from "@/components/SignupForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">BPA</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            <a href="/auth/signin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Sign In</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Never forget to post to 
            <span className="text-blue-600"> Google</span> again
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Automate your Google Business Profile posts with our simple scheduling tool. 
            Stay visible while you focus on running your business.
          </p>
          
          {/* CTA and Signup */}
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Early Access</h2>
            <p className="text-gray-600 mb-6">Join the waitlist and be the first to try BPA when we launch.</p>
            <SignupForm />
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why BPA?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple, powerful tools that help your business stay active on Google without the hassle.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Setup</h3>
              <p className="text-gray-600">Connect your Google Business Profile in under 2 minutes</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
              <p className="text-gray-600">Queue posts weeks in advance with our intuitive calendar</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Location</h3>
              <p className="text-gray-600">Manage multiple business profiles from one dashboard</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Time</h3>
              <p className="text-gray-600">Automate posting while you focus on your customers</p>
            </div>
          </div>
        </section>

        {/* Social Proof / Stats */}
        <section className="py-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Perfect for Local Businesses</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">5 min</h3>
                <p className="text-gray-600">Average setup time</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-green-600 mb-2">24/7</h3>
                <p className="text-gray-600">Automated posting</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-purple-600 mb-2">3+</h3>
                <p className="text-gray-600">Profiles supported</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6" />
              <span className="text-xl font-bold">BPA</span>
            </div>
            <p className="text-gray-400">© 2024 BPA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

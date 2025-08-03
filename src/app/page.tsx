import { 
  Calendar, MapPin, Zap, ArrowRight, CheckCircle, Users, TrendingUp, Star, 
  BarChart3, PlayCircle, Sparkles, Clock, Target, Shield, 
  ChevronRight, Award, Rocket, Heart
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Modern Gradient */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%234f46e5' fillOpacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
          {/* Floating orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-40 left-40 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="text-center max-w-6xl mx-auto">
            {/* Announcement Badge */}
            <div className="mb-8 animate-bounce-subtle">
              <span className="inline-flex items-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold border border-blue-200/50 shadow-lg backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                🚀 Now Live - Transform Your Business Today
              </span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight">
              Never Miss a 
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient"> Google Post</span> Again
            </h1>
            
            {/* Subheadline */}
            <p className="text-2xl md:text-3xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              Schedule <span className="font-semibold text-blue-600">weeks of content</span> in minutes. 
              Keep your business visible, drive more traffic, and save 
              <span className="font-semibold text-purple-600"> 10+ hours every week</span> with intelligent automation.
            </p>

            {/* Key Stats Row */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 text-gray-500">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">4.9/5 from 500+ businesses</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Setup in under 2 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="font-medium">Bank-level security</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Link 
                href="/auth/signin"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl hover:from-blue-700 hover:to-indigo-700 font-bold text-xl transition-all duration-300 inline-flex items-center justify-center shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#demo"
                className="group border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl hover:border-blue-400 hover:text-blue-600 font-bold text-xl transition-all duration-300 inline-flex items-center justify-center hover:bg-blue-50"
              >
                <PlayCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Link>
            </div>

            {/* Social Proof */}
            <div className="text-center">
              <p className="text-gray-500 mb-8 text-lg">Trusted by growing businesses worldwide</p>
              <div className="flex flex-wrap justify-center items-center gap-12 text-gray-400">
                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50">
                  <Users className="h-6 w-6 text-blue-500" />
                  <span className="font-semibold text-gray-700">1,200+ Active Users</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <span className="font-semibold text-gray-700">25K+ Posts Automated</span>
                </div>
                <div className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50">
                  <Award className="h-6 w-6 text-purple-500" />
                  <span className="font-semibold text-gray-700">99.9% Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section - Enhanced */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              The <span className="text-red-500">Silent Problem</span> Killing Your Business
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              78% of local businesses are invisible online because they forget to post regularly. 
              Don&apos;t let this be you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Problem Side */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Without Consistent Posting, You&apos;re Losing Customers Every Day
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-2xl border border-red-100">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-red-900 mb-2">Invisible in Local Search</h4>
                    <p className="text-red-800">Inactive profiles get 60% less visibility. Your competitors are showing up instead of you.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-2xl border border-red-100">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-red-900 mb-2">Time Drain</h4>
                    <p className="text-red-800">Spending hours every week manually posting, or worse - forgetting completely.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-2xl border border-red-100">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-red-900 mb-2">Lost Opportunities</h4>
                    <p className="text-red-800">Every day without fresh content is potential revenue walking to your competition.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Side */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-10 rounded-3xl border border-blue-200/50 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  BPA Solves This Forever
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Set it once, and never worry about posting again
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">10 Minutes = 30 Days of Content</h4>
                    <p className="text-gray-600">Schedule an entire month of posts in one sitting</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">3x More Visibility</h4>
                    <p className="text-gray-600">Consistent posting increases local search ranking</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-900">Set It & Forget It</h4>
                    <p className="text-gray-600">Automatic posting keeps you visible 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section id="demo" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              From Setup to Success in <span className="text-blue-600">3 Simple Steps</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              No technical skills required. Get up and running in under 5 minutes.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <span className="text-3xl font-black text-white">1</span>
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 translate-y-full hidden lg:block">
                  <ChevronRight className="h-8 w-8 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect in 30 Seconds</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                One-click Google OAuth connection. We handle all the technical complexity so you don&apos;t have to.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <span className="text-3xl font-black text-white">2</span>
                </div>
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 translate-y-full hidden lg:block">
                  <ChevronRight className="h-8 w-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Create & Schedule</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Write compelling posts, add images, and schedule them for peak engagement times with our smart calendar.
              </p>
            </div>
            
            <div className="text-center group">
              <div className="mb-8">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <span className="text-3xl font-black text-white">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Watch Your Business Grow</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Sit back as your posts go live automatically. Track performance and watch your local visibility soar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced */}
      <section id="features" className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Everything You Need to <span className="text-indigo-600">Dominate Local Search</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade tools designed specifically for ambitious local businesses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature cards with hover effects */}
            <div className="group p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Setup</h3>
              <p className="text-gray-600">Connect your Google Business Profile in under 2 minutes. No technical knowledge required.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border border-green-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Scheduling</h3>
              <p className="text-gray-600">AI-powered optimal timing ensures your posts reach maximum audience engagement.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border border-purple-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Location</h3>
              <p className="text-gray-600">Manage unlimited business profiles from one centralized, intuitive dashboard.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl border border-orange-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">Deep insights into post performance, engagement rates, and local search visibility.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl border border-teal-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-teal-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bulk Operations</h3>
              <p className="text-gray-600">Upload and schedule hundreds of posts at once. Perfect for agencies and multi-location businesses.</p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Content Templates</h3>
              <p className="text-gray-600">Pre-built, high-converting post templates for every industry and occasion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-2xl text-gray-600">
              Join thousands of businesses that transformed their online presence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                &ldquo;BPA saved me 15 hours a week. I can focus on my customers instead of worrying about social media posting.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SM
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Martinez</p>
                  <p className="text-gray-500">Restaurant Owner</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                &ldquo;Our local search visibility increased 300% after using BPA. Best investment we&apos;ve made for our business.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  DJ
                </div>
                <div>
                  <p className="font-semibold text-gray-900">David Johnson</p>
                  <p className="text-gray-500">Auto Shop Owner</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                &ldquo;Managing 12 locations is now effortless. BPA handles everything while we focus on growing our business.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  LT
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Lisa Thompson</p>
                  <p className="text-gray-500">Fitness Chain CEO</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Enhanced */}
      <section className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-6xl font-black text-white mb-8">
            Ready to <span className="text-yellow-300">Dominate</span> Local Search?
          </h2>
          <p className="text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join 1,200+ businesses that never worry about Google Business Profile posting again. 
            Start your transformation today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/auth/signin"
              className="group bg-white text-blue-600 px-12 py-6 rounded-2xl hover:bg-blue-50 font-black text-2xl transition-all duration-300 inline-flex items-center justify-center shadow-2xl hover:scale-105"
            >
              Start Your Free Trial
              <ArrowRight className="ml-3 h-7 w-7 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/pricing"
              className="group border-3 border-white text-white px-12 py-6 rounded-2xl hover:bg-white hover:text-blue-600 font-black text-2xl transition-all duration-300"
            >
              View Pricing Plans
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6" />
              <span>30-day money back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            {/* Company */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">BPA</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The most powerful Google Business Profile automation platform for ambitious local businesses.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Product</h3>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/auth/signin" className="text-gray-400 hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Support</h3>
              <ul className="space-y-3">
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><span className="text-gray-400">Help Center (Coming Soon)</span></li>
                <li><span className="text-gray-400">Video Tutorials (Coming Soon)</span></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-bold mb-6 text-lg">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© 2024 BPA. All rights reserved.</p>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">Made with</span>
                <Heart className="h-4 w-4 text-red-500" />
                <span className="text-gray-400 text-sm">for local businesses</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
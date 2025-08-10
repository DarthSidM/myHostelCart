import { Button } from "../components/landingComponents/Button";
import { Card } from "../components/landingComponents/Card";
import { CardContent } from "../components/landingComponents/CardContent";
import { Badge } from "../components/landingComponents/Badge";
import { ArrowRight, Users, Shield, Zap, Star, Package, Search } from "lucide-react";
import { Link } from "react-router-dom";
import hero from "../assets/file1.svg";

// Add smooth scrolling globally (if not already in your CSS)
const style = document.createElement("style");
style.innerHTML = `html { scroll-behavior: smooth; }`;
document.head.appendChild(style);

export default function Landing() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                {/* <Package className="w-5 h-5 text-white" /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>

                            </div>
                            <span className="text-xl font-bold text-gray-900">Hostel Cart</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-600 hover:text-blue-600 transition">
                                Features
                            </a>
                            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">
                                How it Works
                            </a>
                            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition">
                                Reviews
                            </a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="ghost" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/signup">Sign Up</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                                    🎓 Built for Students
                                </Badge>
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                    Welcome to <span className="text-blue-600">Hostel Cart</span>
                                </h1>
                                <p className="text-xl text-blue-600 font-semibold">Why Buy New? Buy Smart with Hostel Cart</p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    A student marketplace where seniors sell and juniors discover amazing pre-owned items—smart,
                                    sustainable, and affordable.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button size="lg" className="text-lg px-8 py-6 shrink-0" asChild>
                                    <Link to="/home" className="flex items-center">
                                        Explore <ArrowRight className="ml-2 w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="text-lg px-8 py-6 shrink-0" asChild>
                                    <Link to="/login" className="flex items-center">
                                        Login
                                    </Link>
                                </Button>
                            </div>



                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <Card className="border-blue-100 bg-blue-50/50">
                                    <CardContent className="p-4 text-center">
                                        <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-gray-700">Easy Listings</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-blue-100 bg-blue-50/50">
                                    <CardContent className="p-4 text-center">
                                        <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-gray-700">Verified Users</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-blue-100 bg-blue-50/50">
                                    <CardContent className="p-4 text-center">
                                        <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-gray-700">Secure Deals</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-3xl transform rotate-3 opacity-10"></div>
                            <img
                                src={hero}
                                alt="Hostel Cart Hero"
                                width={600}
                                height={500}
                                className="relative z-10 w-full h-auto object-contain rounded-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">5000+</div>
                            <div className="text-gray-600 mt-1">Active Students</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">15000+</div>
                            <div className="text-gray-600 mt-1">Items Sold</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">200+</div>
                            <div className="text-gray-600 mt-1">Colleges</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">₹50L+</div>
                            <div className="text-gray-600 mt-1">Money Saved</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Hostel Cart?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Built specifically for students, by students. Experience the smartest way to buy and sell in your hostel.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-gray-100 hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <Search className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Discovery</h3>
                                <p className="text-gray-600">
                                    Find exactly what you need with our intelligent search and category filters designed for student
                                    essentials.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-100 hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <Shield className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Verified Community</h3>
                                <p className="text-gray-600">
                                    Trade with confidence in our verified student community. Every user is authenticated with their
                                    college ID.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-100 hover:shadow-lg transition-shadow">
                            <CardContent className="p-8">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                                    <Zap className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Connect</h3>
                                <p className="text-gray-600">
                                    Connect with sellers instantly through our in-app messaging. Negotiate, ask questions, and close deals
                                    fast.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600">Get started in just 3 simple steps</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign Up</h3>
                            <p className="text-gray-600">Create your account with your college email and get verified instantly.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Browse & List</h3>
                            <p className="text-gray-600">Discover amazing deals or list your items with just a few taps.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-2xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect & Trade</h3>
                            <p className="text-gray-600">Chat with buyers/sellers and complete your transaction safely.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What Students Say</h2>
                        <p className="text-xl text-gray-600">Join thousands of happy students</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-gray-100">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6">
                                    "Sold my old textbooks in just 2 days! The process was so smooth and I got a great price."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-600 font-semibold">A</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Ritik</div>
                                        <div className="text-sm text-gray-500">DTU</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-gray-100">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6">
                                    "Found an amazing laptop at 40% off! The seller was genuine and the transaction was secure."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-600 font-semibold">R</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Adrishikhar Deka</div>
                                        <div className="text-sm text-gray-500">NSUT</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-gray-100">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-6">
                                    "Perfect for hostel life! Got everything I needed for my room at student-friendly prices."
                                </p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-600 font-semibold">P</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Parth Langar</div>
                                        <div className="text-sm text-gray-500">BITS Goa</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Trading?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of students who are already saving money and living sustainably.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                            <Link to="/signup" className="flex items-center">
                                Sign Up Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600"
                            asChild
                        >
                            <Link to="/login" className="flex items-center">
                                Login
                            </Link>
                        </Button>
                    </div>

                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    {/* <Package className="w-5 h-5 text-white" /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-bold">Hostel Cart</span>
                            </div>
                            <p className="text-gray-400">The smartest way for students to buy and sell pre-owned items.</p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#features" className="hover:text-white transition">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#how-it-works" className="hover:text-white transition">
                                        How it Works
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Pricing
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Safety
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Terms
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Cookies
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Hostel Cart. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

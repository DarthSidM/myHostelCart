export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg mb-4">
          Welcome to <span className="font-semibold text-blue-600">The Hostel Cart</span>, your one-stop platform for buying and selling pre-owned essentials for hostel life. We understand the challenges of student living—tight budgets, temporary stays, and the need for affordable yet reliable products.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Our Mission</h2>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>Make student life easier by providing a hassle-free platform to buy and sell pre-owned goods.</li>
          <li>Promote affordability by ensuring students get quality items at reasonable prices.</li>
          <li>Encourage sustainability by reducing waste through the reuse of essential items.</li>
          <li>Help final-year students sell their belongings to freshers or juniors before leaving college, making transitions smoother for everyone.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">What We Offer</h2>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          <li>A user-friendly platform to list and find hostel essentials.</li>
          <li>Secure and seamless buyer-seller interactions.</li>
          <li>A diverse range of products, including furniture, electronics, books, and more.</li>
          <li>A dedicated space for outgoing students to connect with incoming students for easy item exchanges.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-blue-100 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-blue-700">Convenience</h3>
            <p className="text-gray-600 text-sm">List and purchase items effortlessly.</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-green-700">Cost-Effective</h3>
            <p className="text-gray-600 text-sm">Save money by buying pre-owned products.</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-yellow-700">Eco-Friendly</h3>
            <p className="text-gray-600 text-sm">Support a circular economy by reducing waste.</p>
          </div>
        </div>
        <p className="text-gray-700 text-lg text-center mt-6">Join <span className="font-semibold text-blue-600">The Hostel Cart</span> today and be a part of a smarter, more sustainable student community!</p>
      </div>
    </div>
  );
}

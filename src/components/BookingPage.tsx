import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

function BookingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    carSelection: '',
    rentalDate: '',
    pickupDelivery: '',
    location: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const losAngelesVehicles = [
    { name: 'Lamborghini Urus', location: 'Los Angeles' },
    { name: '2025 Lamborghini Urus SE', location: 'Los Angeles' },
    { name: 'Mercedes-Maybach GLS 600', location: 'Los Angeles' },
    { name: '2025 Mercedes-AMG G63', location: 'Los Angeles' },
    { name: '2025 Mercedes-Benz GLE', location: 'Los Angeles' },
    { name: '2025 Rolls-Royce Cullinan Series II (Chauffeur Services)', location: 'Los Angeles' },
    { name: 'Maybach / Urus Chauffeur Services', location: 'Los Angeles' }
  ];

  const lasVegasVehicles = [
    { name: 'Mercedes-Benz GLE Coupe', location: 'Las Vegas' },
    { name: 'Mercedes-AMG G63', location: 'Las Vegas' }
  ];

  const vehicles = [...losAngelesVehicles, ...lasVegasVehicles];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('https://hook.us2.make.com/nkteg3qc09cv5rlou48t7nvnwf1elhud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Booking submitted successfully! We will contact you soon.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          carSelection: '',
          rentalDate: '',
          pickupDelivery: '',
          location: ''
        });
      } else {
        setSubmitMessage('There was an error submitting your booking. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('There was an error submitting your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-silver font-sans relative futuristic-grid">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-silver to-transparent animate-pulse"></div>

      <div className="absolute top-8 left-8 z-20">
        <Link to="/">
          <button className="bg-black border border-silver/30 hover:border-silver px-6 py-3 text-silver font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-silver/20">
            Back to Home
          </button>
        </Link>
      </div>

      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
        <LanguageSwitcher />
      </div>

      <section className="py-20 px-4 max-w-2xl mx-auto fade-in-up pt-32">
        <h2 className="text-4xl md:text-5xl font-light tracking-wide text-center mb-16 text-silver glow-text font-display">
          Reserve a Vehicle
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8 slide-in-left">
          <div>
            <label className="block text-silver mb-2 font-medium text-lg">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full bg-black border border-silver/30 p-4 text-silver focus:border-silver focus:outline-none transition-colors duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-silver mb-2 font-medium text-lg">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-black border border-silver/30 p-4 text-silver focus:border-silver focus:outline-none transition-colors duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-silver mb-2 font-medium text-lg">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-black border border-silver/30 p-4 text-silver focus:border-silver focus:outline-none transition-colors duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-silver mb-2 font-medium text-lg">Car Selection</label>
            <select
              name="carSelection"
              value={formData.carSelection}
              onChange={handleInputChange}
              className="w-full bg-black border border-silver/30 p-4 text-silver focus:border-silver focus:outline-none transition-colors duration-300"
              required
            >
              <option value="">Select a vehicle</option>
              {vehicles.map((vehicle, index) => (
                <option key={index} value={vehicle.name}>
                  {vehicle.name} ({vehicle.location})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-silver mb-2 font-medium text-lg">Rental Date</label>
            <input
              type="date"
              name="rentalDate"
              value={formData.rentalDate}
              onChange={handleInputChange}
              className="w-full bg-black border border-silver/30 p-4 text-silver focus:border-silver focus:outline-none transition-colors duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-silver mb-4 font-medium text-lg">Pickup or Delivery</label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pickupDelivery"
                  value="pickup"
                  checked={formData.pickupDelivery === 'pickup'}
                  onChange={handleInputChange}
                  className="mr-3 w-4 h-4 text-silver bg-black border-silver focus:ring-silver focus:ring-2"
                  required
                />
                <span className="text-silver">Pickup</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="pickupDelivery"
                  value="delivery"
                  checked={formData.pickupDelivery === 'delivery'}
                  onChange={handleInputChange}
                  className="mr-3 w-4 h-4 text-silver bg-black border-silver focus:ring-silver focus:ring-2"
                />
                <span className="text-silver">Delivery</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-silver mb-4 font-medium text-lg">Location</label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value="Los Angeles"
                  checked={formData.location === 'Los Angeles'}
                  onChange={handleInputChange}
                  className="mr-3 w-4 h-4 text-silver bg-black border-silver focus:ring-silver focus:ring-2"
                  required
                />
                <span className="text-silver">Los Angeles</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value="Las Vegas"
                  checked={formData.location === 'Las Vegas'}
                  onChange={handleInputChange}
                  className="mr-3 w-4 h-4 text-silver bg-black border-silver focus:ring-silver focus:ring-2"
                />
                <span className="text-silver">Las Vegas</span>
              </label>
            </div>
          </div>

          {submitMessage && (
            <div className={`p-4 border text-center ${submitMessage.includes('successfully') ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'}`}>
              {submitMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-black border-2 border-silver py-4 text-silver font-semibold tracking-wide hover:shadow-lg hover:shadow-silver/20 transition-all duration-500 hover:border-silver/80 hover-glow animate-pulse-glow text-lg font-display ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        </form>
      </section>

      <footer className="bg-black border-t border-silver/30 py-12 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-silver font-semibold mb-4 text-lg glow-text">Navigation</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-silver hover:text-silver/80 transition-colors">Home</Link>
                <a href="/#fleet" className="block text-silver hover:text-silver/80 transition-colors">Vehicles</a>
                <Link to="/book" className="block text-silver hover:text-silver/80 transition-colors">Book</Link>
              </div>
            </div>

            <div>
              <h4 className="text-silver font-semibold mb-4 text-lg glow-text">Social Media</h4>
              <div className="space-y-2">
                <a href="https://www.instagram.com/veloceluxuryrentals/" target="_blank" rel="noopener noreferrer" className="block text-silver hover:text-silver/80 transition-colors">Instagram</a>
                <a href="#" className="block text-silver hover:text-silver/80 transition-colors">TikTok</a>
                <a href="#" className="block text-silver hover:text-silver/80 transition-colors">YouTube</a>
              </div>
            </div>

            <div>
              <h4 className="text-silver font-semibold mb-4 text-lg glow-text">Legal</h4>
              <p className="text-silver text-sm">
                © 2025 Veloce Auto Group Corporation. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BookingPage;

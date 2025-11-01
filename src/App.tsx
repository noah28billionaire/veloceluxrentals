import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    carSelection: '',
    rentalDate: '',
    pickupDelivery: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [carouselIndexes, setCarouselIndexes] = useState<{ [key: string]: number }>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [lightboxVehicleName, setLightboxVehicleName] = useState('');
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  const vehicleImages: { [key: string]: string[] } = {
    '2025 Mercedes-AMG G63': [
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3o9regUMjeHiR4tsxIGCqvOzQnpFkAXcd2w5S',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3fw9caI2tDwFUZ3zxOR8jHQ5LusWTb1i49Jcg',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3wRNcM2XobEF3Y8hJAKiMzk4dPVDSrta95qH1',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3XhCVkEulXHMj0SkBnYD9wK2gyJaEPzWd5c7V',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp32idj43mWzk4UhYosT95FjVScBrgv0LMlKR6w'
    ],
    'Mercedes-AMG G63': [
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3o9regUMjeHiR4tsxIGCqvOzQnpFkAXcd2w5S',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3fw9caI2tDwFUZ3zxOR8jHQ5LusWTb1i49Jcg',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3wRNcM2XobEF3Y8hJAKiMzk4dPVDSrta95qH1',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3XhCVkEulXHMj0SkBnYD9wK2gyJaEPzWd5c7V',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp32idj43mWzk4UhYosT95FjVScBrgv0LMlKR6w'
    ],
    '2025 Rolls-Royce Cullinan Series II (Chauffeur Services)': [
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3MTpJ53RsCz5TFEQ9U4IPq1XZVSrWeckBvbJA',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3utyJjqARH62bm9DoeVkC4dJ8S1W7Bv3UELGp'
    ],
    '2025 Lamborghini Urus SE': [
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3g8SI7HYMcuUiLJ1yBWpnqhKxXAoG0vltYkDd',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp37bVhW7SkeijsOp9x4NTaHCltc5QJPgWduBED',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3l3dxfKD6FPh9dD8tENBurXKsqbYGW7cVeH45',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3PhDFxc9B357QpgDscIUGzRYoaXHMbV0rxJEW',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3zsZ7u2Xph1xNnXZUEuPvz6Qi78Kjdwr4mHVJ',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3f4vFFEP2tDwFUZ3zxOR8jHQ5LusWTb1i49Jc',
      'https://i0ormj1chw.ufs.sh/f/jSQgePPnosp3BOMIpAeVG74iqS9doFAKyTzuaQe62NWbZvkE'
    ]
  };

  const losAngelesVehicles = [
    {
      name: 'Lamborghini Aventador SV Roadster',
      rates: '$300/hr • $800/4 hrs • $1,200/8 hrs • $1,800/24 hrs',
      description: 'An exclusive open-top supercar with striking design and rare performance. A unique opportunity for a truly standout experience.',
      location: 'Los Angeles'
    },
    {
      name: 'Lamborghini Urus',
      rates: '$200/hr • $400/4 hrs • $600/8 hrs • $900/24 hrs',
      description: 'A bold and dynamic SUV that blends power and style. Ideal for drivers seeking a distinctive presence on the road.',
      location: 'Los Angeles'
    },
    {
      name: '2025 Lamborghini Urus SE',
      rates: '$200/hr • $400/4 hrs • $600/8 hrs • $900/24 hrs',
      description: 'A powerhouse SUV blending exotic speed with luxury comfort. Ideal for those craving performance and attention in every mile.',
      location: 'Los Angeles'
    },
    {
      name: 'Mercedes-Maybach GLS 600',
      rates: '$100/hr • $300/4 hrs • $500/8 hrs • $700/24 hrs',
      description: 'An ultra-luxury SUV designed for elevated comfort and smooth driving. A refined choice for those who appreciate sophistication.',
      location: 'Los Angeles'
    },
    {
      name: '2025 Mercedes-AMG G63',
      rates: '$250/hr • $500/4 hrs • $700/8 hrs • $1,000/24 hrs',
      description: 'Iconic, bold, and unstoppable. A luxury off-roader with a thunderous V8 and unmistakable design that turns every drive into an event.',
      location: 'Los Angeles'
    },
    {
      name: '2025 Mercedes-Benz GLE',
      rates: '$200/hr • $400/4 hrs • $600/8 hrs • $900/24 hrs',
      description: 'A refined luxury SUV with smooth performance and cutting-edge tech. Perfect for families or professionals seeking style and versatility.',
      location: 'Los Angeles'
    },
    {
      name: '2025 Rolls-Royce Cullinan Series II (Chauffeur Services)',
      rates: '$200/hr • $300 drop-off/pickup • $500/4 hrs • $800/8 hrs',
      description: 'The pinnacle of elegance and quiet strength. Experience ultimate comfort, handcrafted detail, and commanding presence on any road.',
      location: 'Los Angeles'
    },
    {
      name: 'Maybach / Urus Chauffeur Services',
      rates: '$150/hr • $250 drop-off/pickup • $400/4 hrs • $650/8 hrs',
      description: 'Exclusive driver experience offering premium comfort and convenience for nightlife or corporate events.',
      location: 'Los Angeles'
    }
  ];

  const lasVegasVehicles = [
    {
      name: 'Mercedes-Benz GLE Coupe',
      rates: '$200/hr • $400/4 hrs • $600/8 hrs • $900/24 hrs',
      description: 'A sleek and stylish SUV coupe with a modern look. A versatile choice for city drives or weekend escapes.',
      location: 'Las Vegas'
    },
    {
      name: 'Mercedes-AMG G63',
      rates: '$250/hr • $500/4 hrs • $700/8 hrs • $1,000/24 hrs',
      description: 'A commanding SUV with a strong silhouette and elevated performance. A go-to option for those who demand both luxury and power.',
      location: 'Las Vegas'
    }
  ];

  const vehicles = [...losAngelesVehicles, ...lasVegasVehicles];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextImage = (vehicleName: string, totalImages: number) => {
    setCarouselIndexes(prev => ({
      ...prev,
      [vehicleName]: ((prev[vehicleName] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (vehicleName: string, totalImages: number) => {
    setCarouselIndexes(prev => ({
      ...prev,
      [vehicleName]: ((prev[vehicleName] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const openLightbox = (imageSrc: string, vehicleName: string, images: string[]) => {
    setLightboxImage(imageSrc);
    setLightboxVehicleName(vehicleName);
    setLightboxImages(images);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage('');
    setLightboxVehicleName('');
    setLightboxImages([]);
    document.body.style.overflow = 'auto';
  };

  const nextLightboxImage = () => {
    const currentIndex = lightboxImages.indexOf(lightboxImage);
    const nextIndex = (currentIndex + 1) % lightboxImages.length;
    setLightboxImage(lightboxImages[nextIndex]);
  };

  const prevLightboxImage = () => {
    const currentIndex = lightboxImages.indexOf(lightboxImage);
    const prevIndex = (currentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    setLightboxImage(lightboxImages[prevIndex]);
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
          pickupDelivery: ''
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
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-silver to-transparent animate-pulse"></div>
        <div className="absolute top-8 left-0 right-0 z-20 fade-in-up">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wider text-silver font-display glow-text">
            Veloce Auto Group Corporation
          </h1>
        </div>
        <div className="w-full h-96 md:h-[500px] lg:h-[600px] relative z-0 mt-20 fade-in-up">
          <spline-viewer url="https://prod.spline.design/9AVUa1bDYykLxFQ6/scene.splinecode" className="w-full h-full"></spline-viewer>
        </div>
        <div className="relative z-10 p-6 md:p-8 max-w-4xl mx-auto -mt-8 fade-in-up">
          <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-wide mb-4 text-silver glow-text">
            Experience Luxury in Motion
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-light tracking-wide mb-6 text-silver opacity-90 max-w-2xl mx-auto">
            Where automotive excellence meets unparalleled service. Discover our exclusive fleet of premium vehicles.
          </p>
          <button className="bg-black border-2 border-silver px-12 md:px-16 py-6 md:py-8 text-silver font-semibold tracking-wide hover:shadow-lg hover:shadow-silver/20 transition-all duration-500 hover:border-silver/80 text-lg md:text-xl lg:text-2xl min-w-[200px] md:min-w-[300px] hover-glow animate-pulse-glow font-display">
            Book Now
          </button>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto relative">
        <h2 className="text-4xl md:text-5xl font-light tracking-wide text-center mb-16 text-silver glow-text font-display slide-in-left">
          Our Fleet
        </h2>

        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-12 text-silver glow-text">
            Los Angeles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto slide-in-right">
            {losAngelesVehicles.map((vehicle, index) => {
              const hourlyRate = vehicle.rates.split('•')[0].trim();
              const images = vehicleImages[vehicle.name];
              const currentImageIndex = carouselIndexes[vehicle.name] || 0;

              return (
                <div
                  key={index}
                  className="relative bg-black border border-silver/30 transition-all duration-500 hover:border-silver hover:shadow-2xl hover:shadow-silver/30 group cursor-pointer flex flex-col"
                >
                  <div className="p-6 group-hover:p-0 transition-all duration-500">
                    <div className="group-hover:hidden relative z-10">
                      <h4 className="text-lg md:text-xl font-bold text-silver tracking-wide">
                        {vehicle.name}
                      </h4>
                      <p className="text-silver/90 font-semibold text-xl mt-2">
                        {hourlyRate}
                      </p>
                    </div>

                    {images && (
                      <div className="relative hidden group-hover:block w-full h-[400px]">
                        <img
                          src={images[currentImageIndex]}
                          alt={`${vehicle.name} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-contain cursor-zoom-in"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(images[currentImageIndex], vehicle.name, images);
                          }}
                        />

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage(vehicle.name, images.length);
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 border border-silver/30 hover:border-silver p-2 transition-all duration-300 z-30"
                        >
                          <ChevronLeft className="w-5 h-5 text-silver" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage(vehicle.name, images.length);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 border border-silver/30 hover:border-silver p-2 transition-all duration-300 z-30"
                        >
                          <ChevronRight className="w-5 h-5 text-silver" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                          {images.map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === currentImageIndex ? 'bg-silver w-6' : 'bg-silver/40'
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="hidden group-hover:block p-6 bg-black border-t border-silver/30">
                    <h4 className="text-lg md:text-xl font-bold text-silver tracking-wide glow-text mb-2">
                      {vehicle.name}
                    </h4>
                    <p className="text-silver/90 font-semibold text-xl mb-3">
                      {hourlyRate}
                    </p>
                    <p className="text-silver/70 text-sm mb-3 leading-relaxed">
                      {vehicle.description}
                    </p>
                    <p className="text-silver/80 text-sm font-light">
                      {vehicle.rates}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-light tracking-wide text-center mb-12 text-silver glow-text">
            Las Vegas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto slide-in-right">
            {lasVegasVehicles.map((vehicle, index) => {
              const hourlyRate = vehicle.rates.split('•')[0].trim();
              const images = vehicleImages[vehicle.name];
              const currentImageIndex = carouselIndexes[vehicle.name] || 0;

              return (
                <div
                  key={index}
                  className="relative bg-black border border-silver/30 transition-all duration-500 hover:border-silver hover:shadow-2xl hover:shadow-silver/30 group cursor-pointer flex flex-col"
                >
                  <div className="p-6 group-hover:p-0 transition-all duration-500">
                    <div className="group-hover:hidden relative z-10">
                      <h4 className="text-lg md:text-xl font-bold text-silver tracking-wide">
                        {vehicle.name}
                      </h4>
                      <p className="text-silver/90 font-semibold text-xl mt-2">
                        {hourlyRate}
                      </p>
                    </div>

                    {images && (
                      <div className="relative hidden group-hover:block w-full h-[400px]">
                        <img
                          src={images[currentImageIndex]}
                          alt={`${vehicle.name} - Image ${currentImageIndex + 1}`}
                          className="w-full h-full object-contain cursor-zoom-in"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(images[currentImageIndex], vehicle.name, images);
                          }}
                        />

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage(vehicle.name, images.length);
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 border border-silver/30 hover:border-silver p-2 transition-all duration-300 z-30"
                        >
                          <ChevronLeft className="w-5 h-5 text-silver" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage(vehicle.name, images.length);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 border border-silver/30 hover:border-silver p-2 transition-all duration-300 z-30"
                        >
                          <ChevronRight className="w-5 h-5 text-silver" />
                        </button>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                          {images.map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === currentImageIndex ? 'bg-silver w-6' : 'bg-silver/40'
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="hidden group-hover:block p-6 bg-black border-t border-silver/30">
                    <h4 className="text-lg md:text-xl font-bold text-silver tracking-wide glow-text mb-2">
                      {vehicle.name}
                    </h4>
                    <p className="text-silver/90 font-semibold text-xl mb-3">
                      {hourlyRate}
                    </p>
                    <p className="text-silver/70 text-sm mb-3 leading-relaxed">
                      {vehicle.description}
                    </p>
                    <p className="text-silver/80 text-sm font-light">
                      {vehicle.rates}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 px-4 max-w-2xl mx-auto fade-in-up">
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

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-silver hover:text-white text-4xl font-light transition-colors duration-300 z-50"
          >
            &times;
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightboxImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 border border-silver/30 hover:border-silver p-4 transition-all duration-300 z-50"
          >
            <ChevronLeft className="w-8 h-8 text-silver" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightboxImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 border border-silver/30 hover:border-silver p-4 transition-all duration-300 z-50"
          >
            <ChevronRight className="w-8 h-8 text-silver" />
          </button>

          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img
              src={lightboxImage}
              alt={lightboxVehicleName}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 border border-silver/30 px-6 py-3">
              <p className="text-silver text-lg font-light tracking-wide">{lightboxVehicleName}</p>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {lightboxImages.map((img, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  img === lightboxImage ? 'bg-silver w-8' : 'bg-silver/40'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImage(img);
                }}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black border-t border-silver/30 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-silver font-semibold mb-4 text-lg glow-text">Navigation</h4>
              <div className="space-y-2">
                <a href="#" className="block text-silver hover:text-silver/80 transition-colors">Home</a>
                <a href="#" className="block text-silver hover:text-silver/80 transition-colors">Vehicles</a>
                <a href="#" className="block text-silver hover:text-silver/80 transition-colors">Book</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-silver font-semibold mb-4 text-lg glow-text">Social Media</h4>
              <div className="space-y-2">
                <a href="#" className="block text-silver hover:text-silver/80 transition-colors">Instagram</a>
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

export default App;
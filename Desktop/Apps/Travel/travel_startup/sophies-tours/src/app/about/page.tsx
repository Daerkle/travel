import React from 'react';
import Header from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Sophie's Tours</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Combining authentic African adventures with comprehensive health and wellness programs 
            to create truly transformative travel experiences.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-night mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Sophie's Tours was born from a passion for authentic African experiences and a deep commitment 
                to traveler wellness. Founded by Sophie, an experienced travel professional with over 15 years 
                in the industry, our company bridges the gap between adventure travel and health optimization.
              </p>
              <p className="text-gray-700 mb-4">
                After witnessing how travel can transform lives, Sophie partnered with Zinzino, a leading 
                health and wellness company, to create a unique approach to safari travel that prepares, 
                supports, and follows up on your health throughout your journey.
              </p>
              <p className="text-gray-700">
                Today, we specialize in creating bespoke African safari experiences that not only showcase 
                the continent's incredible wildlife and landscapes but also prioritize your health and 
                well-being every step of the way.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary via-earth to-savanna rounded-lg p-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold text-night mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Authentic local experiences</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Comprehensive health program</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Small group sizes</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Expert local guides</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Sustainable tourism practices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Zinzino Partnership */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-night mb-4">The Zinzino Difference</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our partnership with Zinzino brings a revolutionary approach to travel wellness, 
              ensuring you're optimally prepared for your African adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-bold text-night mb-3">Scientific Approach</h3>
              <p className="text-gray-600">
                Advanced blood testing and analysis to understand your unique health profile 
                and nutritional needs before you travel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-bold text-night mb-3">Personalized Program</h3>
              <p className="text-gray-600">
                Customized supplement regimen and wellness plan designed specifically 
                for your body's needs and travel schedule.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-bold text-night mb-3">Ongoing Support</h3>
              <p className="text-gray-600">
                Continuous health monitoring and support throughout your journey and 
                follow-up care to maintain your optimal wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-night mb-4">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">🌍</span>
              </div>
              <h3 className="text-lg font-bold text-night mb-2">Authenticity</h3>
              <p className="text-gray-600 text-sm">
                Genuine cultural experiences that respect local traditions and communities.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-forest to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">🤝</span>
              </div>
              <h3 className="text-lg font-bold text-night mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                Responsible tourism that benefits local communities and preserves natural habitats.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">💚</span>
              </div>
              <h3 className="text-lg font-bold text-night mb-2">Wellness</h3>
              <p className="text-gray-600 text-sm">
                Prioritizing your health and well-being throughout every aspect of your journey.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-earth to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">⭐</span>
              </div>
              <h3 className="text-lg font-bold text-night mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                Uncompromising commitment to quality in every detail of your travel experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-forest to-primary py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your African Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us for an extraordinary journey that will transform not just your perspective, 
            but your health and well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tours"
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-savanna transition-colors"
            >
              Explore Our Tours
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-night transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
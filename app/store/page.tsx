import React from 'react'
import { ShoppingBag } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import storeData from '@/data/store.json'

export default function StorePage() {
  return (
    <>
      <Hero
        title="EdLight Store"
        subtitle="Support our mission while getting great products"
        backgroundImage="/hero.jpg"
      />

  <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Shop EdLight"
            subtitle="All proceeds support educational programs for Haitian youth"
            centered
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {storeData.map((product) => (
              <div key={product.id} className="glass rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-white/30 flex items-center justify-center">
                  <ShoppingBag size={48} className="text-primary" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <button className="px-4 py-2 bg-white/30 text-gray-600 rounded-lg font-medium cursor-not-allowed">
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-gray-600 mb-4">
              {/* TODO: Integrate e-commerce platform (Shopify, WooCommerce, or Stripe) */}
              Our online store is launching soon! In the meantime, you can support our work through
              direct donations.
            </p>
            <a
              href="/get-involved#donate"
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Make a Donation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

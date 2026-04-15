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
        backgroundImage="/about_us.webp"
      />

      <section className="bg-surface py-20 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Shop EdLight"
            subtitle="All proceeds support educational programs for Haitian youth"
            centered
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {storeData.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-3xl border border-outline/20 bg-surface-container-lowest shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="aspect-square bg-surface-container-low flex items-center justify-center">
                  <ShoppingBag size={48} className="text-primary" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-heading text-lg font-semibold text-primary">{product.name}</h3>
                  <p className="mb-4 text-sm text-on-surface-variant">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <button className="cursor-not-allowed rounded-xl border border-outline/30 bg-surface-container-low px-4 py-2 font-medium text-on-surface-variant">
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="mb-4 text-on-surface-variant">
              {/* TODO: Integrate e-commerce platform (Shopify, WooCommerce, or Stripe) */}
              Our online store is launching soon! In the meantime, you can support our work through
              direct donations.
            </p>
            <a
              href="/get-involved#donate"
              className="btn btn-primary"
            >
              Make a Donation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

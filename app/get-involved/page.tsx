'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Users, Handshake, DollarSign, Mic, ShieldCheck } from 'lucide-react'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'

declare global {
  interface Window {
    PayPal?: {
      Donation: {
        Button: (config: {
          env: string
          hosted_button_id: string
          image: {
            src: string
            alt: string
            title: string
          }
        }) => {
          render: (selector: string) => void
        }
      }
    }
  }
}

const waysToGetInvolved = [
  {
    title: 'Volunteer',
    description: 'Share your skills and time to mentor students, teach courses, or support operations.',
    icon: <Users size={32} />,
  },
  {
    title: 'Partner',
    description: 'Organizations and institutions can partner with us to expand opportunities for students.',
    icon: <Handshake size={32} />,
  },
  {
    title: 'Donate',
    description: 'Financial support helps us provide free education and resources to more students.',
    icon: <DollarSign size={32} />,
  },
  {
    title: 'Speak',
    description: 'Inspire our students by sharing your story and expertise as a guest speaker.',
    icon: <Mic size={32} />,
  },
]

type FormData = {
  name: string
  email: string
  interest: string
  message: string
}

export default function GetInvolvedPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  useEffect(() => {
    // Load PayPal Donation SDK
    const script = document.createElement('script')
    script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js'
    script.charset = 'UTF-8'
    script.async = true
    
    script.onload = () => {
      if (window.PayPal) {
        window.PayPal.Donation.Button({
          env: 'production',
          hosted_button_id: '6AKKBQXK47EZU',
          image: {
            src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
            alt: 'Donate with PayPal button',
            title: 'PayPal - The safer, easier way to pay online!',
          }
        }).render('#donate-button')
      }
    }
    
    document.body.appendChild(script)
    
    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const onSubmit = (data: FormData) => {
    // TODO: Integrate with backend API or Firebase to handle form submissions
    console.log('Form submitted:', data)
    alert('Thank you for your interest! We will be in touch soon.')
    reset()
  }

  return (
    <>
      <Hero
        title="Get Involved"
        subtitle="Join us in empowering the next generation of Haitian innovators"
        backgroundImage="/hero.jpg"
      />

    <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Ways to Get Involved"
            subtitle="There are many ways you can support our mission"
            centered
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {waysToGetInvolved.map((way) => (
              <Card
                key={way.title}
                title={way.title}
                description={way.description}
                icon={way.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="donate" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeader title="Support Our Work" centered />
            <p className="text-gray-700 mb-8">
              Your donation directly supports scholarships, program costs, and resources for
              students. Every contribution makes a difference.
            </p>
            <div className="glass rounded-2xl p-8 mb-8">
              <div className="flex flex-col items-center gap-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white/90">
                  <ShieldCheck size={16} />
                  Secure PayPal Checkout
                </span>
                <div id="donate-button-container" className="inline-flex justify-center">
                  <div id="donate-button"></div>
                </div>
                <p className="text-xs text-white/70">
                  Powered by PayPal. Choose a one-time gift or set up monthly support.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              EdLight Initiative is committed to transparency. 100% of donations go directly to
              programs and student support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <SectionHeader title="Contact Us" centered />
            <div className="glass rounded-2xl p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

                <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                  I&apos;m interested in *
                </label>
                <select
                  id="interest"
                  {...register('interest', { required: 'Please select an option' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="partner">Partnership</option>
                  <option value="donate">Donation</option>
                  <option value="speak">Guest Speaking</option>
                  <option value="other">Other</option>
                </select>
                {errors.interest && (
                  <p className="mt-1 text-sm text-red-600">{errors.interest.message}</p>
                )}
              </div>

                <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message', { required: 'Message is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

                <button type="submit" className="btn btn-primary w-full justify-center">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

import { Metadata } from 'next'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import Card from '@/components/Card'
import { Code, Briefcase, Languages, TrendingUp, Camera, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Courses | EdLight Initiative',
  description: 'Explore our free online courses in technology, business, languages, and personal development.',
}

export default function CoursesPage() {
  const courseCategories = [
    {
      title: 'Technology & Programming',
      icon: <Code size={40} className="text-blue-600" />,
      courses: [
        {
          name: 'Web Development Fundamentals',
          level: 'Beginner',
          duration: '8 weeks',
          description: 'Learn HTML, CSS, and JavaScript to build your first website'
        },
        {
          name: 'Python Programming',
          level: 'Beginner',
          duration: '6 weeks',
          description: 'Master Python basics and build practical applications'
        },
        {
          name: 'Mobile App Development',
          level: 'Intermediate',
          duration: '10 weeks',
          description: 'Create Android and iOS apps using modern frameworks'
        },
        {
          name: 'Database Design & SQL',
          level: 'Intermediate',
          duration: '6 weeks',
          description: 'Learn to design and manage databases efficiently'
        }
      ]
    },
    {
      title: 'Business & Entrepreneurship',
      icon: <Briefcase size={40} className="text-green-600" />,
      courses: [
        {
          name: 'Entrepreneurship Essentials',
          level: 'Beginner',
          duration: '6 weeks',
          description: 'Learn how to start and grow your own business'
        },
        {
          name: 'Digital Marketing',
          level: 'Beginner',
          duration: '8 weeks',
          description: 'Master social media marketing, SEO, and content marketing'
        },
        {
          name: 'Business Plan Development',
          level: 'Intermediate',
          duration: '4 weeks',
          description: 'Create a comprehensive business plan for your startup'
        },
        {
          name: 'Financial Literacy',
          level: 'Beginner',
          duration: '4 weeks',
          description: 'Understand personal and business financial management'
        }
      ]
    },
    {
      title: 'Languages',
      icon: <Languages size={40} className="text-purple-600" />,
      courses: [
        {
          name: 'English for Beginners',
          level: 'Beginner',
          duration: '12 weeks',
          description: 'Learn English fundamentals for everyday communication'
        },
        {
          name: 'Business English',
          level: 'Intermediate',
          duration: '8 weeks',
          description: 'Professional English for workplace communication'
        },
        {
          name: 'French Conversation',
          level: 'Intermediate',
          duration: '8 weeks',
          description: 'Improve your French speaking and listening skills'
        }
      ]
    },
    {
      title: 'Personal Development',
      icon: <TrendingUp size={40} className="text-yellow-600" />,
      courses: [
        {
          name: 'Leadership Skills',
          level: 'All Levels',
          duration: '6 weeks',
          description: 'Develop essential leadership and team management skills'
        },
        {
          name: 'Public Speaking',
          level: 'All Levels',
          duration: '4 weeks',
          description: 'Build confidence and master public presentation skills'
        },
        {
          name: 'Time Management',
          level: 'All Levels',
          duration: '3 weeks',
          description: 'Learn to manage your time effectively and boost productivity'
        },
        {
          name: 'Critical Thinking',
          level: 'All Levels',
          duration: '4 weeks',
          description: 'Enhance your problem-solving and analytical skills'
        }
      ]
    },
    {
      title: 'Creative Skills',
      icon: <Camera size={40} className="text-pink-600" />,
      courses: [
        {
          name: 'Graphic Design Basics',
          level: 'Beginner',
          duration: '6 weeks',
          description: 'Learn design principles and tools like Canva and GIMP'
        },
        {
          name: 'Video Editing',
          level: 'Beginner',
          duration: '5 weeks',
          description: 'Create professional videos using free editing software'
        },
        {
          name: 'Photography Fundamentals',
          level: 'Beginner',
          duration: '4 weeks',
          description: 'Master smartphone photography and basic editing'
        }
      ]
    }
  ]

  return (
    <>
      <Hero
        title="Our Courses"
        subtitle="Free online courses to help you build valuable skills and transform your future"
        backgroundImage="/EdLight_Academy.webp"
      />

      <main className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Introduction */}
          <section className="mb-16 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="mb-6 text-lg leading-relaxed text-on-surface-variant">
                EdLight Initiative offers free, high-quality online courses designed to help you develop 
                practical skills for the modern workforce. All courses are self-paced and accessible from 
                anywhere with an internet connection.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="rounded-2xl border border-outline/20 bg-surface-container-low p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-on-surface-variant">Free Access</div>
                </div>
                <div className="rounded-2xl border border-outline/20 bg-surface-container-low p-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">45+</div>
                  <div className="text-on-surface-variant">Courses Available</div>
                </div>
                <div className="rounded-2xl border border-outline/20 bg-surface-container-low p-6">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">24/7</div>
                  <div className="text-on-surface-variant">Learn Anytime</div>
                </div>
              </div>
            </div>
          </section>

          {/* Course Categories */}
          {courseCategories.map((category, categoryIndex) => (
            <section key={categoryIndex} className="mb-16">
              <div className="flex items-center mb-8">
                <div className="mr-4">{category.icon}</div>
                <h2 className="text-3xl font-bold text-primary">{category.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {category.courses.map((course, courseIndex) => (
                  <Card key={courseIndex} title={course.name} description={course.description} className="transition hover:shadow-lg">
                    <div className="flex items-start justify-between mb-3">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-on-surface-variant">
                        <BookOpen size={16} className="inline mr-1" />
                        {course.duration}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 font-semibold">
                        Enroll Now →
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}

          {/* How It Works */}
          <section className="mb-16">
            <SectionHeader
              title="How It Works"
              subtitle="Start learning in 3 simple steps"
            />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary">Choose a Course</h3>
                <p className="text-on-surface-variant">
                  Browse our catalog and select a course that matches your interests and goals
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary">Learn at Your Pace</h3>
                <p className="text-on-surface-variant">
                  Access video lessons, practice exercises, and course materials anytime, anywhere
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-tertiary-fixed-dim/20">
                  <span className="text-2xl font-bold text-yellow-600">3</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary">Earn Certificate</h3>
                <p className="text-on-surface-variant">
                  Complete the course and receive a digital certificate to showcase your new skills
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="rounded-3xl bg-gradient-to-r from-primary to-primary-container p-8 text-white md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Learning?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-fixed">
                Join thousands of students who are already learning and building their future with EdLight Academy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/academy"
                  className="btn btn-light"
                >
                  Browse All Courses
                </a>
                <a
                  href="/contact"
                  className="btn btn-ghost"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

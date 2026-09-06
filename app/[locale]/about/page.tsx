import React from 'react'
import { Target, Eye, Users } from 'lucide-react'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import { CORPORATION_NUMBER, REGISTERED_ADDRESS } from '@/lib/site'

// Names are not translatable, so they stay here as literals. `key` indexes the
// job title into messages/<locale>/about.json — about.team.titles.<key> — since
// "Co-Founder & CEO" very much is translatable.
const leadershipTeam = [
  { name: 'Stevenson Michel', key: 'stevensonMichel' },
  { name: 'Ted Jacquet', key: 'tedJacquet' },
  { name: 'Rony Francillon', key: 'ronyFrancillon' },
  { name: 'Hérode Métellus', key: 'herodeMetellus' },
  { name: 'Williamson Michel', key: 'williamsonMichel' },
  { name: 'Christopher Michel', key: 'christopherMichel' },
  { name: 'Stéphane Lainé', key: 'stephaneLaine' },
  { name: 'Fredler Pierre-Louis', key: 'fredlerPierreLouis' },
] as const

// The two founders, named in about.team.foundedBy as ICU values so the
// sentence around them can be translated without retyping the names.
const FOUNDERS = { founderOne: 'Ted Jacquet', founderTwo: 'Stevenson Michel' }

const timeline = [{ key: 'launch' }, { key: 'today' }] as const

export default async function AboutPage({
  params,
}: {
  params: { locale: string }
}) {
  // Required for static rendering under [locale]: without it next-intl
  // has no locale outside a request and falls back to the default.
  setRequestLocale(params.locale)

  const t = await getTranslations('about')

  return (
    <>
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        backgroundImage="/edlight_academy_group.webp"
      />

      {/* Our Story + Mission / Vision */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-4xl mx-auto mb-12 sm:mb-14 md:mb-16">
            <SectionHeader title={t('story.title')} />
            <div className="space-y-5 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>{t('story.p1')}</p>
              <p>{t('story.p2')}</p>
              <p>
                {t('story.p3', {
                  number: CORPORATION_NUMBER,
                  locality: REGISTERED_ADDRESS.locality,
                  region: REGISTERED_ADDRESS.region,
                })}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-14 md:mb-16 max-w-2xl mx-auto">
            <div className="glass rounded-2xl p-6 sm:p-8 text-center">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                {t('missionVision.missionTitle')}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {t('missionVision.missionBody')}
              </p>
            </div>
            <div className="glass rounded-2xl p-6 sm:p-8 text-center">
              <Eye className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                {t('missionVision.visionTitle')}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {t('missionVision.visionBody')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('team.title')}
            subtitle={t('team.subtitle')}
            centered
          />
          <div className="max-w-4xl mx-auto mt-6 mb-10 sm:mb-12 space-y-3 text-gray-700 leading-relaxed text-sm sm:text-base">
            <p>{t('team.foundedBy', FOUNDERS)}</p>
            <p>{t('team.leadershipIntro')}</p>
          </div>
          <div className="grid gap-6 sm:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {leadershipTeam.map((leader) => (
              <div key={leader.name} className="text-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full glass mx-auto mb-3 sm:mb-4 overflow-hidden">
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <Users size={48} />
                  </div>
                </div>
                <h3 className="font-heading font-bold text-lg text-text">{leader.name}</h3>
                <p className="mt-1 text-primary text-sm font-medium">
                  {t(`team.titles.${leader.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey / Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <SectionHeader
            title={t('journey.title')}
            subtitle={t('journey.subtitle')}
            centered
          />
          <div className="max-w-4xl mx-auto mt-12">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.key} className="flex gap-6">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                      {t(`journey.items.${item.key}.year`)}
                    </span>
                  </div>
                  <div className="relative flex-1 pb-8">
                    {index !== timeline.length - 1 && (
                      <div className="absolute left-0 top-12 bottom-0 w-0.5 bg-blue-200"></div>
                    )}
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t(`journey.items.${item.key}.title`)}
                      </h3>
                      <p className="text-gray-700">{t(`journey.items.${item.key}.description`)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg sm:text-xl font-medium text-gray-800 leading-relaxed">
              {t('closing')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

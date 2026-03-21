import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: { locale: string }
}

export const metadata: Metadata = {
  title: 'Wat Kost een Hovenier per Uur? - Uurtarieven 2024 | Hovenier.frl',
  description: 'Wat kost een hovenier per uur in Friesland? Ontdek alle uurtarieven, regionale verschillen en factoren die de kosten van tuinonderhoud beïnvloeden.',
  keywords: 'hovenier per uur, uurtarieven, tuinonderhoud kosten, hovenier prijzen, Friesland tarieven',
}

export default function HovenierPerUurPage({ params: { locale } }: Props) {
  setRequestLocale(locale)
  const t = useTranslations('pages.hourly-rates')

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat kost een hovenier per uur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Een hovenier kost gemiddeld tussen €35 en €55 per uur in Friesland. De exacte prijs hangt af van ervaring, specialisatie, regio en type werkzaamheden."
        }
      },
      {
        "@type": "Question",
        "name": "Waarom verschillen uurtarieven van hoveniers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Uurtarieven verschillen door ervaring, specialisaties, regio, seizoen, complexiteit van het werk en beschikbaarheid van de hovenier."
        }
      },
      {
        "@type": "Question",
        "name": "Zijn materialen inbegrepen in het uurtarief?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nee, materialen, planten, gereedschap en transport worden meestal apart berekend bovenop het uurtarief voor arbeid."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-gradient-to-br from-sage-50 to-forest-50">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-forest-900 mb-6">
              Wat Kost een Hovenier per Uur?
            </h1>
            <p className="text-xl text-forest-700 mb-8">
              Complete gids voor uurtarieven van hoveniers in Friesland
            </p>
          </div>

          {/* Direct Answer Box - AEO Optimized */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-sage-600 text-white rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Direct Antwoord:</h2>
              <p className="text-lg leading-relaxed">
                Een hovenier kost gemiddeld tussen <strong>€35 en €55 per uur</strong> in Friesland. 
                Startende hoveniers rekenen €35-42 per uur, ervaren professionals €42-48 per uur, 
                en gespecialiseerde experts tot €55 per uur. Dit is exclusief materialen en btw.
              </p>
            </div>
          </section>

          {/* Detailed Price Breakdown */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Uurtarieven per Ervaring & Specialisatie
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-3 text-center">Beginner</h3>
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-sage-600">€35 - €42</p>
                  <p className="text-sm text-forest-600">per uur</p>
                </div>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• 0-3 jaar ervaring</li>
                  <li>• Basis tuinonderhoud</li>
                  <li>• Maaien, wieden, snoeien</li>
                  <li>• Onder supervisie</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-sage-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 6.414V12z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-3 text-center">Ervaren</h3>
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-sage-600">€42 - €48</p>
                  <p className="text-sm text-forest-600">per uur</p>
                </div>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• 3-8 jaar ervaring</li>
                  <li>• Zelfstandig werken</li>
                  <li>• Tuinontwerp & aanleg</li>
                  <li>• Klantencontact</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-forest-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-forest-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-3 text-center">Expert</h3>
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-forest-600">€48 - €55</p>
                  <p className="text-sm text-forest-600">per uur</p>
                </div>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• 8+ jaar ervaring</li>
                  <li>• Specialisaties</li>
                  <li>• Complexe projecten</li>
                  <li>• Bedrijfsleiding</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-3 text-center">Specialist</h3>
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-amber-600">€55 - €75</p>
                  <p className="text-sm text-forest-600">per uur</p>
                </div>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• Groendaken</li>
                  <li>• Boomverzorging</li>
                  <li>• Landschapsarchitect</li>
                  <li>• Unieke expertise</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Regional Differences */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
                Regionale Tariefverschillen in Friesland
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center bg-forest-50 rounded-lg p-6">
                  <h3 className="font-semibold text-forest-900 mb-3">Leeuwarden Regio</h3>
                  <p className="text-2xl font-bold text-forest-600 mb-3">€40 - €55</p>
                  <ul className="text-sm text-forest-700 space-y-1">
                    <li>• Grootste vraag</li>
                    <li>• Meeste concurrentie</li>
                    <li>• Hoogste gemiddelde inkomen</li>
                    <li>• Premium diensten</li>
                  </ul>
                </div>
                <div className="text-center bg-sage-50 rounded-lg p-6">
                  <h3 className="font-semibold text-forest-900 mb-3">Grote Gemeenten</h3>
                  <p className="text-2xl font-bold text-sage-600 mb-3">€37 - €50</p>
                  <ul className="text-sm text-forest-700 space-y-1">
                    <li>• Heerenveen, Smallingerland</li>
                    <li>• Goede bereikbaarheid</li>
                    <li>• Stabiele vraag</li>
                    <li>• Gemiddelde tarieven</li>
                  </ul>
                </div>
                <div className="text-center bg-emerald-50 rounded-lg p-6">
                  <h3 className="font-semibold text-forest-900 mb-3">Landelijke Gebieden</h3>
                  <p className="text-2xl font-bold text-emerald-600 mb-3">€35 - €48</p>
                  <ul className="text-sm text-forest-700 space-y-1">
                    <li>• Lagere vraag</li>
                    <li>• Meer reistijd</li>
                    <li>• Lokale concurrentie</li>
                    <li>• Lagere kosten</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Factors */}
          <section className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-12 text-center">
              Factoren die Uurtarieven Beïnvloeden
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-3">Seizoen & Timing</h3>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• Voorjaar: +10-15% (druk seizoen)</li>
                  <li>• Zomer: Standaard tarieven</li>
                  <li>• Herfst: +5-10% (veel werk)</li>
                  <li>• Winter: -5-10% (minder vraag)</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-3">Type Werkzaamheden</h3>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• Onderhoud: Standaard tarief</li>
                  <li>• Tuinaanleg: +€5-10/uur</li>
                  <li>• Specialistisch: +€10-20/uur</li>
                  <li>• Noodgeval: +€15-25/uur</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-3">Projectomvang</h3>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• Eenmalig: Standaard tarief</li>
                  <li>• Halve dag: Geen toeslag</li>
                  <li>• Hele dag: Vaak korting</li>
                  <li>• Jaarcontract: -5-15%</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-3">Locatie & Toegang</h3>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• Gemakkelijk bereikbaar: Standaard</li>
                  <li>• Slechte toegang: +€3-8/uur</li>
                  <li>• Veel trappen: +€2-5/uur</li>
                  <li>• Parkeerprobleem: +€2-4/uur</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-3">Minimale Boekingen</h3>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• Minimum 2-4 uur gebruikelijk</li>
                  <li>• Korter = toeslag of geen acceptatie</li>
                  <li>• Aanrijdkosten bij kleine klussen</li>
                  <li>• Voorrijkosten: €15-35</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-forest-900 mb-3">Kwalificaties & Verzekering</h3>
                <ul className="text-sm text-forest-700 space-y-1">
                  <li>• VCA certificaat: +€2-5/uur</li>
                  <li>• Specialistische cursussen</li>
                  <li>• WA-verzekering verplicht</li>
                  <li>• Bedrijfsvergunning</li>
                </ul>
              </div>
            </div>
          </section>

          {/* What's Included/Excluded */}
          <section className="max-w-4xl mx-auto mb-16">
            <div className="bg-forest-50 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
                Wat is Wel & Niet Inbegrepen?
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Inbegrepen in Uurtarief
                  </h3>
                  <ul className="space-y-2 text-forest-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      Arbeidstijd en vakkennis
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      Gebruik van handgereedschap
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      Basis werkkleding en uitrusting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      Opruimen van eigen gereedschap
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                      Advies en expertise
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-700 mb-4 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Niet Inbegrepen (Extra Kosten)
                  </h3>
                  <ul className="space-y-2 text-forest-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      Planten, zaden en andere materialen
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      Grond, compost en meststoffen
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      Machinegebruik (grasmaaier, heggenschaar)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      Transport en brandstofkosten
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      Afvoer tuinafval (€15-40 per kuub)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                      BTW (21% bovenop alle kosten)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-forest-900 mb-8 text-center">
              Veelgestelde Vragen over Uurtarieven
            </h2>
            <div className="space-y-4">
              <details className="bg-white rounded-lg p-6 shadow-sm">
                <summary className="font-semibold text-forest-900 cursor-pointer">
                  Waarom rekent de ene hovenier €40 en de andere €50 per uur?
                </summary>
                <p className="mt-3 text-forest-700">
                  Het verschil zit in ervaring, specialisatie, overhead kosten, en positionering. 
                  Een ervaren hovenier met specialistische kennis (bv. groendaken) kan hogere 
                  tarieven rekenen. Ook speelt de regio een rol - in Leeuwarden zijn tarieven 
                  gemiddeld hoger dan in kleinere gemeenten.
                </p>
              </details>

              <details className="bg-white rounded-lg p-6 shadow-sm">
                <summary className="font-semibold text-forest-900 cursor-pointer">
                  Zijn materialen en planten inbegrepen in het uurtarief?
                </summary>
                <p className="mt-3 text-forest-700">
                  Nee, het uurtarief is alleen voor arbeid. Materialen zoals planten, grond, 
                  zaden en kunstmest worden apart berekend. Sommige hoveniers hanteren een 
                  opslag van 15-25% op materialen voor inkoop en transport. Vraag altijd 
                  een gespecificeerde offerte.
                </p>
              </details>

              <details className="bg-white rounded-lg p-6 shadow-sm">
                <summary className="font-semibold text-forest-900 cursor-pointer">
                  Kan ik onderhandelen over het uurtarief?
                </summary>
                <p className="mt-3 text-forest-700">
                  Bij grote projecten of jaarcontracten is vaak onderhandelingsruimte. 
                  Voor kleine klusjes zijn de prijzen meestal vast. Beter is het om te 
                  vragen naar pakketdeals - bijvoorbeeld "4 keer per jaar onderhoud voor 
                  €X totaal" in plaats van per uur te onderhandelen.
                </p>
              </details>

              <details className="bg-white rounded-lg p-6 shadow-sm">
                <summary className="font-semibold text-forest-900 cursor-pointer">
                  Hoeveel uur werk kan ik verwachten voor mijn tuin?
                </summary>
                <p className="mt-3 text-forest-700">
                  Voor onderhoudsbeurt gemiddelde tuin (200m²): 3-5 uur. Voor tuinaanleg: 
                  rekening met 0,5-2 dagen per 100m² afhankelijk van complexiteit. 
                  Een ervaren hovenier kan een realistische tijdsinschatting geven 
                  na het bekijken van uw tuin.
                </p>
              </details>

              <details className="bg-white rounded-lg p-6 shadow-sm">
                <summary className="font-semibold text-forest-900 cursor-pointer">
                  Wat als het werk langer duurt dan geschat?
                </summary>
                <p className="mt-3 text-forest-700">
                  Serieuze hoveniers maken realistische inschattingen of werken met 
                  een vaste prijs. Bij onvoorziene omstandigheden (zeer harde grond, 
                  meer onkruid dan verwacht) wordt dit vooraf besproken. Vraag naar 
                  een maximum aantal uren of vaste prijs voor duidelijkheid.
                </p>
              </details>
            </div>
          </section>

          {/* Price Comparison Tool */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-sage-50 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
                Krijg Gratis Offertes
              </h2>
              <p className="text-center text-forest-700 mb-8">
                Vergelijk uurtarieven van tot 3 hoveniers in jouw gemeente voor het beste prijsadvies
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-sage-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-forest-900 mb-2">Beschrijf je Project</h3>
                  <p className="text-sm text-forest-700">Gemeente, type werk, tuingrootte</p>
                </div>
                <div className="text-center">
                  <div className="bg-sage-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-forest-900 mb-2">Ontvang Passende Matches</h3>
                  <p className="text-sm text-forest-700">Tot 3 lokale hoveniers nemen contact op</p>
                </div>
                <div className="text-center">
                  <div className="bg-sage-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-forest-900 mb-2">Vergelijk & Kies</h3>
                  <p className="text-sm text-forest-700">Uurtarieven, ervaring, reviews</p>
                </div>
              </div>
              <div className="text-center">
                <a 
                  href="/#lead-form" 
                  className="inline-block bg-sage-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-sage-700 transition-colors"
                >
                  Start Gratis Offerte Aanvraag →
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
import { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import Navigation from '../../../components/Navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils'
import { createTranslator } from '@/i18n'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Wat Kost een Hovenier per Uur? Tarieven 2026 | Hovenier.frl',
    description: 'Een hovenier kost gemiddeld €35–€65 per uur in Friesland (2026). Bekijk actuele tarieven per dienst, regionale verschillen en tips om te besparen. Gratis offertes vergelijken.',
    keywords: 'wat kost een hovenier per uur, wat kost hovenier per uur, kosten hovenier per uur, hovenier per uur, uurtarieven hovenier Friesland',
    alternates: getLocaleAlternates('/kosten/hovenier-per-uur', locale as SupportedLocale),
  }
}

// ISR: Never revalidate (static pricing content, changes only with deployments)
export const revalidate = false;

// Generate static params for both locales to enable ISR
export async function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }];
}

export default async function HovenierPerUurPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = createTranslator(locale)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat kost een hovenier per uur gemiddeld?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gemiddeld €35–€65 per uur, afhankelijk van het type werk en de regio. Voor standaard tuinonderhoud betaal je aan de onderkant van deze range, voor specialistische werkzaamheden zoals boomchirurgie of tuinarchitectuur aan de bovenkant."
        }
      },
      {
        "@type": "Question",
        "name": "Is een goedkopere hovenier ook minder goed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Niet per se. Vergelijk altijd beoordelingen en certificeringen naast de prijs. Een startende hovenier kan uitstekend werk leveren tegen een lager tarief. Let wel op: extreem lage prijzen kunnen duiden op gebrek aan verzekering of vakkennis."
        }
      },
      {
        "@type": "Question",
        "name": "Kan ik korting krijgen op het uurtarief?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja — bij een vast onderhoudscontract bieden de meeste hoveniers 10–20% korting. Ook voor grotere projecten (20+ uur) kun je vaak een lagere prijs onderhandelen. Vraag altijd naar seizoerskortingen in de winter maanden."
        }
      }
    ]
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: 'Kosten', href: '/kosten' },
    { label: 'Wat kost een hovenier per uur?' }
  ];

  return (
    <>
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="section section-alt article-section">
        <div className="section-inner">
          <div className="article-grid">
            {/* Main Article Content */}
            <div className="article-content">
              {/* Eyebrow */}
              <div className="text-xs uppercase tracking-wider text-sage font-medium mb-4">
                KOSTENGIDS • 2026
              </div>
              
              {/* Title */}
              <h1 className="article-title mb-6">
                Wat Kost een Hovenier per Uur? <em className="text-sage font-serif italic">(2026)</em>
              </h1>
              
              {/* Meta */}
              <div className="text-xs text-text-mid mb-6 flex items-center gap-4">
                <span>Bijgewerkt: maart 2026</span>
                <div className="w-1 h-1 rounded-full bg-sage"></div>
                <span>6 min lezen</span>
                <div className="w-1 h-1 rounded-full bg-sage"></div>
                <span>Door redactie Hovenier.frl</span>
              </div>

              {/* Direct Answer Box */}
              <div className="bg-forest rounded-lg p-6 mb-8 text-cream">
                <div className="text-xs uppercase tracking-wider text-sage mb-2 font-medium">DIRECT ANTWOORD</div>
                <p className="text-sm leading-relaxed font-light">
                  Een hovenier kost gemiddeld <strong className="text-cream font-medium">€35 tot €65 per uur</strong> in Friesland. Voor regulier tuinonderhoud betaalt u €35–€50/uur; voor aanleg en specialistisch werk €45–€65/uur. De exacte prijs hangt af van het type werk, de ervaring van de hovenier en uw gemeente.
                </p>
              </div>

              {/* Pricing Cards */}
              <div className="rate-cards mb-10">
                <div className="rate-card">
                  <div className="rate-card-header">STARTEND</div>
                  <div className="rate-card-price">€35–<br />45</div>
                  <div className="rate-card-unit">per uur</div>
                  <div className="rate-card-desc">ZZP hovenier, minder ervaring</div>
                </div>
                <div className="rate-card rate-card-popular">
                  <div className="rate-card-badge">Populair</div>
                  <div className="rate-card-header">GEMIDDELD</div>
                  <div className="rate-card-price">€45–<br />60</div>
                  <div className="rate-card-unit">per uur</div>
                  <div className="rate-card-desc">Ervaren hovenier, gecertificeerd</div>
                </div>
                <div className="rate-card">
                  <div className="rate-card-header">SPECIALIST</div>
                  <div className="rate-card-price">€60–<br />65</div>
                  <div className="rate-card-unit">per uur</div>
                  <div className="rate-card-desc">Tuinontwerp, groendak, bomen</div>
                </div>
              </div>

              {/* Hovenier uurtarieven per type werkzaamheid (2026) */}
              <h2 className="article-section-title mt-10">
                Hovenier uurtarieven per type <em className="text-sage font-serif">werkzaamheid (2026)</em>
              </h2>
              <p className="text-sm text-text-mid leading-relaxed mb-6 max-w-3xl">
                Het uurtarief van een hovenier verschilt sterk per type werk. Standaard onderhoud is het goedkoopst; specialistisch werk zoals het aanleggen van een groendak of het snoeien van grote bomen vraagt meer vakkennis en daarmee een hoger tarief.
              </p>
              
              <div className="bg-white rounded-lg shadow-sm border border-sage-light overflow-hidden mb-10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-cream-dark">
                      <th className="text-xs uppercase tracking-wider text-text-mid p-4 text-left font-semibold">Werkzaamheid</th>
                      <th className="text-xs uppercase tracking-wider text-text-mid p-4 text-left font-semibold">Tarief per uur</th>
                      <th className="text-xs uppercase tracking-wider text-text-mid p-4 text-left font-semibold">Gemiddelde klus</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-sage-light hover:bg-cream transition-colors">
                      <td className="p-4 text-text font-medium">Gras maaien</td>
                      <td className="p-4 font-serif text-lg font-semibold text-forest">€35–45</td>
                      <td className="p-4 text-text-mid">1–2 uur</td>
                    </tr>
                    <tr className="border-b border-sage-light hover:bg-cream transition-colors">
                      <td className="p-4 text-text font-medium">Onkruid verwijderen</td>
                      <td className="p-4 font-serif text-lg font-semibold text-forest">€35–50</td>
                      <td className="p-4 text-text-mid">2–4 uur</td>
                    </tr>
                    <tr className="border-b border-sage-light hover:bg-cream transition-colors">
                      <td className="p-4 text-text font-medium">Hagen knippen</td>
                      <td className="p-4 font-serif text-lg font-semibold text-forest">€38–55</td>
                      <td className="p-4 text-text-mid">2–5 uur</td>
                    </tr>
                    <tr className="border-b border-sage-light hover:bg-cream transition-colors">
                      <td className="p-4 text-text font-medium">Snoeien struiken</td>
                      <td className="p-4 font-serif text-lg font-semibold text-forest">€40–58</td>
                      <td className="p-4 text-text-mid">3–6 uur</td>
                    </tr>
                    <tr className="border-b border-sage-light hover:bg-cream transition-colors">
                      <td className="p-4 text-text font-medium">Bomen snoeien</td>
                      <td className="p-4 font-serif text-lg font-semibold text-forest">€50–70</td>
                      <td className="p-4 text-text-mid">4–8 uur</td>
                    </tr>
                    <tr className="border-b border-sage-light hover:bg-cream transition-colors">
                      <td className="p-4 text-text font-medium">Tuin aanleggen</td>
                      <td className="p-4 font-serif text-lg font-semibold text-forest">€50–65</td>
                      <td className="p-4 text-text-mid">Meerdere dagen</td>
                    </tr>
                    <tr className="hover:bg-cream transition-colors">
                      <td className="p-4 text-text font-medium">Groendak aanleggen</td>
                      <td className="p-4 font-serif text-lg font-semibold text-forest">€55–75</td>
                      <td className="p-4 text-text-mid">2–5 dagen</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Wat kost een hovenier per dag */}
              <h2 className="text-2xl font-serif font-semibold text-forest-deep mb-4 mt-10">
                Wat kost een hovenier <em className="text-sage font-serif">per dag?</em>
              </h2>
              <p className="text-sm text-text-mid leading-relaxed mb-8 max-w-3xl">
                Voor een volledige werkdag van 8 uur rekent een hovenier gemiddeld <strong className="text-forest">€280 tot €520</strong>. Veel hoveniers bieden een dagprijs aan die iets voordeliger uitvalt dan het losse uurtarief. Bij een vaste onderhoudsafspraak kunt u vaak een korting bedingen.
              </p>

              {/* Tip Box */}
              <div className="bg-sage-light/20 border border-sage-light rounded-lg p-6 mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-forest flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-forest-deep">Tip: bespaar op de kosten</div>
                </div>
                <p className="text-sm text-forest-deep leading-relaxed">
                  Sluit een vast onderhoudscontract af voor meerdere bezoeken per jaar. Hoveniers bieden hier vaak 10–20% korting op ten opzichte van eenmalige opdrachten. Vergelijk altijd minimaal 3 offertes via Hovenier.frl.
                </p>
              </div>

              {/* Hovenier vs tuinman */}
              <h2 className="text-2xl font-serif font-semibold text-forest-deep mb-4 mt-10">
                Hovenier vs tuinman — <em className="text-sage font-serif">wat is het verschil?</em>
              </h2>
              <p className="text-sm text-text-mid leading-relaxed mb-8 max-w-3xl">
                Een hovenier heeft een vakgerichte opleiding gevolgd en is doorgaans gecertificeerd via VHG (Vereniging van Hoveniers en Groenvoorzieners). Een tuinman is een algemene term zonder opleidingsvereiste. Het uurtarief van een hovenier ligt daardoor gemiddeld <strong className="text-forest">€5–€15 hoger</strong> dan dat van een tuinman, maar de kwaliteit en garanties zijn ook navenant beter.
              </p>

              {/* Friesland specific section */}
              <h2 className="text-2xl font-serif font-semibold text-forest-deep mb-4 mt-10">
                Hoeveel kost een hovenier per uur <em className="text-sage font-serif">in Friesland?</em>
              </h2>
              <p className="text-sm text-text-mid leading-relaxed mb-6 max-w-3xl">
                In <strong className="text-forest">Friesland</strong> liggen de tarieven iets lager dan in de Randstad. Verwacht <strong className="text-forest">€32–€58 per uur</strong> voor een gekwalificeerde hovenier. In Leeuwarden en Heerenveen betaal je aan de bovenkant van deze range, in kleinere gemeenten zoals Súdwest-Fryslân of Achtkarspelen ligt het tarief doorgaans €3–€5 lager.
              </p>
              <div className="bg-cream border-l-4 border-sage p-5 rounded-r-lg mb-8">
                <p className="text-sm text-forest-deep font-medium mb-2">💡 Lokaal voordeel</p>
                <p className="text-sm text-text-mid leading-relaxed">
                  Kies een hovenier binnen 15 km van je locatie. Dit scheelt in reiskosten en veel Friese hoveniers bieden korting voor klanten in de buurt.
                </p>
              </div>

              {/* FAQ */}
              <h2 className="text-2xl font-serif font-semibold text-forest-deep mb-6 mt-12">
                Veelgestelde vragen over <em className="text-sage font-serif">kosten</em>
              </h2>
              <div className="bg-white rounded-lg shadow-sm border border-sage-light overflow-hidden mb-10">
                <div className="divide-y divide-sage-light">
                  <div className="p-6">
                    <h3 className="text-base font-semibold text-forest mb-3">Wat kost een hovenier per uur gemiddeld?</h3>
                    <p className="text-sm text-text-mid leading-relaxed">
                      Gemiddeld €35–€65 per uur, afhankelijk van het type werk en de regio. Voor standaard tuinonderhoud betaal je aan de onderkant van deze range, voor specialistische werkzaamheden zoals boomchirurgie of tuinarchitectuur aan de bovenkant.
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-base font-semibold text-forest mb-3">Is een goedkopere hovenier ook minder goed?</h3>
                    <p className="text-sm text-text-mid leading-relaxed">
                      Niet per se. Vergelijk altijd beoordelingen en certificeringen naast de prijs. Een startende hovenier kan uitstekend werk leveren tegen een lager tarief. Let wel op: extreem lage prijzen kunnen duiden op gebrek aan verzekering of vakkennis.
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-base font-semibold text-forest mb-3">Kan ik korting krijgen op het uurtarief?</h3>
                    <p className="text-sm text-text-mid leading-relaxed">
                      Ja — bij een vast onderhoudscontract bieden de meeste hoveniers 10–20% korting. Ook voor grotere projecten (20+ uur) kun je vaak een lagere prijs onderhandelen. Vraag altijd naar seizoerskortingen in de winter maanden.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-16 pt-10 border-t border-sage-light">
                <h3 className="text-sm font-semibold text-forest-deep mb-6">Gerelateerde kostengidsen</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link href="/kosten/tuinonderhoud" className="bg-white border border-sage-light rounded-lg p-4 hover:shadow-md transition-all group">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-forest mr-3 group-hover:bg-sage transition-colors"></div>
                      <span className="text-sm font-medium text-forest group-hover:text-sage transition-colors">Tuinonderhoud kosten</span>
                    </div>
                    <p className="text-xs text-text-mid leading-relaxed">Wat kost tuinonderhoud per maand?</p>
                  </Link>
                  <Link href="/kosten/tuin-aanleggen" className="bg-white border border-sage-light rounded-lg p-4 hover:shadow-md transition-all group">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-forest mr-3 group-hover:bg-sage transition-colors"></div>
                      <span className="text-sm font-medium text-forest group-hover:text-sage transition-colors">Tuin aanleggen</span>
                    </div>
                    <p className="text-xs text-text-mid leading-relaxed">Wat kost een complete tuinaanleg?</p>
                  </Link>
                  <Link href="/kosten/groendak" className="bg-white border border-sage-light rounded-lg p-4 hover:shadow-md transition-all group">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-forest mr-3 group-hover:bg-sage transition-colors"></div>
                      <span className="text-sm font-medium text-forest group-hover:text-sage transition-colors">Groendak kosten</span>
                    </div>
                    <p className="text-xs text-text-mid leading-relaxed">Wat kost een groendak in Friesland?</p>
                  </Link>
                  <Link href="/hoveniers/leeuwarden" className="bg-white border border-sage-light rounded-lg p-4 hover:shadow-md transition-all group">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-forest mr-3 group-hover:bg-sage transition-colors"></div>
                      <span className="text-sm font-medium text-forest group-hover:text-sage transition-colors">Hovenier Leeuwarden</span>
                    </div>
                    <p className="text-xs text-text-mid leading-relaxed">Tarieven en aanbieders in de regio</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="article-sidebar">
              {/* Quote Form */}
              <div className="sidebar-form bg-forest rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-serif font-medium text-cream mb-2">Gratis offerte aanvragen</h3>
                <p className="text-sm text-sage-light mb-6 leading-relaxed">
                  Vergelijk tarieven van hoveniers in uw gemeente. Binnen 24 uur reactie.
                </p>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Uw gemeente" 
                    className="w-full p-3 bg-forest-deep/30 border border-forest-mid/30 rounded text-sm text-cream placeholder-sage-light/60 focus:outline-none focus:border-sage focus:bg-forest-deep/50 transition-all" 
                  />
                  <input 
                    type="tel" 
                    placeholder="Telefoonnummer" 
                    className="w-full p-3 bg-forest-deep/30 border border-forest-mid/30 rounded text-sm text-cream placeholder-sage-light/60 focus:outline-none focus:border-sage focus:bg-forest-deep/50 transition-all" 
                  />
                  <button className="w-full bg-sage text-white p-3 rounded text-sm font-medium hover:bg-sage-light transition-colors shadow-sm">
                    Verstuur aanvraag →
                  </button>
                </div>
                <p className="text-xs text-sage-light text-center mt-3">Gratis · vrijblijvend · veilig</p>
              </div>

              {/* Table of Contents */}
              <div className="sidebar-section bg-white border border-sage-light rounded-lg p-6 shadow-sm">
                <h4 className="sidebar-title mb-4">Op deze pagina</h4>
                <nav className="space-y-2">
                  <a href="#uurtarieven" className="sidebar-link">
                    <div className="sidebar-link-dot"></div>
                    Uurtarieven per type
                  </a>
                  <a href="#per-dag" className="sidebar-link">
                    <div className="sidebar-link-dot"></div>
                    Kosten per dag
                  </a>
                  <a href="#verschil" className="sidebar-link">
                    <div className="sidebar-link-dot"></div>
                    Hovenier vs tuinman
                  </a>
                  <a href="#faq" className="sidebar-link">
                    <div className="sidebar-link-dot"></div>
                    Veelgestelde vragen
                  </a>
                </nav>
              </div>

              {/* Did You Know Box */}
              <div className="sidebar-section bg-cream-dark border border-sage-light rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-semibold text-forest-deep">Wist u dat?</h4>
                </div>
                <p className="text-sm text-forest-deep leading-relaxed">
                  Hoveniers in Friesland rekenen gemiddeld <strong className="text-forest">€5–€10 minder per uur</strong> dan in de Randstad. Een goede reden om lokaal te kiezen.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

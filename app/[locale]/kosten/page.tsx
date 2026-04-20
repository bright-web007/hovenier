import Link from 'next/link';
import { Metadata } from 'next';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import NewLeadForm from '@/app/components/NewLeadForm';
import ServiceSchema from '../../components/schemas/ServiceSchema';
import KostenCalculator from '../../components/KostenCalculator';
import KostenFAQClient from '../../components/KostenFAQClient';
import { localizePath, getLocaleAlternates, type SupportedLocale } from '@/lib/locale-utils';
import { createTranslator } from '@/i18n';

// CSS Module imports
import heroStyles from '../../components/KostenHero.module.css';
import priceCardStyles from '../../components/KostenPriceCards.module.css';
import priceTableStyles from '../../components/KostenPriceTable.module.css';
import factorsStyles from '../../components/KostenFactors.module.css';
import layoutStyles from '../../components/KostenLayout.module.css';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale || 'nl';
  
  return {
    title: validLocale === 'nl' ? 'Hovenier Kosten 2026 | Wat Kost een Hovenier? | Hovenier.frl' : 'Garden Costs Friesland | Prices & Rates 2026 | Hovenier.frl',
    description: validLocale === 'nl' ? 'Wat kost een hovenier? Gemiddeld €35–€65 per uur in Friesland. Transparante prijzen voor tuinonderhoud, tuinaanleg, groendaken en bestrating. Gratis offertes vergelijken.' : 'What does a gardener cost in Friesland? Transparent cost overview: garden maintenance €35-50/hour, garden design €45-65/hour. Free quotes from local specialists.',
    keywords: validLocale === 'nl' ? ['hovenier kosten', 'kosten hovenier', 'wat kost een hovenier', 'hovenier kosten friesland', 'kosten hovenier tuinaanleg'] : ['gardener costs', 'gardener prices', 'garden maintenance costs', 'garden design costs', 'friesland'],
    alternates: getLocaleAlternates('/kosten', validLocale as SupportedLocale),
  };
}

export default async function KostenPage({ params }: Props) {
  const { locale } = await params;
  const validLocale = locale || 'nl';
  const isEn = validLocale === 'en';
  const t = createTranslator(validLocale);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t('breadcrumb_home'), href: '/' },
    { label: t('kosten_page.breadcrumb_costs') }
  ];

  return (
    <>
      <ServiceSchema 
        name="Hovenier Kosten Friesland"
        description="Uitgebreid kostenoverzicht voor hoveniersdiensten in Friesland. Transparante prijzen voor tuinonderhoud (€35-50/uur), tuinaanleg (€45-65/uur) en alle tuinspecialiteiten."
        provider={{ name: "Hovenier.frl", url: "https://hovenier.frl" }}
        areaServed="Friesland, Nederland"
        priceRange="€35-€65"
      />
      <Navigation locale={validLocale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>

        <div className={layoutStyles.page}>
          <div className={heroStyles.heroSection}>
            <div className={heroStyles.heroInner}>
              <div className={heroStyles.eyebrow}>{isEn ? 'Cost Overview' : 'Kostenoverzicht'}</div>
              <h1 className={heroStyles.heroTitle}>{isEn ? <>How much does a gardener<br />cost in <em>Friesland?</em></> : <>Wat kost een hovenier<br />in <em>Friesland?</em></>}</h1>
              <div className={heroStyles.heroAnswer}>
                <p>{isEn ? <>A gardener in Friesland costs on average <strong>€35 to €65 per hour</strong>. For garden maintenance you typically pay €35–€50/hour, for garden construction €45–€65/hour. The exact costs depend on the type of work, garden size and your municipality.</> : <>Een hovenier in Friesland kost gemiddeld <strong>€35 tot €65 per uur</strong>. Voor tuinonderhoud betaalt u doorgaans €35–€50/uur, voor tuinaanleg €45–€65/uur. De exacte kosten hangen af van het type werk, de tuingrootte en uw gemeente.</>}</p>
              </div>
              <div className={heroStyles.heroStats}>
                <div className={heroStyles.stat}><span className={heroStyles.statNumber}>€35</span><span className={heroStyles.statLabel}>{isEn ? 'From / hour' : 'Vanaf / uur'}</span></div>
                <div className={heroStyles.stat}><span className={heroStyles.statNumber}>€65</span><span className={heroStyles.statLabel}>{isEn ? 'Up to / hour' : 'Tot / uur'}</span></div>
                <div className={heroStyles.stat}><span className={heroStyles.statNumber}>€48</span><span className={heroStyles.statLabel}>{isEn ? 'Average / hour' : 'Gemiddeld / uur'}</span></div>
                <div className={heroStyles.stat}><span className={heroStyles.statNumber}>30+</span><span className={heroStyles.statLabel}>{isEn ? 'Gardeners in Friesland' : 'Hoveniers in Friesland'}</span></div>
              </div>
            </div>
          </div>

          <div className={`${layoutStyles.section} ${layoutStyles.sectionCream}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.sectionEyebrow}>{isEn ? 'Cost Calculator' : 'Kostencalculator'}</div>
              <h2 className={layoutStyles.sectionTitle}>{isEn ? <>Calculate your <em>costs</em></> : <>Bereken uw <em>kosten</em></>}</h2>
              <p className={layoutStyles.sectionSubtitle}>{isEn ? 'Select the type of work and your garden size for a cost estimate.' : 'Selecteer het type werkzaamheden en uw tuingrootte voor een indicatie van de kosten.'}</p>

              <KostenCalculator locale={validLocale} />
            </div>
          </div>

          <div className={`${layoutStyles.section} ${layoutStyles.sectionAlt}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.sectionEyebrow}>{isEn ? 'Overview per service' : 'Overzicht per dienst'}</div>
              <h2 className={layoutStyles.sectionTitle}>{isEn ? <>Costs per <em>type of work</em></> : <>Kosten per <em>type werkzaamheid</em></>}</h2>
              <p className={layoutStyles.sectionSubtitle}>{isEn ? 'Current average rates from gardeners in Friesland, based on our database of 30+ certified gardeners.' : 'Actuele gemiddelde tarieven van hoveniers in Friesland, gebaseerd op onze database van 30+ gecertificeerde hoveniers.'}</p>

              <div className={priceCardStyles.priceGrid}>
                <div className={priceCardStyles.priceCard}>
                  <div className={priceCardStyles.priceCardIcon}>
                    <svg className={priceCardStyles.cardIcon} viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20M3 12h18" />
                    </svg>
                  </div>
                  <div className={priceCardStyles.priceCardName}>{isEn ? 'Garden Maintenance' : 'Tuinonderhoud'}</div>
                  <div className={priceCardStyles.priceCardPrice}>€35–50</div>
                  <div className={priceCardStyles.priceCardUnit}>{isEn ? 'per hour' : 'per uur'}</div>
                  <div className={priceCardStyles.priceCardRange}>{isEn ? 'Monthly maintenance 50m² garden: €140–280/visit. Including mowing, pruning and weeding.' : 'Maandelijks onderhoud 50m² tuin: €140–280/bezoek. Inclusief maaien, snoeien en onkruid.'}</div>
                  <Link href={localizePath('/diensten/tuinonderhoud', locale as SupportedLocale)} className={priceCardStyles.priceCardLink}>{isEn ? 'Read more →' : 'Lees meer →'}</Link>
                </div>
                <div className={priceCardStyles.priceCard}>
                  <div className={priceCardStyles.priceCardIcon}>
                    <svg className={priceCardStyles.cardIcon} viewBox="0 0 24 24">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className={priceCardStyles.priceCardName}>{isEn ? 'Garden Design' : 'Tuinontwerp'}</div>
                  <div className={priceCardStyles.priceCardPrice}>€500–3.500</div>
                  <div className={priceCardStyles.priceCardUnit}>{isEn ? 'per project' : 'per project'}</div>
                  <div className={priceCardStyles.priceCardRange}>{isEn ? 'Depending on garden size and complexity. Including drawings and planting plan.' : 'Afhankelijk van tuingrootte en complexiteit. Inclusief tekeningen en plantplan.'}</div>
                  <Link href={localizePath('/kosten/tuinontwerp', locale as SupportedLocale)} className={priceCardStyles.priceCardLink}>{isEn ? 'Read more →' : 'Lees meer →'}</Link>
                </div>
                <div className={priceCardStyles.priceCard}>
                  <div className={priceCardStyles.priceCardIcon}>
                    <svg className={priceCardStyles.cardIcon} viewBox="0 0 24 24">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <div className={priceCardStyles.priceCardName}>{isEn ? 'Garden Construction' : 'Tuin aanleggen'}</div>
                  <div className={priceCardStyles.priceCardPrice}>€45–65</div>
                  <div className={priceCardStyles.priceCardUnit}>{isEn ? 'per hour' : 'per uur'}</div>
                  <div className={priceCardStyles.priceCardRange}>{isEn ? 'Complete garden construction 100m²: €4,500–12,000. Including groundwork, paving and planting.' : 'Complete tuinaanleg 100m²: €4.500–12.000. Inclusief grondwerk, bestrating en beplanting.'}</div>
                  <Link href={localizePath('/kosten/tuin-aanleggen', locale as SupportedLocale)} className={priceCardStyles.priceCardLink}>{isEn ? 'Read more →' : 'Lees meer →'}</Link>
                </div>
                <div className={priceCardStyles.priceCard}>
                  <div className={priceCardStyles.priceCardIcon}>
                    <svg className={priceCardStyles.cardIcon} viewBox="0 0 24 24">
                      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
                    </svg>
                  </div>
                  <div className={priceCardStyles.priceCardName}>{isEn ? 'Green Roof' : 'Groendak'}</div>
                  <div className={priceCardStyles.priceCardPrice}>€40–90</div>
                  <div className={priceCardStyles.priceCardUnit}>{isEn ? 'per m²' : 'per m²'}</div>
                  <div className={priceCardStyles.priceCardRange}>{isEn ? 'Sedum roof 30m²: €1,200–2,700. Subsidy possible via municipality. Low maintenance costs.' : 'Sedum dak 30m²: €1.200–2.700. Subsidie mogelijk via gemeente. Lage onderhoudskosten.'}</div>
                  <Link href={localizePath('/kosten/groendak', locale as SupportedLocale)} className={priceCardStyles.priceCardLink}>{isEn ? 'Read more →' : 'Lees meer →'}</Link>
                </div>
                <div className={priceCardStyles.priceCard}>
                  <div className={priceCardStyles.priceCardIcon}>
                    <svg className={priceCardStyles.cardIcon} viewBox="0 0 24 24">
                      <path d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path d="M6 15l6 3 6-3M6 9l6 3 6-3" />
                    </svg>
                  </div>
                  <div className={priceCardStyles.priceCardName}>{isEn ? 'Pruning' : 'Snoeien'}</div>
                  <div className={priceCardStyles.priceCardPrice}>€35–55</div>
                  <div className={priceCardStyles.priceCardUnit}>{isEn ? 'per hour' : 'per uur'}</div>
                  <div className={priceCardStyles.priceCardRange}>{isEn ? 'Hedge trimming per linear meter: €3–8. Tree pruning: €150–600 per tree.' : 'Hagen snoeien per strekkende meter: €3–8. Bomen snoeien: €150–600 per boom.'}</div>
                  <div className={priceCardStyles.priceCardLink}>{isEn ? 'Read more →' : 'Lees meer →'}</div>
                </div>
                <div className={priceCardStyles.priceCard}>
                  <div className={priceCardStyles.priceCardIcon}>
                    <svg className={priceCardStyles.cardIcon} viewBox="0 0 24 24">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                      <line x1="12" y1="12" x2="12" y2="16" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                    </svg>
                  </div>
                  <div className={priceCardStyles.priceCardName}>{isEn ? 'Paver' : 'Stratenmaker'}</div>
                  <div className={priceCardStyles.priceCardPrice}>€50–80</div>
                  <div className={priceCardStyles.priceCardUnit}>{isEn ? 'per m²' : 'per m²'}</div>
                  <div className={priceCardStyles.priceCardRange}>{isEn ? 'Driveway or terrace paving per m²: €50–80. Including sand bed and joint sand. Excl. materials.' : 'Oprit of terras betegelen per m²: €50–80. Inclusief zandbed en voegzand. Excl. materiaal.'}</div>
                  <Link href={localizePath('/diensten/stratenmaker', locale as SupportedLocale)} className={priceCardStyles.priceCardLink}>{isEn ? 'Read more →' : 'Lees meer →'}</Link>
                </div>
              </div>
            </div>
          </div>

          <div className={`${layoutStyles.section} ${layoutStyles.sectionCream}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.sectionEyebrow}>{isEn ? 'Price table' : 'Prijstabel'}</div>
              <h2 className={layoutStyles.sectionTitle}>{isEn ? <>Detailed <em>rates</em></> : <>Gedetailleerde <em>tarieven</em></>}</h2>
              <p className={layoutStyles.sectionSubtitle}>{isEn ? 'Overview of common rates in Friesland for the most requested gardening services.' : 'Overzicht van gangbare tarieven in Friesland voor de meest gevraagde hoveniersdiensten.'}</p>

              <table className={priceTableStyles.priceTable}>
                <thead>
                  <tr>
                    <th>{isEn ? 'Service' : 'Werkzaamheid'}</th>
                    <th>{isEn ? 'Average rate' : 'Gemiddeld tarief'}</th>
                    <th>{isEn ? 'Range' : 'Bandbreedte'}</th>
                    <th>{isEn ? 'Difficulty' : 'Moeilijkheid'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>{isEn ? 'Mowing (per visit)' : 'Gras maaien (per keer)'}</td><td className={priceTableStyles.priceColumn}>€45–80</td><td>{isEn ? 'Small–large garden' : 'Klein–grote tuin'}</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeLow}`}>{isEn ? 'Low' : 'Laag'}</span></td></tr>
                  <tr><td>{isEn ? 'Hedge trimming (per hour)' : 'Hagen knippen (per uur)'}</td><td className={priceTableStyles.priceColumn}>€38–55</td><td>{isEn ? 'Depending on length' : 'Afhankelijk van lengte'}</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeLow}`}>{isEn ? 'Low' : 'Laag'}</span></td></tr>
                  <tr><td>{isEn ? 'Weed removal (per hour)' : 'Onkruid verwijderen (per uur)'}</td><td className={priceTableStyles.priceColumn}>€35–50</td><td>{isEn ? 'Per hour labor' : 'Per uur arbeid'}</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeLow}`}>{isEn ? 'Low' : 'Laag'}</span></td></tr>
                  <tr><td>{isEn ? 'Seasonal maintenance (package)' : 'Seizoensonderhoud (pakket)'}</td><td className={priceTableStyles.priceColumn}>€150–350</td><td>{isEn ? '4x per year' : '4x per jaar'}</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeMid}`}>{isEn ? 'Medium' : 'Middel'}</span></td></tr>
                  <tr><td>{isEn ? 'Tree pruning' : 'Bomen snoeien'}</td><td className={priceTableStyles.priceColumn}>€150–600</td><td>{isEn ? 'Per tree' : 'Per boom'}</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeMid}`}>{isEn ? 'Medium' : 'Middel'}</span></td></tr>
                  <tr><td>{isEn ? 'Garden construction (per m²)' : 'Tuin aanleggen (per m²)'}</td><td className={priceTableStyles.priceColumn}>€45–120</td><td>{isEn ? 'Including materials' : 'Inclusief materialen'}</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeHigh}`}>{isEn ? 'High' : 'Hoog'}</span></td></tr>
                  <tr><td>{isEn ? 'Paving (per m²)' : 'Bestrating leggen (per m²)'}</td><td className={priceTableStyles.priceColumn}>€50–80</td><td>{isEn ? 'Excl. stones' : 'Excl. stenen'}</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeHigh}`}>{isEn ? 'High' : 'Hoog'}</span></td></tr>
                  <tr><td>{isEn ? 'Green roof installation (per m²)' : 'Groendak aanleggen (per m²)'}</td><td className={priceTableStyles.priceColumn}>€40–90</td><td>{isEn ? 'Sedum extensive' : 'Sedum extensief'}</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeHigh}`}>{isEn ? 'High' : 'Hoog'}</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={`${layoutStyles.section} ${layoutStyles.sectionAlt}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.sectionEyebrow}>{isEn ? 'What determines the price?' : 'Wat bepaalt de prijs?'}</div>
              <h2 className={layoutStyles.sectionTitle}>{isEn ? <>Factors that <em>influence</em> costs</> : <>Factoren die de kosten <em>beïnvloeden</em></>}</h2>
              <p className={layoutStyles.sectionSubtitle}>{isEn ? 'The final price depends on several factors. Here are the most important considerations.' : 'De uiteindelijke prijs hangt af van meerdere factoren. Hier zijn de belangrijkste overwegingen.'}</p>

              <div className={factorsStyles.factorsGrid}>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>{isEn ? 'Garden size' : 'Tuingrootte'}</div>
                    <div className={factorsStyles.factorDescription}>{isEn ? 'The larger the garden, the more hours of work. A 200m² garden costs 2–3x more per visit than a 50m² garden.' : 'Hoe groter de tuin, hoe meer uren werk. Een tuin van 200m² kost per bezoek 2–3x meer dan een tuin van 50m².'}</div>
                  </div>
                </div>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>{isEn ? 'Type of work' : 'Type werkzaamheden'}</div>
                    <div className={factorsStyles.factorDescription}>{isEn ? 'Specialist work such as tree pruning or green roof installation requires a higher hourly rate than standard maintenance.' : 'Specialistisch werk zoals bomen snoeien of groendakken aanleggen vraagt een hoger uurtarief dan standaard onderhoud.'}</div>
                  </div>
                </div>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>{isEn ? 'Frequency' : 'Frequentie'}</div>
                    <div className={factorsStyles.factorDescription}>{isEn ? 'With a fixed maintenance contract (monthly or quarterly), many gardeners offer discounts compared to one-time work.' : 'Bij een vast onderhoudscontract (maandelijks of per kwartaal) bieden veel hoveniers korting ten opzichte van eenmalig werk.'}</div>
                  </div>
                </div>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>{isEn ? 'Region in Friesland' : 'Regio in Friesland'}</div>
                    <div className={factorsStyles.factorDescription}>{isEn ? 'In Leeuwarden, rates are generally slightly higher than in rural municipalities such as Achtkarspelen or Waadhoeke.' : 'In Leeuwarden zijn tarieven doorgaans iets hoger dan in landelijke gemeenten zoals Achtkarspelen of Waadhoeke.'}</div>
                  </div>
                </div>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>{isEn ? 'Gardener experience' : 'Ervaring hovenier'}</div>
                    <div className={factorsStyles.factorDescription}>{isEn ? 'Certified gardeners with VHG recognition charge more than freelancers, but generally offer more quality guarantees.' : 'Gecertificeerde hoveniers met VHG-erkenning rekenen meer dan ZZP\'ers, maar bieden doorgaans meer garantie op kwaliteit.'}</div>
                  </div>
                </div>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>{isEn ? 'Material costs' : 'Materiaalkosten'}</div>
                    <div className={factorsStyles.factorDescription}>{isEn ? 'Plants, paving and soil are often separate. Always ask whether a quote includes or excludes materials.' : 'Planten, bestrating en grond zijn often separaat. Vraag altijd of een offerte inclusief of exclusief materialen is.'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${layoutStyles.section} ${layoutStyles.sectionCream}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.sectionEyebrow}>{isEn ? 'Frequently asked questions' : 'Veelgestelde vragen'}</div>
              <h2 className={layoutStyles.sectionTitle}>{isEn ? <>Frequently asked questions about <em>costs</em></> : <>Veelgestelde vragen over <em>kosten</em></>}</h2>
              <KostenFAQClient locale={validLocale} />
            </div>
          </div>

          <section className={`${layoutStyles.section} ${layoutStyles.sectionAlt}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.serviceFormContainer}>
                <div className={layoutStyles.serviceFormHeader}>
                  <h2 className={`${layoutStyles.sectionTitle} ${layoutStyles.sectionTitleCentered}`}>{isEn ? 'Request a free quote' : 'Gratis offerte aanvragen'}</h2>
                  <p className={`${layoutStyles.sectionSubtitle} ${layoutStyles.sectionSubtitleCentered}`}>{isEn ? 'Compare rates from certified gardeners in your municipality. Response within 24 hours.' : 'Vergelijk tarieven van gecertificeerde hoveniers in uw gemeente. Binnen 24 uur reactie.'}</p>
                </div>
                <div className={layoutStyles.serviceFormContent}>
                  <NewLeadForm 
                    translations={{
                      form_eyebrow: t('form_eyebrow'),
                      form_title: t('form_title'),
                      form_subtitle: t('form_subtitle'),
                      your_name: t('your_name'),
                      municipality: t('municipality'),
                      service: t('service'),
                      phone_number: t('phone_number'),
                      send_request: t('send_request'),
                      form_note: t('form_note'),
                      select_municipality: t('form.select_municipality'),
                      what_do_you_need: t('form.what_do_you_need'),
                      your_company: t('form.your_company'),
                      loading: t('form.loading'),
                      privacy_agreement: t('form.privacy_agreement'),
                      privacy_link: t('form.privacy_link'),
                      privacy_consent: t('form.privacy_consent'),
                      services: {
                        tuinonderhoud: t('form.services.tuinonderhoud'),
                        tuinontwerp: t('form.services.tuinontwerp'),
                        'tuin-aanleggen': t('form.services.tuin-aanleggen'),
                        stratenmaker: t('form.services.stratenmaker'),
                        groendak: t('form.services.groendak'),
                        overig: t('form.services.overig')
                      }
                    }}
                    locale={locale}
                  />
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}

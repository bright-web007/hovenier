'use client';

import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import NewLeadForm from '@/app/components/NewLeadForm';
import { useParams } from 'next/navigation';
import ServiceSchema from '../../components/schemas/ServiceSchema';
import { localizePath, type SupportedLocale } from '@/lib/locale-utils';

// CSS Module imports
import heroStyles from '../../components/KostenHero.module.css';
import calculatorStyles from '../../components/KostenCalculator.module.css';
import priceCardStyles from '../../components/KostenPriceCards.module.css';
import priceTableStyles from '../../components/KostenPriceTable.module.css';
import factorsStyles from '../../components/KostenFactors.module.css';
import faqStyles from '../../components/KostenFAQ.module.css';
import layoutStyles from '../../components/KostenLayout.module.css';

export default function KostenPage() {
  const params = useParams();
  const locale = params.locale as string;

  // Breadcrumb items
  const breadcrumbItems = [
    { label: locale === 'en' ? 'Home' : 'Home', href: '/' },
    { label: locale === 'en' ? 'Costs' : 'Kosten' }
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
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>

        <div className={layoutStyles.page}>
          <div className={heroStyles.heroSection}>
            <div className={heroStyles.heroInner}>
              <div className={heroStyles.eyebrow}>Kostenoverzicht</div>
              <h1 className={heroStyles.heroTitle}>Wat kost een hovenier<br />in <em>Friesland?</em></h1>
              <div className={heroStyles.heroAnswer}>
                <p>Een hovenier in Friesland kost gemiddeld <strong>€35 tot €65 per uur</strong>. Voor tuinonderhoud betaalt u doorgaans €35–€50/uur, voor tuinaanleg €45–€65/uur. De exacte kosten hangen af van het type werk, de tuingrootte en uw gemeente.</p>
              </div>
              <div className={heroStyles.heroStats}>
                <div className={heroStyles.stat}><span className={heroStyles.statNumber}>€35</span><span className={heroStyles.statLabel}>Vanaf / uur</span></div>
                <div className={heroStyles.stat}><span className={heroStyles.statNumber}>€65</span><span className={heroStyles.statLabel}>Tot / uur</span></div>
                <div className={heroStyles.stat}><span className={heroStyles.statNumber}>€48</span><span className={heroStyles.statLabel}>Gemiddeld / uur</span></div>
                <div className={heroStyles.stat}><span className={heroStyles.statNumber}>30+</span><span className={heroStyles.statLabel}>Hoveniers in Friesland</span></div>
              </div>
            </div>
          </div>

          <div className={`${layoutStyles.section} ${layoutStyles.sectionCream}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.sectionEyebrow}>Kostencalculator</div>
              <h2 className={layoutStyles.sectionTitle}>Bereken uw <em>kosten</em></h2>
              <p className={layoutStyles.sectionSubtitle}>Selecteer het type werkzaamheden en uw tuingrootte voor een indicatie van de kosten.</p>

              <div className={calculatorStyles.calculatorWrapper}>
                <div className={calculatorStyles.calculatorRow}>
                  <div className={calculatorStyles.calculatorField}>
                    <label>Type werkzaamheden</label>
                    <select id="jobType">
                      <option value="onderhoud">Tuinonderhoud</option>
                      <option value="aanleg">Tuin aanleggen</option>
                      <option value="ontwerp">Tuinontwerp</option>
                      <option value="snoei">Snoeien</option>
                      <option value="groendak">Groendak</option>
                      <option value="stratenmaker">Stratenmaker</option>
                    </select>
                  </div>
                  <div className={calculatorStyles.calculatorField}>
                    <label>Tuingrootte</label>
                    <select id="gardenSize">
                      <option value="small">Klein (tot 50m²)</option>
                      <option value="medium">Middelgroot (50–150m²)</option>
                      <option value="large">Groot (150–300m²)</option>
                      <option value="xlarge">Zeer groot (300m²+)</option>
                    </select>
                  </div>
                </div>
                <div className={calculatorStyles.calculatorResult}>
                  <div className={calculatorStyles.resultContent}>
                    <div className={calculatorStyles.resultLabel}>Geschatte kosten</div>
                    <div className={calculatorStyles.resultPrice} id="calcOut">€175 – €350</div>
                    <div className={calculatorStyles.resultNote} id="calcNote">Per bezoek · gemiddeld 4–7 uur werk</div>
                  </div>
                  <button 
                    className={calculatorStyles.calculatorCta}
                    onClick={() => {
                      document.querySelector('.cta-band')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Vraag gratis offerte aan →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`${layoutStyles.section} ${layoutStyles.sectionAlt}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.sectionEyebrow}>Overzicht per dienst</div>
              <h2 className={layoutStyles.sectionTitle}>Kosten per <em>type werkzaamheid</em></h2>
              <p className={layoutStyles.sectionSubtitle}>Actuele gemiddelde tarieven van hoveniers in Friesland, gebaseerd op onze database van 30+ gecertificeerde hoveniers.</p>

              <div className={priceCardStyles.priceGrid}>
                <div className={priceCardStyles.priceCard}>
                  <div className={priceCardStyles.priceCardIcon}>
                    <svg className={priceCardStyles.cardIcon} viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20M3 12h18" />
                    </svg>
                  </div>
                  <div className={priceCardStyles.priceCardName}>Tuinonderhoud</div>
                  <div className={priceCardStyles.priceCardPrice}>€35–50</div>
                  <div className={priceCardStyles.priceCardUnit}>per uur</div>
                  <div className={priceCardStyles.priceCardRange}>Maandelijks onderhoud 50m² tuin: €140–280/bezoek. Inclusief maaien, snoeien en onkruid.</div>
                  <Link href={localizePath('/services/tuinonderhoud', locale as SupportedLocale)} className={priceCardStyles.priceCardLink}>Lees meer →</Link>
                </div>
                <div className={priceCardStyles.priceCard}>
                  <div className={priceCardStyles.priceCardIcon}>
                    <svg className={priceCardStyles.cardIcon} viewBox="0 0 24 24">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className={priceCardStyles.priceCardName}>Tuinontwerp</div>
                  <div className={priceCardStyles.priceCardPrice}>€500–3.500</div>
                  <div className={priceCardStyles.priceCardUnit}>per project</div>
                  <div className={priceCardStyles.priceCardRange}>Afhankelijk van tuingrootte en complexiteit. Inclusief tekeningen en plantplan.</div>
                  <Link href={localizePath('/kosten/tuinontwerp', locale as SupportedLocale)} className={priceCardStyles.priceCardLink}>Lees meer →</Link>
                </div>
                <div className={priceCardStyles.priceCard}>
                  <div className={priceCardStyles.priceCardIcon}>
                    <svg className={priceCardStyles.cardIcon} viewBox="0 0 24 24">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <div className={priceCardStyles.priceCardName}>Tuin aanleggen</div>
                  <div className={priceCardStyles.priceCardPrice}>€45–65</div>
                  <div className={priceCardStyles.priceCardUnit}>per uur</div>
                  <div className={priceCardStyles.priceCardRange}>Complete tuinaanleg 100m²: €4.500–12.000. Inclusief grondwerk, bestrating en beplanting.</div>
                  <Link href={localizePath('/kosten/tuin-aanleggen', locale as SupportedLocale)} className={priceCardStyles.priceCardLink}>Lees meer →</Link>
                </div>
                <div className={priceCardStyles.priceCard}>
                  <div className={priceCardStyles.priceCardIcon}>
                    <svg className={priceCardStyles.cardIcon} viewBox="0 0 24 24">
                      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
                    </svg>
                  </div>
                  <div className={priceCardStyles.priceCardName}>Groendak</div>
                  <div className={priceCardStyles.priceCardPrice}>€40–90</div>
                  <div className={priceCardStyles.priceCardUnit}>per m²</div>
                  <div className={priceCardStyles.priceCardRange}>Sedum dak 30m²: €1.200–2.700. Subsidie mogelijk via gemeente. Lage onderhoudskosten.</div>
                  <Link href={localizePath('/kosten/groendak', locale as SupportedLocale)} className={priceCardStyles.priceCardLink}>Lees meer →</Link>
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
                  <div className={priceCardStyles.priceCardName}>Snoeien</div>
                  <div className={priceCardStyles.priceCardPrice}>€35–55</div>
                  <div className={priceCardStyles.priceCardUnit}>per uur</div>
                  <div className={priceCardStyles.priceCardRange}>Hagen snoeien per strekkende meter: €3–8. Bomen snoeien: €150–600 per boom.</div>
                  <div className={priceCardStyles.priceCardLink}>Lees meer →</div>
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
                  <div className={priceCardStyles.priceCardName}>Stratenmaker</div>
                  <div className={priceCardStyles.priceCardPrice}>€50–80</div>
                  <div className={priceCardStyles.priceCardUnit}>per m²</div>
                  <div className={priceCardStyles.priceCardRange}>Oprit of terras betegelen per m²: €50–80. Inclusief zandbed en voegzand. Excl. materiaal.</div>
                  <Link href={localizePath('/services/stratenmaker', locale as SupportedLocale)} className={priceCardStyles.priceCardLink}>Lees meer →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className={`${layoutStyles.section} ${layoutStyles.sectionCream}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.sectionEyebrow}>Prijstabel</div>
              <h2 className={layoutStyles.sectionTitle}>Gedetailleerde <em>tarieven</em></h2>
              <p className={layoutStyles.sectionSubtitle}>Overzicht van gangbare tarieven in Friesland voor de meest gevraagde hoveniersdiensten.</p>

              <table className={priceTableStyles.priceTable}>
                <thead>
                  <tr>
                    <th>Werkzaamheid</th>
                    <th>Gemiddeld tarief</th>
                    <th>Bandbreedte</th>
                    <th>Moeilijkheid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Gras maaien (per keer)</td><td className={priceTableStyles.priceColumn}>€45–80</td><td>Klein–grote tuin</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeLow}`}>Laag</span></td></tr>
                  <tr><td>Hagen knippen (per uur)</td><td className={priceTableStyles.priceColumn}>€38–55</td><td>Afhankelijk van lengte</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeLow}`}>Laag</span></td></tr>
                  <tr><td>Onkruid verwijderen (per uur)</td><td className={priceTableStyles.priceColumn}>€35–50</td><td>Per uur arbeid</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeLow}`}>Laag</span></td></tr>
                  <tr><td>Seizoensonderhoud (pakket)</td><td className={priceTableStyles.priceColumn}>€150–350</td><td>4x per jaar</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeMid}`}>Middel</span></td></tr>
                  <tr><td>Bomen snoeien</td><td className={priceTableStyles.priceColumn}>€150–600</td><td>Per boom</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeMid}`}>Middel</span></td></tr>
                  <tr><td>Tuin aanleggen (per m²)</td><td className={priceTableStyles.priceColumn}>€45–120</td><td>Inclusief materialen</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeHigh}`}>Hoog</span></td></tr>
                  <tr><td>Bestrating leggen (per m²)</td><td className={priceTableStyles.priceColumn}>€50–80</td><td>Excl. stenen</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeHigh}`}>Hoog</span></td></tr>
                  <tr><td>Groendak aanleggen (per m²)</td><td className={priceTableStyles.priceColumn}>€40–90</td><td>Sedum extensief</td><td><span className={`${priceTableStyles.priceBadge} ${priceTableStyles.badgeHigh}`}>Hoog</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={`${layoutStyles.section} ${layoutStyles.sectionAlt}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.sectionEyebrow}>Wat bepaalt de prijs?</div>
              <h2 className={layoutStyles.sectionTitle}>Factoren die de kosten <em>beïnvloeden</em></h2>
              <p className={layoutStyles.sectionSubtitle}>De uiteindelijke prijs hangt af van meerdere factoren. Hier zijn de belangrijkste overwegingen.</p>

              <div className={factorsStyles.factorsGrid}>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>Tuingrootte</div>
                    <div className={factorsStyles.factorDescription}>Hoe groter de tuin, hoe meer uren werk. Een tuin van 200m² kost per bezoek 2–3x meer dan een tuin van 50m².</div>
                  </div>
                </div>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>Type werkzaamheden</div>
                    <div className={factorsStyles.factorDescription}>Specialistisch werk zoals bomen snoeien of groendakken aanleggen vraagt een hoger uurtarief dan standaard onderhoud.</div>
                  </div>
                </div>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>Frequentie</div>
                    <div className={factorsStyles.factorDescription}>Bij een vast onderhoudscontract (maandelijks of per kwartaal) bieden veel hoveniers korting ten opzichte van eenmalig werk.</div>
                  </div>
                </div>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>Regio in Friesland</div>
                    <div className={factorsStyles.factorDescription}>In Leeuwarden zijn tarieven doorgaans iets hoger dan in landelijke gemeenten zoals Achtkarspelen of Waadhoeke.</div>
                  </div>
                </div>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>Ervaring hovenier</div>
                    <div className={factorsStyles.factorDescription}>Gecertificeerde hoveniers met VHG-erkenning rekenen meer dan ZZP'ers, maar bieden doorgaans meer garantie op kwaliteit.</div>
                  </div>
                </div>
                <div className={factorsStyles.factorItem}>
                  <div className={factorsStyles.factorDot}></div>
                  <div className={factorsStyles.factorContent}>
                    <div className={factorsStyles.factorTitle}>Materiaalkosten</div>
                    <div className={factorsStyles.factorDescription}>Planten, bestrating en grond zijn often separaat. Vraag altijd of een offerte inclusief of exclusief materialen is.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${layoutStyles.section} ${layoutStyles.sectionCream}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.sectionEyebrow}>Veelgestelde vragen</div>
              <h2 className={layoutStyles.sectionTitle}>Veelgestelde vragen over <em>kosten</em></h2>
              <div className={faqStyles.faqList} suppressHydrationWarning>
                {[
                  {
                    q: "Wat kost een hovenier gemiddeld per uur in Friesland?",
                    a: "Een hovenier in Friesland kost gemiddeld €35 tot €65 per uur. Voor standaard onderhoud betaalt u €35–50/uur. Voor specialistisch werk zoals bomen snoeien of groendakken rekent een hovenier €50–65/uur."
                  },
                  {
                    q: "Wat kost tuinonderhoud per maand?",
                    a: "Voor maandelijks tuinonderhoud betaalt u gemiddeld €80–250 per maand, afhankelijk van de tuingrootte. Een kleine stadstuin (tot 50m²) kost €80–120/maand. Een grotere tuin (150m²+) kost €200–350/maand."
                  },
                  {
                    q: "Is een offerte aanvragen gratis?",
                    a: "Ja, via Hovenier.frl kunt u volledig gratis en vrijblijvend offertes aanvragen bij meerdere hoveniers in uw regio. U betaalt niets en bent nergens toe verplicht."
                  },
                  {
                    q: "Wat kost een complete tuinaanleg?",
                    a: "Een complete tuinaanleg in Friesland kost gemiddeld €4.500–15.000 voor een middelgrote tuin (100–150m²). Dit is inclusief ontwerp, grondwerk, beplanting en bestrating. Heb je een specifieke wens? Vraag een offerte aan voor een nauwkeurige prijsopgave."
                  },
                  {
                    q: "Zijn er subsidies beschikbaar voor groendaken?",
                    a: "Ja, diverse Friese gemeenten bieden subsidie voor groendaken, variërend van €15–35 per m². Leeuwarden, Smallingerland en Súdwest-Fryslân hebben actieve subsidieregelingen. Uw hovenier kan u hierbij adviseren."
                  }
                ].map((faq, index) => (
                  <div key={index} className={faqStyles.faqItem}>
                    <div 
                      className={faqStyles.faqQuestion} 
                      onClick={(e) => {
                        const faqItem = e.currentTarget.parentElement;
                        if (!faqItem) return;
                        const answer = faqItem.querySelector(`.${faqStyles.faqAnswer}`) as HTMLElement;
                        const arrow = e.currentTarget.querySelector(`.${faqStyles.faqToggle}`) as HTMLElement;
                        const isOpen = answer?.style.maxHeight && answer.style.maxHeight !== '0px';
                        
                        // Close all FAQ items first
                        document.querySelectorAll(`.${faqStyles.faqItem}`).forEach(item => {
                          const otherAnswer = item.querySelector(`.${faqStyles.faqAnswer}`) as HTMLElement;
                          const otherArrow = item.querySelector(`.${faqStyles.faqToggle}`) as HTMLElement;
                          if (item !== faqItem && otherAnswer && otherArrow) {
                            otherAnswer.style.maxHeight = '0px';
                            otherAnswer.style.opacity = '0';
                            otherAnswer.style.padding = '0';
                            otherAnswer.style.borderTop = 'none';
                            otherAnswer.style.marginTop = '0';
                            otherAnswer.classList.remove('expanded');
                            otherArrow.style.transform = 'rotate(0deg)';
                          }
                        });
                        
                        // Toggle current FAQ
                        if (isOpen) {
                          if (answer) {
                            answer.style.maxHeight = '0px';
                            answer.style.opacity = '0';
                            answer.style.padding = '0';
                            answer.style.borderTop = 'none';
                            answer.style.marginTop = '0';
                            answer.classList.remove('expanded');
                          }
                          if (arrow) {
                            arrow.style.transform = 'rotate(0deg)';
                          }
                        } else {
                          if (answer) {
                            answer.style.maxHeight = '200px';
                            answer.style.opacity = '1';
                            answer.style.padding = '0.75rem 0 0.25rem 0';
                            answer.style.borderTop = '1px solid #f0f4ec';
                            answer.style.marginTop = '0.5rem';
                            answer.classList.add('expanded');
                          }
                          if (arrow) {
                            arrow.style.transform = 'rotate(180deg)';
                          }
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {faq.q}
                      <svg 
                        className={faqStyles.faqToggle} 
                        viewBox="0 0 24 24"
                        style={{
                          transform: 'rotate(0deg)',
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                    <div 
                      className={faqStyles.faqAnswer}
                      style={{
                        maxHeight: '0px',
                        opacity: 0,
                        padding: '0',
                        margin: '0',
                        transition: 'max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease'
                      }}
                    >
                      {faq.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className={`${layoutStyles.section} ${layoutStyles.sectionAlt}`}>
            <div className={layoutStyles.sectionInner}>
              <div className={layoutStyles.serviceFormContainer}>
                <div className={layoutStyles.serviceFormHeader}>
                  <h2 className={`${layoutStyles.sectionTitle} ${layoutStyles.sectionTitleCentered}`}>Gratis offerte aanvragen</h2>
                  <p className={`${layoutStyles.sectionSubtitle} ${layoutStyles.sectionSubtitleCentered}`}>Vergelijk tarieven van gecertificeerde hoveniers in uw gemeente. Binnen 24 uur reactie.</p>
                </div>
                <div className={layoutStyles.serviceFormContent}>
                  <NewLeadForm 
                    translations={{
                      form_eyebrow: "Gratis Offerte",
                      form_title: "Vraag direct een offerte aan",
                      form_subtitle: "Binnen 24 uur contact van lokale hoveniers",
                      your_name: "Uw naam",
                      municipality: "Gemeente",
                      service: "Gewenste dienst",
                      phone_number: "Telefoonnummer",
                      send_request: "Verstuur aanvraag",
                      form_note: "Door dit formulier te versturen gaat u akkoord met onze voorwaarden"
                    }}
                    locale={locale}
                  />
                </div>
              </div>
            </div>
          </section>

        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            const prices = {
              onderhoud:{small:[140,250],medium:[200,380],large:[300,550],xlarge:[450,750]},
              aanleg:{small:[1800,3500],medium:[4500,9000],large:[9000,18000],xlarge:[15000,30000]},
              ontwerp:{small:[500,1200],medium:[1000,2500],large:[2000,4500],xlarge:[3500,7000]},
              snoei:{small:[80,160],medium:[150,280],large:[250,450],xlarge:[380,650]},
              groendak:{small:[800,1600],medium:[2000,4000],large:[4500,9000],xlarge:[8000,18000]},
              stratenmaker:{small:[1500,3000],medium:[3500,7000],large:[7000,14000],xlarge:[12000,24000]}
            };
            const notes = {
              onderhoud:'Per bezoek · gemiddeld 4–7 uur werk',
              aanleg:'Totaalprijs project · inclusief materialen',
              ontwerp:'Totaalprijs · inclusief plantplan en tekeningen',
              snoei:'Per bezoek · afhankelijk van hoeveelheid',
              groendak:'Totaalprijs · exclusief subsidie',
              stratenmaker:'Totaalprijs · exclusief materiaalkosten'
            };
            function calcPrice(){
              const job = document.getElementById('jobType')?.value || 'onderhoud';
              const size = document.getElementById('gardenSize')?.value || 'medium';
              const r = prices[job][size];
              const lo = r[0].toLocaleString('nl-NL');
              const hi = r[1].toLocaleString('nl-NL');
              const outputEl = document.getElementById('calcOut');
              const noteEl = document.getElementById('calcNote');
              if (outputEl) outputEl.textContent = '€'+lo+' – €'+hi;
              if (noteEl) noteEl.textContent = notes[job];
            }
            
            // Set up event listeners when DOM is ready
            if (typeof window !== 'undefined') {
              document.addEventListener('DOMContentLoaded', function() {
                const jobSelect = document.getElementById('jobType');
                const sizeSelect = document.getElementById('gardenSize');
                if (jobSelect) jobSelect.addEventListener('change', calcPrice);
                if (sizeSelect) sizeSelect.addEventListener('change', calcPrice);
                calcPrice(); // Initial calculation
              });
            }
          `
        }} />
      </main>
    </>
  );
}

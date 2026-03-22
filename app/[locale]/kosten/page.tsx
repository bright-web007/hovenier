'use client';

import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Breadcrumbs from '../../components/Breadcrumbs';
import NewLeadForm from '@/app/components/NewLeadForm';
import { useParams } from 'next/navigation';

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
      <Navigation locale={locale} />
      <Breadcrumbs items={breadcrumbItems} />
      <main>
        <style jsx>{`
          .page {
            font-family: 'DM Sans', sans-serif;
            background: #f4f0e8;
          }
          .hero-s {
            background: #2a3e20;
            padding: 3.5rem 2.5rem 3rem;
            position: relative;
            overflow: hidden;
          }
          .hero-s::before {
            content: '';
            position: absolute;
            inset: 0;
            opacity: 0.025;
            background-image: repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 32px),
                              repeating-linear-gradient(90deg, #fff 0, #fff 1px, transparent 1px, transparent 32px);
            background-size: 32px 32px;
          }
          .hero-inner {
            max-width: 900px;
            margin: 0 auto;
            position: relative;
          }
          .eyebrow {
            font-family: var(--sans);
            font-size: 10px;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #8ab87a;
            font-weight: 500;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .eyebrow::before {
            content: '';
            width: 22px;
            height: 0.5px;
            background: #8ab87a;
            display: block;
          }
          .hero-h1 {
            font-family: var(--serif);
            font-size: 48px;
            line-height: 1.08;
            color: #f4f0e8;
            font-weight: 500;
            margin-bottom: 1rem;
          }
          .hero-h1 em {
            color: #8ab87a;
            font-style: italic;
          }
          .hero-answer {
            background: rgba(255, 255, 255, 0.06);
            border-left: 2px solid #8ab87a;
            padding: 1rem 1.25rem;
            margin-bottom: 1.5rem;
            border-radius: 0;
          }
          .hero-answer p {            font-family: var(--sans);            font-size: 15px;
            color: #c8dfc0;
            line-height: 1.65;
            font-weight: 300;
          }
          .hero-answer strong {
            color: #f4f0e8;
            font-weight: 500;
          }
          .hero-stats {
            display: flex;
            gap: 2.5rem;
            flex-wrap: wrap;
          }
          .hstat {
            display: flex;
            flex-direction: column;
          }
          .hstat-num {
            font-family: var(--serif);
            font-size: 32px;
            font-weight: 500;
            color: #f4f0e8;
            line-height: 1;
          }
          .hstat-lbl {
            font-family: var(--sans);
            font-size: 10px;
            color: #6a8a60;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-top: 3px;
          }
          .section {
            padding: 3.5rem 2.5rem;
          }
          .section-inner {
            max-width: 900px;
            margin: 0 auto;
          }
          .section-alt {
            background: #fff;
          }
          .section-cream {
            background: #f4f0e8;
          }
          .sec-eyebrow {
            font-family: var(--sans);
            font-size: 10px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #4a8c2a;
            font-weight: 500;
            margin-bottom: 0.5rem;
          }
          .sec-title {
            font-family: var(--serif);
            font-size: 34px;
            font-weight: 500;
            color: #1a3210;
            margin-bottom: 0.75rem;
            line-height: 1.1;
          }
          .sec-title em {
            font-style: italic;
            color: #4a8c2a;
          }
          .sec-sub {
            font-family: var(--sans);
            font-size: 14px;
            color: #7a8a70;
            line-height: 1.65;
            font-weight: 300;
            margin-bottom: 2rem;
            max-width: 560px;
          }
          .calc-wrap {
            background: #fff;
            border: 0.5px solid #c8d8b0;
            border-radius: 12px;
            padding: 2rem;
            margin-bottom: 2rem;
          }
          .calc-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
          }
          .calc-field label {
            font-size: 10px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #3a5028;
            font-weight: 500;
            display: block;
            margin-bottom: 6px;
          }
          .calc-field select {
            width: 100%;
            padding: 10px 14px;
            background: #f9f8f5;
            border: 0.5px solid rgba(42, 62, 32, 0.18);
            border-radius: 4px;
            font-family: var(--sans);
            font-size: 13px;
            color: #1a3210;
            font-family: 'DM Sans', sans-serif;
            appearance: none;
            outline: none;
          }
          .calc-result {
            background: #2a3e20;
            border-radius: 8px;
            padding: 1.25rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .calc-result-label {
            font-size: 12px;
            color: #8ab87a;
            letter-spacing: 0.06em;
          }
          .calc-result-price {
            font-family: var(--serif);
            font-size: 40px;
            font-weight: 500;
            color: #f4f0e8;
            line-height: 1;
          }
          .calc-result-note {
            font-family: var(--sans);
            font-size: 11px;
            color: #6a8a60;
            margin-top: 2px;
          }
          .calc-cta {
            background: #4a8c2a;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 10px 20px;
            font-size: 12px;
            font-weight: 500;
            cursor: pointer;
            font-family: var(--sans);
            letter-spacing: 0.05em;
            white-space: nowrap;
          }
          .price-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
          }
          .price-card {
            background: #fff;
            border: 0.5px solid #c8d8b0;
            border-radius: 10px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
          }
          .price-card-icon {
            width: 40px;
            height: 40px;
            background: #e8f5d8;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
          }
          .pc-icon {
            width: 18px;
            height: 18px;
            stroke: #2a3e20;
            fill: none;
            stroke-width: 1.5;
            stroke-linecap: round;
          }
          .price-card-name {
            font-family: var(--sans);
            font-size: 13px;
            font-weight: 500;
            color: #1a3210;
            margin-bottom: 6px;
          }
          .price-card-price {
            font-family: var(--serif);
            font-size: 30px;
            font-weight: 500;
            color: #2a3e20;
            line-height: 1;
            margin-bottom: 4px;
          }
          .price-card-unit {
            font-family: var(--sans);
            font-size: 11px;
            color: #9aaa90;
          }
          .price-card-range {
            font-family: var(--sans);
            font-size: 11px;
            color: #7a8a70;
            margin-top: 6px;
            line-height: 1.5;
            flex: 1;
          }
          .price-card-link {
            font-family: var(--sans);
            font-size: 11px;
            color: #4a8c2a;
            font-weight: 500;
            margin-top: 0.75rem;
            letter-spacing: 0.03em;
            cursor: pointer;
            text-decoration: none;
          }
          .factors-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
          }
          .factor-item {
            background: #fff;
            border: 0.5px solid #c8d8b0;
            border-radius: 8px;
            padding: 1.25rem;
            display: flex;
            gap: 12px;
            align-items: flex-start;
          }
          .factor-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #4a8c2a;
            flex-shrink: 0;
            margin-top: 5px;
          }
          .factor-title {
            font-family: var(--sans);
            font-size: 13px;
            font-weight: 500;
            color: #1a3210;
            margin-bottom: 3px;
          }
          .factor-desc {
            font-family: var(--sans);
            font-size: 12px;
            color: #7a8a70;
            line-height: 1.55;
          }
          .price-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 2rem;
            font-size: 13px;
          }
          .price-table thead th {
            font-family: var(--sans);
            font-size: 10px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #9aaa90;
            padding: 10px 14px;
            text-align: left;
            border-bottom: 0.5px solid #e0eccc;
            background: #f9f8f5;
          }
          .price-table tbody td {
            font-family: var(--sans);
            padding: 12px 14px;
            border-bottom: 0.5px solid #f0f4ec;
            color: #3a4a30;
            vertical-align: middle;
          }
          .price-table tbody tr:last-child td {
            border-bottom: none;
          }
          .price-table tbody tr:hover td {
            background: #f9fcf6;
          }
          .price-badge {
            display: inline-block;
            font-size: 10px;
            padding: 2px 8px;
            border-radius: 2px;
            font-weight: 500;
          }
          .pb-low {
            background: #e8f5d8;
            color: #27500A;
          }
          .pb-mid {
            background: #faeeda;
            color: #633806;
          }
          .pb-high {
            background: #fcebeb;
            color: #791F1F;
          }
          .price-col {
            font-family: var(--serif);
            font-size: 17px;
            font-weight: 500;
            color: #1a3210;
          }
          .faq-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .faq-item {
            border: 1px solid #e0eccc;
            border-radius: 8px;
            padding: 1rem 1.25rem;
            margin: 0;
            background: #fff;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
            transition: all 0.2s ease;
          }
          .faq-item:hover {
            border-color: #4a8c2a;
            box-shadow: 0 2px 8px rgba(74,140,42,0.1);
          }
          .faq-q {
            font-family: var(--sans);
            font-size: 15px;
            font-weight: 600;
            color: #1a3210;
            margin: 0;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            padding: 0.5rem 0;
            transition: color 0.2s ease;
          }
          .faq-q:hover {
            color: #4a8c2a;
          }
          .faq-a {
            font-family: var(--sans);
            font-size: 14px;
            color: #5a6a50;
            line-height: 1.6;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            padding: 0;
            margin: 0;
            transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
          }
          .faq-a.expanded {
            max-height: 200px;
            opacity: 1;
            padding: 0.75rem 0 0.25rem 0;
            border-top: 1px solid #f0f4ec;
            margin-top: 0.5rem;
          }
          .faq-toggle {
            width: 20px;
            height: 20px;
            stroke: #4a8c2a;
            fill: none;
            stroke-width: 2.5;
            flex-shrink: 0;
            transition: all 0.3s ease;
          }
          .faq-item:hover .faq-toggle {
            stroke: #2d5016;
          }
          }
          .cta-band {
            background: #1c3a10;
            padding: 3rem 2.5rem;
            text-align: center;
          }
          .breadcrumb {
            padding: 1rem 2.5rem;
            background: #f4f0e8;
            border-bottom: 0.5px solid #e0eccc;
          }
          .breadcrumb-inner {
            font-family: var(--sans);
            max-width: 900px;
            margin: 0 auto;
            display: flex;
            gap: 6px;
            align-items: center;
            font-size: 11px;
            color: #9aaa90;
          }
          .bc-sep {
            font-size: 10px;
          }
          .bc-current {
            color: #4a8c2a;
            font-weight: 500;
          }

          @media (max-width: 768px) {
            .price-grid {
              grid-template-columns: 1fr;
            }
            .factors-grid {
              grid-template-columns: 1fr;
            }
            .calc-row {
              grid-template-columns: 1fr;
            }
            .hero-s {
              padding: 2rem 1.5rem 2rem;
            }
            .section {
              padding: 2rem 1.5rem;
            }
            .hero-h1 {
              font-size: 36px;
            }
          }
        `}</style>

        <div className="page">
          <div className="hero-s">
            <div className="hero-inner">
              <div className="eyebrow">Kostenoverzicht</div>
              <h1 className="hero-h1">Wat kost een hovenier<br />in <em>Friesland?</em></h1>
              <div className="hero-answer">
                <p>Een hovenier in Friesland kost gemiddeld <strong>€35 tot €65 per uur</strong>. Voor tuinonderhoud betaalt u doorgaans €35–€50/uur, voor tuinaanleg €45–€65/uur. De exacte kosten hangen af van het type werk, de tuingrootte en uw gemeente.</p>
              </div>
              <div className="hero-stats">
                <div className="hstat"><span className="hstat-num">€35</span><span className="hstat-lbl">Vanaf / uur</span></div>
                <div className="hstat"><span className="hstat-num">€65</span><span className="hstat-lbl">Tot / uur</span></div>
                <div className="hstat"><span className="hstat-num">€48</span><span className="hstat-lbl">Gemiddeld / uur</span></div>
                <div className="hstat"><span className="hstat-num">30+</span><span className="hstat-lbl">Hoveniers in Friesland</span></div>
              </div>
            </div>
          </div>

          <div className="section section-cream">
            <div className="section-inner">
              <div className="sec-eyebrow">Kostencalculator</div>
              <h2 className="sec-title">Bereken uw <em>kosten</em></h2>
              <p className="sec-sub">Selecteer het type werkzaamheden en uw tuingrootte voor een indicatie van de kosten.</p>

              <div className="calc-wrap">
                <div className="calc-row">
                  <div className="calc-field">
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
                  <div className="calc-field">
                    <label>Tuingrootte</label>
                    <select id="gardenSize">
                      <option value="small">Klein (tot 50m²)</option>
                      <option value="medium">Middelgroot (50–150m²)</option>
                      <option value="large">Groot (150–300m²)</option>
                      <option value="xlarge">Zeer groot (300m²+)</option>
                    </select>
                  </div>
                </div>
                <div className="calc-result">
                  <div>
                    <div className="calc-result-label">Geschatte kosten</div>
                    <div className="calc-result-price" id="calcOut">€175 – €350</div>
                    <div className="calc-result-note" id="calcNote">Per bezoek · gemiddeld 4–7 uur werk</div>
                  </div>
                  <button 
                    className="calc-cta"
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

          <div className="section section-alt">
            <div className="section-inner">
              <div className="sec-eyebrow">Overzicht per dienst</div>
              <h2 className="sec-title">Kosten per <em>type werkzaamheid</em></h2>
              <p className="sec-sub">Actuele gemiddelde tarieven van hoveniers in Friesland, gebaseerd op onze database van 30+ gecertificeerde hoveniers.</p>

              <div className="price-grid">
                <div className="price-card">
                  <div className="price-card-icon">
                    <svg className="pc-icon" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20M3 12h18" />
                    </svg>
                  </div>
                  <div className="price-card-name">Tuinonderhoud</div>
                  <div className="price-card-price">€35–50</div>
                  <div className="price-card-unit">per uur</div>
                  <div className="price-card-range">Maandelijks onderhoud 50m² tuin: €140–280/bezoek. Inclusief maaien, snoeien en onkruid.</div>
                  <Link href={`/${locale}/services/tuinonderhoud`} className="price-card-link">Lees meer →</Link>
                </div>
                <div className="price-card">
                  <div className="price-card-icon">
                    <svg className="pc-icon" viewBox="0 0 24 24">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div className="price-card-name">Tuinontwerp</div>
                  <div className="price-card-price">€500–3.500</div>
                  <div className="price-card-unit">per project</div>
                  <div className="price-card-range">Afhankelijk van tuingrootte en complexiteit. Inclusief tekeningen en plantplan.</div>
                  <Link href={`/${locale}/kosten/tuinontwerp`} className="price-card-link">Lees meer →</Link>
                </div>
                <div className="price-card">
                  <div className="price-card-icon">
                    <svg className="pc-icon" viewBox="0 0 24 24">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                  </div>
                  <div className="price-card-name">Tuin aanleggen</div>
                  <div className="price-card-price">€45–65</div>
                  <div className="price-card-unit">per uur</div>
                  <div className="price-card-range">Complete tuinaanleg 100m²: €4.500–12.000. Inclusief grondwerk, bestrating en beplanting.</div>
                  <Link href={`/${locale}/kosten/tuin-aanleggen`} className="price-card-link">Lees meer →</Link>
                </div>
                <div className="price-card">
                  <div className="price-card-icon">
                    <svg className="pc-icon" viewBox="0 0 24 24">
                      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
                    </svg>
                  </div>
                  <div className="price-card-name">Groendak</div>
                  <div className="price-card-price">€40–90</div>
                  <div className="price-card-unit">per m²</div>
                  <div className="price-card-range">Sedum dak 30m²: €1.200–2.700. Subsidie mogelijk via gemeente. Lage onderhoudskosten.</div>
                  <Link href={`/${locale}/kosten/groendak`} className="price-card-link">Lees meer →</Link>
                </div>
                <div className="price-card">
                  <div className="price-card-icon">
                    <svg className="pc-icon" viewBox="0 0 24 24">
                      <path d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path d="M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                      <path d="M6 15l6 3 6-3M6 9l6 3 6-3" />
                    </svg>
                  </div>
                  <div className="price-card-name">Snoeien</div>
                  <div className="price-card-price">€35–55</div>
                  <div className="price-card-unit">per uur</div>
                  <div className="price-card-range">Hagen snoeien per strekkende meter: €3–8. Bomen snoeien: €150–600 per boom.</div>
                  <div className="price-card-link">Lees meer →</div>
                </div>
                <div className="price-card">
                  <div className="price-card-icon">
                    <svg className="pc-icon" viewBox="0 0 24 24">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                      <line x1="12" y1="12" x2="12" y2="16" />
                      <line x1="10" y1="14" x2="14" y2="14" />
                    </svg>
                  </div>
                  <div className="price-card-name">Stratenmaker</div>
                  <div className="price-card-price">€50–80</div>
                  <div className="price-card-unit">per m²</div>
                  <div className="price-card-range">Oprit of terras betegelen per m²: €50–80. Inclusief zandbed en voegzand. Excl. materiaal.</div>
                  <Link href={`/${locale}/services/stratenmaker`} className="price-card-link">Lees meer →</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="section section-cream">
            <div className="section-inner">
              <div className="sec-eyebrow">Prijstabel</div>
              <h2 className="sec-title">Gedetailleerde <em>tarieven</em></h2>
              <p className="sec-sub">Overzicht van gangbare tarieven in Friesland voor de meest gevraagde hoveniersdiensten.</p>

              <table className="price-table">
                <thead>
                  <tr>
                    <th>Werkzaamheid</th>
                    <th>Gemiddeld tarief</th>
                    <th>Bandbreedte</th>
                    <th>Moeilijkheid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Gras maaien (per keer)</td><td className="price-col">€45–80</td><td>Klein–grote tuin</td><td><span className="price-badge pb-low">Laag</span></td></tr>
                  <tr><td>Hagen knippen (per uur)</td><td className="price-col">€38–55</td><td>Afhankelijk van lengte</td><td><span className="price-badge pb-low">Laag</span></td></tr>
                  <tr><td>Onkruid verwijderen (per uur)</td><td className="price-col">€35–50</td><td>Per uur arbeid</td><td><span className="price-badge pb-low">Laag</span></td></tr>
                  <tr><td>Seizoensonderhoud (pakket)</td><td className="price-col">€150–350</td><td>4x per jaar</td><td><span className="price-badge pb-mid">Middel</span></td></tr>
                  <tr><td>Bomen snoeien</td><td className="price-col">€150–600</td><td>Per boom</td><td><span className="price-badge pb-mid">Middel</span></td></tr>
                  <tr><td>Tuin aanleggen (per m²)</td><td className="price-col">€45–120</td><td>Inclusief materialen</td><td><span className="price-badge pb-high">Hoog</span></td></tr>
                  <tr><td>Bestrating leggen (per m²)</td><td className="price-col">€50–80</td><td>Excl. stenen</td><td><span className="price-badge pb-high">Hoog</span></td></tr>
                  <tr><td>Groendak aanleggen (per m²)</td><td className="price-col">€40–90</td><td>Sedum extensief</td><td><span className="price-badge pb-high">Hoog</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="section section-alt">
            <div className="section-inner">
              <div className="sec-eyebrow">Wat bepaalt de prijs?</div>
              <h2 className="sec-title">Factoren die de kosten <em>beïnvloeden</em></h2>
              <p className="sec-sub">De uiteindelijke prijs hangt af van meerdere factoren. Hier zijn de belangrijkste overwegingen.</p>

              <div className="factors-grid">
                <div className="factor-item">
                  <div className="factor-dot"></div>
                  <div>
                    <div className="factor-title">Tuingrootte</div>
                    <div className="factor-desc">Hoe groter de tuin, hoe meer uren werk. Een tuin van 200m² kost per bezoek 2–3x meer dan een tuin van 50m².</div>
                  </div>
                </div>
                <div className="factor-item">
                  <div className="factor-dot"></div>
                  <div>
                    <div className="factor-title">Type werkzaamheden</div>
                    <div className="factor-desc">Specialistisch werk zoals bomen snoeien of groendakken aanleggen vraagt een hoger uurtarief dan standaard onderhoud.</div>
                  </div>
                </div>
                <div className="factor-item">
                  <div className="factor-dot"></div>
                  <div>
                    <div className="factor-title">Frequentie</div>
                    <div className="factor-desc">Bij een vast onderhoudscontract (maandelijks of per kwartaal) bieden veel hoveniers korting ten opzichte van eenmalig werk.</div>
                  </div>
                </div>
                <div className="factor-item">
                  <div className="factor-dot"></div>
                  <div>
                    <div className="factor-title">Regio in Friesland</div>
                    <div className="factor-desc">In Leeuwarden zijn tarieven doorgaans iets hoger dan in landelijke gemeenten zoals Achtkarspelen of Waadhoeke.</div>
                  </div>
                </div>
                <div className="factor-item">
                  <div className="factor-dot"></div>
                  <div>
                    <div className="factor-title">Ervaring hovenier</div>
                    <div className="factor-desc">Gecertificeerde hoveniers met VHG-erkenning rekenen meer dan ZZP'ers, maar bieden doorgaans meer garantie op kwaliteit.</div>
                  </div>
                </div>
                <div className="factor-item">
                  <div className="factor-dot"></div>
                  <div>
                    <div className="factor-title">Materiaalkosten</div>
                    <div className="factor-desc">Planten, bestrating en grond zijn often separaat. Vraag altijd of een offerte inclusief of exclusief materialen is.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section section-cream">
            <div className="section-inner">
              <div className="sec-eyebrow">Veelgestelde vragen</div>
              <h2 className="sec-title">Veelgestelde vragen over <em>kosten</em></h2>
              <div className="faq-list" suppressHydrationWarning>
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
                  <div key={index} className="faq-item">
                    <div 
                      className="faq-q" 
                      onClick={(e) => {
                        const faqItem = e.currentTarget.parentElement;
                        if (!faqItem) return;
                        const answer = faqItem.querySelector('.faq-a') as HTMLElement;
                        const arrow = e.currentTarget.querySelector('.faq-toggle') as HTMLElement;
                        const isOpen = answer?.style.maxHeight && answer.style.maxHeight !== '0px';
                        
                        // Close all FAQ items first
                        document.querySelectorAll('.faq-item').forEach(item => {
                          const otherAnswer = item.querySelector('.faq-a') as HTMLElement;
                          const otherArrow = item.querySelector('.faq-toggle') as HTMLElement;
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
                        className="faq-toggle" 
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
                      className="faq-a"
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

          <section className="section section-alt">
            <div className="section-inner">
              <div className="service-form-container">
                <div className="service-form-header">
                  <h2 className="section-title section-title-centered">Gratis offerte aanvragen</h2>
                  <p className="section-sub section-sub-centered">Vergelijk tarieven van gecertificeerde hoveniers in uw gemeente. Binnen 24 uur reactie.</p>
                </div>
                <div className="service-form-content">
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
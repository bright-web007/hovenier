'use client';

import { useState } from 'react';
import calculatorStyles from './KostenCalculator.module.css';
import KostenCalculatorCta from './KostenCalculatorCta';
import CustomSelect from './CustomSelect';
import { createTranslator } from '@/i18n';

const prices: Record<string, Record<string, [number, number]>> = {
  onderhoud: { small: [140, 250], medium: [200, 380], large: [300, 550], xlarge: [450, 750] },
  aanleg: { small: [1800, 3500], medium: [4500, 9000], large: [9000, 18000], xlarge: [15000, 30000] },
  ontwerp: { small: [500, 1200], medium: [1000, 2500], large: [2000, 4500], xlarge: [3500, 7000] },
  snoei: { small: [80, 160], medium: [150, 280], large: [250, 450], xlarge: [380, 650] },
  groendak: { small: [800, 1600], medium: [2000, 4000], large: [4500, 9000], xlarge: [8000, 18000] },
  stratenmaker: { small: [1500, 3000], medium: [3500, 7000], large: [7000, 14000], xlarge: [12000, 24000] },
};

const notesNl: Record<string, string> = {
  onderhoud: 'Per bezoek · gemiddeld 4–7 uur werk',
  aanleg: 'Totaalprijs project · inclusief materialen',
  ontwerp: 'Totaalprijs · inclusief plantplan en tekeningen',
  snoei: 'Per bezoek · afhankelijk van hoeveelheid',
  groendak: 'Totaalprijs · exclusief subsidie',
  stratenmaker: 'Totaalprijs · exclusief materiaalkosten',
};

const notesEn: Record<string, string> = {
  onderhoud: 'Per visit · average 4–7 hours of work',
  aanleg: 'Total project price · including materials',
  ontwerp: 'Total price · including planting plan and drawings',
  snoei: 'Per visit · depending on quantity',
  groendak: 'Total price · excluding subsidy',
  stratenmaker: 'Total price · excluding material costs',
};

export default function KostenCalculator({ locale = 'nl' }: { locale?: string }) {
  const isEn = locale === 'en';
  const t = createTranslator(locale);
  const notes = isEn ? notesEn : notesNl;
  const numberLocale = isEn ? 'en-US' : 'nl-NL';

  const [jobType, setJobType] = useState('onderhoud');
  const [gardenSize, setGardenSize] = useState('medium');

  const range = prices[jobType][gardenSize];
  const lo = range[0].toLocaleString(numberLocale);
  const hi = range[1].toLocaleString(numberLocale);

  return (
    <div className={calculatorStyles.calculatorWrapper}>
      <div className={calculatorStyles.calculatorRow}>
        <div className={calculatorStyles.calculatorField}>
          <label>{t('calculator.work_type')}</label>
          <CustomSelect
            id="jobType"
            label={t('calculator.work_type')}
            value={jobType}
            onChange={setJobType}
            variant="form"
            options={[
              { value: 'onderhoud', label: t('calculator.garden_maintenance') },
              { value: 'aanleg', label: t('calculator.garden_construction') },
              { value: 'ontwerp', label: t('calculator.garden_design') },
              { value: 'snoei', label: t('calculator.pruning') },
              { value: 'groendak', label: t('calculator.green_roof') },
              { value: 'stratenmaker', label: t('calculator.paving') },
            ]}
          />
        </div>
        <div className={calculatorStyles.calculatorField}>
          <label>{t('calculator.garden_size')}</label>
          <CustomSelect
            id="gardenSize"
            label={t('calculator.garden_size')}
            value={gardenSize}
            onChange={setGardenSize}
            variant="form"
            options={[
              { value: 'small', label: t('calculator.small') },
              { value: 'medium', label: t('calculator.medium') },
              { value: 'large', label: t('calculator.large') },
              { value: 'xlarge', label: t('calculator.xlarge') },
            ]}
          />
        </div>
      </div>
      <div className={calculatorStyles.calculatorResult}>
        <div className={calculatorStyles.resultContent}>
          <div className={calculatorStyles.resultLabel}>{t('calculator.estimated_costs')}</div>
          <div className={calculatorStyles.resultPrice}>€{lo} – €{hi}</div>
          <div className={calculatorStyles.resultNote}>{notes[jobType]}</div>
        </div>
        <KostenCalculatorCta locale={locale} />
      </div>
    </div>
  );
}

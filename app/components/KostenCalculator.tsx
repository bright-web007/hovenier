'use client';

import { useState } from 'react';
import calculatorStyles from './KostenCalculator.module.css';
import KostenCalculatorCta from './KostenCalculatorCta';
import CustomSelect from './CustomSelect';
const prices: Record<string, Record<string, [number, number]>> = {
  onderhoud: { small: [140, 250], medium: [200, 380], large: [300, 550], xlarge: [450, 750] },
  aanleg: { small: [1800, 3500], medium: [4500, 9000], large: [9000, 18000], xlarge: [15000, 30000] },
  ontwerp: { small: [500, 1200], medium: [1000, 2500], large: [2000, 4500], xlarge: [3500, 7000] },
  snoei: { small: [80, 160], medium: [150, 280], large: [250, 450], xlarge: [380, 650] },
  groendak: { small: [800, 1600], medium: [2000, 4000], large: [4500, 9000], xlarge: [8000, 18000] },
  stratenmaker: { small: [1500, 3000], medium: [3500, 7000], large: [7000, 14000], xlarge: [12000, 24000] },
};

interface KostenCalculatorProps {
  locale?: string;
  translations: {
    work_type: string;
    garden_maintenance: string;
    garden_construction: string;
    garden_design: string;
    pruning: string;
    green_roof: string;
    paving: string;
    garden_size: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    estimated_costs: string;
    request_quote: string;
  };
  notes: Record<string, string>;
}

export default function KostenCalculator({ locale = 'nl', translations, notes }: KostenCalculatorProps) {
  const numberLocale = locale === 'en' ? 'en-US' : 'nl-NL';

  const [jobType, setJobType] = useState('onderhoud');
  const [gardenSize, setGardenSize] = useState('medium');

  const range = prices[jobType][gardenSize];
  const lo = range[0].toLocaleString(numberLocale);
  const hi = range[1].toLocaleString(numberLocale);

  return (
    <div className={calculatorStyles.calculatorWrapper}>
      <div className={calculatorStyles.calculatorRow}>
        <div className={calculatorStyles.calculatorField}>
          <label>{translations.work_type}</label>
          <CustomSelect
            id="jobType"
            label={translations.work_type}
            value={jobType}
            onChange={setJobType}
            variant="form"
            options={[
              { value: 'onderhoud', label: translations.garden_maintenance },
              { value: 'aanleg', label: translations.garden_construction },
              { value: 'ontwerp', label: translations.garden_design },
              { value: 'snoei', label: translations.pruning },
              { value: 'groendak', label: translations.green_roof },
              { value: 'stratenmaker', label: translations.paving },
            ]}
          />
        </div>
        <div className={calculatorStyles.calculatorField}>
          <label>{translations.garden_size}</label>
          <CustomSelect
            id="gardenSize"
            label={translations.garden_size}
            value={gardenSize}
            onChange={setGardenSize}
            variant="form"
            options={[
              { value: 'small', label: translations.small },
              { value: 'medium', label: translations.medium },
              { value: 'large', label: translations.large },
              { value: 'xlarge', label: translations.xlarge },
            ]}
          />
        </div>
      </div>
      <div className={calculatorStyles.calculatorResult}>
        <div className={calculatorStyles.resultContent}>
          <div className={calculatorStyles.resultLabel}>{translations.estimated_costs}</div>
          <div className={calculatorStyles.resultPrice}>€{lo} – €{hi}</div>
          <div className={calculatorStyles.resultNote}>{notes[jobType]}</div>
        </div>
        <KostenCalculatorCta requestQuote={translations.request_quote} />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { clamp, cn, formatAED } from '../../lib/utils';

const inputClasses =
  'h-11 w-full border border-line bg-white text-sm text-charcoal focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/30';

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

type NumberFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
};

function NumberField({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  step,
}: NumberFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-medium uppercase tracking-[0.16em] text-stone"
      >
        {label}
      </label>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-medium uppercase tracking-wider text-stone">
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={cn(
            inputClasses,
            prefix ? 'pl-12 pr-3' : 'px-3',
            suffix && 'pr-8'
          )}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-stone">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Result({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        'border border-line bg-ivory-50 p-4',
        accent && 'border-champagne/40 bg-champagne/5'
      )}
    >
      <p className="text-[9px] uppercase tracking-[0.18em] text-stone">{label}</p>
      <p
        className={cn(
          'mt-2 font-serif text-2xl leading-none',
          accent ? 'text-champagne' : 'text-charcoal'
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function RoiCalculator() {
  const [price, setPrice] = useState('2500000');
  const [rent, setRent] = useState('150000');
  const [occupancy, setOccupancy] = useState('92');
  const [serviceCharge, setServiceCharge] = useState('18000');

  const numericPrice = Math.max(0, Number(price) || 0);
  const numericRent = Math.max(0, Number(rent) || 0);
  const numericOccupancy = clamp(Number(occupancy) || 0, 0, 100);
  const numericServiceCharge = Math.max(0, Number(serviceCharge) || 0);

  const grossYield =
    numericPrice > 0 ? (numericRent / numericPrice) * 100 : 0;
  const effectiveRent = numericRent * (numericOccupancy / 100);
  const netIncome = Math.max(0, effectiveRent - numericServiceCharge);
  const netYield = numericPrice > 0 ? (netIncome / numericPrice) * 100 : 0;

  return (
    <div className="mt-10 border border-ivory/15 bg-ivory-50 p-5 text-charcoal sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-champagne">
            Illustrative calculator
          </p>
          <h3 className="mt-2 font-serif text-2xl">Model a rental scenario.</h3>
        </div>
        <TrendingUp className="h-5 w-5 text-champagne" aria-hidden="true" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <NumberField
          id="roi-price"
          label="Purchase price"
          prefix="AED"
          value={price}
          onChange={setPrice}
          min={0}
          step={50000}
        />
        <NumberField
          id="roi-rent"
          label="Annual rent"
          prefix="AED"
          value={rent}
          onChange={setRent}
          min={0}
          step={5000}
        />
        <NumberField
          id="roi-occupancy"
          label="Occupancy"
          suffix="%"
          value={occupancy}
          onChange={setOccupancy}
          min={0}
          max={100}
          step={1}
        />
        <NumberField
          id="roi-service"
          label="Annual service charges"
          prefix="AED"
          value={serviceCharge}
          onChange={setServiceCharge}
          min={0}
          step={1000}
        />
      </div>

      <div className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-3">
        <Result label="Gross yield" value={formatPercent(grossYield)} />
        <Result label="Net yield" value={formatPercent(netYield)} accent />
        <Result label="Net annual income" value={formatAED(netIncome)} />
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-[9px] uppercase tracking-[0.16em] text-stone">
          <span>Gross</span>
          <span>Net</span>
        </div>
        <div className="relative mt-2 h-1.5 overflow-hidden bg-ivory-200">
          <div
            className="absolute inset-y-0 left-0 bg-champagne/35"
            style={{ width: `${Math.min((grossYield / 12) * 100, 100)}%` }}
          />
          <div
            className="absolute inset-y-0 left-0 bg-champagne"
            style={{ width: `${Math.min((netYield / 12) * 100, 100)}%` }}
          />
        </div>
      </div>

      <p className="mt-5 text-[10px] leading-relaxed text-stone">
        Illustrative only. Excludes purchase costs, agency fees, maintenance,
        vacancy beyond the occupancy input, and taxes. Rental yields are not
        guaranteed.
      </p>
    </div>
  );
}
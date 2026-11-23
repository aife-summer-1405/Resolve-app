"use client";

type Props = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

const GREEN = "#91FF45";

const PriceRangeSlider = ({ min, max, step = 1, value, onChange }: Props) => {
  const [low, high] = value;

  const percent = (v: number) => ((v - min) / (max - min)) * 100;

  const handleLow = (v: number) => onChange([Math.min(v, high - step), high]);
  const handleHigh = (v: number) => onChange([low, Math.max(v, low + step)]);

  return (
    <div className="range-dual relative h-6 w-full" dir="ltr">
      {/* خط پایه */}
      <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-border" />

      {/* بخش سبز بین دو دستگیره */}
      <div
        className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full"
        style={{
          left: `${percent(low)}%`,
          width: `${percent(high) - percent(low)}%`,
          backgroundColor: GREEN,
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={low}
        onChange={(e) => handleLow(Number(e.target.value))}
        aria-label="حداقل قیمت"
        className="absolute inset-0 w-full"
        style={{ zIndex: low > max - step * 2 ? 5 : 3 }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={high}
        onChange={(e) => handleHigh(Number(e.target.value))}
        aria-label="حداکثر قیمت"
        className="absolute inset-0 w-full"
        style={{ zIndex: 4 }}
      />

      <style jsx>{`
        .range-dual input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          pointer-events: none;
          height: 100%;
          margin: 0;
        }
        .range-dual input[type="range"]::-webkit-slider-runnable-track {
          background: transparent;
          height: 100%;
        }
        .range-dual input[type="range"]::-moz-range-track {
          background: transparent;
        }
        .range-dual input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: ${GREEN};
          border: 2px solid #202020;
          cursor: grab;
          margin-top: 3px;
        }
        .range-dual input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          background: ${GREEN};
          border: 2px solid #202020;
          cursor: grab;
        }
        .range-dual input[type="range"]:active::-webkit-slider-thumb {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
};

export default PriceRangeSlider;
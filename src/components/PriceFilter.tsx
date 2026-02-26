import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  currentRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

export function PriceFilter({
  minPrice,
  maxPrice,
  currentRange,
  onPriceChange,
}: PriceFilterProps) {
  const handleValueChange = (values: number[]) => {
    onPriceChange([values[0], values[1]]);
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-sm border">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Filtrar por Preço</Label>
        <div className="flex justify-between text-sm text-gray-600">
          <span>R$ {currentRange[0].toFixed(2)}</span>
          <span>R$ {currentRange[1].toFixed(2)}</span>
        </div>
      </div>
      <Slider
        min={minPrice}
        max={maxPrice}
        step={10}
        value={currentRange}
        onValueChange={handleValueChange}
        className="w-full"
      />
    </div>
  );
}

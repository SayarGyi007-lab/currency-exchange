import { useEffect, useMemo, useState } from 'react'
import { useAllExchangeRate } from '../../admin/ExchangeRate/hooks/useExchangeRate';
import { useGetAllRateHistory } from '../../admin/RateHistory/hook/useRateHistory';
import ExchangeRateCard from './components/RateCard';
import earth from '../../../assets/earth.png'
import { RateChart } from './components/RateChart';


const ExchangeRate = () => {

  const { exchangeRates, isLoading } = useAllExchangeRate();
  const { rateHistory } = useGetAllRateHistory();

  const [selectedPair, setSelectedPair] = useState<{
    from: string;
    to: string;
    fromSymbol: string;
    toSymbol: string;
  } | null>(null);

  // Bidirectional rates map
  const rates = useMemo(() => {
    const map: Record<string, Record<string, { buy: number; sell: number }>> = {};
    exchangeRates.forEach((r: any) => {
      const fc = r.fromCurrency.code;
      const tc = r.toCurrency.code;
      if (!map[fc]) map[fc] = {};
      if (!map[tc]) map[tc] = {};
      map[fc][tc] = { buy: r.buyRate, sell: r.sellRate };
      if (!map[tc][fc]) {
        map[tc][fc] = { buy: 1 / r.sellRate, sell: 1 / r.buyRate };
      }
    });
    return map;
  }, [exchangeRates]);

  // All unique currencies (both sides of every pair)
  const currencyOptions = useMemo(() => {
    const map = new Map<string, { code: string; symbol: string }>();
    exchangeRates.forEach((r: any) => {
      map.set(r.fromCurrency.code, { code: r.fromCurrency.code, symbol: r.fromCurrency.symbol });
      map.set(r.toCurrency.code, { code: r.toCurrency.code, symbol: r.toCurrency.symbol });
    });
    return Array.from(map.values());
  }, [exchangeRates]);

  // Initialize to first rate pair
  useEffect(() => {
    if (exchangeRates.length > 0 && !selectedPair) {
      const first = exchangeRates[0];
      setSelectedPair({
        from: first.fromCurrency.code,
        to: first.toCurrency.code,
        fromSymbol: first.fromCurrency.symbol,
        toSymbol: first.toCurrency.symbol,
      });
    }
  }, [exchangeRates]);

  // Cross-currency current rate 
  const getCurrentRate = (from: string, to: string): number => {
    if (from === to) return 1;
    if (rates[from]?.[to]) return rates[from][to].buy;
    // Bridge via any available currency
    for (const bridge of currencyOptions) {
      if (bridge.code === from || bridge.code === to) continue;
      if (rates[from]?.[bridge.code] && rates[bridge.code]?.[to]) {
        return rates[from][bridge.code].buy * rates[bridge.code][to].buy;
      }
    }
    return 0;
  };

  // Find bridge currency
  const getBridge = (from: string, to: string): string | null => {
    if (from === to || rates[from]?.[to]) return null;
    for (const bridge of currencyOptions) {
      if (bridge.code === from || bridge.code === to) continue;
      if (rates[from]?.[bridge.code] && rates[bridge.code]?.[to]) return bridge.code;
    }
    return null;
  };

  function getTrend(newRate: number, oldRate: number): "up" | "down" | "steady" | "new" {
    if (!oldRate || oldRate === 0) return "new";
    if (newRate > oldRate) return "up";
    if (newRate < oldRate) return "down";
    return "steady";
  }

  function getPercent(newRate: number, oldRate: number): number {
    if (!oldRate || oldRate === 0) return 0;
    return ((newRate - oldRate) / oldRate) * 100;
  }

  const latestRatesMap = useMemo(() => {
    const map = new Map();
    rateHistory
      .filter((r: any) => r.exchangeRateId)
      .forEach((r: any) => {
        const key = `${r.exchangeRateId.fromCurrency.code}-${r.exchangeRateId.toCurrency.code}`;
        if (!map.has(key)) {
          map.set(key, r);
        } else {
          if (new Date(r.createdAt) > new Date(map.get(key).createdAt)) {
            map.set(key, r);
          }
        }
      });
    return map;
  }, [rateHistory]);


  const handleViewChart = (rate: any) => {
    const isActive =
      selectedPair?.from === rate.fromCurrency.code &&
      selectedPair?.to === rate.toCurrency.code;

    if (!isActive) {
      setSelectedPair({
        from: rate.fromCurrency.code,
        to: rate.toCurrency.code,
        fromSymbol: rate.fromCurrency.symbol,
        toSymbol: rate.toCurrency.symbol,
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const bridge = selectedPair ? getBridge(selectedPair.from, selectedPair.to) : null;

  return (
    <div className="min-h-screen">

      <section className="relative overflow-hidden hero-gradient py-24 px-8 pt-32">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-tertiary/20 to-transparent" />
          <img src={earth} alt="earth" className="w-full h-full object-cover mix-blend-screen" />
        </div>

        <div className="max-w-7xl mx-auto">

          <div className="max-w-2xl mb-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.9] text-white">
              Global{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">
                Exchange
              </span>{" "}
              Rates
            </h1>
            <p className="text-[#9baad6] text-lg md:text-xl font-light leading-relaxed">
              Engineered for institutional precision. Real-time currency conversion with clean UX.
            </p>
          </div>

          {selectedPair ? (
            <RateChart
              from={selectedPair.from}
              to={selectedPair.to}
              fromSymbol={selectedPair.fromSymbol}
              toSymbol={selectedPair.toSymbol}
              rate={getCurrentRate(selectedPair.from, selectedPair.to)}
              currencyOptions={currencyOptions}
              exchangeRates={exchangeRates}
              rates={rates}
              bridge={bridge}
              onPairChange={(from, to, fromSymbol, toSymbol) =>
                setSelectedPair({ from, to, fromSymbol, toSymbol })
              }
            />
          ) : (
            <div className="glass-panel rounded-[2rem] p-8 border border-[#38476d]/20 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.6)]">
              <p className="text-[#9baad6]">Loading rates...</p>
            </div>
          )}

        </div>
      </section>



      {/* MARKET OVERVIEW */}
      <section className="py-24 px-8 bg-[#081329]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Market Overview</h2>
              <p className="text-[#9baad6] text-sm">Top currency movements and trends</p>
            </div>
          </div>

          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {exchangeRates.map((rate: any) => {
                const key = `${rate.fromCurrency.code}-${rate.toCurrency.code}`;
                const history = latestRatesMap.get(key);
                const isActive =
                  selectedPair?.from === rate.fromCurrency.code &&
                  selectedPair?.to === rate.toCurrency.code;

                return (
                  <div key={rate._id} className="col-span-1">
                    <ExchangeRateCard
                      rate={rate}
                      buyTrend={getTrend(rate.buyRate, history?.buyOldRate)}
                      buyPercent={getPercent(rate.buyRate, history?.buyOldRate)}
                      sellTrend={getTrend(rate.sellRate, history?.sellOldRate)}
                      sellPercent={getPercent(rate.sellRate, history?.sellOldRate)}
                      isActive={isActive}
                      onViewChart={() => handleViewChart(rate)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default ExchangeRate;
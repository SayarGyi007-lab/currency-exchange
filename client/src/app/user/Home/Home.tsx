import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAllExchangeRate } from "../../admin/ExchangeRate/hooks/useExchangeRate";
import { useGetAllRateHistory } from "../../admin/RateHistory/hook/useRateHistory";
import { usePreviewConversionMutation } from "../../../slices/redux-slices/conversion-api";
import { setSteps } from "../../../slices/redux-slices/transaction-slice";
import MarketRatesTable from "./components/RateTable";
import CurrencyConverterCard from "./components/CurrencyConverter";


const HomePage = () => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("");
  const [result, setResult] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { exchangeRates, isLoading } = useAllExchangeRate();
  const { rateHistory } = useGetAllRateHistory();
  const [previewConversion] = usePreviewConversionMutation();

  // Clean exchange rates
  const validExchangeRates = useMemo(() => {
    return exchangeRates.filter((r: any) => {
      return(
        r.fromCurrency &&
      r.toCurrency &&
      r.fromCurrency.isActive &&
      r.toCurrency.isActive
      )
    });
  }, [exchangeRates]);

  // currency map
  const currencyMap = useMemo(() => {
    const map: Record<string, string> = {};

    validExchangeRates.forEach((r: any) => {
      map[r.fromCurrency.code] = r.fromCurrency._id;
      map[r.toCurrency.code] = r.toCurrency._id;
    });

    return map;
  }, [validExchangeRates]);

  // currency options
  const currencyOptions = useMemo(() => {
    const set = new Set<string>();

    validExchangeRates.forEach((r: any) => {
      set.add(r.fromCurrency.code);
      set.add(r.toCurrency.code);
    });

    return Array.from(set);
  }, [validExchangeRates]);

  // default "to"
  useEffect(() => {
    if (currencyOptions.length > 1 && !to) {
      const firstOther = currencyOptions.find((c) => c !== from);
      if (firstOther) setTo(firstOther);
    }
  }, [currencyOptions, from, to]);

  // conversion preview
  useEffect(() => {
    const fetchConversion = async () => {
      if (!from || !to || !amount) return;

      if (!currencyMap[from] || !currencyMap[to]) {
        setResult(0);
        dispatch(setSteps([]));
        return;
      }

      try {
        const res = await previewConversion({
          fromCurrency: currencyMap[from],
          toCurrency: currencyMap[to],
          amount,
        }).unwrap();

        setResult(res.data.finalAmount);
        dispatch(setSteps(res.data.steps));
      } catch (err) {
        console.error(err);
        setResult(0);
        dispatch(setSteps([]));
      }
    };

    fetchConversion();
  }, [amount, from, to, currencyMap, previewConversion, dispatch]);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="pt-24 px-8">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <h1 className="text-6xl font-bold text-white">
              Global Flow <br />
              <span className="text-[#c3c0ff]">Digital Speed.</span>
            </h1>

            <p className="text-[#9baad6] mt-4 max-w-lg">
              Real-time exchange system powered by backend rates.
            </p>
          </div>

          <CurrencyConverterCard
            amount={amount}
            from={from}
            to={to}
            result={result}
            currencyOptions={currencyOptions}
            onAmountChange={setAmount}
            onFromChange={setFrom}
            onToChange={setTo}
            convertRate={() => result}
            isRatesReady={() => !!result}
            bridge={null}
            currencyMap={currencyMap}
            exchangeRates={validExchangeRates}
          />
        </div>
      </section>

      {/* Market */}
      <section className="py-20 px-8 bg-[#0b1220]">

        <div className="max-w-screen-2xl mx-auto">

          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold text-white">Live Market</h2>

            <p
              onClick={() => navigate("/exchange")}
              className="cursor-pointer hover:underline text-green-400"
            >
              Explore
            </p>
          </div>

          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <MarketRatesTable
              exchangeRates={validExchangeRates}
              rateHistory={rateHistory}
            />
          )}

        </div>
      </section>
    </div>
  );
};

export default HomePage;
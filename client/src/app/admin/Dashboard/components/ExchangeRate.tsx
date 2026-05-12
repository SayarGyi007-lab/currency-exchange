interface Props {
  exchangeRates: any[];
}

const ExchangeRates = ({
  exchangeRates,
}: Props) => {
  return (
    <div
      className="rounded-2xl p-6 glass-panel border overflow-hidden relative"
      style={{
        borderColor: "rgba(56,71,109,0.15)",
      }}
    >
      {/* background glow */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[90px] pointer-events-none"
        style={{
          background: "rgba(100,94,251,0.12)",
        }}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-8 relative z-10">

        <h2
          className="font-headline text-lg font-bold"
          style={{ color: "var(--secondary)" }}
        >
          Live Exchange Rates
        </h2>

        <div className="flex items-center gap-2">

          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{
              background: "var(--tertiary)",
              boxShadow: "0 0 12px var(--tertiary)",
            }}
          />

          <span
            className="text-[10px] font-medium uppercase tracking-wider"
            style={{ color: "var(--text-secondary)" }}
          >
            Live Feed
          </span>

        </div>

      </div>

      {/* Empty state */}
      {exchangeRates.length === 0 ? (
        <p
          className="text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          No active rates
        </p>
      ) : (

        <div className="grid grid-cols-1 gap-4 relative z-10">

          {exchangeRates
            .filter((r: any) => r.isActive)
            .map((r: any) => (

              <div
                key={r._id}
                className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 group cursor-default"
                style={{
                  background: "rgba(20,36,73,0.35)",
                  border: "1px solid rgba(56,71,109,0.12)",
                }}
              >

                {/* Left side */}
                <div className="flex items-center gap-3">

                  <div className="flex flex-col">

                    <span
                      className="text-sm font-bold"
                      style={{ color: "var(--primary)" }}
                    >
                      {r.fromCurrency?.code ?? "?"} →{" "}
                      {r.toCurrency?.code ?? "?"}
                    </span>

                    <span
                      className="text-[11px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Currency Pair
                    </span>

                  </div>

                </div>

                {/* Right side */}
                <div className="flex items-center gap-8">

                  {/* Buy */}
                  <div className="text-right">

                    <p
                      className="text-[10px] uppercase font-bold tracking-[0.15em]"
                      style={{ color: "var(--tertiary)" }}
                    >
                      Buy
                    </p>

                    <p
                      className="text-sm font-headline font-semibold"
                      style={{ color: "var(--primary)" }}
                    >
                      {r.buyRate}
                    </p>

                  </div>

                  {/* Sell */}
                  <div className="text-right">

                    <p
                      className="text-[10px] uppercase font-bold tracking-[0.15em]"
                      style={{ color: "var(--error-dim)" }}
                    >
                      Sell
                    </p>

                    <p
                      className="text-sm font-headline font-semibold"
                      style={{ color: "var(--primary)" }}
                    >
                      {r.sellRate}
                    </p>

                  </div>

                </div>

              </div>
            ))}

        </div>
      )}
    </div>
  );
};

export default ExchangeRates;
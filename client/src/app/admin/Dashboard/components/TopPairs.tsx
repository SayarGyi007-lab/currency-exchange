interface Props {
  topPairs: {
    pair: string;
    volume: number;
  }[];
}

const TopPairs = ({ topPairs }: Props) => {
  const maxPairVol = Math.max(
    ...topPairs.map((p) => p.volume),
    1
  );

  return (
    <div className="glass-panel rounded-xl p-6 border border-[var(--outline-variant)]/20">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h2 className="text-lg font-bold text-[var(--secondary)]">
          Top Pairs by Volume
        </h2>

      </div>

      {/* Content */}
      {topPairs.length === 0 ? (
        <p className="text-xs text-[var(--text-secondary)]">
          No data
        </p>
      ) : (
        <div className="space-y-6">

          {topPairs.map(({ pair, volume }, index) => (
            <div
              key={pair}
              className="flex items-center gap-4"
            >

              {/* Rank */}
              <div className="w-10 text-xs font-bold text-[var(--text-secondary)]">
                {index + 1}.
              </div>

              {/* Pair Info */}
              <div className="flex-1">

                <div className="flex justify-between mb-1">

                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {pair}
                  </span>

                  <span className="text-sm font-bold text-[var(--primary)]">
                    ${volume.toLocaleString()}
                  </span>

                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-[var(--surface-container-low)] rounded-full overflow-hidden">

                  <div
                    className="h-full rounded-full bg-blue-400 chart-glow transition-all duration-500"
                    style={{
                      width: `${(volume / maxPairVol) * 100}%`,
                    }}
                  />

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default TopPairs;
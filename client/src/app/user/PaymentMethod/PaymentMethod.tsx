import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPaymentByCurrencyQuery } from "../../../slices/redux-slices/payment-method-api";
import { RiExchangeDollarLine } from "react-icons/ri";
import { IoArrowForward } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import { IoQrCodeOutline } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import Button from "../../../constant/ui/Button";
import { useAllExchangeRate } from "../../admin/ExchangeRate/hooks/useExchangeRate";
import { useSelector, useDispatch } from "react-redux";
import { setPaymentMethod } from "../../../slices/redux-slices/transaction-slice";
import type { RootState } from "../../../slices/store/store";

const ChoosePaymentMethodPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    amount,
    from,
    to,
    result,
    fromCurrencyId,
  } = useSelector((state: RootState) => state.transaction);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"bank" | "qr">("bank");

  const { data, isLoading } = useGetPaymentByCurrencyQuery(fromCurrencyId, {
    skip: !fromCurrencyId,
  });

  const { exchangeRates } = useAllExchangeRate();

  const fromSymbol = useMemo(() => {
    if (!exchangeRates?.length) return from;
    const rate = exchangeRates.find(
      (r: any) => r.fromCurrency.code === from || r.toCurrency.code === from
    );
    return (
      (rate?.fromCurrency.code === from ? rate.fromCurrency.symbol : rate?.toCurrency.symbol) ?? from
    );
  }, [exchangeRates, from]);

  const toSymbol = useMemo(() => {
    if (!exchangeRates?.length) return to;
    const rate = exchangeRates.find(
      (r: any) => r.fromCurrency.code === to || r.toCurrency.code === to
    );
    return (
      (rate?.fromCurrency.code === to ? rate.fromCurrency.symbol : rate?.toCurrency.symbol) ?? to
    );
  }, [exchangeRates, to]);

  const methods = data?.data || [];

  // Bank tab 
  const bankMethods = methods;

  // QR tab 
  const qrMethods = methods.filter(
    (m: any) => m.qrImage && m.qrImage.trim() !== ""
  );

  const visibleMethods = activeTab === "bank" ? bankMethods : qrMethods;

  if (!fromCurrencyId) {
    return <p style={{ color: "var(--primary)", padding: "2.5rem" }}>Invalid access</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16">
      <main className="w-full max-w-4xl flex flex-col gap-10">

        {/* Transaction Summary */}
        <section>
          <div style={{ background: "var(--surface-container-high)", border: "1px solid rgba(56,71,109,0.15)" }} className="rounded-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <span className="material-symbols-outlined text-9xl"><RiExchangeDollarLine />
              </span>
            </div>
            <h2 className="text-sm font-medium tracking-widest uppercase mb-6" style={{ color: "var(--text-secondary)" }}>
              Transaction Summary
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="w-16 h-16 rounded-full kinetic-gradient flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-3xl" style={{ color: "#2b15c6" }}>{fromSymbol}</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-tighter" style={{ color: "var(--text-secondary)" }}>You Send</p>
                  <p className="font-headline text-3xl font-bold" style={{ color: "var(--primary)" }}>
                    {amount} <span style={{ color: "var(--secondary)" }}>{from}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center h-12 w-12 rounded-full border" style={{ background: "rgba(23,43,84,0.3)", borderColor: "var(--outline-variant)" }}>
                <span className="material-symbols-outlined" style={{ color: "var(--tertiary)" }}><IoArrowForward /></span>
              </div>
              <div className="flex items-center gap-6 w-full md:w-auto md:flex-row-reverse md:text-right">
                <div className="w-16 h-16 rounded-full flex items-center justify-center border" style={{ background: "var(--surface-bright)", borderColor: "rgba(138,255,236,0.3)", boxShadow: "0 0 15px rgba(138,255,236,0.1)" }}>
                  <span className="material-symbols-outlined text-3xl" style={{ color: "var(--tertiary)" }}>{toSymbol}</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-tighter" style={{ color: "var(--text-secondary)" }}>They Receive</p>
                  <p className="font-headline text-3xl font-bold" style={{ color: "var(--primary)" }}>
                    {result.toFixed(2)} <span style={{ color: "var(--tertiary)" }}>{to}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Header */}
        <section className="flex justify-between items-end">
          <div>
            <h1 className="font-headline text-4xl font-bold tracking-tight" style={{ color: "var(--primary)" }}>Payment Method</h1>
            <p className="mt-2 font-medium" style={{ color: "var(--text-secondary)" }}>Select your preferred funding source</p>
          </div>
          <span className="font-bold text-sm cursor-pointer hover:underline" style={{ color: "var(--tertiary)" }}>View Limits</span>
        </section>

        {/* Payment Panel */}
        <section className="glass-panel rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1px solid rgba(56,71,109,0.2)" }}>

          {/* Tabs */}
          <div className="flex p-1.5 gap-1.5" style={{ background: "rgba(8,19,41,0.5)", borderBottom: "1px solid rgba(56,71,109,0.15)" }}>
            <button
              onClick={() => { setActiveTab("bank"); setSelectedMethod(null); }}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl transition-all duration-300 font-headline font-bold"
              style={activeTab === "bank"
                ? { background: "var(--surface-bright)", color: "var(--primary)", border: "1px solid rgba(56,71,109,0.2)" }
                : { color: "var(--text-secondary)", background: "transparent", border: "1px solid transparent" }
              }
            >
              <span className="material-symbols-outlined"><BsBank /></span>
              Bank Transfer
            </button>
            <button
              onClick={() => { setActiveTab("qr"); setSelectedMethod(null); }}
              className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl transition-all duration-300 font-headline font-bold"
              style={activeTab === "qr"
                ? { background: "var(--surface-bright)", color: "var(--primary)", border: "1px solid rgba(56,71,109,0.2)" }
                : { color: "var(--text-secondary)", background: "transparent", border: "1px solid transparent" }
              }
            >
              <span className="material-symbols-outlined"><IoQrCodeOutline /></span>
              QR FastPay
            </button>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="p-10 text-center" style={{ color: "var(--text-secondary)" }}>Loading...</div>
          ) : visibleMethods.length === 0 ? (
            <div className="p-10 text-center" style={{ color: "var(--text-secondary)" }}>No methods available</div>
          ) : activeTab === "bank" ? (

            // Bank
            <div className="p-8 md:p-10 flex flex-col gap-6">
              {bankMethods.map((m: any) => (
                <div
                  key={m.id || m._id}
                  onClick={() => setSelectedMethod(m)}
                  className="rounded-2xl transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row gap-12 items-start md:items-center p-8">
                    {/* Bank Info */}
                    <div className="w-full flex-1">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center border" style={{ background: "var(--surface-bright)", borderColor: "var(--outline-variant)" }}>
                          <span className="material-symbols-outlined text-3xl" style={{ color: "var(--tertiary)" }}><BsBank /></span>
                        </div>
                        <div>
                          <h3 className="font-headline text-2xl font-bold" style={{ color: "var(--primary)" }}>{m.bankProvider}</h3>
                          <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: "var(--tertiary)" }}>Instant Transfer Enabled</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="p-5 rounded-xl border" style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(56,71,109,0.1)" }}>
                          <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-1" style={{ color: "var(--text-secondary)" }}>Account Holder</p>
                          <p className="text-lg font-semibold" style={{ color: "var(--primary)" }}>{m.accountName}</p>
                        </div>
                        <div className="p-5 rounded-xl border flex justify-between items-center" style={{ background: "rgba(0,0,0,0.25)", borderColor: "rgba(56,71,109,0.1)" }}>
                          <div>
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] mb-1" style={{ color: "var(--text-secondary)" }}>Account Number</p>
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1.5">
                                {[...Array(4)].map((_, i) => (
                                  <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(101,117,158,0.5)" }} />
                                ))}
                              </div>
                              <p className="text-lg font-mono tracking-widest" style={{ color: "var(--primary)" }}>
                                {m.accountNumber.slice(-4)}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(m.accountNumber); }}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: "var(--secondary)" }}
                          >
                            <span className="cursor-pointer material-symbols-outlined"><FaCopy /></span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full md:w-72 p-6 rounded-2xl border" style={{ background: "rgba(16,30,62,0.3)", borderColor: "rgba(56,71,109,0.1)" }}>
                      <div className="flex items-center gap-3 mb-4" style={{ color: "var(--secondary)" }}>
                        <span className="material-symbols-outlined"><MdSecurity /></span>
                        <span className="text-xs font-bold uppercase tracking-wider">Secure Transfer</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        Funds are protected by AES-256 encryption. Transfers from {m.bankProvider} usually clear within seconds.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          ) : (

            // QR
            <div className="p-8 md:p-10 flex flex-col gap-6">
              {qrMethods.map((m: any) => (
                <div
                  key={m.id || m._id}
                  onClick={() => setSelectedMethod(m)}
                  className="rounded-2xl transition-all duration-200"
                >
                  <div className="p-8 md:p-10 flex flex-col items-center text-center gap-8">
                    <div className="relative group">
                      <div className="absolute -inset-4 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(138,255,236,0.1)" }} />
                      <div className="w-80 h-100 bg-white p-4 rounded-3xl relative shadow-2xl">
                        <div className="w-full h-full flex items-center justify-center rounded-xl overflow-hidden" style={{ background: "var(--surface-container-highest)" }}>
                          <img src={m.qrImage} alt="QR Code" className="w-full h-full object-contain" />
                        </div>
                      </div>
                    </div>
                    <div className="max-w-xs">
                      <h3 className="font-headline text-2xl font-bold mb-3" style={{ color: "var(--primary)" }}>Scan with App</h3>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        Open your banking or payment app and scan the QR code above to complete payment.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          )}
        </section>

        {/* Continue */}
        <div className="flex items-center gap-4 mt-6">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex-1 py-5 rounded-full font-headline text-lg font-bold"
          >
            Back
          </Button>

          <Button
            disabled={visibleMethods.length === 0}
            onClick={() => {
              const method = selectedMethod ?? visibleMethods[0];
              if (!method) return;

              dispatch(setPaymentMethod(method.id || method._id));
              navigate("/transaction");
            }}
            className="flex-1 py-5 rounded-full font-headline text-lg font-bold"
          >
            Continue to Payment
          </Button>
        </div>

      </main>
    </div>
  );
};

export default ChoosePaymentMethodPage;
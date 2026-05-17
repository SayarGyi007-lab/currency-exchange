import money from '../../../assets/money.jpg'
import { MdEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { MdSms } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdSecurity } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">

      <section className="relative max-w-7xl mx-auto mb-24 grid lg:grid-cols-12 gap-12 items-center">

        {/* glow effects */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#c3c0ff]/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-48 -right-24 w-80 h-80 bg-[#8affec]/10 blur-[100px] rounded-full"></div>

        <div className="lg:col-span-7 relative z-10">
          <span className="font-headline text-[#8affec] uppercase tracking-[0.4em] text-xs font-bold mb-6 block">
            Secure Portal Access
          </span>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-white mb-8">
            Connect with <br />
            the <span className="text-[#8affec] drop-shadow-[0_0_20px_rgba(138,255,236,0.3)]">SwiftExChange</span>
          </h1>

          <p className="text-[#9baad6] text-lg max-w-xl leading-relaxed">
            Secure, institutional-grade communication for high-velocity currency exchange.
          </p>
        </div>

        <div className="lg:col-span-5 hidden lg:block relative z-10">
          <div className="relative w-full aspect-square">
            <div className="absolute inset-0 bg-[#101e3e]/40 backdrop-blur-2xl rounded-full border border-[#8affec]/20 animate-pulse"></div>

            <img
              src={money}
              alt="exchange visual"
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-[0_0_50px_rgba(138,255,236,0.2)]"
            />
          </div>
        </div>

      </section>


      <section className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 items-center">

        <div className="lg:col-span-2 space-y-8">

          <h3 className="text-[#8affec] uppercase tracking-widest font-headline text-sm font-bold flex items-center gap-3">
            System Status
          </h3>

          {/* CARDS */}
          {[
            {
              icon: <MdSecurity />,
              title: "24/7 Security",
              desc: "Continuous algorithmic monitoring & vault encryption.",
              color: "tertiary"
            },
            {
              icon: <BsBank2 />,
              title: "Institutional",
              desc: "Backed by Tier-1 liquidity providers globally.",
              color: "secondary"
            },
            {
              icon: <MdSupportAgent />,
              title: "Direct Desk",
              desc: "Human-led support for complex OTC requirements.",
              color: "primary"
            }
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 bg-[#101e3e]/50 backdrop-blur-xl rounded-2xl border border-[#38476d]/10"
            >
              <div className={`p-3 rounded-lg bg-${item.color}/10`}>
                <span className={`material-symbols-outlined text-${item.color}`}>
                  {item.icon}
                </span>
              </div>

              <div>
                <h4 className="text-white text-sm font-bold uppercase tracking-widest">
                  {item.title}
                </h4>
                <p className="text-xs text-[#9baad6] mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>


        {/* FORM */}
        <div className="lg:col-span-3 bg-[#101e3e]/40 backdrop-blur-2xl p-10 rounded-[2rem] border border-[#8affec]/10 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.6)]">

          <h2 className="text-3xl font-bold text-white mb-2">
            Contact Us
          </h2>

          <p className="text-[#9baad6] mb-8 text-sm">
            Reach us instantly through your preferred channel.
          </p>

          <div className="space-y-5">

            {/* email */}
            <a
              href="mailto:support@swiftexchange.com"
              className="flex items-center justify-between p-5 rounded-xl bg-black/60 border border-[#38476d]/30 hover:border-[#8affec] transition group"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-2xl text-[#8affec]">
                  <MdEmail />
                </span>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-xs text-[#9baad6]">support@swiftexchange.com</p>
                </div>
              </div>

              <span className="material-symbols-outlined text-[#9baad6] group-hover:translate-x-1 transition">
                <FaArrowRightLong />
              </span>
            </a>

            {/* phone */}
            <a
              href="tel:+1234567890"
              className="flex items-center justify-between p-5 rounded-xl bg-black/60 border border-[#38476d]/30 hover:border-[#8affec] transition group"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-2xl text-[#8affec]">
                  <MdLocalPhone />
                </span>
                <div>
                  <p className="text-white font-semibold">Phone</p>
                  <p className="text-xs text-[#9baad6]">+1 234 567 890</p>
                </div>
              </div>

              <span className="material-symbols-outlined text-[#9baad6] group-hover:translate-x-1 transition">
                <FaArrowRightLong />
              </span>
            </a>

            {/* fb */}
            <a
              href="https://facebook.com/something"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 rounded-xl bg-black/60 border border-[#38476d]/30 hover:border-[#8affec] transition group"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-2xl text-[#8affec]">
                  <FaFacebookSquare />
                </span>
                <div>
                  <p className="text-white font-semibold">Facebook</p>
                  <p className="text-xs text-[#9baad6]">facebook.com/something</p>
                </div>
              </div>

              <span className="material-symbols-outlined text-[#9baad6] group-hover:translate-x-1 transition">
                <FaArrowRightLong />
              </span>
            </a>

            {/* sms */}
            <a
              href="sms:+1234567890"
              className="flex items-center justify-between p-5 rounded-xl bg-black/60 border border-[#38476d]/30 hover:border-[#8affec] transition group"
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-2xl text-[#8affec]">
                  <MdSms />
                </span>
                <div>
                  <p className="text-white font-semibold">Message (SMS)</p>
                  <p className="text-xs text-[#9baad6]">Send us a quick text</p>
                </div>
              </div>

              <span className="material-symbols-outlined text-[#9baad6] group-hover:translate-x-1 transition">
                <FaArrowRightLong />
              </span>
            </a>

          </div>
        </div>

      </section>


      {/* CTA */}
      <section className="max-w-7xl mx-auto mt-24 bg-[#081329] rounded-[2rem] p-10 border border-[#38476d]/10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">

        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#c3c0ff]/5 blur-[80px] rounded-full"></div>

        <div className="relative z-10">
          <h3 className="text-3xl font-bold text-white mb-3">
            Seeking Instant Clarity?
          </h3>
          <p className="text-[#9baad6]">
            Explore documentation & rapid-response solutions.
          </p>
        </div>

        <button className="relative z-10 flex items-center gap-3 px-8 py-4 border border-[#38476d]/30 rounded-full text-white hover:bg-[#101e3e] transition">
          Explore Help Center →
        </button>

      </section>

    </div>
  );
};

export default ContactUs;
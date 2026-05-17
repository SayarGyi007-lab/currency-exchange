const Footer = () => {
  return (
    <div>
       <footer className="relative z-10 border-t border-white/5" style={{ background: "rgba(6,14,32,0.6)", backdropFilter: "blur(8px)" }}>
          <div className="flex flex-col md:flex-row justify-between items-center px-8 py-8 gap-4 max-w-7xl mx-auto">
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-[#9baad6]/40 text-center md:text-left">
              © 2026 Secure Systems.{" "}
              <br className="md:hidden" />
              Institutional Grade Security Protocols Enabled.
            </p>
            <nav className="flex gap-8">
              {["Legal", "Privacy", "Network Status"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#9baad6] hover:text-[#c3c0ff] transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </footer>
    </div>
  )
}

export default Footer

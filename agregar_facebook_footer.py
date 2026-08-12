path = "components/SiteFooter.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''      <div className="relative z-10">
        <a href={`tel:+${NUMERO}`} className="block text-sm font-semibold text-[#c9a24b]">
          📞 {TELEFONO_VISIBLE}
        </a>
        <p className="mt-4">© 2026 Altar del Tata Bombori · Maestro Juan Santiago</p>
      </div>'''

new = '''      <div className="relative z-10">
        <a href={`tel:+${NUMERO}`} className="block text-sm font-semibold text-[#c9a24b]">
          📞 {TELEFONO_VISIBLE}
        </a>
        <a
          href="https://www.facebook.com/maestrojuansantiagopotosi"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#c9a24b] hover:text-[#f0d78c] transition"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
            <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/>
          </svg>
          Síguenos en Facebook
        </a>
        <p className="mt-4">© 2026 Altar del Tata Bombori · Maestro Juan Santiago</p>
      </div>'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")

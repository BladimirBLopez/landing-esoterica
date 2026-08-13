path = "components/SeccionCitas.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 z-0"
        style={{
          background: "linear-gradient(to bottom, #1a0505 0%, rgba(26,5,5,0) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-md text-center">'''

new = '''      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 z-0"
        style={{
          background: "linear-gradient(to bottom, #1a0505 0%, rgba(26,5,5,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-0"
        style={{
          background: "linear-gradient(to top, #4a0916 0%, rgba(74,9,22,0) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-md text-center">'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")

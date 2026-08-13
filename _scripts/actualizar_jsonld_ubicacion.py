path = "app/layout.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''  address: {
    "@type": "PostalAddress",
    addressLocality: "Norte de Potosí",
    addressRegion: "Potosí",
    addressCountry: "BO",
  },
  areaServed: "BO",
  sameAs: [],'''

new = '''  address: {
    "@type": "PostalAddress",
    streetAddress: "América 528-538",
    addressLocality: "Villa Imperial de Potosí",
    addressRegion: "Potosí",
    addressCountry: "BO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -19.5848229,
    longitude: -65.7586534,
  },
  areaServed: "BO",
  sameAs: ["https://www.facebook.com/maestrojuansantiagopotosi"],'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")

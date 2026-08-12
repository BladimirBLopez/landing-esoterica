path = "package.json"
with open(path, "r") as f:
    content = f.read()

old = '''  "dependencies": {
    "@vercel/analytics": "^1.3.1",
    "@hookform/resolvers": "^5.7.1",
    "next": "16.3.0",
    "next-sitemap": "^4.2.3",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "react-hook-form": "^7.84.0",
    "tesseract.js": "^7.0.0",
    "zod": "^4.4.3",
    "zustand": "^5.0.14"
  },'''

new = '''  "dependencies": {
    "@vercel/analytics": "^1.3.1",
    "next": "16.3.0",
    "next-sitemap": "^4.2.3",
    "react": "19.2.8",
    "react-dom": "19.2.8",
    "tesseract.js": "^7.0.0"
  },'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")

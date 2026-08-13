path = "components/ChatAsistente.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''    try {
      const res = await fetch(`${API_BASE}/api/chat-ia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ historial, mensaje: texto }),
      });
      const data = await res.json();'''

new = '''    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      const res = await fetch(`${API_BASE}/api/chat-ia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ historial, mensaje: texto }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await res.json();'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")

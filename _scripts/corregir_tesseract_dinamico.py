path = "components/ChatAsistente.tsx"
with open(path, "r") as f:
    content = f.read()

old1 = '''import Tesseract from "tesseract.js";'''
new1 = ''''''
assert content.count(old1) == 1
content = content.replace(old1, new1)

old2 = '''      const { data } = await Tesseract.recognize(file, "spa");'''
new2 = '''      const Tesseract = (await import("tesseract.js")).default;
      const { data } = await Tesseract.recognize(file, "spa");'''
assert content.count(old2) == 1
content = content.replace(old2, new2)

with open(path, "w") as f:
    f.write(content)

print("OK")

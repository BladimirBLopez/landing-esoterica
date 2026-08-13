path = "app/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''            <Image
              src="https://res.cloudinary.com/dkq95jus0/image/upload/maestro-juan4"
              alt="Maestro Juan Santiago"
              fill
              className="object-contain"
            />'''

new = '''            <Image
              src="https://res.cloudinary.com/dkq95jus0/image/upload/maestro-juan4"
              alt="Maestro Juan Santiago"
              fill
              priority
              fetchPriority="high"
              className="object-contain"
            />'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")

path = "app/preguntas-frecuentes/page.tsx"
with open(path, "r") as f:
    content = f.read()

old = '''  {
    pregunta: "¿Atienden a distancia?",
    respuesta: "Sí. Atiendo en Bolivia y también a distancia a otros países por WhatsApp, sin importar dónde te encuentres.",
  },
];'''

new = '''  {
    pregunta: "¿Atienden a distancia?",
    respuesta: "Sí. Atiendo en Bolivia y también a distancia a otros países por WhatsApp, sin importar dónde te encuentres.",
  },
  {
    pregunta: "¿Cómo recuperar a mi ex pareja con un amarre de amor?",
    respuesta: "El amarre de amor trabaja sobre los sentimientos y la voluntad de tu ex para que vuelva arrepentido y con más amor que antes. En la consulta reviso tu caso específico con las Hojas de Coca y el Tarot para saber si hay bloqueos, terceros interfiriendo, y qué trabajo necesitas.",
  },
  {
    pregunta: "¿Cuáles son los síntomas de que me hicieron brujería o un amarre?",
    respuesta: "Cambios repentinos de humor, alejamiento sin explicación, discusiones constantes sin motivo claro, cansancio o tristeza sin razón aparente. Si sientes alguno de estos síntomas, puedo hacer una consulta con las Sagradas Hojas de Coca para confirmar qué está pasando realmente.",
  },
  {
    pregunta: "¿El amarre de amor funciona de verdad?",
    respuesta: "Sí, cuando se hace con fe, respeto y la fuerza sagrada correcta. No fuerzo voluntades — despierto lo que ya existe entre dos personas. Trabajo con la fuerza del Tata Bombori, heredada por generaciones en el Norte de Potosí.",
  },
  {
    pregunta: "¿Es peligroso hacer un amarre de amor?",
    respuesta: "No, cuando se hace con conocimiento y respeto por las energías, como lo hago yo, heredero de esta sabiduría ancestral. Cada trabajo se hace con cuidado y responsabilidad.",
  },
];'''

assert content.count(old) == 1
content = content.replace(old, new)

with open(path, "w") as f:
    f.write(content)

print("OK")

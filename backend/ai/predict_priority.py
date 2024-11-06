import sys
import joblib
import pandas as pd

# Cargar el modelo entrenado
model = joblib.load('ai/models/prioridad_model.pkl')

# Obtener los argumentos pasados desde Node.js
tiempo_estimado = float(sys.argv[1])
importancia = int(sys.argv[2])
dias_restantes = int(sys.argv[3])

# Crear el dataframe con las mismas columnas que se usaron para entrenar el modelo
new_data = pd.DataFrame([[tiempo_estimado, importancia, dias_restantes]], columns=['tiempo_estimado', 'importancia', 'dias_restantes'])

# Realizar la predicción
prediccion = model.predict(new_data)

# Imprimir la predicción (esto será capturado por Node.js)
print(prediccion[0])

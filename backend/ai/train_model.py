import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import joblib

# Cargar los datos desde el CSV
df = pd.read_csv('ai/data/tareas_data.csv')

# Características (X) y etiqueta (y)
X = df[['tiempo_estimado', 'importancia', 'dias_restantes']]
y = df['puntuacion']

# Dividir el dataset en entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Entrenar el modelo
model = LinearRegression()
model.fit(X_train, y_train)

# Hacer predicciones
predicciones = model.predict(X_test)

# Evaluar el modelo
mse = mean_squared_error(y_test, predicciones)
print(f"Mean Squared Error: {mse}")

# Guardar el modelo entrenado
joblib.dump(model, 'ai/models/prioridad_model.pkl')

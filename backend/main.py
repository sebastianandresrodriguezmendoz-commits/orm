
from app.common import Config, error_bp
from app.controller import categoria_bp, entrada_bp, productos_bp
from app.models import Categoria, Entrada, Producto, db
from flasgger import Swagger
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Configuración
app.config.from_object(Config)

# Inicializar extensiones
CORS(app)
swagger = Swagger(app)
db.init_app(app)

# Crear tablas automáticamente en la base de datos
with app.app_context():
    db.create_all()


# Ruta raíz de prueba
@app.route("/", methods=["GET"])
def home():
    return jsonify({"mensaje": "API funcionando correctamente"}), 200


# Registrar Blueprints
app.register_blueprint(error_bp)
app.register_blueprint(productos_bp)
app.register_blueprint(categoria_bp)
app.register_blueprint(entrada_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

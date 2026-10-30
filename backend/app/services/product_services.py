from app.models import Categoria, Producto, db
from flask import abort, jsonify, request


def product_list():
    productos = db.session.execute(db.select(Producto)).scalars().all()
    return jsonify([p.to_dict() for p in productos]), 200


def product_detail(producto_id):
    producto = db.session.get(Producto, producto_id)
    if not producto:
        abort(404, description="Producto no encontrado")
    return jsonify(producto.to_dict()), 200


def product_add():
    data = request.get_json()
    if not data:
        abort(400, description="No se recibió información en formato JSON")

    required_fields = ["nombre", "precio", "categoria_id"]
    for field in required_fields:
        if field not in data:
            abort(400, description=f"Falta el campo obligatorio: {field}")

    if not isinstance(data["precio"], (int, float)) or data["precio"] <= 0:
        return (
            jsonify({"mensaje": "El precio debe ser un número mayor a cero"}),
            422,
        )

    categoria = db.session.get(Categoria, data["categoria_id"])
    if not categoria:
        abort(400, description="La categoría no existe")

    nuevo_producto = Producto(
        nombre=data["nombre"],
        descripcion=data.get("descripcion"),
        precio=data["precio"],
        categoria_id=data["categoria_id"],
        disponible=data.get("disponible", True),
        stock_min=data.get("stock_min", 0),
    )
    db.session.add(nuevo_producto)
    db.session.commit()
    return jsonify(nuevo_producto.to_dict()), 201


def product_update(producto_id):
    data = request.get_json()
    if not data:
        abort(400, description="No se recibió información en formato JSON")

    producto = db.session.get(Producto, producto_id)
    if not producto:
        abort(404, description="Producto no encontrado")

    if "precio" in data:
        if not isinstance(data["precio"], (int, float)) or data["precio"] <= 0:
            abort(422, description="El precio debe ser mayor a cero")

    producto.nombre = data.get("nombre", producto.nombre)
    producto.descripcion = data.get("descripcion", producto.descripcion)
    producto.precio = data.get("precio", producto.precio)
    producto.disponible = data.get("disponible", producto.disponible)
    producto.stock_min = data.get("stock_min", producto.stock_min)

    if "categoria_id" in data:
        categoria = db.session.get(Categoria, data["categoria_id"])
        if not categoria:
            abort(400, description="La categoría no existe")
        producto.categoria_id = data["categoria_id"]

    db.session.commit()
    return jsonify(producto.to_dict()), 200


def product_delete(producto_id):
    producto = db.session.get(Producto, producto_id)
    if not producto:
        abort(404, description="Producto no encontrado")

    db.session.delete(producto)
    db.session.commit()
    return jsonify({"mensaje": "Producto eliminado exitosamente"}), 200

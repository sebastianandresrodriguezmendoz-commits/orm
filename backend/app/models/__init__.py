from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


db = SQLAlchemy(model_class=Base)

from .categoria import Categoria
from .entrada import Entrada
from .producto import Producto

__all__ = ["db", "Producto", "Categoria", "Entrada"]

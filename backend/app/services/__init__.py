from .categoria_services import (
    categoria_add,
    categoria_delete,
    categoria_detail,
    categoria_list,
    categoria_update,
)
from .entrada_services import (
    entrada_add,
    entrada_delete,
    entrada_detail,
    entrada_list,
    entrada_update,
)
from .product_services import (
    product_add,
    product_delete,
    product_detail,
    product_list,
    product_update,
)

__all__ = [
    "product_list",
    "product_detail",
    "product_add",
    "product_update",
    "product_delete",
    "categoria_list",
    "categoria_detail",
    "categoria_add",
    "categoria_update",
    "categoria_delete",
    "entrada_list",
    "entrada_detail",
    "entrada_add",
    "entrada_update",
    "entrada_delete",
]

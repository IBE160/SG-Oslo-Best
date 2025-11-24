from fastapi import APIRouter
import importlib
import pkgutil
import logging
from typing import Optional

# app/api/v1/__init__.py

logger = logging.getLogger(__name__)

# Main router for the v1 package. The application can mount this at "/api/v1" or "/v1".
router = APIRouter()

def _include_subrouters():
    """
    Dynamically discovers submodules in this package and includes any APIRouter
    found under common attribute names: 'router', 'api_router' or returned by
    a 'get_router()' callable.
    This makes it easy to add new endpoint modules without editing this file.
    """
    package = __package__  # "app.api.v1"
    for finder, name, ispkg in pkgutil.iter_modules(__path__):
        full_name = f"{package}.{name}"
        try:
            module = importlib.import_module(full_name)
        except Exception:
            logger.exception("Failed to import module %s", full_name)
            continue

        # Common attribute names where routers might live
        candidates = [
            getattr(module, "router", None),
            getattr(module, "api_router", None),
        ]
        # also support get_router() factory
        get_router = getattr(module, "get_router", None)
        if callable(get_router):
            try:
                candidates.append(get_router())
            except Exception:
                logger.exception("get_router() failed in module %s", full_name)

        for candidate in candidates:
            if isinstance(candidate, APIRouter):
                # optionally set tags or prefix here if needed
                router.include_router(candidate)
                logger.debug("Included router from %s", full_name)
                break  # include only the first found router per module

# Run discovery on import
_include_subrouters()

__all__ = ["router"]
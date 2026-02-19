from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from datetime import datetime

from .api.routes import router as api_router

# #region agent log
log_path = r"c:\Users\michelde\DigitalCity\.cursor\debug.log"
def _log(msg, data=None, hypothesis_id=None):
    try:
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":hypothesis_id or "A","location":"main.py","message":msg,"data":data or {},"timestamp":int(datetime.now().timestamp()*1000)})+"\n")
    except: pass
# #endregion

# #region agent log
_log("Import statements completed", {"imports":["FastAPI","CORSMiddleware","api_router"]}, "A")
# #endregion


def create_app() -> FastAPI:
    # #region agent log
    _log("create_app() entry", {}, "B")
    # #endregion
    app = FastAPI(title="Smart Waste Management API")
    # #region agent log
    _log("FastAPI app created", {"title":app.title}, "B")
    # #endregion

    # CORS configuration for local development (React on localhost:3000)
    origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    # #region agent log
    _log("CORS middleware added", {"origins":origins}, "B")
    # #endregion

    @app.get("/")
    async def root():
        # #region agent log
        _log("GET / endpoint called", {}, "C")
        # #endregion
        return {"message": "Smart Waste Management API", "version": "1.0.0"}

    @app.get("/health")
    async def health():
        # #region agent log
        _log("GET /health endpoint called", {}, "C")
        # #endregion
        return {"status": "ok"}

    # Mirror health endpoint under /api for the frontend dev proxy
    @app.get("/api/health")
    async def api_health():
        # #region agent log
        _log("GET /api/health endpoint called", {}, "C")
        # #endregion
        return {"status": "ok"}

    # #region agent log
    _log("Before include_router", {"router_prefix":"/api"}, "B")
    # #endregion
    app.include_router(api_router, prefix="/api")
    # #region agent log
    _log("Router included successfully", {}, "B")
    # #endregion

    @app.on_event("startup")
    async def startup_event():
        # #region agent log
        _log("FastAPI startup event fired - server is ready", {"routes":len(app.routes)}, "D")
        # #endregion
        pass

    # #region agent log
    _log("create_app() exit - returning app", {"routes_count":len(app.routes)}, "B")
    # #endregion
    return app


# #region agent log
_log("Module-level: about to call create_app()", {}, "A")
# #endregion
try:
    app = create_app()
    # #region agent log
    _log("Module-level: create_app() succeeded", {"app_type":type(app).__name__}, "A")
    # #endregion
except Exception as e:
    # #region agent log
    _log("Module-level: create_app() FAILED", {"error":str(e),"error_type":type(e).__name__}, "A")
    # #endregion
    raise


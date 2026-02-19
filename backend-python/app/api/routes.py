from fastapi import APIRouter
from typing import List
import json
import os
from datetime import datetime

from ..core.models import Bin

# #region agent log
log_path = r"c:\Users\michelde\DigitalCity\.cursor\debug.log"
def _log(msg, data=None, hypothesis_id=None):
    try:
        with open(log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps({"sessionId":"debug-session","runId":"run1","hypothesisId":hypothesis_id or "D","location":"routes.py","message":msg,"data":data or {},"timestamp":int(datetime.now().timestamp()*1000)})+"\n")
    except: pass
# #endregion

# #region agent log
_log("routes.py: imports completed", {"imports":["APIRouter","List","Bin"]}, "D")
# #endregion

router = APIRouter()
# #region agent log
_log("APIRouter created", {}, "D")
# #endregion


@router.get("/bins", response_model=List[Bin])
async def list_bins() -> List[Bin]:
    """Temporary mock endpoint returning a few sample bins."""
    # #region agent log
    _log("GET /api/bins endpoint called", {}, "C")
    # #endregion
    try:
        bins_data = [
        Bin(
            id=1,
            name="Central Plaza Bin",
            location="Central Plaza",
            latitude=-22.8301,
            longitude=-47.0525,
            fill_level=25,
        ),
        Bin(
            id=2,
            name="Library Entrance Bin",
            location="Main Library",
            latitude=-22.8295,
            longitude=-47.054,
            fill_level=80,
        ),
        Bin(
            id=3,
            name="Cafeteria Bin",
            location="Campus Cafeteria",
            latitude=-22.831,
            longitude=-47.053,
            fill_level=95,
        ),
    ]
        # #region agent log
        _log("Bins data created", {"count":len(bins_data)}, "C")
        # #endregion
        return bins_data
    except Exception as e:
        # #region agent log
        _log("list_bins() FAILED", {"error":str(e),"error_type":type(e).__name__}, "C")
        # #endregion
        raise


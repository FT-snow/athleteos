from datetime import datetime, timezone
from typing import Literal
from uuid import uuid4

from pydantic import BaseModel, Field


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class LatticeInitRequest(BaseModel):
    session_id: str = Field(..., description="Client or storage session identifier")
    video_url: str | None = Field(default=None, description="Optional source video URL")
    exercise_name: str | None = None


class LatticeRefreshRequest(BaseModel):
    lattice_id: str
    frame_cursor: int = Field(default=0, ge=0)


class LatticeResponse(BaseModel):
    lattice_id: str
    session_id: str
    status: Literal["initialized", "refreshed"]
    issued_at: str
    mock: bool = True


class AnalysisJobCreateRequest(BaseModel):
    session_id: str
    lattice_id: str
    rep_index: int | None = Field(default=None, ge=0)


class AnalysisJobResponse(BaseModel):
    job_id: str
    session_id: str
    lattice_id: str
    status: Literal["queued", "running", "completed"]
    created_at: str
    updated_at: str
    mock_summary: str
    mock: bool = True


def build_lattice_response(session_id: str, status: Literal["initialized", "refreshed"]) -> LatticeResponse:
    return LatticeResponse(
        lattice_id=f"lattice_{uuid4().hex[:12]}",
        session_id=session_id,
        status=status,
        issued_at=utc_now_iso(),
    )


def build_analysis_job_response(
    session_id: str,
    lattice_id: str,
    status: Literal["queued", "running", "completed"] = "queued",
    job_id: str | None = None,
) -> AnalysisJobResponse:
    timestamp = utc_now_iso()
    return AnalysisJobResponse(
        job_id=job_id or f"job_{uuid4().hex[:12]}",
        session_id=session_id,
        lattice_id=lattice_id,
        status=status,
        created_at=timestamp,
        updated_at=timestamp,
        mock_summary="Mock OpenCV analysis placeholder. Replace with real lattice/CV execution.",
    )

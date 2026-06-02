from fastapi import APIRouter

from app.models import (
    AnalysisJobCreateRequest,
    AnalysisJobResponse,
    build_analysis_job_response,
)

router = APIRouter(prefix="/v1/analysis", tags=["analysis"])


@router.post("/jobs", response_model=AnalysisJobResponse)
async def create_analysis_job(payload: AnalysisJobCreateRequest) -> AnalysisJobResponse:
    # Mock job scheduling until the real OpenCV workers are available.
    return build_analysis_job_response(
        session_id=payload.session_id,
        lattice_id=payload.lattice_id,
        status="queued",
    )


@router.get("/jobs/{job_id}", response_model=AnalysisJobResponse)
async def get_analysis_job(job_id: str) -> AnalysisJobResponse:
    # Mock job status lookup until a real persistence layer is connected.
    return build_analysis_job_response(
        session_id="mock-session",
        lattice_id="mock-lattice",
        status="completed",
        job_id=job_id,
    )

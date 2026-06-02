from fastapi import APIRouter

from app.models import (
    LatticeInitRequest,
    LatticeRefreshRequest,
    LatticeResponse,
    build_lattice_response,
)

router = APIRouter(prefix="/v1/lattice", tags=["lattice"])


@router.post("/init", response_model=LatticeResponse)
async def init_lattice(payload: LatticeInitRequest) -> LatticeResponse:
    # Mock lattice creation until the real CV pipeline is integrated.
    return build_lattice_response(session_id=payload.session_id, status="initialized")


@router.post("/refresh", response_model=LatticeResponse)
async def refresh_lattice(payload: LatticeRefreshRequest) -> LatticeResponse:
    # Mock refresh behavior. Real implementation will reuse the existing lattice id.
    return LatticeResponse(
        lattice_id=payload.lattice_id,
        session_id="mock-session",
        status="refreshed",
        issued_at=build_lattice_response("mock-session", "refreshed").issued_at,
    )

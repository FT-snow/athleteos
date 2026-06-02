from fastapi import FastAPI

from app.routers.analysis import router as analysis_router
from app.routers.lattice import router as lattice_router

app = FastAPI(
    title="FormIQ OpenCV Service",
    version="0.1.0",
    description="Mock-backed CV service scaffold for lattice and analysis workflows.",
)

app.include_router(lattice_router)
app.include_router(analysis_router)


@app.get("/health")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}

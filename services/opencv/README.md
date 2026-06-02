# FormIQ OpenCV Service

This service is a FastAPI scaffold for FormIQ backend-facing computer vision workflows.

Current behavior is mock-only and intentionally stands in for real CV processing until the production lattice and analysis pipeline are wired in.

## Endpoints

- `POST /v1/lattice/init`
- `POST /v1/lattice/refresh`
- `POST /v1/analysis/jobs`
- `GET /v1/analysis/jobs/{job_id}`

## Run locally

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

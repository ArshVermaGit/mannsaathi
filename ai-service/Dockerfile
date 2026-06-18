FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY app/ app/

# Health check
HEALTHCHECK --interval=30s --timeout=10s \
  CMD curl -f http://localhost:$PORT/health || exit 1

# Run (Render provides the $PORT environment variable)
CMD sh -c "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-10000} --workers 2"

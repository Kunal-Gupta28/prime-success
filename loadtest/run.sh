#!/usr/bin/env bash
# =============================================================================
# Prime Success — k6 Load Testing Runner
# =============================================================================
# Usage:
#   ./loadtest/run.sh smoke    # Quick 30-sec sanity run (5 concurrent users)
#   ./loadtest/run.sh full     # Standard ramp-up (0 -> 100 users, ~7 mins)
#   ./loadtest/run.sh stress   # Stress test (0 -> 250 users, ~5 mins)
#   ./loadtest/run.sh soak     # Endurance soak test (25 steady users, 10 mins)
# =============================================================================
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROFILE="${1:-smoke}"

case "$PROFILE" in
  smoke|full|stress|soak) ;;
  *)
    echo "❌ Unknown profile: '$PROFILE'"
    echo "Usage: $0 [smoke|full|stress|soak]"
    exit 1
    ;;
esac

# Check if k6 is installed
if ! command -v k6 &>/dev/null; then
  echo "⚠️ k6 binary not found on PATH."
  echo "👉 To install k6 on macOS: brew install k6"
  echo "👉 Or run via Docker: docker run --rm -i -v \"$DIR:/loadtest\" grafana/k6 run /loadtest/k6-loadtest.js"
  exit 1
fi

# Load optional .env from loadtest or root
if [ -f "$DIR/.env" ]; then
  set -a; source "$DIR/.env"; set +a
elif [ -f "$DIR/../.env" ]; then
  set -a; source "$DIR/../.env"; set +a
fi

TARGET_URL="${BASE_URL:-http://localhost:${PORT:-3000}}"
mkdir -p "$DIR/results"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
OUT="$DIR/results/${TIMESTAMP}-${PROFILE}.txt"

echo "======================================================================"
echo "⚡ Prime Success Load Test Runner"
echo "🎯 Target URL : $TARGET_URL"
echo "📊 Profile    : $PROFILE"
echo "📝 Log Output : $OUT"
echo "======================================================================"

k6 run \
  -e PROFILE="$PROFILE" \
  -e BASE_URL="$TARGET_URL" \
  "$DIR/k6-loadtest.js" 2>&1 | tee "$OUT"

echo ""
echo "✅ Load test finished. Results saved to $OUT"


#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODEL_DIR="${ROOT_DIR}/public/models"
DRACO_DECODER_PATH="https://www.gstatic.com/draco/versioned/decoders/1.5.5/"

if [[ ! -d "${MODEL_DIR}" ]]; then
  echo "Model directory not found: ${MODEL_DIR}" >&2
  exit 1
fi

mapfile -t model_files < <(find "${MODEL_DIR}" -type f -name "*.glb" | sort)

if [[ "${#model_files[@]}" -eq 0 ]]; then
  echo "No .glb files found under ${MODEL_DIR}"
  exit 0
fi

echo "Optimizing ${#model_files[@]} model(s) with Draco compression (no quantization)..."

for file in "${model_files[@]}"; do
  tmp="$(mktemp "${file}.XXXXXX")"
  echo "Optimizing ${file}"

  bunx --yes @gltf-transform/cli draco \
    "${file}" \
    "${tmp}" \
    --method edgebreaker \
    --quantize-position 0 \
    --quantize-normal 0 \
    --quantize-texcoord 0 \
    --quantize-color 0 \
    --quantize-generic 0

  mv "${tmp}" "${file}"
done

echo "Done. Remember to use Draco decoder path in useGLTF:"
echo "  ${DRACO_DECODER_PATH}"

#!/usr/bin/env bash
# Скачивает фото из Figma в assets/img/.
# Ссылки временные (живут 7 дней с момента генерации) — запусти один раз,
# потом закоммить картинки в репозиторий.
#
# Запуск из корня проекта:  bash scripts/download-assets.sh
set -e
cd "$(dirname "$0")/.."
mkdir -p assets/img

dl() { echo "→ $2"; curl -fL --retry 2 -o "assets/img/$2" "$1"; }

dl "https://www.figma.com/api/mcp/asset/b270adac-fedd-4fea-85dd-e76bb7c99886.png" cover-portrait.png
dl "https://www.figma.com/api/mcp/asset/66cd6d07-ab18-4fba-9770-16518fb0053e.png" portrait-smile.png
dl "https://www.figma.com/api/mcp/asset/547aa663-d484-4577-a954-8302cd3cdd02.png" seated.png
dl "https://www.figma.com/api/mcp/asset/7c607ddb-9943-43e2-accc-63654af296d9.png" archive-candid.png
dl "https://www.figma.com/api/mcp/asset/95090876-3fc4-476e-b05e-33039a858e65.png" archive-playful.png
dl "https://www.figma.com/api/mcp/asset/4d56e5d4-1e73-4a0c-8c4a-47b91de35f6d.png" standing.png

echo "Готово: $(ls assets/img | wc -l) файлов в assets/img/"

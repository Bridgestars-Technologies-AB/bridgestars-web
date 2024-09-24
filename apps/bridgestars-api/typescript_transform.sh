./vendor/bin/sail artisan typescript:transform
cp resources/types/generated.d.ts ../web/apps/frontend/types/generated.d.ts
echo "Generated files copied to ../web/apps/frontend/types/generated.d.ts"

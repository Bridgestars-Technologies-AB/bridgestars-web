./vendor/bin/sail artisan typescript:transform
cp resources/types/generated.d.ts ../frontend/types/generated.d.ts
echo "Generated files copied to frontend/types/generated.d.ts"

#!/bin/bash

# resize-images.sh
# written by Claude
# Recursively resize all images in current directory so the larger side is 500px
#
# Uses ImageMagick with Lanczos filtering for high-quality downscaling
# Supported formats: jpg, jpeg, png, gif, webp (both upper and lower case)
#

echo "Starting image resize process..."
echo "Target size: 500px (larger side)"
echo "Using ImageMagick with Lanczos filtering for high quality"
echo ""

# Counter for progress
count=0
total=$(find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) | wc -l | tr -d ' ')

echo "Found $total images to process"
echo ""

# Find all image files recursively and resize them
# ImageMagick with Lanczos filter for high-quality downscaling
# -resize 500x500\> = resize so largest dimension is 500px, don't enlarge smaller images
# -filter Lanczos = high-quality resampling algorithm (best for downscaling)
# -quality 90 = good compression/quality balance for JPEGs
find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) -print0 | while IFS= read -r -d '' file; do
    count=$((count + 1))
    echo "[$count/$total] Resizing: $file"

    # Use ImageMagick with Lanczos filtering
    if magick "$file" -resize 500x500\> -filter Lanczos -quality 90 "$file" 2>/dev/null; then
        echo "  ✓ Success"
    else
        echo "  ✗ Failed"
    fi
done

echo ""
echo "Done! Processed $total images."

#!/bin/bash

# resize-images.sh
# written by Claude
# Resize images so the larger side is 500px
#
# Usage:
#   ./resize-images.sh              # Resize all images recursively
#   ./resize-images.sh image.jpg    # Resize just one image
#
# Uses ImageMagick with Lanczos filtering for high-quality downscaling
# Supported formats: jpg, jpeg, png, gif, webp (both upper and lower case)
#

# Function to resize a single image
# ImageMagick with Lanczos filter for high-quality downscaling
# -resize 500x500\> = resize so largest dimension is 500px, don't enlarge smaller images
# -filter Lanczos = high-quality resampling algorithm (best for downscaling)
# -quality 90 = good compression/quality balance for JPEGs
resize_image() {
    local file="$1"
    echo "Resizing: $file"

    if magick "$file" -resize 500x500\> -filter Lanczos -quality 90 "$file" 2>/dev/null; then
        echo "  ✓ Success"
        return 0
    else
        echo "  ✗ Failed"
        return 1
    fi
}

echo "Starting image resize process..."
echo "Target size: 500px (larger side)"
echo "Using ImageMagick with Lanczos filtering for high quality"
echo ""

# Check if a filename argument was provided
if [ -n "$1" ]; then
    # Single file mode
    if [ ! -f "$1" ]; then
        echo "Error: File '$1' not found"
        exit 1
    fi

    resize_image "$1"
    exit $?
fi

# Recursive mode - process all images
count=0
total=$(find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) | wc -l | tr -d ' ')

echo "Found $total images to process"
echo ""

find . -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) -print0 | while IFS= read -r -d '' file; do
    count=$((count + 1))
    echo "[$count/$total]"
    resize_image "$file"
done

echo ""
echo "Done! Processed $total images."

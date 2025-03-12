#!/bin/bash

# Check if version number is provided
if [ -z "$1" ]; then
    echo "Please provide a version number, e.g.: ./update-version.sh 0.0.4"
    exit 1
fi

NEW_VERSION=$1
PACKAGES_DIR="packages"

# Update versions for all sub-packages
for pkg in $PACKAGES_DIR/*/; do
    # skip if `pkg` is not a directory
    if [ ! -d "$pkg" ]; then
        continue
    fi

    if [ -f "$pkg/package.json" ]; then
        echo "Updating $pkg to version $NEW_VERSION"
        
        # Update version in package.json
        sed -i '' "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" "$pkg/package.json"
        
        # Update workspace dependency versions
        for dep in $PACKAGES_DIR/*/; do
            DEP_NAME=$(node -p "require('$dep/package.json').name")
            if [ -n "$DEP_NAME" ]; then
                sed -i '' "s/\"$DEP_NAME\": \"workspace:\*\"/\"$DEP_NAME\": \"$NEW_VERSION\"/" "$pkg/package.json"
            fi
        done
    fi
done

# Build all packages
echo "Building all packages..."
pnpm build

# Publish packages
for pkg in $PACKAGES_DIR/*/; do
    if [ -f "$pkg/package.json" ]; then
        echo "Publishing $pkg..."
        cd $pkg
        
        # Check if package is private
        IS_PRIVATE=$(node -p "require('./package.json').private")
        if [ "$IS_PRIVATE" != "true" ]; then
            # Publish to npm
            pnpm publish --access public --no-git-checks
        else
            echo "Skipping private package $pkg"
        fi
        
        cd ../../
    fi
done

echo "Done! All packages have been updated to version $NEW_VERSION and published" 
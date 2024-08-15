#!/bin/bash

# Current date
DATE=$(date '+%Y-%m-%d')

# Source and target directories
SRC_DIR="/workspace/.soroban"
TARGET_DIR="/workspace/public"

# File names
declare -a FILES=("tokens.json" "pairs.json" "factory.json" "router.json" "token_admin_keys.json" "random_tokens.json", "testnet_contracts.json", "mainnet_contracts.json")
git config --global --add safe.directory /workspace

# Copy files from .soroban to public/
for FILE in "${FILES[@]}"
do
    mkdir "$TARGET_DIR/backup-$DATE" 
    cp "$TARGET_DIR/$FILE" "$TARGET_DIR/backup-$DATE"
    cp "$SRC_DIR/$FILE" "$TARGET_DIR"
    git add "$TARGET_DIR/$FILE" 
    git add "$TARGET_DIR/backup-$DATE/$FILE" 
done

git config --global user.email "you@example.com"
git config --global user.name "Contract Addresses Updater"

## Git related commands

git commit -m "data: $DATE updated contract addresses"

git push origin main
chmod 777 -R /workspace/public/

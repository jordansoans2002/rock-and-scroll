# Manually deploy to ec2

## prepare locally
pnpm install --frozen-lockfile
pnpm build:backend

## in sftp
lcd Projects/church/rock-and-scroll

mkdir deploy
mkdir deploy/shared
mkdir deploy/backend

put -r shared/dist deploy/shared/
put shared/package.json deploy/shared/package.json

put -r backend/dist deploy/backend/
put backend/package.json deploy/backend/package.json

put package.json deploy/package.json
put pnpm-lock.yaml deploy/pnpm-lock.yaml
put pnpm-workspace.yaml deploy/pnpm-workspace.yaml

bye

## on ec2
cd /home/ec2-user/deploy

sudo rsync -av --delete \
  --exclude='node_modules' \
  --exclude='src' \
  --exclude='.git' \
  --exclude='*.ts' \
  --exclude='tsconfig.json' \
  ./shared/dist/ /opt/rock-and-scroll/shared/dist/

sudo rsync -av \
  ./shared/package.json \
  /opt/rock-and-scroll/shared/

### Deploy backend (compiled code + package.json)
sudo rsync -av --delete \
  --exclude='node_modules' \
  --exclude='src' \
  --exclude='.git' \
  --exclude='*.ts' \
  --exclude='tsconfig.json' \
  ./backend/dist/ /opt/rock-and-scroll/backend/dist/

sudo rsync -av \
  ./backend/package.json \
  /opt/rock-and-scroll/backend/

### Copy root package.json and lockfile
sudo rsync -av \
  ./package.json \
  ./pnpm-lock.yaml \
  ./pnpm-workspace.yaml \
  /opt/rock-and-scroll/ 2>/dev/null || true

### Install dependencies
cd /opt/rock-and-scroll
pnpm install --prod --frozen-lockfile

### Restart service
sudo systemctl restart rock-and-scroll
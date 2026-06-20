# Map

Rails API + React frontend (Create React App in `client/`).

## Requirements

- Ruby 3.1.2 (see `.ruby-version`)
- Node.js + Yarn
- PostgreSQL (development: user `postgres`, password `password` — see `config/database.yml`)

## First-time setup

```bash
bin/setup        # install deps, copy .env files, prepare database
bin/rails db:seed
```

Edit `client/.env` and set `REACT_APP_MAPBOX_ACCESS_TOKEN`.

Admin panel: http://localhost:3000/admin — `admin@example.com` / `password`

## Development

Start Rails (port 3000) and React dev server (port 3001) together:

```bash
bin/dev
# or: make dev
# or: yarn dev
```

Open http://localhost:3001

### Environment variables

| File | Variable | Purpose |
|------|----------|---------|
| `client/.env` | `REACT_APP_API_URL` | Rails API URL (`http://localhost:3000`) |
| `client/.env` | `REACT_APP_MAPBOX_ACCESS_TOKEN` | Mapbox access token |
| `client/.env` | `PORT` | CRA dev server port (`3001`) |
| `.env` | `MAP_DATABASE_PASSWORD` | Production DB password |
| `.env` | `SENTRY_DSN` | Optional error tracking |

Copy from examples if missing:

```bash
cp .env.example .env
cp client/.env.example client/.env
```

## Production-like local run

Build frontend into `public/` and serve everything from Rails:

```bash
yarn build && yarn deploy
bin/rails server
```

Open http://localhost:3000 — `REACT_APP_API_URL` is not needed (same origin).

## Deployment

Production deploy via Capistrano. React builds **locally**, then `public/` uploads to the server — Node.js on the server is not required.

### Server requirements

- Ruby 3.1.2 (rbenv), Bundler, PostgreSQL
- Linked files in `shared/`: `config/database.yml`, `config/master.key`, `.env`

Local machine needs Node.js + Yarn for `bin/deploy`.

Set `REACT_APP_MAPBOX_ACCESS_TOKEN` in `client/.env` before deploy (baked into the build). Production build uses empty `REACT_APP_API_URL` (same origin) — see `client/.env.production`.

Server `.env` must include at least:

```
MAP_DATABASE_PASSWORD=...
```

### Deploy

Full deploy (Rails + React — build locally, upload to server):

```bash
git push origin main
bin/deploy
# or: make deploy
# or: yarn deploy:production
```

Backend only — reuse `public/` from previous release:

```bash
bin/deploy-backend
# or: make deploy-backend
# or: FRONTEND_STRATEGY=copy bundle exec cap production deploy
```

Build on server instead (requires Node/Yarn for `deploy` user):

```bash
FRONTEND_STRATEGY=server bundle exec cap production deploy
```

Rollback:

```bash
bundle exec cap production deploy:rollback
```

After changing `config/nginx.conf` on the server, reload nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Server logs

```bash
bin/logs rails          # tail Rails log
bin/logs puma           # tail Puma logs
bin/logs nginx          # tail nginx logs
bin/logs tail           # tail all logs
bin/logs show 200       # last 200 lines, no follow

# or via cap directly:
bundle exec cap production logs:rails
```

Local Capistrano deploy log: `log/capistrano.log`

### Local production-like run

```bash
yarn build && yarn deploy
bin/rails server
```

---

## Notes

### Create Castle tags

```ruby
Area.where(company: Company.find_by(name: 'Замак')).each {|a| a.tags.create(key: TagKey.find_by(name: 'пабудова'), value: TagValue.find_by(name: 'замак'))}
Area.where(company: Company.find_by(name: 'Замак')).update_all(company_id: nil)
```

### Optimization

#### api/v1/areas.json

##### Before

1915
720ms (Views: 0.3ms | ActiveRecord: 31.5ms | Allocations: 497831)
593ms (Views: 0.3ms | ActiveRecord: 29.4ms | Allocations: 497454)
586ms (Views: 0.1ms | ActiveRecord: 34.7ms | Allocations: 497364)
895ms (Views: 0.1ms | ActiveRecord: 35.7ms | Allocations: 497478)
595ms (Views: 0.3ms | ActiveRecord: 32.4ms | Allocations: 497666)

2000 (all republic)
784ms (Views: 0.2ms | ActiveRecord: 40.3ms | Allocations: 867312)
1079ms (Views: 0.2ms | ActiveRecord: 31.0ms | Allocations: 867730)
1012ms (Views: 0.2ms | ActiveRecord: 38.0ms | Allocations: 867532)
985ms (Views: 0.1ms | ActiveRecord: 38.1ms | Allocations: 867251)
909ms (Views: 0.2ms | ActiveRecord: 30.1ms | Allocations: 867535)
1012ms (Views: 0.1ms | ActiveRecord: 27.6ms | Allocations: 867564)

##### After

398ms (Views: 0.1ms | ActiveRecord: 38.4ms | Allocations: 668664)
593ms (Views: 0.1ms | ActiveRecord: 180.1ms | Allocations: 588853)
725ms (Views: 0.1ms | ActiveRecord: 320.7ms | Allocations: 588835)
479ms (Views: 0.3ms | ActiveRecord: 47.0ms | Allocations: 584751)
574ms (Views: 0.1ms | ActiveRecord: 153.7ms | Allocations: 585309)

##### coordinates

id: 232

###### Before

12ms (Views: 7.6ms | ActiveRecord: 0.8ms | Allocations: 12367)
11ms (Views: 7.4ms | ActiveRecord: 0.6ms | Allocations: 12354)
10ms (Views: 6.7ms | ActiveRecord: 0.6ms | Allocations: 12363)
26ms (Views: 21.0ms | ActiveRecord: 0.9ms | Allocations: 12385)
11ms (Views: 6.7ms | ActiveRecord: 0.7ms | Allocations: 12375)

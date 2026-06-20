.PHONY: setup dev build deploy

setup:
	bin/setup
	bin/rails db:seed

dev:
	bin/dev

build:
	yarn build && yarn deploy

deploy:
	bin/deploy

deploy-backend:
	bin/deploy-backend

logs:
	bin/logs rails

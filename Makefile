.PHONY: setup dev build

setup:
	bin/setup
	bin/rails db:seed

dev:
	bin/dev

build:
	yarn build && yarn deploy

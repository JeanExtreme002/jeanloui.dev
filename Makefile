.DEFAULT_GOAL := help
.PHONY: help install dev build preview lint clean deploy docker

PREVIEW_PORT ?= 4321
DOCKER_PORT ?= 8080

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[1m%-12s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

dev: ## Run the dev server (http://localhost:3000)
	npm run dev

build: ## Build the static site into ./out
	npm run build

preview: build ## Build, then serve ./out locally (http://localhost:4321)
	npx --yes serve out -l $(PREVIEW_PORT)

lint: ## Run linting and type checks
	npm run lint

clean: ## Remove build artifacts
	rm -rf .next out

deploy: build ## Build and publish ./out to the gh-pages branch
	npx --yes gh-pages -d out --dotfiles

docker: ## Build and run the site with Docker Compose (http://localhost:8080)
	DOCKER_PORT=$(DOCKER_PORT) docker compose up --build

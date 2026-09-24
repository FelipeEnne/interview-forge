.DEFAULT_GOAL := help

.PHONY: help install dev test lint format format-check typecheck build quick-check check clean

help:
	@echo "InterviewForge"
	@echo ""
	@echo "Available commands:"
	@echo "  make install       Install dependencies"
	@echo "  make dev           Start development server"
	@echo "  make test          Run all tests"
	@echo "  make lint          Run ESLint"
	@echo "  make format        Format files with Prettier"
	@echo "  make format-check  Check formatting"
	@echo "  make typecheck     Run TypeScript type checking"
	@echo "  make build         Build production application"
	@echo "  make quick-check   format-check, lint, typecheck, test"
	@echo "  make check         Full validation (quick-check + build)"
	@echo "  make clean         Remove generated files"

install:
	npm ci

dev:
	npm run dev

test:
	npm test -- --run

lint:
	npm run lint

format:
	npm run format

format-check:
	npm run format:check

typecheck:
	npx tsc --noEmit

build:
	npm run build

quick-check: format-check lint typecheck test
	@echo ""
	@echo "Quick checks passed."

check: format-check lint typecheck test build
	@echo ""
	@echo "All checks passed."

clean:
	rm -rf .next coverage
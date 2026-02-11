
# ==============================================================================
# LinkShort Monorepo Makefile
# ==============================================================================
# Orchestration commands for the LinkShort monorepo.
# This Makefile wraps npm scripts from packages/web and packages/server.
#
# Usage:
#   make help                       - Show all available commands
#   make install                    - Install dependencies for all packages
#   make dev                        - Start both web and server in development mode
#   make build                      - Build both packages for production
#
# Port overrides (inline):
#   make dev WEB_PORT=4000
#   make dev SERVER_PORT=3010
#   make dev WEB_PORT=4000 SERVER_PORT=3010
#
# ==============================================================================

# ------------------------------------------------------------------------------
# Configuration
# ------------------------------------------------------------------------------

# Package directories (relative to this Makefile at project root)
WEB_DIR    := packages/web
SERVER_DIR := packages/server

# Port configuration
# Override at invocation: make dev WEB_PORT=4000 SERVER_PORT=3010
#
# Next.js  - supports PORT env var (docs: nextjs.org/docs/app/api-reference/cli/next)
#            NOTE: PORT cannot be set in .env because the HTTP server boots before
#            any other code is initialized. Must be passed as an inline env var.
#
# NestJS   - has no --port CLI flag. Port is read via process.env.PORT in main.ts
#            (docs: docs.nestjs.com/techniques/configuration). Same inline env var
#            approach is therefore used for both packages.
WEB_PORT    := 3000
SERVER_PORT := 3005

# Colors for terminal output
CYAN   := \033[36m
GREEN  := \033[32m
YELLOW := \033[33m
RED    := \033[31m
RESET  := \033[0m
BOLD   := \033[1m

# Default target
.DEFAULT_GOAL := help

# Declare all phony targets (commands, not files)
.PHONY: help install install-web install-server \
        dev dev-web dev-server \
        build build-web build-server \
        start preview \
        lint lint-web lint-server format \
        clean clean-web clean-server \
        check status

# ------------------------------------------------------------------------------
# Help
# ------------------------------------------------------------------------------

##@ General

help: ## Show this help message
	@echo ""
	@echo "$(BOLD)LinkShort Monorepo$(RESET)"
	@echo "$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf ""} \
		/^[a-zA-Z_-]+:.*?##/ { printf "  $(CYAN)%-18s$(RESET) %s\n", $$1, $$2 } \
		/^##@/ { printf "\n$(BOLD)%s$(RESET)\n", substr($$0, 5) }' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(YELLOW)Examples:$(RESET)"
	@echo "  make install                       # Install all dependencies"
	@echo "  make dev                           # Start both on default ports"
	@echo "  make dev WEB_PORT=4000             # Start web on port 4000"
	@echo "  make dev SERVER_PORT=3010          # Start server on port 3010"
	@echo "  make dev WEB_PORT=4000 SERVER_PORT=3010"
	@echo "  make build                         # Build both packages"
	@echo ""
	@echo "$(YELLOW)Default ports:$(RESET)"
	@echo "  Web:    $(WEB_PORT)"
	@echo "  Server: $(SERVER_PORT)"
	@echo ""

# ------------------------------------------------------------------------------
# Installation
# ------------------------------------------------------------------------------

##@ Installation

install: install-web install-server ## Install dependencies for all packages
	@echo "$(GREEN)✓ All dependencies installed$(RESET)"

install-web: ## Install web package dependencies
	@echo "$(CYAN)Installing web dependencies...$(RESET)"
	@cd $(WEB_DIR) && npm install
	@echo "$(GREEN)✓ Web dependencies installed$(RESET)"

install-server: ## Install server package dependencies
	@echo "$(CYAN)Installing server dependencies...$(RESET)"
	@cd $(SERVER_DIR) && npm install
	@echo "$(GREEN)✓ Server dependencies installed$(RESET)"

# ------------------------------------------------------------------------------
# Development
# ------------------------------------------------------------------------------

##@ Development

dev: ## Start both web and server in development mode (concurrent)
	@echo "$(CYAN)Starting development servers...$(RESET)"
	@echo "$(YELLOW)Web:$(RESET)    http://localhost:$(WEB_PORT)"
	@echo "$(YELLOW)Server:$(RESET) http://localhost:$(SERVER_PORT)"
	@echo "$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)"
	@PORT=$(SERVER_PORT) npm --prefix $(SERVER_DIR) run start:dev & \
	 PORT=$(WEB_PORT) npm --prefix $(WEB_DIR) run dev & \
	 wait

dev-web: ## Start only the web frontend (development)
	@echo "$(CYAN)Starting web development server on port $(WEB_PORT)...$(RESET)"
	@cd $(WEB_DIR) && PORT=$(WEB_PORT) npm run dev

dev-server: ## Start only the server backend (development)
	@echo "$(CYAN)Starting server development on port $(SERVER_PORT)...$(RESET)"
	@cd $(SERVER_DIR) && PORT=$(SERVER_PORT) npm run start:dev

# ------------------------------------------------------------------------------
# Build
# ------------------------------------------------------------------------------

##@ Build

build: build-server build-web ## Build both packages for production
	@echo "$(GREEN)✓ All packages built$(RESET)"

build-web: ## Build web package for production
	@echo "$(CYAN)Building web package...$(RESET)"
	@cd $(WEB_DIR) && npm run build
	@echo "$(GREEN)✓ Web package built$(RESET)"

build-server: ## Build server package for production
	@echo "$(CYAN)Building server package...$(RESET)"
	@cd $(SERVER_DIR) && npm run build
	@echo "$(GREEN)✓ Server package built$(RESET)"

# ------------------------------------------------------------------------------
# Production
# ------------------------------------------------------------------------------

##@ Production

start: ## Start server in production mode (requires build first)
	@echo "$(CYAN)Starting production server on port $(SERVER_PORT)...$(RESET)"
	@cd $(SERVER_DIR) && PORT=$(SERVER_PORT) npm run start:prod

preview: ## Preview web production build locally
	@echo "$(CYAN)Starting web preview server on port $(WEB_PORT)...$(RESET)"
	@cd $(WEB_DIR) && PORT=$(WEB_PORT) npm start

# ------------------------------------------------------------------------------
# Code Quality
# ------------------------------------------------------------------------------

##@ Code Quality

lint: lint-web lint-server ## Run linting on all packages
	@echo "$(GREEN)✓ All linting complete$(RESET)"

lint-web: ## Run ESLint on web package
	@echo "$(CYAN)Linting web package...$(RESET)"
	@cd $(WEB_DIR) && npm run lint

lint-server: ## Run ESLint on server package
	@echo "$(CYAN)Linting server package...$(RESET)"
	@cd $(SERVER_DIR) && npm run lint

format: ## Format code with Prettier across all packages
	@echo "$(CYAN)Formatting server code...$(RESET)"
	@cd $(SERVER_DIR) && npm run format
	@echo "$(CYAN)Formatting web code...$(RESET)"
	@cd $(WEB_DIR) && npm run format
	@echo "$(GREEN)✓ All code formatted$(RESET)"

# ------------------------------------------------------------------------------
# Maintenance
# ------------------------------------------------------------------------------

##@ Maintenance

clean: clean-web clean-server ## Clean all build artifacts and dependencies
	@echo "$(GREEN)✓ All packages cleaned$(RESET)"

clean-web: ## Clean web build artifacts and node_modules
	@echo "$(CYAN)Cleaning web package...$(RESET)"
	@rm -rf $(WEB_DIR)/.next
	@rm -rf $(WEB_DIR)/node_modules
	@echo "$(GREEN)✓ Web package cleaned$(RESET)"

clean-server: ## Clean server build artifacts and node_modules
	@echo "$(CYAN)Cleaning server package...$(RESET)"
	@rm -rf $(SERVER_DIR)/dist
	@rm -rf $(SERVER_DIR)/node_modules
	@echo "$(GREEN)✓ Server package cleaned$(RESET)"

check: ## Check if required tools are installed
	@echo "$(CYAN)Checking required tools...$(RESET)"
	@command -v node >/dev/null 2>&1 || { echo "$(RED)✗ Node.js is not installed$(RESET)"; exit 1; }
	@echo "$(GREEN)✓ Node.js:$(RESET) $$(node --version)"
	@command -v npm >/dev/null 2>&1 || { echo "$(RED)✗ npm is not installed$(RESET)"; exit 1; }
	@echo "$(GREEN)✓ npm:$(RESET)     $$(npm --version)"
	@echo "$(GREEN)✓ All required tools are installed$(RESET)"

status: ## Show project status (installed packages, build artifacts)
	@echo "$(BOLD)Project Status$(RESET)"
	@echo "$(CYAN)━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━$(RESET)"
	@echo ""
	@echo "$(YELLOW)Web Package (port $(WEB_PORT)):$(RESET)"
	@if [ -d "$(WEB_DIR)/node_modules" ]; then \
		echo "  Dependencies: $(GREEN)installed$(RESET)"; \
	else \
		echo "  Dependencies: $(RED)not installed$(RESET)"; \
	fi
	@if [ -d "$(WEB_DIR)/.next" ]; then \
		echo "  Build:        $(GREEN)exists$(RESET)"; \
	else \
		echo "  Build:        $(YELLOW)not built$(RESET)"; \
	fi
	@echo ""
	@echo "$(YELLOW)Server Package (port $(SERVER_PORT)):$(RESET)"
	@if [ -d "$(SERVER_DIR)/node_modules" ]; then \
		echo "  Dependencies: $(GREEN)installed$(RESET)"; \
	else \
		echo "  Dependencies: $(RED)not installed$(RESET)"; \
	fi
	@if [ -d "$(SERVER_DIR)/dist" ]; then \
		echo "  Build:        $(GREEN)exists$(RESET)"; \
	else \
		echo "  Build:        $(YELLOW)not built$(RESET)"; \
	fi
	@echo ""

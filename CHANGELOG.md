# Change Log

All notable changes to the "vscode-copybara" extension will be documented in this file.

## [1.0.0] - 2025-01-19

### Initial Release

- Syntax highlighting for Copybara `.sky` files
- IntelliSense support with 25+ code snippets:
  - `core.*` - Workflow and transformation functions
  - `git.*` - Origin and destination configurations
  - `metadata.*` - Commit message manipulation
  - `authoring.*` - Author mapping strategies
  - `patch.*`, `buildozer.*`, `console.*`, and more
- TypeScript type definitions for Copybara API
- Auto-completion for Copybara functions and parameters
- Quick templates for common configurations
- Support for `copy.bara.sky` and all `.sky` files
- Based on Starlark language syntax (comments, brackets, strings, etc.)
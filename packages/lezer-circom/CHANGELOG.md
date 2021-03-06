# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.6]

### Added

- Moved highlighting into lezer in highlight.js

### Changed

- Upgrade dependencies

## [0.0.5]

### Added

- Add `terms` export with TypeScript types

### Changed

- Upgrade dependencies

## [0.0.4]

### Added

- Added `Items` named node to `Array`
- Added `Parameters` to `ParameterList` and `ParameterValues` to `ParameterValueList`
- Added return statement
- Add group names to assignment statements and operation expressions

### Changed

- More strict `ComponentDeclaration` rule
- merge input, output, and intermediate signal declarations into a single `SignalDeclaration`
- refactor control flow body parsing

## [0.0.3]

### Changed

- `MainComponentDeclaration` now has a `Call` node instead of inline `Identifier ParameterList` nodes.

## [0.0.2]

### Added

- Parse parentheses in numeric and boolean expressions! This adds `BooleanExpressionGroup` and `NumericExpressionGroup` named nodes to the `BooleanExpression` and `NumericExpression` groups.

### Changed

- Refactor the way that numeric expressions are parsed. In circom, conditionals are only allowed at the top level of a numeric expression, which makes structuring the grammar tricky. In v0.0.1, top-level numeric expressions were parsed with a named `NumericExpression` node, which was defined as `Conditional | numericExpression`, where the anonymous node `numericExpression` was a union of all the other kinds of expressions. This was accuracte but made the AST difficult to work with since it didn't expose a group for the kinds of numeric expressions (ie you could only access the operands of a binary arithemetic operation positionally, not by name). Now in v0.0.2, the top-level numeric expression is an anonymous `topLevelNumericExpression[@isGroup="NumericExpression"]` node, which means numeric expressions at all levels can be accessed with the group name `NumericExpression`.
- Similarly, boolean expressions are now accessible as a named group `booleanExpression[@isGroup="BooleanExpression"]`.

## [0.0.1]

### Added

- Initial implementation!

[unreleased]: https://github.com/joeltg/lezer-circom/compare/v0.0.6...HEAD
[0.0.6]: https://github.com/joeltg/lezer-circom/compare/v0.0.6
[0.0.5]: https://github.com/joeltg/lezer-circom/compare/v0.0.5
[0.0.4]: https://github.com/joeltg/lezer-circom/compare/v0.0.4
[0.0.3]: https://github.com/joeltg/lezer-circom/compare/v0.0.3
[0.0.2]: https://github.com/joeltg/lezer-circom/compare/v0.0.2
[0.0.1]: https://github.com/joeltg/lezer-circom/compare/v0.0.1

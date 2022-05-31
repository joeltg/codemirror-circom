import { syntaxTree } from "@codemirror/language"
import type { Diagnostic } from "@codemirror/lint"
import { EditorView } from "@codemirror/view"
import { SyntaxNode } from "@lezer/common"

type Range = { from: number; to: number }
const d = {
	error({ from, to }: Range, message: string): Diagnostic {
		return { from, to, severity: "error", message }
	},
	warning({ from, to }: Range, message: string): Diagnostic {
		return { from, to, severity: "warning", message }
	},
	info({ from, to }: Range, message: string): Diagnostic {
		return { from, to, severity: "info", message }
	},
}

export async function circomLinter(
	source: EditorView
): Promise<readonly Diagnostic[]> {
	const { topNode: root } = syntaxTree(source.state)
	if (root.name === "Circuit") {
		return Array.from(lintCircuit(source, root))
	} else {
		return []
	}
}

function* walk(node: SyntaxNode): Iterable<Diagnostic> {
	for (let child = node.firstChild; child !== null; child = child.nextSibling) {
		if (child.type.isError) {
			yield d.error(child, "Syntax error")
		}
		walk(child)
	}
}

interface CircuitContext {
	functions: Set<string>
	templates: Set<string>
}

// The top level of the Lezer Circom AST parses all statements and blocks,
// so it's the linter's job to validate which are valid in which contexts.
function* lintCircuit(
	source: EditorView,
	root: SyntaxNode
): Iterable<Diagnostic> {
	const circuitContext: CircuitContext = {
		functions: new Set(),
		templates: new Set(),
	}

	for (let node = root.firstChild; node !== null; node = node.nextSibling) {
		const { name, isError } = node.type
		if (isError) {
			// yield d.error(node, "Syntax error")
		} else if (name === "Pragma") {
			// yield* walk(node)
		} else if (name === "Include") {
			// yield* walk(node)
		} else if (name === "FunctionDeclaration") {
			// yield* walk(node)
			const identifier = node.getChild("Identifier")
			if (identifier !== null) {
				const value = source.state.sliceDoc(identifier.from, identifier.to)
				if (circuitContext.functions.has(value)) {
					yield d.error(identifier, "Duplicate function name")
				} else {
					circuitContext.functions.add(value)
				}
			}
		} else if (node.type.name === "TemplateDeclaration") {
			// yield* walk(node)
			const identifier = node.getChild("Identifier")
			if (identifier !== null) {
				const value = source.state.sliceDoc(identifier.from, identifier.to)
				if (circuitContext.functions.has(value)) {
					yield d.error(identifier, "Duplicate function name")
				} else {
					circuitContext.functions.add(value)
				}
			}
		} else if (node.type.name === "MainComponentDeclaration") {
		} else {
			yield d.error(node, "Syntax error")
			// yield { from, to, severity: "error", message: "Syntax error" }
		}
	}
}

interface FunctionContext {
	variables: Set<string>
}

function* lintFunction(body: SyntaxNode): Iterable<Diagnostic> {}

function* lintTemplate(body: SyntaxNode): Iterable<Diagnostic> {}

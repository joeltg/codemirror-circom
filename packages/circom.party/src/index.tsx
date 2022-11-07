import React, { useCallback, useState } from "react"
import { createRoot } from "react-dom/client"

import type { EditorState } from "@codemirror/state"
import type { TreeCursor } from "@lezer/common"
import { syntaxHighlighting, syntaxTree } from "@codemirror/language"

import { keymap } from "@codemirror/view"
import { defaultKeymap } from "@codemirror/commands"
import { basicSetup } from "@codemirror/basic-setup"
import { indentUnit } from "@codemirror/language"

import { circomLanguage } from "codemirror-lang-circom"

import { Editor } from "./editor.js"
import { initialCircomValue } from "./initialValue.js"
import { defaultHighlightStyle } from "@codemirror/language"

function scan(cursor: TreeCursor, lines: string[], depth = 0) {
	lines.push(`${"  ".repeat(depth)}- ${cursor.name}`)
	if (cursor.firstChild()) {
		do {
			scan(cursor, lines, depth + 1)
		} while (cursor.nextSibling())
		cursor.parent()
	}
}

const circomExensions = [
	indentUnit.of("    "),
	basicSetup,
	syntaxHighlighting(defaultHighlightStyle),
	circomLanguage,
	keymap.of(defaultKeymap),
]

function Index({}) {
	const [ast, setAST] = useState<string[]>([])

	const handleCircomChange = useCallback((state: EditorState) => {
		const tree = syntaxTree(state)
		const cursor = tree.cursor()
		const lines: string[] = []
		scan(cursor, lines)
		setAST(lines)
	}, [])

	return (
		<>
			<section>
				<Editor
					extensions={circomExensions}
					initialValue={initialCircomValue}
					onChange={handleCircomChange}
				/>
			</section>
			<section>
				<pre className="ast">{ast}</pre>
			</section>
		</>
	)
}

const root = createRoot(document.querySelector("main")!)
root.render(<Index />)

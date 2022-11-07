import React, { useEffect } from "react"

import type { EditorState, Extension } from "@codemirror/state"

import { useCodeMirror } from "./codemirror.js"

interface EditorProps {
	initialValue: string
	extensions: Extension
	onChange?: (state: EditorState) => void
}

export const Editor: React.FC<EditorProps> = (props) => {
	const [state, transaction, _, element] = useCodeMirror<HTMLDivElement>({
		doc: props.initialValue,
		extensions: props.extensions,
	})

	useEffect(() => {
		if (props.onChange !== undefined && state !== null) {
			if (transaction === null || transaction.docChanged) {
				props.onChange(state)
			}
		}
	}, [state, transaction])

	return <div className="editor" ref={element}></div>
}

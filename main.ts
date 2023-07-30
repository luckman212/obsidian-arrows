import { Editor, Plugin, EventRef } from 'obsidian';

function _hasArrows(str: string): boolean {
	return (
		/I->/.test(str) ||
		/<-I/.test(str) ||
		/->I/g.test(str) ||
		/I<-/g.test(str) ||
		/-->/g.test(str) ||
		/o>/g.test(str) ||
		/<o/g.test(str) ||
		/o->/g.test(str) ||
		/~~>/g.test(str) ||
		/<~~/g.test(str) ||
		/L>/g.test(str) ||
		/<L/g.test(str) ||
		/->/g.test(str) ||
		/<-/g.test(str) ||
		/=>/g.test(str) ||
		/<=/g.test(str) ||
		/<>/g.test(str)
	);
}

function _replaceArrows(str: string): string {
	return str
		.replace(/I->/g, "↦")
		.replace(/<-I/g, "↤")
		.replace(/->I/g, "⇥")
		.replace(/I<-/g, "⇤")
		.replace(/-->/g, "⇉")
		.replace(/o>/g, "↺")
		.replace(/<o/g, "↻")
		.replace(/o->/g, "↬")
		.replace(/~~>/g, "↝")
		.replace(/<~~/g, "↜")
		.replace(/L>/g, "↳")
		.replace(/<L/g, "↲")
		.replace(/->/g, "→")
		.replace(/<-/g, "←")
		.replace(/=>/g, "⇒")
		.replace(/<=/g, "⇐")
		.replace(/<>/g, "↔");
}

export default class ObsidianArrows extends Plugin {
	private _replaceArrowsInCurrentLine(editor: Editor): void {
		const currentLineNumber = editor.getCursor().line;
		const currentLineContent = editor.getLine(currentLineNumber);
		// Only run if there are arrows to be modified
		if (_hasArrows(currentLineContent)) editor.setLine(currentLineNumber, _replaceArrows(currentLineContent));
	}

	private _replaceArrowsInCurrentFile(editor: Editor): void {
		const content = editor.getValue();
		editor.setValue(_replaceArrows(content));
	}

	onload(): void {
		console.log("Loading Obsidian Arrows...");
		this.registerEvent(
			this.app.workspace.on("editor-change", this._replaceArrowsInCurrentLine)
		);

		this.addCommand({
			id: "replace-all-arrows",
			name: "Replaces all arrows in the current file.",
			mobileOnly: false,
			editorCallback: this._replaceArrowsInCurrentFile
		});

		console.log("Loaded Obsidian Arrows.");
	}

	onunload(): void {
		console.log("Unloaded Obsidian Arrows.");
	}
}
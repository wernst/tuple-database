/*

	./node_modules/.bin/ts-node src/tools/compileMacros.ts

*/

import { execSync } from "child_process"
import * as fs from "fs"
import * as path from "path"

const rootPath = path.resolve(__dirname, "../..")

function convertAsyncToSync(contents: string) {
	// Collapse union types.
	contents = contents.replace(
		/AsyncTupleStorageApi \| TupleStorageApi/g,
		"TupleStorageApi"
	)
	contents = contents.replace(
		/TupleStorageApi \| AsyncTupleStorageApi/g,
		"TupleStorageApi"
	)

	// Maintain camelcase
	contents = contents.replace(/async(.)/g, (x) => x.toLowerCase())

	// Remove async
	contents = contents.replace(/[Aa]sync/g, "")
	contents = contents.replace(/await/g, "")
	contents = contents.replace(/Promise<([^>]+)>/g, "$1")

	// Sync test assertions.
	contents = contents.replace(/assert\.rejects/g, "assert.throws")

	return contents
}

function convertAsyncToSyncFile(inputPath: string, outputPath: string) {
	console.log(
		path.relative(rootPath, inputPath),
		"->",
		path.relative(rootPath, outputPath)
	)

	let contents = fs.readFileSync(inputPath, "utf8")
	contents = convertAsyncToSync(contents)

	contents = `
/*

This file is generated from ${path.parse(inputPath).base}

*/
${contents}
`

	fs.writeFileSync(outputPath, contents)
	execSync(
		path.join(rootPath, "node_modules/.bin/organize-imports-cli") +
			" " +
			outputPath
	)
	execSync(
		path.join(rootPath, "node_modules/.bin/prettier") + " --write " + outputPath
	)
}

const fileNames: string[] = fs.readdirSync(
	path.join(rootPath, "src/storage/async")
)

for (const fileName of fileNames) {
	if (!fileName.endsWith(".ts")) continue

	convertAsyncToSyncFile(
		path.join(rootPath, `src/storage/async/${fileName}`),
		path.join(rootPath, `src/storage/sync/${convertAsyncToSync(fileName)}`)
	)
}

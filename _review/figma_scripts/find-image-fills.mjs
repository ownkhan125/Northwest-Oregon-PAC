import fs from 'node:fs'

const [, , file, idKey] = process.argv
const data = JSON.parse(fs.readFileSync(file, 'utf8'))
const root = idKey && data.nodes ? data.nodes[idKey].document : data.document

function walk(node, path = []) {
  const p = [...path, `${node.id}:${node.name}`]
  const fills = node.fills || []
  for (const fill of fills) {
    if (fill.type === 'IMAGE' && fill.imageRef) {
      console.log(`${node.id} | ${node.name} | ${fill.imageRef} | scaleMode=${fill.scaleMode}`)
    }
  }
  for (const c of node.children || []) walk(c, p)
}

walk(root)

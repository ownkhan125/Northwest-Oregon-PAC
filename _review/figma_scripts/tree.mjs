import fs from 'node:fs'

const [, , file, idKey, maxDepthStr] = process.argv
const maxDepth = maxDepthStr ? parseInt(maxDepthStr, 10) : 4
const data = JSON.parse(fs.readFileSync(file, 'utf8'))
const root = idKey && data.nodes ? data.nodes[idKey].document : data.document

function walk(node, depth = 0) {
  if (depth > maxDepth) return
  const t = node.type || ''
  const name = node.name || ''
  const bbox = node.absoluteBoundingBox
  const dims = bbox
    ? ` (${Math.round(bbox.width)}x${Math.round(bbox.height)} @ ${Math.round(bbox.x)},${Math.round(bbox.y)})`
    : ''
  const text = node.characters ? ` :: "${(node.characters || '').replace(/\n/g, ' \\n ').slice(0, 90)}"` : ''
  console.log('  '.repeat(depth) + `[${node.id}] ${t}: ${name}${dims}${text}`)
  for (const c of node.children || []) walk(c, depth + 1)
}

walk(root)

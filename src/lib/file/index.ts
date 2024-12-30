export const downloadBlob = (blob: Blob, name?: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  name && (a.download = name)
  a.href = url
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
export const uploadBlob = () => new Promise<File[]>(resolve => {
  const input = document.createElement('input')
  input.type = 'file'
  input.onchange = () => {
    console.log('input')
    resolve(Array.from(input.files ?? []))
    input.remove()
  }
  input.click()
})

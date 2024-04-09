import { utils, writeFile, write, type WorkSheet } from 'xlsx'

export interface Sheet {
  name: string
  body: WorkSheet[]
}

const jsonToExcel = (sheets: Sheet[], downloadName?: string): File => {
  const workBook = utils.book_new()
  sheets.forEach((item) => {
    const workSheet = utils.json_to_sheet(item.body)
    utils.book_append_sheet(workBook, workSheet, item.name)
  })
  return downloadName
    ? writeFile(workBook, `${downloadName}.xlsx`, { type: 'buffer' })
    : write(workBook, { type: 'buffer' })
}

export default jsonToExcel

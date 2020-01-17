import { saveAs } from 'file-saver'
import XLSX from 'xlsx'
const exportExcel = (name, elem) => {
  // .table要导出的是哪一个表格
  let tableFixed = document.querySelector('.el-table__fixed')
  // let wb = XLSX.utils.table_to_book(document.querySelector('.table'))
  let wb = ''
  if (tableFixed) {
    wb = XLSX.utils.table_to_book(document.querySelector(elem).removeChild(tableFixed))
    document.querySelector(elem).appendChild(tableFixed)
  } else {
    wb = XLSX.utils.table_to_book(document.querySelector('.table'))
  }
  let wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    //  name+'.xlsx'表示导出的excel表格名字
    saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      name + '.xlsx'
    )
  } catch (e) {
    // console.log(e, wbout)
  }
  return wbout
}

export {
  exportExcel
}

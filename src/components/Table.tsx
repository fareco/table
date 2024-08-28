import { DataItem } from '../type'

interface Column {
  key: keyof DataItem
  sortable?: boolean
}

interface TableProps {
  columns: Column[]
  data: DataItem[]
  leftFixedColumns?: number
  rightFixedColumns?: number
  pageSize?: number
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  leftFixedColumns = 0,
  rightFixedColumns = 0,
  pageSize = 20
}) => {
  return (
    <div className="">
      <table className="relative flex  w-full flex-col rounded-lg border-gray-500 text-left">
        <thead className="bg-slate-100 text-lg">
          <tr>
            <th className="px-4 py-2">1</th>
            <th className="px-4 py-2">2</th>
          </tr>
        </thead>
        <tbody className="flex-1 overflow-auto">
          <tr>
            <td className="px-4 py-1">1</td>
            <td className="px-4 py-1">1</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Table

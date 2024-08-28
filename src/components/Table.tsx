import clx from 'classnames'
import arrow from '../../public/arrow.svg'
import { useCallback, useMemo, useState } from 'react'

export interface Column {
  key: string
  sortable?: boolean
}

interface TableProps {
  columns: Column[]
  data: { [key: string]: string | number }[]
  leftFixedColumns?: number
  rightFixedColumns?: number
  headerFixed?: boolean
}

const getThClassNames = (
  index: number,
  columnsLength: number,
  leftFixedColumns: number,
  rightFixedColumns: number,
  headerFixed: boolean
) =>
  clx(
    'bg-[#669bbc] cursor-pointer px-3 py-2 border-r-1 border-white last:border-r-0 w-[200px]',
    index < leftFixedColumns && 'sticky left-0 z-[1000]',
    !leftFixedColumns &&
      index >= columnsLength - rightFixedColumns &&
      'sticky right-0 z-[1000]',
    headerFixed && 'sticky top-0'
  )

const getTdClassNames = (
  index: number,
  leftFixedColumns: number,
  rightFixedColumns: number,
  columnsLength: number,
  data: string | number
) =>
  clx(
    'px-3 py-2 bg-white',
    typeof data === 'number' ? 'text-right' : 'text-left',
    index < leftFixedColumns && 'sticky left-0 z-10',
    !leftFixedColumns &&
      index >= columnsLength - rightFixedColumns &&
      'sticky right-0 z-10'
  )

const Table: React.FC<TableProps> = ({
  columns,
  data,
  headerFixed = false,
  leftFixedColumns = 0,
  rightFixedColumns = 0
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: 'asc' | 'desc'
  } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)

  const totalPage = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data.length, pageSize]
  )

  const pages = useMemo(() => {
    const list: React.ReactElement[] = []
    for (let i = 1; i <= totalPage; i++) {
      list.push(
        <span
          onClick={() => i !== currentPage && setCurrentPage(i)}
          className={clx(
            'px-2 cursor-pointer rounded border-1',
            currentPage === i && 'text-[#669bbc]'
          )}
          key={i}
        >
          {i}
        </span>
      )
    }
    return list
  }, [currentPage, totalPage])

  const disPlayData = useMemo(() => {
    const sorted = sortConfig
      ? [...data].sort((a, b) => {
          const aVal = a[sortConfig.key]
          const bVal = b[sortConfig.key]
          if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
          if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
          return 0
        })
      : data

    const paginated = sorted.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    )

    return paginated
  }, [currentPage, data, pageSize, sortConfig])

  const handleSort = useCallback(
    (key: string) => {
      const direction =
        sortConfig?.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc'
      setSortConfig({ key, direction })
    },
    [sortConfig]
  )

  return (
    <div className="relative flex h-full flex-col justify-center overflow-auto">
      <table>
        <caption className="text-[24px] text-[#219ebc]">
          Detailed info about SpaceX launches
        </caption>
        <thead className="z-10">
          <tr>
            {columns.map(({ key, sortable }, index) => (
              <th
                className={getThClassNames(
                  index,
                  columns.length,
                  leftFixedColumns,
                  rightFixedColumns,
                  headerFixed
                )}
                key={key}
                onClick={() => sortable && handleSort(key)}
              >
                <div className="flex items-center">
                  {key}
                  {sortable && (
                    <div className="ml-2 flex flex-col text-black">
                      <img
                        className={clx(
                          'w-2 rotate-180',
                          sortConfig?.key === key &&
                            sortConfig.direction === 'asc'
                            ? 'opacity-100'
                            : 'opacity-40'
                        )}
                        src={arrow}
                        alt="desc"
                      />
                      <img
                        className={clx(
                          'w-2',
                          sortConfig?.key === key &&
                            sortConfig.direction === 'desc'
                            ? 'opacity-100'
                            : 'opacity-40'
                        )}
                        src={arrow}
                        alt="asc"
                      />
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="z-[1] ">
          {disPlayData.map((dataItem) => {
            return (
              <tr key={dataItem.id}>
                {columns.map(({ key }, index) => {
                  const cellData = dataItem[key]
                  return (
                    <td
                      className={getTdClassNames(
                        index,
                        leftFixedColumns,
                        rightFixedColumns,
                        columns.length,
                        cellData
                      )}
                      key={key}
                    >
                      {cellData}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="sticky bottom-0 left-0 z-[1000] flex w-full items-center gap-4 border-t bg-white  p-4">
        <select
          className="rounded-md border px-2 py-1"
          value={pageSize}
          onChange={(e) => setPageSize(+e.target.value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <img
          className={clx(
            'w-4 rotate-90 cursor-pointer',
            currentPage === 1 && 'opacity-30'
          )}
          src={arrow}
          alt="prev"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1)
            }
          }}
        />
        {pages}
        <img
          className={clx(
            'w-4 -rotate-90 cursor-pointer',
            currentPage === totalPage && 'opacity-30'
          )}
          src={arrow}
          alt="next"
          onClick={() => {
            if (currentPage < totalPage) {
              setCurrentPage(currentPage + 1)
            }
          }}
        />
      </div>
    </div>
  )
}

export default Table

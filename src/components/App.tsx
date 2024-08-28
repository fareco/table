import { useEffect, useState } from 'react'
import { getData } from '../api'
import { DataItem } from '../type'
import Table, { Column } from './Table'

const columns: Column[] = [
  { key: 'id' },
  { key: 'name' },
  { key: 'flight_number', sortable: true },
  { key: 'date_unix', sortable: true }
]

function App() {
  const [list, setList] = useState<DataItem[]>([])

  useEffect(() => {
    getData().then((data) => {
      setList(data)
    })
  }, [])

  return (
    <div className="h-screen w-full overflow-hidden pt-8">
      <Table
        data={list}
        columns={columns}
        headerFixed
        leftFixedColumns={1}
        rightFixedColumns={1}
      />
    </div>
  )
}

export default App

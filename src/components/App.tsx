import { useEffect, useState } from 'react'
import { getData } from '../api'
import { DataItem } from '../type'
import Table from './Table'

function App() {
  const [list, setList] = useState<DataItem[]>([])

  useEffect(() => {
    getData().then((data) => {
      setList(data)
    })
  }, [])

  return (
    <div className="h-screen w-full p-4">
      <Table data={list} />
    </div>
  )
}

export default App

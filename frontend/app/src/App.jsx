import { useState } from 'react'
import UnitList from './components/UnitList.jsx'
import AddUnitForm from './components/AddUnitForm.jsx'
import Filters from './components/Filters.jsx'

export default function App() {
  const [status, setStatus] = useState()
  const [type, setType] = useState()

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Unit Management Dashboard</h1>      

      <Filters status={status} type={type} onChangeStatus={setStatus} onChangeType={setType} />
      <AddUnitForm />
      <UnitList status={status} type={type} />
    </div>
  )
}

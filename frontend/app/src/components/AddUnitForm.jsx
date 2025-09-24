import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUnit } from '../api.js'
import { useState } from 'react'

export default function AddUnitForm() {
  const qc = useQueryClient()
  const [name, setName] = useState('')
  const [type, setType] = useState('capsule')

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createUnit,
    onSuccess: () => {
      setName('')
      qc.invalidateQueries({ queryKey: ['units'] })
    }
  })

  return (
    <form className="flex gap-3 items-end" onSubmit={async (e) => {
      e.preventDefault()
      await mutateAsync({ name, type })
    }}>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input className="border rounded p-2" value={name} onChange={e => setName(e.target.value)} required/>
      </div>
      <div>
        <label className="block text-sm font-medium">Type</label>
        <select className="border rounded p-2" value={type} onChange={e => setType(e.target.value)}>
          <option value="capsule">capsule</option>
          <option value="cabin">cabin</option>
        </select>
      </div>
      <button disabled={isPending} className="px-4 py-2 rounded bg-black text-white">Add</button>
      {error && <p className="text-red-600 text-sm">Failed to add unit</p>}
    </form>
  )
}

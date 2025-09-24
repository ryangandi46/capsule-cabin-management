import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchUnits, updateUnitStatus } from '../api.js'

const statuses = ['Available','Occupied','Cleaning In Progress','Maintenance Needed']

export default function UnitList({ status, type }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['units', { status, type }],
    queryFn: () => fetchUnits({ status, type })
  })
  const qc = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: ({ id, next }) => updateUnitStatus(id, next),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['units'] })
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p className="text-red-600">Failed to load</p>

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-50">
          <th className="text-left p-2">Name</th>
          <th className="text-left p-2">Type</th>
          <th className="text-left p-2">Status</th>
          <th className="text-left p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((u) => (
          <tr key={u.id} className="border-t">
            <td className="p-2">{u.name}</td>
            <td className="p-2">{u.type}</td>
            <td className="p-2">{u.status}</td>
            <td className="p-2">
              <select
                className="border rounded p-1"
                value={u.status}
                onChange={async (e) => {
                  try {
                    await mutateAsync({ id: u.id, next: e.target.value })
                  } catch (err) {
                    // 400 untuk Occupied -> Available langsung
                    alert(err?.response?.data?.error ?? 'Failed to update status')
                  }
                }}>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

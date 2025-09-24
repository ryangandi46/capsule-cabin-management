const statuses = ['Available','Occupied','Cleaning In Progress','Maintenance Needed']
const types = ['capsule','cabin']

export default function Filters({ status, type, onChangeStatus, onChangeType }) {
  return (
    <div className="flex gap-4 items-end">
      <div>
        <label className="block text-sm font-medium">Status</label>
        <select className="border rounded p-2"
          value={status ?? ''} onChange={e => onChangeStatus(e.target.value || undefined)}>
          <option value="">All</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Type</label>
        <select className="border rounded p-2"
          value={type ?? ''} onChange={e => onChangeType(e.target.value || undefined)}>
          <option value="">All</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
    </div>
  )
}

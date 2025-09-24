import axios from 'axios'
const api = axios.create({ baseURL: 'http://localhost:3000/api' })

export async function fetchUnits(params) {
  const res = await api.get('/units', { params })
  return res.data
}
export async function createUnit(payload) {
  const res = await api.post('/units', payload)
  return res.data
}
export async function updateUnitStatus(id, status) {
  const res = await api.put(`/units/${id}`, { status })
  return res.data
}

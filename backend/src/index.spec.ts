import { describe, expect, it } from 'vitest'
import app from './index'

describe('GET /api/health', () => {
  it('returns API health status', async () => {
    const response = await app.request('/api/health')
    const body = (await response.json()) as { status?: string }

    expect(response.status).toBe(200)
    expect(body.status).toBe('error')
  })
})

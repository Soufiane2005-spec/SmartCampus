import { config } from 'dotenv'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { Pool } from 'pg'

const envPath = existsSync(resolve(process.cwd(), '.env'))
  ? resolve(process.cwd(), '.env')
  : resolve(process.cwd(), '..', '.env')

config({ path: envPath })

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.error('Database check failed: DATABASE_URL is not defined.')
  process.exitCode = 1
} else {
  const pool = new Pool({ connectionString })

  try {
    const result = await pool.query<{ ok: number; current_database: string }>(
      'SELECT 1 AS ok, current_database() AS current_database',
    )

    console.log(`Database connection OK (${result.rows[0].current_database}).`)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Database connection failed: ${message}`)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

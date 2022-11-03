import { Paper } from '@mantine/core'

export default function Home() {
  return (
    <Paper shadow="xs" radius="xs" p="md">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-6xl font-bold">Hello World</h1>
        <h1 className="font-bold text-green-500">123</h1>
      </div>
    </Paper>
  )
}

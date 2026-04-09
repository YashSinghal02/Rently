import { Link } from 'react-router-dom'
import { Button } from '../components/common/Button.jsx'

export function NotFoundPage() {
  return (
    <div className="card rounded-3xl p-10 space-y-4">
      <div className="text-3xl font-semibold text-zinc-100">404</div>
      <div className="text-sm text-zinc-100/70">
        The page you’re looking for doesn’t exist.
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button variant="primary" onClick={() => (window.location.href = '/')}>
          Go home
        </Button>
        <Button variant="secondary" onClick={() => (window.location.href = '/cars')}>
          Browse cars
        </Button>
      </div>
    </div>
  )
}


import { useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../redux/hooks.js'
import { authActions } from '../../redux/auth/authSlice.js'
import { Modal } from '../common/Modal.jsx'
import { Button } from '../common/Button.jsx'
import { Field } from '../common/Field.jsx'

const mockUsers = [
  {
    id: 'mock-user-1',
    name: 'Alex Carter',
    email: 'alex@premiumcars.dev',
    avatarColor: '#a855f7',
  },
  {
    id: 'mock-user-2',
    name: 'Jordan Lee',
    email: 'jordan@premiumcars.dev',
    avatarColor: '#38bdf8',
  },
]

export function LoginModal({ open, onClose }) {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((s) => s.auth)
  const currentEmail = auth.user?.email ?? ''

  const [email, setEmail] = useState(currentEmail || mockUsers[0].email)
  const [name, setName] = useState('')

  const inferredUser = useMemo(() => {
    const found = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
    return (
      found ?? {
        id: 'mock-user-custom',
        name: name || 'Premium Member',
        email,
        avatarColor: '#a855f7',
      }
    )
  }, [email, name])

  const canSubmit = Boolean(email && email.includes('@'))

  const submit = async (e) => {
    e.preventDefault()
    if (!canSubmit) return
    dispatch(authActions.login(inferredUser))
    toast.success(`Welcome back, ${inferredUser.name.split(' ')[0]}!`)
    onClose?.()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Sign in to book"
      className="bg-zinc-900/10"
    >
      <form className="space-y-5" onSubmit={submit}>
        <Field label="Email">
          <input
            className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            type="email"
            required
          />
        </Field>

        <Field label="Name (optional)" hint="Used only for custom mock profiles">
          <input
            className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Taylor"
            type="text"
          />
        </Field>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" type="button" onClick={onClose}>
            Not now
          </Button>
          <Button variant="primary" type="submit" disabled={!canSubmit}>
            Continue
          </Button>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-zinc-100/70">
          Tip: try <span className="font-medium">alex@premiumcars.dev</span> or{' '}
          <span className="font-medium">jordan@premiumcars.dev</span>.
        </div>
      </form>
    </Modal>
  )
}


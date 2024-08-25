import { FdpStorage } from '@fairdatasociety/fdp-storage'
import { InputBase, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import RegisterIcon from 'remixicon-react/AddBoxLineIcon'
import LoginIcon from 'remixicon-react/LoginBoxLineIcon'
import { SwarmButton } from '../../components/SwarmButton'
import { Horizontal } from './Horizontal'
import { Vertical } from './Vertical'

interface Props {
  fdp: FdpStorage
  onSuccessfulLogin: () => void
}

export function FdpLogin({ fdp, onSuccessfulLogin }: Props) {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { enqueueSnackbar } = useSnackbar()

  const inputStyle = { background: 'white', padding: '2px 8px', width: '100%' }

  async function onLogin() {
    enqueueSnackbar('Logging in...', { variant: 'info' })
    try {
      await fdp.account.login(username, password)
      enqueueSnackbar('Logged in successfully', { variant: 'success' })
      onSuccessfulLogin()
    } catch {
      enqueueSnackbar('Login failed', { variant: 'error' })
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  function onRegister() {
    window.open('https://create.fairdatasociety.org/', '_blank')
  }

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: 'auto',
      }}
    >
      <Vertical gap={32} full>
        <Vertical gap={8} left full>
          <Typography variant="body2">Username</Typography>
          <InputBase value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
        </Vertical>
        <Vertical gap={8} left full>
          <Typography variant="body2">Password</Typography>
          <InputBase value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} type="password" />
        </Vertical>
        <Vertical left full>
          <Horizontal gap={4}>
            <SwarmButton iconType={LoginIcon} onClick={onLogin}>
              Login
            </SwarmButton>
            <SwarmButton iconType={RegisterIcon} onClick={onRegister}>
              Registration
            </SwarmButton>
          </Horizontal>
        </Vertical>
      </Vertical>
    </div>
  )
}

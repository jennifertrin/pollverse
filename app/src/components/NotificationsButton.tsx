import { NotificationsButton } from '@dialectlabs/react-ui';

const DAPP_EXAMPLE_ADDRESS = 'DrsbxpKPYExowu7HNazni8un3ZzqwXSnwCoA3AC8sZms';

const Notifications = () => {
  return (
    <NotificationsButton
      dialectId="dialect-notifications"
      dappAddress={DAPP_EXAMPLE_ADDRESS}
      notifications={[
        { name: 'Welcome message', detail: 'On signup' },
      ]}
      pollingInterval={15000}
      channels={['web3', 'email', 'sms', 'telegram']}
    />
  )
}

export default Notifications;
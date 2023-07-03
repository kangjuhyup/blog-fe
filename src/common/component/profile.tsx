import { useConnect } from 'wagmi';

export function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        borderRadius: '4px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          style={{
            backgroundColor: '#FDDF8C',
            border: 'none',
            borderRadius: '4px',
            color: '#333',
            cursor: 'pointer',
            display: 'inline-block',
            fontSize: '14px',
            fontWeight: 'bold',
            margin: '5px',
            padding: '8px 16px',
            transition: 'background-color 0.3s ease',
          }}
        >
          {connector.name}
          {!connector.ready && ' (unsupported)'}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </button>
      ))}

      {error && (
        <div
          style={{
            backgroundColor: '#FFD2D2',
            borderRadius: '4px',
            color: '#FF0000',
            fontSize: '14px',
            marginTop: '10px',
            padding: '8px',
          }}
        >
          {error.message}
        </div>
      )}
    </div>
  );
}

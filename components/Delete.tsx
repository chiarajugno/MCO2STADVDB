import { useState } from 'react';
import { MantineProvider, TextInput, Button } from '@mantine/core';
import { notifications, Notifications } from '@mantine/notifications';


export default function Delete() {
  const [appId, setAppId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAppIdChange = (value: string) => {
    setAppId(value);
    setError('');
    setSuccess('');
  };

  const handleDelete = async () => {
    if (!appId) {
      setError('App ID cannot be empty.');
      return;
    }

    try {
      const response = await fetch(`/api/delete_games?appId=${appId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        notifications.show({
          message: 'Game deleted successfully!',
          color: 'green',
        });
        setSuccess('Game deleted successfully.');
        setAppId('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete the game.');
        notifications.show({
          message: `Error deleting game: ${data.error}`,
          color: 'red',
        });
      }
    } catch (err) {
      console.error('Error deleting game:', err);
      setError('Failed to delete game. Please try again.');
      notifications.show({
        message: 'Failed to delete game. Please try again.',
        color: 'red',
      });
    }
  };

  return (
    <MantineProvider>
      <Notifications />
      <div className="w-full flex flex-col items-center justify-center p-10">
        <h1 className="text-[32px] font-semibold mb-4">Delete a Game</h1>
        <div className="w-[50%] flex flex-col items-start justify-center p-6 border border-gray-500 rounded-md">
          <TextInput
            label="Enter App ID"
            placeholder="Type an App ID"
            value={appId}
            onChange={(e) => handleAppIdChange(e.target.value)}
            required
          />
          <Button onClick={handleDelete} className="mt-4" color="red">
            Delete Game
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
      </div>
    </MantineProvider>
  );
}

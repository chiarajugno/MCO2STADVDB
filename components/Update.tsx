import { useState } from 'react';
import { MantineProvider, TextInput, Button } from '@mantine/core';
import { notifications, Notifications } from '@mantine/notifications';


export default function Update() {
  const [enteredAppId, setEnteredAppId] = useState('');
  const [formValues, setFormValues] = useState({
    name: '',
    releaseDate: '',
    price: '',
    positiveRatings: '',
    negativeRatings: '',
  });
  const [error, setError] = useState('');


  const handleAppIdChange = async (value: string) => {
    setEnteredAppId(value);
    setError(''); 
  };

  const validateAppId = async () => {
    if (!enteredAppId) {
      setError('App ID cannot be empty.');
      return;
    }
  
    try {
      const response = await fetch(`/api/get_game_by_id?appId=${enteredAppId}`);
      const data = await response.json();
      console.log('API response:', data);
  
      if (data.game) {
        setFormValues({
            name: data.game.name,
            releaseDate: data.game.release_date, 
            price: data.game.price,
            positiveRatings: data.game.positive_ratings, 
            negativeRatings: data.game.negative_ratings, 
        });
        setError(''); 
      } else {
        setError(data.error || 'No game found with the provided App ID.');
      }
    } catch (err) {
      console.error('Error validating App ID:', err);
      setError('Failed to validate App ID. Please try again.');
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/edit_games', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appId: enteredAppId, ...formValues }),
    });

    if (response.ok) {
      notifications.show({
        message: 'Game updated successfully!',
        color: 'green',
      });
    } else {
      const error = await response.json();
      notifications.show({
        message: `Error updating game: ${error.error}`,
        color: 'red',
      });
    }
  };

  return (
    <MantineProvider>
      <Notifications />
      <div className="w-full flex flex-col items-center justify-center p-10">
        <h1 className="text-[32px] font-semibold mb-4">Edit a Game</h1>
        <div className="w-[50%] flex flex-col items-start justify-center p-6 border border-gray-500 rounded-md">
          <TextInput
            label="Enter App ID"
            placeholder="Type an App ID"
            value={enteredAppId}
            onChange={(e) => handleAppIdChange(e.target.value)}
            required
          />
          <Button onClick={validateAppId} className="mt-4">
            Find Game
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {formValues.name && (
            <form onSubmit={handleSubmit} className="w-full mt-6">
              <div className="flex flex-col mb-4">
                <label htmlFor="name">Name:</label>
                <TextInput
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="releaseDate">Release Date:</label>
                <TextInput
                  id="releaseDate"
                  name="releaseDate"
                  value={formValues.releaseDate}
                  onChange={(e) =>
                    setFormValues({ ...formValues, releaseDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="price">Price:</label>
                <TextInput
                  id="price"
                  name="price"
                  value={formValues.price}
                  onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="positiveRatings">Positive Ratings:</label>
                <TextInput
                  id="positiveRatings"
                  name="positiveRatings"
                  value={formValues.positiveRatings}
                  onChange={(e) =>
                    setFormValues({ ...formValues, positiveRatings: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="negativeRatings">Negative Ratings:</label>
                <TextInput
                  id="negativeRatings"
                  name="negativeRatings"
                  value={formValues.negativeRatings}
                  onChange={(e) =>
                    setFormValues({ ...formValues, negativeRatings: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </div>
      </div>
    </MantineProvider>
  );
}

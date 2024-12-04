import { useState } from 'react';
import { MantineProvider, TextInput, Button } from '@mantine/core';
import { Roboto } from 'next/font/google';
import { notifications, Notifications } from '@mantine/notifications';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], 
  display: 'swap',
});

export default function Create() {
  const [formValues, setFormValues] = useState({
    appId: '',
    name: '',
    releaseDate: '',
    price: '',
    positiveRatings: '',
    negativeRatings: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/insert_games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Game added:', data);
        notifications.show({
            message: 'Game added successfully!',
            color: 'green',
        })
      } else {
        const error = await response.json();
        console.error('Error inserting game:', error);
        notifications.show({
            message: `Error adding game: ${error.error}`,
            color: 'red',
        })
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    }
  };  


  return (
    <MantineProvider>
        <Notifications />
        <div className="w-full flex flex-col items-center justify-center p-10">
            <h1 className="text-[32px] font-semibold mb-4" style={roboto.style}>
            Insert a New Game
            </h1>
            <div className="w-[50%] flex flex-col items-start justify-center p-6 border border-gray-500 rounded-md">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col mb-4">
                <label htmlFor="appId" className="text-[18px] font-semibold" style={roboto.style}>
                    App ID:
                </label>
                <TextInput
                    id="appId"
                    name="appId"
                    value={formValues.appId}
                    onChange={handleChange}
                    placeholder="Enter App ID"
                    required
                />
                </div>

                <div className="flex flex-col mb-4">
                <label htmlFor="name" className="text-[18px] font-semibold" style={roboto.style}>
                    Name:
                </label>
                <TextInput
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder="Enter Game Name"
                    required
                />
                </div>

                <div className="flex flex-col mb-4">
                <label htmlFor="releaseDate" className="text-[18px] font-semibold" style={roboto.style}>
                    Release Date (yyyy-mm-dd):
                </label>
                <TextInput
                    id="releaseDate"
                    name="releaseDate"
                    value={formValues.releaseDate}
                    onChange={handleChange}
                    placeholder="Enter Release Date"
                    required
                />
                </div>

                <div className="flex flex-col mb-4">
                <label htmlFor="price" className="text-[18px] font-semibold" style={roboto.style}>
                    Price:
                </label>
                <TextInput
                    id="price"
                    name="price"
                    value={formValues.price}
                    onChange={handleChange}
                    placeholder="Enter Price"
                    required
                />
                </div>

                <div className="flex flex-col mb-4">
                <label htmlFor="positiveRatings" className="text-[18px] font-semibold" style={roboto.style}>
                    Positive Ratings:
                </label>
                <TextInput
                    id="positiveRatings"
                    name="positiveRatings"
                    value={formValues.positiveRatings}
                    onChange={handleChange}
                    placeholder="Enter Positive Ratings"
                    required
                />
                </div>

                <div className="flex flex-col mb-4">
                <label htmlFor="negativeRatings" className="text-[18px] font-semibold" style={roboto.style}>
                    Negative Ratings:
                </label>
                <TextInput
                id="negativeRatings"
                name="negativeRatings"
                value={formValues.negativeRatings}
                onChange={handleChange}
                placeholder="Enter Negative Ratings"
                required
              />
            </div>

            <Button type="submit" className="mt-4">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </MantineProvider>
  );
}

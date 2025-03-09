import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Recept = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([{ ingredientId: '', amount: '', amountType: '' }]);
  const [description, setDescription] = useState('');
  const [preferences, setPreferences] = useState('');

  // Predefined lists (fetched from backend)
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [dayTimeOptions, setDayTimeOptions] = useState([]);
  const [sensitivityOptions, setSensitivityOptions] = useState([]);
  const [preferenceOptions, setPreferenceOptions] = useState([]);

  // State for selected foreign key values
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedDayTime, setSelectedDayTime] = useState('');
  const [selectedSensitivity, setSelectedSensitivity] = useState('');

  useEffect(() => {
    async function fetchOptions() {
      // Fetch available predefined options from the backend
      const ingredientsResponse = await axios.get('http://localhost:3001/api/ingredients');
      const nationalitiesResponse = await axios.get('http://localhost:3001/api/nationalities');
      const dayTimesResponse = await axios.get('http://localhost:3001/api/dayTimes');
      const sensitivitiesResponse = await axios.get('http://localhost:3001/api/sensitivities');
      const preferencesResponse = await axios.get('http://localhost:3001/api/preferences');

      setIngredientOptions(ingredientsResponse.data.map(ingredient => ({
        value: ingredient.hozzavalok_ID,
        label: ingredient.Hozzavalok_neve
      })));
      setNationalityOptions(nationalitiesResponse.data);
      setDayTimeOptions(dayTimesResponse.data);
      setSensitivityOptions(sensitivitiesResponse.data);
      setPreferenceOptions(preferencesResponse.data);
    }

    fetchOptions();
  }, []);

  const handleIngredientChange = (index, selectedOption) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].ingredientId = selectedOption ? selectedOption.value : '';
    setIngredients(updatedIngredients);
  };

  const handleInputChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredientId: '', amount: '', amountType: '' }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      recipeName,
      description,
      nationalityId: selectedNationality,
      dayTimeId: selectedDayTime,
      preferences,
      sensitivityId: selectedSensitivity,
      ingredients: ingredients.map((ingredient) => ({
        Hozzavalok_id: ingredient.ingredientId,
        mennyiseg: ingredient.amount,
        mértékegység: ingredient.amountType
      }))
    };

    try {
      const response = await axios.post('http://localhost:3001/api/recipes', recipeData);
      if (response.status === 200) {
        alert('Recipe added successfully!');
      }
    } catch (error) {
      alert('Error adding recipe: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Add a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Name:</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <Select
                options={ingredientOptions}
                onChange={(selectedOption) => handleIngredientChange(index, selectedOption)}
                placeholder="Search Ingredient..."
                isSearchable
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Amount Type (e.g., grams, cups)"
                value={ingredient.amountType}
                onChange={(e) => handleInputChange(index, 'amountType', e.target.value)}
                required
              />
              <button type="button" onClick={() => removeIngredient(index)}>Remove Ingredient</button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>Add Ingredient</button>
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Nationality:</label>
          <select
            value={selectedNationality}
            onChange={(e) => setSelectedNationality(e.target.value)}
            required
          >
            <option value="">Select Nationality</option>
            {nationalityOptions.map((nationality) => (
              <option key={nationality.konyha_id} value={nationality.konyha_id}>
                {nationality.nemzetiseg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Day Time:</label>
          <select
            value={selectedDayTime}
            onChange={(e) => setSelectedDayTime(e.target.value)}
            required
          >
            <option value="">Select Day Time</option>
            {dayTimeOptions.map((dayTime) => (
              <option key={dayTime.napszak_id} value={dayTime.napszak_id}>
                {dayTime.idoszak}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sensitivity:</label>
          <select
            value={selectedSensitivity}
            onChange={(e) => setSelectedSensitivity(e.target.value)}
            required
          >
            <option value="">Select Sensitivity</option>
            {sensitivityOptions.map((sensitivity) => (
              <option key={sensitivity.erzekenyseg_id} value={sensitivity.erzekenyseg_id}>
                {sensitivity.erzekenyseg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Preferences:</label>
          <select
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            required
          >
            <option value="">Select Preferences</option>
            {preferenceOptions.map((preference) => (
              <option key={preference.etkezes_id} value={preference.etkezes_id}>
                {preference.etkezes}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default Recept;

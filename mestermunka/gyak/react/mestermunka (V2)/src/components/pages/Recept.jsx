import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const Recept = () => {
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [preferences, setPreferences] = useState('');
  const [sensitivity, setSensitivity] = useState('');
  const [ingredients, setIngredients] = useState([{ ingredientId: '', amount: '', unit: '' }]);

  // Dropdown options
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [nationalityOptions, setNationalityOptions] = useState([]);
  const [dayTimeOptions, setDayTimeOptions] = useState([]);
  const [sensitivityOptions, setSensitivityOptions] = useState([]);
  const [preferenceOptions, setPreferenceOptions] = useState([]);

  // Selected dropdown values
  const [selectedNationality, setSelectedNationality] = useState('');
  const [selectedDayTime, setSelectedDayTime] = useState('');

  useEffect(() => {
    async function fetchOptions() {
      try {
        const ingredientsRes = await axios.get('http://localhost:3001/api/ingredients');
        const nationalitiesRes = await axios.get('http://localhost:3001/api/nationalities');
        const dayTimesRes = await axios.get('http://localhost:3001/api/dayTimes');
        const sensitivitiesRes = await axios.get('http://localhost:3001/api/sensitivities');
        const preferencesRes = await axios.get('http://localhost:3001/api/preferences');

        setIngredientOptions(
          ingredientsRes.data.map(ing => ({
            value: ing.hozzavalok_id,  // Ensure Hozzavalok_id is being used
            label: ing.Hozzavalok_neve  // Ensure Hozzavalok_neve is being used
          }))
        );
        setNationalityOptions(nationalitiesRes.data);
        setDayTimeOptions(dayTimesRes.data);
        setSensitivityOptions(sensitivitiesRes.data);
        setPreferenceOptions(preferencesRes.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    }

    fetchOptions();
  }, []);

  const handleIngredientChange = (index, selectedOption) => {
    console.log("Selected Ingredient:", selectedOption); // Log to check the selectedOption
    const updatedIngredients = [...ingredients];
    updatedIngredients[index].ingredientId = selectedOption ? selectedOption.value : ''; // Set ingredientId
    setIngredients(updatedIngredients);
  };
    
  
  const handleInputChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };
  

  const addIngredient = () => {
    setIngredients([...ingredients, { ingredientId: '', amount: '', unit: '' }]);
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const validateData = () => {
    if (!recipeName || !description || !selectedNationality || !selectedDayTime || !preferences || !sensitivity || ingredients.some(ing => !ing.ingredientId || !ing.amount || !ing.unit)) {
      alert("Please fill all required fields.");
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the data before sending it to ensure everything looks correct
    const recipeData = {
      recipeName,
      description,
      nationalityId: selectedNationality,
      dayTimeId: selectedDayTime,
      preferences,
      sensitivity,
      ingredients: ingredients.map((ing) => ({
        hozzavalok_id: ing.ingredientId, // This should now be correctly populated
        mennyiseg: ing.amount,
        mertekegyseg: ing.unit,
      })),
    };
    
  
    console.log("Sending recipe data:", recipeData);
    console.log("Ingredients:", ingredients);

  
    // If any required field is missing, alert and stop
    if (!validateData()) {
      return; // Prevent submitting if data is invalid
    }
  
    try {
      const response = await axios.post('http://localhost:3001/api/recipes', recipeData);
      if (response.status === 200) {
        alert('Recipe added successfully!');
      }
    } catch (error) {
      console.error('Error adding recipe:', error.response || error.message);
      alert('Error adding recipe: ' + (error.response ? error.response.data.message : error.message));
    }
  };
   

  return (
    <div>
      <h1>Add a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Name:</label>
          <input type="text" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} required />
        </div>

        <div>
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <Select
              options={ingredientOptions}
              onChange={(selectedOption) => handleIngredientChange(index, selectedOption)}
              placeholder="Select Ingredient..."
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
                placeholder="Unit (e.g., grams, cups)"
                value={ingredient.unit}
                onChange={(e) => handleInputChange(index, 'unit', e.target.value)}
                required
              />
              <button type="button" onClick={() => removeIngredient(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>Add Ingredient</button>
        </div>

        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div>
          <label>Nationality:</label>
          <select value={selectedNationality} onChange={(e) => setSelectedNationality(e.target.value)} required>
            <option value="">Select Nationality</option>
            {nationalityOptions.map(nat => (
              <option key={nat.konyha_id} value={nat.konyha_id}>{nat.nemzetiseg}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Day Time:</label>
          <select value={selectedDayTime} onChange={(e) => setSelectedDayTime(e.target.value)} required>
            <option value="">Select Day Time</option>
            {dayTimeOptions.map(dt => (
              <option key={dt.napszak_id} value={dt.napszak_id}>{dt.idoszak}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Sensitivity:</label>
          <select value={sensitivity} onChange={(e) => setSensitivity(e.target.value)} required>
            <option value="">Select Sensitivity</option>
            {sensitivityOptions.map(sen => (
              <option key={sen.erzekenyseg_id} value={sen.erzekenyseg_id}>{sen.erzekenyseg}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Preferences:</label>
          <select value={preferences} onChange={(e) => setPreferences(e.target.value)} required>
            <option value="">Select Preference</option>
            {preferenceOptions.map(pref => (
              <option key={pref.etkezes_id} value={pref.etkezes_id}>{pref.etkezes}</option>
            ))}
          </select>
        </div>

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default Recept;

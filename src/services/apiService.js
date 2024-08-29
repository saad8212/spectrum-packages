// src/services/apiService.js
export const submitSurvey = async (formData) => {
    try {
      const response = await fetch('https://spectrum-form-backend.vercel.app/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to submit survey: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error submitting survey:', error);
      throw error;
    }
  };
  
  export const fetchSurveys = async () => {
    try {
      const response = await fetch('https://spectrum-form-backend.vercel.app/api/survey');
      if (!response.ok) {
        throw new Error(`Failed to fetch surveys: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching surveys:', error);
      throw error;
    }
  };
  
  export const deleteSurvey = async (id) => {
    try {
      const response = await fetch(`https://spectrum-form-backend.vercel.app/api/survey/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete survey: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting survey:', error);
      throw error;
    }
  };
  
  export const updateSurvey = async (id, updatedData) => {
    try {
      const response = await fetch(`https://spectrum-form-backend.vercel.app/api/survey/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update survey: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating survey:', error);
      throw error;
    }
  };
  
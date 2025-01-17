import { useState, useRef, useEffect } from 'react';


const AddressForm = () => {
  const [formData, setFormData] = useState({
    postCode: '',
    street: '',
    city: '',
    county: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAddressDetails = async (postcode) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
      const data = await response.json();
      
      if (data.status === 200) {
        setFormData(prev => ({
          ...prev,
          postCode: postcode,
          street: data.result.thoroughfare || '',
          city: data.result.post_town || '',
          county: data.result.admin_district || ''
        }));
        setError('');
      } else {
        setError('Invalid postcode. Please try again.');
      }
    } catch (err) {
      setError('Error fetching address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostcodeChange = async (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, postCode: value }));
    
    if (value.length >= 2) {
      try {
        const response = await fetch(`https://api.postcodes.io/postcodes/${value}/autocomplete`);
        const data = await response.json();
        
        if (data.status === 200 && data.result) {
          setSuggestions(data.result);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = async (postcode) => {
    await fetchAddressDetails(postcode);
    setShowSuggestions(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4 max-w-md">
      <div className="relative" ref={suggestionRef}>
        <input
          type="text"
          name="postCode"
          className={`border rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-gold1 ${
            formData.postCode ? "bg-gray-100" : ""
          } ${error ? "border-red-500" : "border-gray-300"}`}
          value={formData.postCode}
          placeholder="Post code"
          onChange={handlePostcodeChange}
          required
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}

        {loading && <p className="text-sm text-gray-500 mt-1">Loading address details...</p>}
        {error && (
         <p>{error}</p>
        )}
      </div>

      <input
        type="text"
        name="street"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-gold1"
        value={formData.street}
        placeholder="Street Address"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="city"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-gold1"
        value={formData.city}
        placeholder="City"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="county"
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-gold1"
        value={formData.county}
        placeholder="County"
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default AddressForm;
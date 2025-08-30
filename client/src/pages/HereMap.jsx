import React, { useState, useEffect } from 'react';
const apiKey = 'S7A-KlzAW3rU8ZBTRMo6BxnKP40l8-HRcMwBEWk3GVo'; // Replace with your actual API key

const HereMap = () => {
  const [hospitals, setHospitals] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLocating, setIsLocating] = useState(false); // State for location fetching
  const [num, setNum] = useState('+919152987821')

  const fetchHospitals = async (latitude, longitude) => {
    try {
      const url = `https://discover.search.hereapi.com/v1/discover?apikey=${apiKey}&at=${latitude},${longitude}&q=hospitals&limit=5`;
      const response = await fetch(url);
      const data = await response.json();
      
      const contactNumbers = data.items.reduce((acc, hospital) => {
        // Check if contacts and phone exist
        if (hospital.contacts && hospital.contacts[0] && hospital.contacts[0].phone) {
          hospital.contacts[0].phone.forEach((contact) => {
            acc.push(contact.value);
          });
        }
        return acc;
      }, []);
  
      console.log(contactNumbers);
      setNum(contactNumbers[0] || '');  // Safely set num if there's no contact number
      setHospitals(data.items);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching hospitals.');
    }
  };
  
  const getLocation = async () => {
    setIsLocating(true); // Set locating state to true
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchHospitals(latitude, longitude);
          setIsLocating(false); // Set locating state to false after successful fetch
        },
        (error) => {
          console.error(error);
          setErrorMessage('Error fetching location.');
          setIsLocating(false); // Set locating state to false after error
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
      setIsLocating(false); // Set locating state to false if not supported
    }
  };

  const dialEmergency = () => {
    // Check for browser support for Phone Dialer API
    if (navigator.dialer) {
      navigator.dialer.dial(num); // Replace 'emergency' with actual emergency number
    } else {
      // Fallback for non-supporting browsers (open emergency number in dial pad)
      window.location.href = 'tel:'+num; // Replace 'emergency' with actual emergency number
    }
  };

  useEffect(() => {
    getLocation();
  }, []); // Empty dependency array to fetch location only once on component mount

  return (
    
    <div className="hospitals-container">
      <h1>Hospitals Near You</h1>
      {isLocating && <p>Locating your position...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {hospitals.length > 0 && (
        <ul>
          {hospitals.map((hospital) => (
            <li key={hospital.id} className="hospital">
              <h2>{hospital.title}</h2>
              {hospital.address && <p>{hospital.address.label}</p>}
              {hospital.phone && <p>Phone: {hospital.phone}</p>}
              {hospital.href && <a href={hospital.href}>Contact Hospital</a>}
            </li>
          ))}
        </ul>
      )}
      <button onClick={dialEmergency}>Call Emergency Services</button>
      <button onClick={getLocation} disabled={isLocating}>
        {isLocating ? 'Locating...' : 'Find Hospitals Near Me'}
      </button>
    </div>
  );
};

export default HereMap;
/*import React, { useState, useEffect } from 'react';

// Initialize the API Key and other constants
const apiKey = 'S7A-KlzAW3rU8ZBTRMo6BxnKP40l8-HRcMwBEWk3GVo'; // Replace with your actual API key

const HereMap = () => {
  const [hospitals, setHospitals] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLocating, setIsLocating] = useState(false); // State for location fetching
  const [num, setNum] = useState('+919152987821');
  const mapRef = React.useRef(null); // Ref to hold the map container

  // Initialize the map object
  useEffect(() => {
    if (mapRef.current) {
      const platform = new window.H.service.Platform({
        apikey: apiKey,
      });
      const defaultLayers = platform.createDefaultLayers();
      const map = new window.H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        zoom: 14,
        center: { lat: 52.5, lng: 13.4 }, // Default center (Berlin, replace with actual location)
      });
      const behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      const ui = window.H.ui.UI.createDefault(map, defaultLayers);

      // Save the map object to use later
      window.map = map;
    }
  }, []);

  // Fetch hospitals based on latitude and longitude
  const fetchHospitals = async (latitude, longitude) => {
    try {
      const url = `https://discover.search.hereapi.com/v1/discover?apikey=${apiKey}&at=${latitude},${longitude}&q=hospitals&limit=5`;
      const response = await fetch(url);
      const data = await response.json();

      const contactNumbers = data.items.reduce((acc, hospital) => {
        if (hospital.contacts && hospital.contacts[0] && hospital.contacts[0].phone) {
          hospital.contacts[0].phone.forEach((contact) => {
            acc.push(contact.value);
          });
        }
        return acc;
      }, []);

      console.log(contactNumbers);
      setNum(contactNumbers[0] || '');
      setHospitals(data.items);

      // Add markers for hospitals to the map
      if (window.map) {
        const map = window.map; // Reference the map instance
        data.items.forEach((hospital) => {
          const lat = hospital.position[0]; // Replace with actual lat
          const lng = hospital.position[1]; // Replace with actual lng
          const marker = new window.H.map.Marker({ lat, lng });
          map.addObject(marker);
        });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching hospitals.');
    }
  };

  // Get the user's current location
  const getLocation = async () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchHospitals(latitude, longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error(error);
          setErrorMessage('Error fetching location.');
          setIsLocating(false);
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
      setIsLocating(false);
    }
  };

  const dialEmergency = () => {
    if (navigator.dialer) {
      navigator.dialer.dial(num);
    } else {
      window.location.href = 'tel:' + num;
    }
  };

  // Fetch the location on component mount
  useEffect(() => {
    getLocation();
  }, []); // Empty dependency array to fetch location only once on component mount

  return (
    <div className="hospitals-container">
      <h1>Hospitals Near You</h1>
      {isLocating && <p>Locating your position...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <div id="mapContainer" ref={mapRef} style={{ height: '500px', width: '100%' }}></div>
      
      <button onClick={dialEmergency}>Call Emergency Services</button>
      <button onClick={getLocation} disabled={isLocating}>
        {isLocating ? 'Locating...' : 'Find Hospitals Near Me'}
      </button>
    </div>
  );
};

export default HereMap;*/
/*import React, { useState, useEffect, useRef } from 'react';

// Initialize the API Key and other constants
const apiKey = 'S7A-KlzAW3rU8ZBTRMo6BxnKP40l8-HRcMwBEWk3GVo'; // Replace with your actual API key

const HereMap = () => {
  const [hospitals, setHospitals] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLocating, setIsLocating] = useState(false); // State for location fetching
  const [num, setNum] = useState('+919152987821');
  const mapRef = useRef(null); // Ref to hold the map container

  // Initialize the map object
  useEffect(() => {
    if (mapRef.current) {
      const platform = new window.H.service.Platform({
        apikey: apiKey,
      });
      const defaultLayers = platform.createDefaultLayers();
      const map = new window.H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        zoom: 14,
        center: { lat: 52.5, lng: 13.4 }, // Default center (Berlin, replace with actual location)
      });
      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      window.H.ui.UI.createDefault(map, defaultLayers);

      // Save the map object to use later
      window.map = map;
    }
  }, []);

  // Fetch hospitals based on latitude and longitude
  const fetchHospitals = async (latitude, longitude) => {
    try {
      const url = `https://discover.search.hereapi.com/v1/discover?apikey=${apiKey}&at=${latitude},${longitude}&q=hospitals&limit=5`;
      const response = await fetch(url);
      const data = await response.json();

      const contactNumbers = data.items.reduce((acc, hospital) => {
        if (hospital.contacts && hospital.contacts[0] && hospital.contacts[0].phone) {
          hospital.contacts[0].phone.forEach((contact) => {
            acc.push(contact.value);
          });
        }
        return acc;
      }, []);

      console.log(contactNumbers);
      setNum(contactNumbers[0] || '');
      setHospitals(data.items);

      // Add markers for hospitals to the map
      if (window.map) {
        const map = window.map; // Reference the map instance
        data.items.forEach((hospital) => {
          const { lat, lng } = hospital.position;
          const marker = new window.H.map.Marker({ lat, lng });
          map.addObject(marker);
        });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching hospitals.');
    }
  };

  // Get the user's current location
  const getLocation = async () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchHospitals(latitude, longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error(error);
          setErrorMessage('Error fetching location.');
          setIsLocating(false);
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
      setIsLocating(false);
    }
  };

  const dialEmergency = () => {
    if (navigator.dialer) {
      navigator.dialer.dial(num);
    } else {
      window.location.href = 'tel:' + num;
    }
  };

  // Fetch the location on component mount
  useEffect(() => {
    getLocation();
  }, []); // Empty dependency array to fetch location only once on component mount

  return (
    <div className="hospitals-container">
      <h1>Hospitals Near You</h1>
      {isLocating && <p>Locating your position...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div id="mapContainer" ref={mapRef} style={{ height: '500px', width: '100%' }}></div>

      <button onClick={dialEmergency}>Call Emergency Services</button>
      <button onClick={getLocation} disabled={isLocating}>
        {isLocating ? 'Locating...' : 'Find Hospitals Near Me'}
      </button>
    </div>
  );
};

export default HereMap;*/
/*import React, { useState, useEffect, useRef } from 'react';

// Initialize the API Key and other constants
const apiKey = 'S7A-KlzAW3rU8ZBTRMo6BxnKP40l8-HRcMwBEWk3GVo'; // Replace with your actual API key

const HereMap = () => {
  const [hospitals, setHospitals] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLocating, setIsLocating] = useState(false); // State for location fetching
  const [num, setNum] = useState('+919152987821');
  const mapRef = useRef(null); // Ref to hold the map container

  // Initialize the map object
  useEffect(() => {
    if (mapRef.current) {
      const platform = new window.H.service.Platform({
        apikey: apiKey,
      });
      const defaultLayers = platform.createDefaultLayers();
      const map = new window.H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        zoom: 14,
        center: { lat: 52.5, lng: 13.4 }, // Default center (Berlin, replace with actual location)
      });
      new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));
      window.H.ui.UI.createDefault(map, defaultLayers);

      // Save the map object to use later
      window.map = map;
    }
  }, []);

  // Create a custom marker
  const createCustomMarker = (coords, name) => {
    const svgMarkup = `
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#1E90FF" stroke="white" stroke-width="2"/>
        <text x="12" y="16" font-size="10" text-anchor="middle" fill="white">${name[0] || '?'}</text>
      </svg>`;
    const icon = new window.H.map.Icon(svgMarkup);
    return new window.H.map.Marker(coords, { icon });
  };

  // Fetch hospitals based on latitude and longitude
  const fetchHospitals = async (latitude, longitude) => {
    try {
      const url = `https://discover.search.hereapi.com/v1/discover?apikey=${apiKey}&at=${latitude},${longitude}&q=hospitals&limit=5`;
      const response = await fetch(url);
      const data = await response.json();

      const contactNumbers = data.items.reduce((acc, hospital) => {
        if (hospital.contacts && hospital.contacts[0] && hospital.contacts[0].phone) {
          hospital.contacts[0].phone.forEach((contact) => {
            acc.push(contact.value);
          });
        }
        return acc;
      }, []);

      console.log(contactNumbers);
      setNum(contactNumbers[0] || '');
      setHospitals(data.items);

      // Add custom markers for hospitals to the map
      if (window.map) {
        const map = window.map; // Reference the map instance
        data.items.forEach((hospital) => {
          const { lat, lng } = hospital.position;
          const marker = createCustomMarker({ lat, lng }, hospital.name);
          map.addObject(marker);
        });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error fetching hospitals.');
    }
  };

  // Get the user's current location
  const getLocation = async () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchHospitals(latitude, longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error(error);
          setErrorMessage('Error fetching location.');
          setIsLocating(false);
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
      setIsLocating(false);
    }
  };

  const dialEmergency = () => {
    if (navigator.dialer) {
      navigator.dialer.dial(num);
    } else {
      window.location.href = 'tel:' + num;
    }
  };

  // Fetch the location on component mount
  useEffect(() => {
    getLocation();
  }, []); // Empty dependency array to fetch location only once on component mount

  return (
    <div className="hospitals-container">
      <h1>Hospitals Near You</h1>
      {isLocating && <p>Locating your position...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div id="mapContainer" ref={mapRef} style={{ height: '500px', width: '100%' }}></div>

      <button onClick={dialEmergency}>Call Emergency Services</button>
      <button onClick={getLocation} disabled={isLocating}>
        {isLocating ? 'Locating...' : 'Find Hospitals Near Me'}
      </button>
    </div>
  );
};

export default HereMap;*/


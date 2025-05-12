const express = require('express');
const db = require('../db/db');

const router = express.Router();

// Input validation middleware
const validateSchoolInput = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;
  
  // Check for missing fields
  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ 
      error: 'Missing required fields. Name, address, latitude, and longitude are required.' 
    });
  }
  
  // Convert to numbers and validate
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);
  
  if (isNaN(lat) || isNaN(lng) || 
      lat < -90 || lat > 90 || 
      lng < -180 || lng > 180) {
    return res.status(400).json({ 
      error: 'Invalid coordinates. Latitude must be between -90 and 90, and longitude between -180 and 180.'
    });
  }
  
  next();
};

// Add a new school
router.post('/addSchool', validateSchoolInput, async (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name.trim(), address.trim(), parseFloat(latitude), parseFloat(longitude)]
    );

    res.status(201).json({
      success: true,
      message: 'School added successfully',
      schoolId: result.insertId
    });
  } catch (error) {
    console.error('Database error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ 
        success: false,
        error: 'A school with this name or location already exists.' 
      });
    }
    
    next(error);
  }
});

// List schools sorted by proximity
router.get('/listSchools', async (req, res, next) => {
  let { latitude, longitude } = req.query;
  
  // Convert to numbers
  latitude = parseFloat(latitude);
  longitude = parseFloat(longitude);

  // Validate coordinates
  if (isNaN(latitude) || isNaN(longitude) ||
      latitude < -90 || latitude > 90 || 
      longitude < -180 || longitude > 180) {
    return res.status(400).json({ 
      error: 'Invalid coordinates. Provide valid latitude (-90 to 90) and longitude (-180 to 180).' 
    });
  }

  // Haversine formula to calculate distance between two lat/long points
  const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  try {
    // Fetch all schools
    const [schools] = await db.execute('SELECT * FROM schools');
    
    // Calculate distance from the user's location to each school
    const schoolsWithDistance = schools.map(school => ({
      ...school,
      distance: haversine(latitude, longitude, school.latitude, school.longitude)
    }));

    // Sort schools by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json({
      success: true,
      schools: schoolsWithDistance
    });
  } catch (error) {
    console.error('Database error:', error);
    next(error);
  }
});

module.exports = router;

const axios = require('axios');

const baseURL = 'http://localhost:5000/api';

async function testRoutes() {
  console.log('Testing API routes...');
  
  try {
    // Test health check
    const health = await axios.get(`${baseURL}/health`);
    console.log('✅ Health check:', health.data);
    
    // Test properties GET route
    const properties = await axios.get(`${baseURL}/admin/properties`, {
      headers: {
        'Authorization': `Bearer your-test-token`
      }
    });
    console.log('✅ GET properties route working');
    
    console.log('All basic routes are accessible');
  } catch (error) {
    console.error('❌ Route test failed:', error.message);
  }
}

// Run if called directly
if (require.main === module) {
  testRoutes();
}

module.exports = testRoutes;

function generateMockData() {
    return {
      timestamp: new Date().toISOString(),
      active_users: Math.floor(Math.random() * 100),
      page_views: Math.floor(Math.random() * 200),
      avg_session_duration: (Math.random() * 5 + 1).toFixed(2),
    };
  }
  
  module.exports = generateMockData;
  
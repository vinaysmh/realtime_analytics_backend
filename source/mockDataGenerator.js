function generateMockData() {
  return {
    timestamp: new Date().toISOString(),
    page_views: Math.floor(Math.random() * 200) + 1,
    active_users: Math.floor(Math.random() * 100) + 1,
    avg_session_duration: parseFloat((Math.random() * 5 + 1).toFixed(2)),
  };
}

module.exports = generateMockData;

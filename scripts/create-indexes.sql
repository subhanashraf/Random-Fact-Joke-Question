-- MongoDB indexes for better performance
-- Run these in MongoDB Compass or MongoDB Shell

// Create indexes for facts collection
db.facts.createIndex({ "type": 1, "language": 1 })
db.facts.createIndex({ "createdAt": -1 })

// Create indexes for questions collection  
db.questions.createIndex({ "type": 1, "language": 1 })
db.questions.createIndex({ "createdAt": -1 })

// Create indexes for jokes collection
db.jokes.createIndex({ "type": 1, "language": 1 })
db.jokes.createIndex({ "createdAt": -1 })

// Create index for daily facts
db.daily_facts.createIndex({ "date": 1 }, { unique: true })

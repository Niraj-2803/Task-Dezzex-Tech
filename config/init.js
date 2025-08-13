const pool = require("./db");

async function initDatabase() {
  try {
    // 1. Lawyers table (parent for several others)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS lawyers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        mobile VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        country VARCHAR(100) NOT NULL,
        yearsOfExperience INT NOT NULL,
        languages JSON NOT NULL,
        lawyerType VARCHAR(100) NOT NULL,
        about TEXT,
        practiceAreas JSON NOT NULL,
        consultantAvailability JSON NOT NULL,
        timing JSON NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 2. Clients table (depends on lawyers)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        clientType VARCHAR(100) NOT NULL,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(20) NOT NULL,
        altPhoneNumber VARCHAR(20),
        website VARCHAR(255),
        streetAddress VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        zipCode VARCHAR(20) NOT NULL,
        country VARCHAR(100) NOT NULL,
        assignedLawyer INT NOT NULL,
        priority ENUM('Low', 'Medium', 'High') NOT NULL,
        billed BOOLEAN NOT NULL,
        notes TEXT,
        status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (assignedLawyer) REFERENCES lawyers(id) ON DELETE CASCADE
      );
    `);

    // 3. Cases table (depends on clients)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cases (
        id INT AUTO_INCREMENT PRIMARY KEY,
        caseTitle VARCHAR(255) NOT NULL,
        caseNumber VARCHAR(100) NOT NULL UNIQUE,
        caseType VARCHAR(100) NOT NULL,
        jurisdiction VARCHAR(255) NOT NULL,
        priority VARCHAR(50) NOT NULL,
        fillingDate DATE NOT NULL,
        caseDescription TEXT,
        clientId INT NULL,
        clientName VARCHAR(255) NULL,
        clientCompany VARCHAR(255) NULL,
        clientEmail VARCHAR(255) NULL,
        clientPhone VARCHAR(50) NULL,
        clientAddress TEXT NULL,
        opposingParty VARCHAR(255),
        opposingCounsel VARCHAR(255),
        estimatedCaseValue DECIMAL(15,2),
        status VARCHAR(50) DEFAULT 'open',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE
      );
    `);

    // 4. Appointments table (depends on lawyers)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        clientName VARCHAR(255) NOT NULL,
        duration VARCHAR(50) NOT NULL,
        dateTime DATETIME NOT NULL,
        bookedOn DATETIME NOT NULL,
        lawyer_id INT NOT NULL,
        FOREIGN KEY (lawyer_id) REFERENCES lawyers(id) ON DELETE CASCADE
      )
    `);

    // 5. Blogs table (no dependencies)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        law_type VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        brief TEXT NOT NULL,
        createdOn DATETIME NOT NULL,
        isPosted TINYINT(1) NOT NULL DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 6. Case_lawyers table (depends on cases & lawyers)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS case_lawyers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        caseId INT NOT NULL,
        lawyerId INT NOT NULL,
        FOREIGN KEY (caseId) REFERENCES cases(id) ON DELETE CASCADE,
        FOREIGN KEY (lawyerId) REFERENCES lawyers(id) ON DELETE CASCADE
      );
    `);

    // 7. Case_comments table (depends on cases)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS case_comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        caseId INT NOT NULL,
        comment TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (caseId) REFERENCES cases(id) ON DELETE CASCADE
      );
    `);

    // 8. Case_notes table (depends on cases)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS case_notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        caseId INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (caseId) REFERENCES cases(id) ON DELETE CASCADE
      );
    `);

    // 9. Case_files table (depends on cases)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS case_files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        caseId INT NOT NULL,
        filename VARCHAR(255) NOT NULL,
        fileUrl VARCHAR(255) NOT NULL,
        uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (caseId) REFERENCES cases(id) ON DELETE CASCADE
      );
    `);

    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
}

module.exports = initDatabase;
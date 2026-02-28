/**
 * QatAIyef: AI Engineering Nights - Google Apps Script
 * This script handles form submissions from the registration website
 * and appends them to the Google Sheet
 */

// Deploy as web app with "Execute as: Me" and "Who has access: Anyone"
// The deployment URL will be used in the website form

function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName("Sheet1") || spreadsheet.getSheets()[0];
    
    // Get form data from the request
    const data = e.parameter;
    
    // Create headers if they don't exist
    const firstRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (!firstRow || firstRow.every(cell => cell === "")) {
      const headers = ["Timestamp", "Name", "Email", "Phone", "University", "Position", "IEEE Status", "IEEE Membership ID", "Resume URL"];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Prepare the row data
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" });
    const rowData = [
      timestamp,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.university || "",
      data.position || "",
      data.ieeeStatus || "",
      data.ieeeMembershipId || "",
      data.resumeUrl || ""
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Registration submitted successfully"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Add a test function to verify the script works
function testPost() {
  const testData = {
    parameter: {
      name: "Test User",
      email: "test@example.com",
      phone: "+20 123 456 7890",
      university: "Test University",
      position: "Test Position",
      ieeeStatus: "Student Member",
      ieeeMembershipId: "12345678",
      resumeUrl: "https://example.com/resume.pdf"
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

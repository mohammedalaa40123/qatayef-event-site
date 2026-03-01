/**
 * QatAIyef: AI Engineering Nights - Google Apps Script
 * Handles GET/POST submissions + sends confirmation email
 * Deploy as: Web App → Execute as: Me → Who has access: Anyone
 */

function doGet(e) {
  return handleSubmission(e);
}

function doPost(e) {
  return handleSubmission(e);
}

function handleSubmission(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Sheet1") || spreadsheet.getSheets()[0];
    
    var data = e.parameter || {};
    
    // Create headers if first row is empty
    if (sheet.getLastRow() === 0) {
      var headers = ["Timestamp", "Name", "Email", "Phone", "University", "Position", "IEEE Status", "IEEE Membership ID", "Resume URL", "Email Sent"];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    var timestamp = Utilities.formatDate(new Date(), "Africa/Cairo", "yyyy-MM-dd HH:mm:ss");
    
    var rowData = [
      timestamp,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.university || "",
      data.position || "",
      data.ieeeStatus || "",
      data.ieeeMembershipId || "",
      data.resumeUrl || "",
      "Pending"
    ];
    
    sheet.appendRow(rowData);
    
    // Send confirmation email
    var emailSent = false;
    if (data.email && data.name) {
      try {
        sendConfirmationEmail(data.name, data.email);
        emailSent = true;
        // Update "Email Sent" column
        var lastRow = sheet.getLastRow();
        sheet.getRange(lastRow, 10).setValue("Yes - " + timestamp);
      } catch (emailError) {
        var lastRow = sheet.getLastRow();
        sheet.getRange(lastRow, 10).setValue("Failed: " + emailError.toString());
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Registration saved",
      emailSent: emailSent
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendConfirmationEmail(name, email) {
  var subject = "🌙 Welcome to QatAIyef: AI Engineering Nights!";
  
  var htmlBody = getEmailTemplate(name);
  var plainBody = "Dear " + name + ",\n\n" +
    "Thank you for registering for QatAIyef: AI Engineering Nights!\n\n" +
    "The event will take place from March 8th through March 14th. " +
    "Sessions will be held online daily from 9:00 PM to 11:00 PM.\n\n" +
    "Each evening will feature a distinct topic and speaker. " +
    "The sessions will cover the full AI engineering lifecycle — " +
    "from secure Generative AI development to entrepreneurship.\n\n" +
    "Additional details regarding confirmed speakers are available on our website: " +
    "https://qataiyef-ai.vercel.app/\n\n" +
    "Please note that any updates or changes will be communicated through the event's WhatsApp group.\n\n" +
    "We look forward to your participation.\n\n" +
    "Best regards,\nIEEE CS EUI Student Branch Chapter";
  
  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    name: "QatAIyef - IEEE CS EUI"
  });
}

function getEmailTemplate(name) {
  return '<!DOCTYPE html>' +
  '<html lang="en">' +
  '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>' +
  '<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;">' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">' +
  
  // HEADER with decorative icons
  '<tr><td style="background-color: #701e1b; padding: 30px 20px; text-align: center;">' +
  '<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>' +
  '<td align="left" width="60"><img src="https://qataiyef-ai.vercel.app/images/icons/tech-lantern.png" alt="" width="45" style="opacity: 0.7;"></td>' +
  '<td align="center">' +
  '<a href="https://www.ieee.org/" target="_blank"><img src="https://qataiyef-ai.vercel.app/images/brand/ieee-logo.jpg" alt="IEEE" width="50" style="display: inline-block; vertical-align: middle; margin: 0 6px; border-radius: 50%;"></a>' +
  '<a href="https://qataiyef-ai.vercel.app/" target="_blank"><img src="https://qataiyef-ai.vercel.app/images/brand/qataiyef-logo-circle.png" alt="QatAIyef" width="80" style="display: inline-block; vertical-align: middle; margin: 0 6px; border-radius: 50%;"></a>' +
  '<a href="https://www.computer.org/" target="_blank"><img src="https://qataiyef-ai.vercel.app/images/brand/ieee-cs-eui.png" alt="IEEE CS EUI" width="50" style="display: inline-block; vertical-align: middle; margin: 0 6px; border-radius: 50%;"></a>' +
  '</td>' +
  '<td align="right" width="60"><img src="https://qataiyef-ai.vercel.app/images/icons/star-circuit.png" alt="" width="45" style="opacity: 0.7;"></td>' +
  '</tr></table>' +
  '<h1 style="color: #fde7a7; margin: 15px 0 0 0; font-size: 28px; letter-spacing: 1px;">QatAIyef &#127769;&#10024;</h1>' +
  '<h2 style="color: #fde7a7; margin: 5px 0 10px 0; font-size: 18px; font-weight: 400;">AI Engineering Nights</h2>' +
  '<p style="color: #fde7a7; margin: 0; font-size: 14px; line-height: 1.5; opacity: 0.85;">7 Nights &bull; March 8&ndash;14, 2026 &bull; 9:00 PM &ndash; 11:00 PM &bull; Online</p>' +
  '</td></tr>' +
  
  // Robot mascot accent bar
  '<tr><td style="background: linear-gradient(90deg, #701e1b 0%, #8B2500 50%, #701e1b 100%); padding: 10px 0; text-align: center;">' +
  '<img src="https://qataiyef-ai.vercel.app/images/icons/robot-qatayef.png" alt="" width="60" style="border-radius: 50%; border: 2px solid #fde7a7;">' +
  '</td></tr>' +
  
  // BODY with full email message
  '<tr><td style="padding: 35px 30px; background-color: #ffffff; color: #333333; line-height: 1.7; text-align: left;">' +
  '<h3 style="color: #701e1b; margin-top: 0; font-size: 20px;">Dear ' + name + ',</h3>' +
  '<p style="margin: 0 0 16px 0;">Thank you for registering.</p>' +
  '<p style="margin: 0 0 16px 0;">The event will take place from <strong>March 8th through March 14th</strong>. Sessions will be held online daily from <strong>9:00 PM to 11:00 PM</strong>.</p>' +
  '<p style="margin: 0 0 16px 0;">Each evening will feature a distinct topic and speaker.</p>' +
  '<p style="margin: 0 0 16px 0;">The sessions will cover the full AI engineering lifecycle &mdash; from secure Generative AI development to entrepreneurship.</p>' +
  
  // Schedule table with alternating rows
  '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 24px 0; border-collapse: collapse; border-radius: 6px; overflow: hidden;">' +
  '<tr><td style="padding: 10px 12px; background-color: #701e1b; color: #fde7a7; font-weight: bold; font-size: 13px;" width="40%">Night</td><td style="padding: 10px 12px; background-color: #701e1b; color: #fde7a7; font-weight: bold; font-size: 13px;">Topic</td></tr>' +
  '<tr><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px; background-color: #fdf8ef;">&#127769; Night 1 &mdash; Mar 8</td><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px; background-color: #fdf8ef;">Build a Secure GenAI App</td></tr>' +
  '<tr><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px;">&#10024; Night 2 &mdash; Mar 9</td><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px;">RAG that Actually Works</td></tr>' +
  '<tr><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px; background-color: #fdf8ef;">&#127769; Night 3 &mdash; Mar 10</td><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px; background-color: #fdf8ef;">From Repo to Production</td></tr>' +
  '<tr><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px;">&#10024; Night 4 &mdash; Mar 11</td><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px;">Agentic AI, Tools, MCPs</td></tr>' +
  '<tr><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px; background-color: #fdf8ef;">&#127769; Night 5 &mdash; Mar 12</td><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px; background-color: #fdf8ef;">Evaluating &amp; Monitoring LLMs</td></tr>' +
  '<tr><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px;">&#127982; Night 6 &mdash; Mar 13</td><td style="padding: 10px 12px; border-bottom: 1px solid #f0e0c0; font-size: 13px;">Career Night <em>(Panel)</em></td></tr>' +
  '<tr><td style="padding: 10px 12px; font-size: 13px; background-color: #fdf8ef;">&#127982; Night 7 &mdash; Mar 14</td><td style="padding: 10px 12px; font-size: 13px; background-color: #fdf8ef;">Entrepreneurship Night <em>(Panel)</em></td></tr>' +
  '</table>' +
  
  '<p style="margin: 0 0 16px 0;">Additional details regarding confirmed speakers are available on our website.</p>' +
  '<p style="margin: 0 0 16px 0;">Please note that any updates or changes will be communicated through the event\'s <strong>WhatsApp group</strong>.</p>' +
  '<p style="margin: 0 0 24px 0;">We look forward to your participation.</p>' +
  '<p style="margin: 0 0 16px 0;">If you have any questions or concerns, please feel free to contact us at the number below.</p>' +
  '<p style="margin: 0 0 0 0;">Best regards,<br><strong>IEEE CS</strong></p>' +
  
  '<div style="text-align: center; margin: 30px 0 10px 0;">' +
  '<a href="https://qataiyef-ai.vercel.app/" style="background-color: #701e1b; color: #fde7a7; padding: 14px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; font-size: 15px;">View Event Details &#10024;</a>' +
  '</div>' +
  '</td></tr>' +
  
  // Decorative icon strip
  '<tr><td style="background-color: #701e1b; padding: 15px 20px; text-align: center;">' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0"><tr>' +
  '<td style="padding: 0 8px;"><img src="https://qataiyef-ai.vercel.app/images/icons/tech-lantern.png" alt="" width="35" style="opacity: 0.6;"></td>' +
  '<td style="padding: 0 8px;"><img src="https://qataiyef-ai.vercel.app/images/icons/robot-lantern.png" alt="" width="35" style="opacity: 0.6;"></td>' +
  '<td style="padding: 0 8px;"><img src="https://qataiyef-ai.vercel.app/images/icons/qatayef-plate.png" alt="" width="35" style="opacity: 0.6;"></td>' +
  '<td style="padding: 0 8px;"><img src="https://qataiyef-ai.vercel.app/images/icons/robot-moon.png" alt="" width="35" style="opacity: 0.6;"></td>' +
  '<td style="padding: 0 8px;"><img src="https://qataiyef-ai.vercel.app/images/icons/robot-fez.png" alt="" width="35" style="opacity: 0.6;"></td>' +
  '</tr></table>' +
  '</td></tr>' +
  
  // FOOTER
  '<tr><td style="background-color: #701e1b; padding: 20px 20px 30px 20px; text-align: center;">' +
  '<p style="color: #fde7a7; margin: 0 0 15px 0; font-size: 16px; font-weight: bold;">Stay Connected &#127982;</p>' +
  '<table align="center" border="0" cellpadding="0" cellspacing="0"><tr>' +
  '<td style="padding: 0 10px;"><a href="https://www.facebook.com/profile.php?id=100095148287568" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384005.png" alt="Facebook" width="24" style="filter: invert(88%) sepia(21%) saturate(765%) hue-rotate(320deg) brightness(105%) contrast(101%);"></a></td>' +
  '<td style="padding: 0 10px;"><a href="https://www.linkedin.com/company/eui-ieeecs/" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/3128/3128219.png" alt="LinkedIn" width="24" style="filter: invert(88%) sepia(21%) saturate(765%) hue-rotate(320deg) brightness(105%) contrast(101%);"></a></td>' +
  '<td style="padding: 0 10px;"><a href="https://www.instagram.com/eui_ieeecs/" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/1384/1384015.png" alt="Instagram" width="24" style="filter: invert(88%) sepia(21%) saturate(765%) hue-rotate(320deg) brightness(105%) contrast(101%);"></a></td>' +
  '</tr></table>' +
  '<p style="color: #fde7a7; margin: 20px 0 0 0; font-size: 12px; opacity: 0.7;">&copy; 2026 IEEE EUI Computer Society Student Branch.<br>Wishing you a blessed Ramadan and happy coding!</p>' +
  '</td></tr>' +
  
  '</table></body></html>';
}

// Send email to a specific registrant manually
function sendEmailToRow(rowNumber) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1") || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var row = sheet.getRange(rowNumber, 1, 1, 10).getValues()[0];
  var name = row[1];
  var email = row[2];
  
  if (name && email) {
    sendConfirmationEmail(name, email);
    sheet.getRange(rowNumber, 10).setValue("Yes - " + Utilities.formatDate(new Date(), "Africa/Cairo", "yyyy-MM-dd HH:mm:ss"));
    Logger.log("Email sent to " + name + " at " + email);
  }
}

// Send emails to ALL registrants who haven't received one yet
function sendEmailsToAll() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1") || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  var data = sheet.getDataRange().getValues();
  var sent = 0;
  var failed = 0;
  
  for (var i = 1; i < data.length; i++) { // Skip header row
    var name = data[i][1];
    var email = data[i][2];
    var emailStatus = data[i][9] || "";
    
    // Skip if already sent or no email
    if (!email || emailStatus.toString().indexOf("Yes") === 0) continue;
    
    try {
      sendConfirmationEmail(name, email);
      sheet.getRange(i + 1, 10).setValue("Yes - " + Utilities.formatDate(new Date(), "Africa/Cairo", "yyyy-MM-dd HH:mm:ss"));
      sent++;
      // Small delay to avoid rate limits
      Utilities.sleep(1000);
    } catch (err) {
      sheet.getRange(i + 1, 10).setValue("Failed: " + err.toString());
      failed++;
    }
  }
  
  Logger.log("Done! Sent: " + sent + ", Failed: " + failed);
}

// Test function
function testEmail() {
  sendConfirmationEmail("Test User", "YOUR_EMAIL@example.com");
  Logger.log("Test email sent!");
}

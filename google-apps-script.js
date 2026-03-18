function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data  = JSON.parse(e.postData.contents);

    if (sheet.getLastRow() === 0) {
      const headers = ["No.","Submitted At","Name","Phone","Email","City",
        "Business Name","What They Do","Customers","USP","Goal","Feel",
        "Theme","Reference","Pages","Features","Services",
        "Tagline","Photos","Logo","Extra"];
      sheet.getRange(1,1,1,headers.length).setValues([headers])
        .setBackground("#C8FF00").setFontWeight("bold").setFontColor("#05080F");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      sheet.getLastRow(), data.submittedAt, data.yourName, data.phone,
      data.email, data.city, data.businessName, data.businessDesc,
      data.customers, data.usp, data.goal, data.websiteFeel,
      data.colourTheme, data.referenceSite, data.pages, data.features,
      data.services, data.tagline, data.photos, data.logo, data.extra
    ]);

    return ContentService.createTextOutput(JSON.stringify({status:"success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({status:"error",message:err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

**2. Create `.env.local`** — right click → New File → name it `.env.local` → paste:
```
GOOGLE_SHEET_WEBHOOK=paste_your_url_here
NEXT_PUBLIC_WA_NUMBER=918341928526
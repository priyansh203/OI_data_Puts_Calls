async function getOI() {
  const index = "banknifty";
  const num = "23"; // for banknifty num="23"
  const expiry = "2023-09-20";
  const CEPE = "PE";
  const strikePrice = "46100.00";
  let OI_long = 0;

  const url = `https://www.moneycontrol.com/india/indexfutures/${index}/${num}/${expiry}/OPTIDX/${CEPE}/${strikePrice}/true`;

  try {
    const response = await fetch(url);
    
    if (response.ok) {
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const divElement = doc.querySelector("div.FR.PA10");

      if (divElement) {
        const tableElement = divElement.querySelector("table");

        if (tableElement) {
          const cellData = [];
          const rows = tableElement.querySelectorAll("tr");

          for (const row of rows) {
            const columns = row.querySelectorAll("td");
            for (const column of columns) {
              cellData.push(column.textContent.trim());
            }
          }

          const OI_String = cellData[4].replace(/,/g, "");
          OI_long = parseInt(OI_String);
          // console.log(OI_long);
        } else {
          console.log("Table not found within the div.");
        }
      } else {
        console.log("Div element with class 'FR PA10' not found.");
      }
    } else {
      console.log("HTTP request failed with status:", response.status);
    }
  } catch (error) {
    console.error(error);
  }

  return OI_long;
}

// Call the function
let oi=1;
(async () => {
  const openInterest = await getOI();
  oi=openInterest;
  console.log("Open Interest:"+ oi);
})();

document.getElementById('demo').innerHTML=oi

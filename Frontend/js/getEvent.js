// Fetch data from events.json file
fetch("./Frontend/data/events.json")
  .then((res) => res.json())
  .then((res) => {
    let cardContainer = document.getElementsByClassName("card-container")[0];
    for (let data in res) {

      let emptyDiv = document.createElement("div");
      emptyDiv.className = "empty_div";

      let eventCard = document.createElement("div");
      eventCard.className = "event_card";

      let eventTitle = document.createElement("div");

      let heading = document.createElement("h3");

      heading.innerText = res[data].title;

      heading.className = "event_title";

      eventTitle.appendChild(heading);

      let startDate = document.createElement("span");
      startDate.className = "date1";
      startDate.innerHTML = `<b>Starts:</b> ${res[data].start}`;

      let endDate = document.createElement("span");
      endDate.className = "date2";
      endDate.innerHTML = `<b>Ends:</b> ${res[data].end}`;

      let eventDetails = document.createElement("div");
      eventDetails.className = "event_details";

      let eventLink = document.createElement("a");
      Object.assign(eventLink, {
        href: `https://${res[data].website}`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "btn btn-primary link",
      });

      let link = document.createElement("h6");
      link.innerText = "More Info";
      eventLink.appendChild(link);

      let organisation = document.createElement("p");
      organisation.innerHTML = `<b>Organisation: ${res[data].organisation}`;

      let loc = document.createElement("h5");
      loc.className = "location";
      loc.innerText = res[data].location;

      eventDetails.append(startDate, endDate, organisation, loc, eventLink);
      eventCard.append(eventTitle, eventDetails);
      emptyDiv.appendChild(eventCard);
      cardContainer.appendChild(emptyDiv);
    }
  });

// search an event
let search = document.querySelector('input');
search.addEventListener('keyup', searchTerm);

//function to search the event
function searchTerm(e) {
  var eventList = document.querySelectorAll('.empty_div');
  let input = e.target.value.toLowerCase();
  eventList.forEach(eventItem => {
    let toSearch = eventItem.childNodes[0].children[0].childNodes[0].innerText;
    if (toSearch.toLowerCase().indexOf(input) != -1) {
      eventItem.style.display = 'block';
    }
    else {
      eventItem.style.display = 'none';
    }
  })
}


// filter an event 
let filterBtn = document.getElementById("filterSubmit");
filterBtn.addEventListener('click', filterResult);

// function to filter events
function filterResult(e) {

  var startFilter = document.getElementsByClassName("date-begin");
  var endFilter = document.getElementsByClassName("date-end");

  // checking that the value should not be null for both the input
  if (startFilter[0].valueAsDate === null || endFilter[0].valueAsDate === null)
    alert("Enter both the fields");


  // the start date should always be less than end date 
  else if (+(startFilter[0].valueAsDate) >= +(endFilter[0].valueAsDate))
    alert("The Start Filter should be less than end Filter")

  else {
    // getting the left bound of the input range
    var splitLeft = (startFilter[0].value).split('-');
    var leftDate = new Date(splitLeft[0], splitLeft[1] - 1, splitLeft[2]);


    // getting the right bound of the input range
    var splitRight = (endFilter[0].value).split('-');
    var rightDate = new Date(splitRight[0], splitRight[1] - 1, splitRight[2]);

    var eventList = document.querySelectorAll('.empty_div');

    eventList.forEach((event) => {
      // getting the start dates for all events
      var innerDate = (event.childNodes[0].children[1].childNodes[0].innerText);
      var startSplit = ((innerDate.split(':'))[1]).split('/')

      var startDate = new Date(startSplit[2], startSplit[1] - 1, startSplit[0]);
      


      // getting the end dates for all events
      var outerDate = (event.childNodes[0].children[1].childNodes[1].innerText);
      var endSplit = ((outerDate.split(':'))[1]).split('/')

      var endDate = new Date(endSplit[2], endSplit[1] - 1, endSplit[0]);
     


      // comparison between the dates
      if (rightDate > startDate && leftDate < endDate)
        event.style.display = 'block';
      else {
        event.style.display = 'none';
      }

    })
  }
}





 










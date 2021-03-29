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
      startDate.className = "date";
      startDate.innerHTML = `<b>Starts:</b> ${res[data].start}`;
      let endDate = document.createElement("span");
      endDate.className = "date";
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
      organisation.className = "event_organisation";
      organisation.innerHTML = `<b>Organisation: ${res[data].organisation}`;
      let loc = document.createElement("h5");
      let eventStatus = res[data].location;
      setEventStatus();
      loc.innerText = eventStatus;
      eventDetails.append(startDate, endDate, organisation, loc, eventLink);
      eventCard.append(eventTitle, eventDetails);
      emptyDiv.appendChild(eventCard);
      cardContainer.appendChild(emptyDiv);

      //function to set the status of event
      function setEventStatus() {
        let endDate = res[data].end.split("/", 3);
        endDate = `${endDate[1]}/${endDate[0]}/${endDate[2]}`;
        endDate = new Date(endDate);
        if (new Date() > endDate) {
          eventStatus = "Offline";
          loc.className = "locationOffline";
        } else {
          loc.className = "locationOnline";
        }
      }
    }
  });

  
// Filters for Events

// Search Filter Element
const searchWrapper = document.querySelector(".search-input");
const search = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector("i");
search.addEventListener('keyup', applyFilter);

// Event Status Filter Element
let eventStatusFilterElement = document.querySelector('#event-status-filter');
eventStatusFilterElement.addEventListener('change', applyFilter);

// Event Range Start Element
let eventRangeStartElement= document.getElementById("range-start");
eventRangeStartElement.addEventListener('change', applyFilter);

let eventRangeEndElement = document.getElementById("range-end");
eventRangeEndElement.addEventListener('change', applyFilter);

// Filter Event Function
function applyFilter(){
  let eventList = document.querySelectorAll('.empty_div');
  Array.from(eventList).forEach( eventItem => {
    eventItem.style.display = 'block';
  });

  let searchTerm = search.value.toLowerCase();
  filterBySearchTerm(searchTerm, eventList,1);

  let reqStatus = eventStatusFilterElement.value.toLowerCase();
  filterByStatus(reqStatus, eventList);

  let rangeStart = eventRangeStartElement.valueAsDate;
  let rangeEnd = eventRangeEndElement.valueAsDate;
  console.log(rangeStart, rangeEnd)
  filterByRange(rangeStart, rangeEnd, eventList)

}

// Filter by Search Term
function filterBySearchTerm(searchTerm, eventList,check) {
  if(check == 1){
    let userData = searchTerm; //user enetered data
  let suggestions=[];
  Array.from(eventList).forEach( eventItem => {
    let eventTitle = eventItem.querySelector('.event_title').innerText.toLowerCase();
    console.log(eventTitle);
    suggestions.push(eventTitle);
  });


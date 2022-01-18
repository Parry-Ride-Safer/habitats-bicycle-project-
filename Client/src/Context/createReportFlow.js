



const handleDangerSubmit = (event) => {
  event.preventDefault();
  setIsBoxSelectDangerOpen(false);
  setIsReportWindowInputOpen(true);
};

const handleDangerDescriptionInputs = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setReportDescriptionInput((values) => ({ ...values, [name]: value }));
  setNumberOfCharacters(event.target.value.length);
};

const findCategoryID = [issueType.find((element) => element.type === dangerType)]
  
const dangerFormSubmit = (event) => {
  event.preventDefault();
  if (reportDescriptionInput.length === 0 || voting === "") {
    setAlertMsg(true);
  } else {
    setIsReportWindowInputOpen(false);
    Axios.post("http://localhost:4000/reports/", {
      voting: voting,
      lat: marker.lat,
      lng: marker.lng,
      title: dangerType,
      information: reportDescriptionInput.description,
      user_id: user.id,
      category_id: findCategoryID[0].nb,
    })
      .then((response) => {
        setAlertMsg(false);
        setFinalMarkers((finalMarkers) => [...finalMarkers, {...marker, id:response.data.id}]);
      })
      .catch((err) => console.log(err));
    setVoting("");
    setReportDescriptionInput([]);
  }
};

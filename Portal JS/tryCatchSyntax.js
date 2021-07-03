
try {
  if(assHMOObject.mphhi_systemuser["Id"] != null) {
    if(docID == assHMOObject.mphhi_systemuser["Id"]) {
      console.log(assHMOObject.mphhi_name);
      hmoArray.push(assHMOObject.mphhi_name);
    }
  }
}
catch(err) {
  console.log(err);
  console.log(assHMOObject);
}

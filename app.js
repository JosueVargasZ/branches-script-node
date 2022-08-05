'use strict';
//import the branches.json file
const branches = require("./branches.json");
//Filter the branches by matching with the specific regexp 
const branchMatcher = (beginsWith,branches)=>branches.filter( ({name}) => name.match(`^(${beginsWith.toLowerCase()})[0-9][0-9][0-9]?[0-9]?$`) );
//Slice the string and parse it into a number
const chopper = (str,begins,ends)=>{
  return Number(str.slice(begins,ends));
}
//main function that fetches the latest branches from branches array
const getLatestBranches = (rName, rcName)=>{
  //Formatting the input strings to pass them through the regexp
  const r = rName.toLowerCase();
  const rc = rcName.toLowerCase();
  //filter the two branches and save them in variables
  const release = branchMatcher(r,branches);
  const releaseCandidate = branchMatcher(rc,branches);
  //create new array with for the appriopriate order for both branches
  const rOrder = [];
  //map every matching branch and then sort them in ascending order
  release.map( ({ name })=>{
    rOrder.push( chopper( name,1,(name.length) ) );
  });
  rOrder.sort( (a,b)=>a-b);
  const rcOrder = [];
  releaseCandidate.map( ({ name })=>{
    rcOrder.push( chopper( name,2,(name.length) ) );
  });
  rcOrder.sort( (a,b)=>a-b);
  //Final output, showcasing the two latest branches that will be on the last index of both arrays
  console.log(`${r} -> ${r + rOrder[rOrder.length-1]}` );
  console.log(`${rc} -> ${rc + rcOrder[rcOrder.length-1]}`);
}
//Call the function to retrieve the latest branches
getLatestBranches("r","rc");

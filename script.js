"use strict";

const Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  gender: "",
  image: "",
  house: "",
};
let theData;
const url = "https://petlatkea.dk/2021/hogwarts/students.json";
const correctlyNamed = [];
let trimmed;
let firstLetter;
let firstSpace;
let student;
let lastSpace;

fetch(url)
  .then(function (u) {
    return u.json();
  })
  .then(function (data) {
    // store the data from JSON in variable so it is easier to manipulate
    theData = data;
    console.log(theData);
    createObject();
  });

function createObject() {
  // for each item in array create a new object
  theData.forEach((e) => {
    // create the object based on the prototype
    student = Object.create(Student);
    e.fullname = e.fullname.toLowerCase();
    createFirstName(e);
    createLastName(e);
    createmiddleName(e);
    createnickName(e);
    // createGender
    student.gender = e.gender;
    createHouse(e);
    /*student.image = createimage();*/
    // push every corrected object to the new array
    correctlyNamed.push(student);
  });
  console.table(correctlyNamed);
}

function createFirstName(e) {
  e.fullname = e.fullname.trimStart();
  firstSpace = e.fullname.indexOf(" ");
  if (firstSpace < 0) {
    trimmed = e.fullname.substring(0);
  } else {
    trimmed = e.fullname.substring(0, firstSpace);
  }
  firstLetter = trimmed.substring(0, 1).toUpperCase();
  student.firstName = `${firstLetter}${trimmed.substring(1)}`;
}

function createLastName(e) {
  e.fullname = e.fullname.trim();
  lastSpace = e.fullname.lastIndexOf(" ");
  // chcecking if it has last name - if it doesn't have second space (after doing trim()), then it doesn't have last name
  if (lastSpace < 0) {
    student.lastName = null;
  } else {
    trimmed = e.fullname.substring(lastSpace).trim();
    firstLetter = trimmed.substring(0, 1).toUpperCase();
    student.lastName = `${firstLetter}${trimmed.substring(1)}`;
  }
}

function createmiddleName(e) {
  e.fullname = e.fullname.trim();
  firstSpace = e.fullname.indexOf(" ");
  lastSpace = e.fullname.lastIndexOf(" ");
  trimmed = e.fullname.substring(firstSpace, lastSpace).trim();
  firstLetter = trimmed.substring(0, 1).toUpperCase();
  // chcecking if it has more than 2 words
  if (trimmed.length === 0) {
    student.middleName = null;
    // decided wether it is middle name or nick name by searching for ""
  } else if (trimmed.includes(`"`) == true) {
    student.middleName = null;
  } else {
    student.middleName = `${firstLetter}${trimmed.substring(1)}`;
  }
}

function createnickName(e) {
  e.fullname = e.fullname.trim();
  firstSpace = e.fullname.indexOf(" ");
  lastSpace = e.fullname.lastIndexOf(" ");
  if (trimmed.includes(`"`) == true) {
    //get rid off "" and / by pushing index
    trimmed = e.fullname.substring(firstSpace + 2, lastSpace - 1).trim();
    firstLetter = trimmed.substring(0, 1).toUpperCase();
    student.nickName = `${firstLetter}${trimmed.substring(1)}`;
  } else {
    student.nickName = null;
  }
}

function createHouse(e) {
  e.house = e.house.trim();
  trimmed = e.house.toLowerCase();
  firstLetter = trimmed.substring(0, 1).toUpperCase();
  student.house = `${firstLetter}${trimmed.substring(1)}`;
}

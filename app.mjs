"use strict";
import ElementMakerHTML from './elementMaker.mjs';
import Hours from './hoursClass.mjs';
import UserInput from './userInput.mjs';

export class DateMaker {
  constructor(days) {
    this.now = new Date();
    this.now.setDate(this.now.getDate() + days);
    this.now = this.now.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  }
}

export let user;
export let launchSchoolHours = new Hours();

function getUserValue(input) {
  return Number(document.getElementById(input).value);
}

function getUserInput() {
  if (!validateHoursPerWeekInput('hoursperweek')) {
    let error = new ElementMakerHTML('li', 'Please insert a valid number.','line1', 'errormessage');
    error.appendElementToDOM();
    return false;
  } else if (!validateHoursPerWeekInput('hoursdone')) {
    let error = new ElementMakerHTML('li', 'Please insert a valid number.','line2', 'errormessage');
    error.appendElementToDOM();
    return false;
  } 

  let arr = ['JS109','JS129','JS139','LS171','JS175','LS181','JS185','LS202','LS216','JS239']
  let idObj = {
    'hoursPerWeek':getUserValue('hoursperweek'),
    'done': getUserValue('hoursdone')
  }

  arr.forEach((elem,index) => {
    idObj[elem] = getUserValue(`hoursInput${index}`)
  })

  user = new UserInput(idObj);

  if (idObj.JS109 > 0) {
    launchSchoolHours.computeMoreAccurate();
  } else {
    let date = new DateMaker(user.weeksLeftBasedOnAvg * 7);
    user.addYourAvgToDOM(date);

    let maxDate = new DateMaker(user.maxWeeksLeftBasedOnMaxRecord * 7);
    user.addYourMaxEstimateToDOM(maxDate);
  }

  launchSchoolHours.addBackendAverageToDOM();
  launchSchoolHours.addFrontendAveragetoDom();
  launchSchoolHours.addAvgToDom();
  launchSchoolHours.addMaxToDom();
}

function validateHoursPerWeekInput(element) {
  let input = getUserValue(element);

  if (Number.isNaN(input) || input <= 0) {
    return false;
  }

  return true;
}

function resetButton() {
  let li = new ElementMakerHTML('div', '', 'resetButtonDiv', 'buttonDiv');
  li.appendElementToDOM();
  let reset = new ElementMakerHTML('div', 'Reset', 'buttonDiv', 'resetButton', 'submitbutton');
  reset.appendElementToDOM();
  eventListener('resetButton',reloadPage);
}

function reloadPage() {
  location.reload();
}

function changeDisplay(id,style) {
  document.getElementById(id).style.display = style;
}

function changeView() {
  if (getUserValue('hoursperweek') > 0 && getUserValue('hoursdone') > 0) {
    changeDisplay('initialDiv', 'none');
    changeDisplay('mainbody', 'grid');
    resetButton();
  }
}

function showDetails() {
  changeDisplay('moreDetails','grid');
}

function showInputField() {
  changeDisplay('questions','block');
  changeDisplay('submitInnerDiv','flex');
  changeDisplay('haveyoufinishedjs109', 'none');
}

function showSubmitButton() {
  changeDisplay('haveyoufinishedjs109', 'none');
  changeDisplay('submitInnerDiv','flex');
}

function hideDetailsButton() {
  changeDisplay('list', 'none');
}


function eventListener(id,callback) {
  document.getElementById(id).addEventListener('click',callback);
}

eventListener('moredetailsbutton',showDetails);
eventListener('yesfinished',showInputField);
eventListener('notfinished',showSubmitButton);
eventListener('notfinished',showSubmitButton);
eventListener('coursehourssubmitbutton',getUserInput);
eventListener('coursehourssubmitbutton',changeView);
eventListener('coursehourssubmitbutton',hideDetailsButton);

// export default launchSchoolHours;
// export default user;
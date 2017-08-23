"use strict";

var seconds = 0;
var isBreak = false;
var intervalID;
var minutes;
var breakTimeChanged = false;
var sessionTimeChanged = false;

$(document).ready(function() {
  var breakLen = $("#break-time").text();
  var sessionLen = $("#session-time").text();
  minutes = sessionLen;
  $("#currPhase").html("Session");
  $("#button").on("click", function() {

    // Starting or Resuming the timer
    if ($("#button").text() == "Start") {
      $("#button").html("Stop");

      // If a session is about to begin or is ongoing
      if (!isBreak && sessionTimeChanged) {
        minutes = sessionLen;
        seconds = 0;
        sessionTimeChanged = false;
      }
      else if (isBreak && breakTimeChanged) {
        minutes = breakLen;
        seconds = 0;
        breakTimeChanged = false;
      }
      if (seconds < 10) {
        $("#time").html(minutes + ':0' + seconds);
      }
      else {
        $("#time").html(minutes + ':' + seconds);
      }
      intervalID = setInterval(function () {
        if (seconds == 0) {
          if (minutes == 0) {
            if (isBreak) {
              isBreak = false;
              minutes = sessionLen;
              $("#currPhase").html("Session");
              $("#time").html(minutes + ':0' + seconds);
            }
            else {
              isBreak = true;
              minutes = breakLen;
              $("#currPhase").html("Break");
              $("#time").html(minutes + ':0' + seconds);
            }
          }
          else {
            minutes -= 1;
            seconds = 59;
          }
        }
        else {
          seconds -= 1;
        }
        if (seconds < 10) {
          $("#time").html(minutes + ':0' + seconds);
        }
        else {
          $("#time").html(minutes + ':' + seconds);
        }
      }, 1000);
    }
    else if ($("#button").text() == "Stop") {
      clearInterval(intervalID);
      $("#button").html("Start");
    }
  });
  $("#break-minus").on("click", function() {
    if ($("#button").text() == "Start") {
      if (breakLen > 1) {
        breakLen--;
        $("#break-time").html(breakLen);
        breakTimeChanged = true;
      }
    }
  });
  $("#break-plus").on("click", function() {
    if ($("#button").text() == "Start") {
      breakLen++;
      $("#break-time").html(breakLen);
      breakTimeChanged = true;
    }
  });
  $("#session-minus").on("click", function() {
    if ($("#button").text() == "Start") {
      if (sessionLen > 1) {
        sessionLen--;
        $("#session-time").html(sessionLen);
        sessionTimeChanged = true;
      }
    }
  });
  $("#session-plus").on("click", function() {
    if ($("#button").text() == "Start") {
      sessionLen++;
      $("#session-time").html(sessionLen);
      sessionTimeChanged = true;
    }
  });
});

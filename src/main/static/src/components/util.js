import React from 'react';
import zipObject from 'lodash/zipObject'


export function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

export function setCookie(name, val){
  document.cookie=name+"="+val+"; path=/";
}

export function getUrlParameters(){
  var pairs = location.search.substr(1).split('&').map(item => item.split('='));
  return zipObject(pairs)
}
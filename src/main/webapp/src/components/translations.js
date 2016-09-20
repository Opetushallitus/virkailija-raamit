import Flatten from 'flat'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'
import extend from 'lodash/extend'
import mixin from 'lodash/mixin'
import merge from 'lodash/merge'
import * as translations from '../../resources/data.json'
import text from '../../resources/text.json'
import {getCookie, setCookie} from './util.js'

mixin({
  merge : function() {
    return reduce(arguments, function(list, obj){
      return extend(list, obj);
    }, {});
  }
});

const flatTrans = Flatten(merge(translations,text));
console.log(flatTrans);
export function translation(key, lang=resolveLang()) {
  var fullKey = key + "." + lang;
  if(key instanceof Object){
    fullKey = key[lang];
  }
  const trans = flatTrans[fullKey];
  if (isEmpty(trans)) {
    //console.log("Missing key " + fullKey);
    return fullKey
  } else {
    return trans
  }
}

export function resolveLang() {
  return getCookie("i18next") || browserLanguage()
}

function browserLanguage(){
  var lang =  (navigator.language || navigator.userLanguage).substr(0,2)
  if(["fi", "sv"].indexOf(lang) >= 0) return lang; else return "fi"
}

export function changeLang(val) {
  setCookie("i18next", val);
  //document.title = translation("app.documentTitle");
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserDetectorService {

  constructor() { }

  getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase();
    const browser =
      agent.indexOf('edge') > -1 ? 'Microsoft Edge'
        : agent.indexOf('edg') > -1 ? 'Chromium-based Edge'
          : agent.indexOf('opr') > -1 ? 'Opera'
            : agent.indexOf('chrome') > -1 ? 'Chrome'
              : agent.indexOf('trident') > -1 ? 'Internet Explorer'
                : agent.indexOf('firefox') > -1 ? 'Firefox'
                  : agent.indexOf('safari') > -1 ? 'Safari'
                    : 'other';

    return browser;
  }


  getOSName() {
    let Name = "";
    console.log(navigator.userAgent)
    if (navigator.userAgent.indexOf("Win") != 1) {
      Name = "Windows OS";

    }

    if (navigator.userAgent.indexOf("Mac") != 1){ Name =
 
      "Macintosh";
    }

    if (navigator.userAgent.indexOf("Linux") != 1) {Name =

      "Linux OS";
    }

    if (navigator.userAgent.indexOf("Android") != 1) {Name =

      "Android OS";
    }

    if (navigator.userAgent.indexOf("like Mac") != -1){ Name =

      "iOS";
    }

  return Name;
}
}

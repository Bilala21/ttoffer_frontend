import { Component, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class Extension {
  firstRowItems = [
    { id:1, imgSrc: '/assets/catImage/mobile.png', title: 'Mobile' },
    { id:2, imgSrc: '/assets/catImage/propertySale.png', title: 'Property For Sale' },
    { id:3, imgSrc: '/assets/catImage/vahicel.png', title: 'Vahicels' },
    { id:4, imgSrc: '/assets/catImage/propertyRent.png', title: 'Property for Rent' },
    { id:5, imgSrc: '/assets/catImage/electronics.png', title: 'Electronic & Appliances' },
    { id:6, imgSrc: '/assets/catImage/bike.png', title: 'Bikes' },
    { id:7, imgSrc: '/assets/catImage/service.png', title: 'Services' },
    { id:8, imgSrc: '/assets/catImage/jobs.png', title: 'Jobs' },
    { id:9, imgSrc: '/assets/catImage/animals.png', title: 'Animals' },
    { id:10, imgSrc: '/assets/catImage/furniture.png', title: 'Furniture & Home' },
    { id:11, imgSrc: '/assets/catImage/fashion.png', title: 'Fashion & Beauty' },
    { id:12, imgSrc: '/assets/catImage/kids.png', title: 'Kids' },
    { id:13, imgSrc: '/assets/catImage/bit-coin.png', title: 'Crypto Market', subTitle:'Coming Soon'}
  ];
  constructor(
    private _sanitizer: DomSanitizer
) {}
  getUserId() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const jsonStringGetData = localStorage.getItem('key');
      if (jsonStringGetData) {
        const user = JSON.parse(jsonStringGetData);
        let currentUserId = user.id;
        return currentUserId
      }
    }
  }
  fileToByteArray(file: any) {
    return new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            let fileByteArray: any = [];
            reader.readAsArrayBuffer(file);
            reader.onloadend = (evt: any) => {
                if (evt.target.readyState == FileReader.DONE) {
                    let arrayBuffer = evt.target.result;
                    let array = new Uint8Array(arrayBuffer);
                    for (let byte of array) {
                        fileByteArray.push(byte);
                    }

                }
                resolve(fileByteArray);
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
byteArrayToImage(array: Uint8Array) {
  const STRING_CHAR = array.reduce((data, byte) => {
      return data + String.fromCharCode(byte);
  }, '');
  let base64String = btoa(STRING_CHAR);
  return this._sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
}

}

import { Component, OnInit } from '@angular/core';
import { MainServicesService } from '../../shared/services/main-services.service';
import { Extension } from '../../helper/common/extension/extension';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUserProfile: any;
  allowRating:boolean=false;
  imageUrl: string | ArrayBuffer | null = null;
  currentUserId: number = 0
  selectedFile: File[] = [];
  selectedFiles: Array<{ src: string }> = [];
  selectedImagesList: File[] = [];
  selectedImageIndex: number = -1;
  selectedVideoIndex: number = -1;
  constructor(private mainServices: MainServicesService,
    private extension: Extension,
    private http: HttpClient,) {
    this.currentUserId = this.extension.getUserId();
  }

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    debugger;
    if (typeof window !== 'undefined' && window.localStorage) {
      const jsonStringGetData = localStorage.getItem('key');
      if (jsonStringGetData) {
        this.currentUserProfile = JSON.parse(jsonStringGetData);
        debugger
       this.allowRating= this.currentUserProfile.Id==this.currentUserId;
        console.log(this.currentUserProfile)
        this.imageUrl = this.currentUserProfile.img
      } else {
        console.warn('localStorage is not available.');
      }
    }
  }
  triggerFileInput(): void {
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    fileInput.click();
  }
  onImageUpload(event: any): void {
    if (event.target.files && event.target.files.length > 0) {

      for (let i = 0; i < event.target.files.length; i++) {

        this.selectedFile.push(event.target.files[i]);
        this.readFileAsDataURL(event.target.files[i]);
      }
    }

    this.updateProfile();

  }
  readFileAsDataURL(file: File) {

    const reader = new FileReader();
    reader.onload = () => {
      this.selectedFiles.push({ src: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
  updateProfile(): void {

    if (this.selectedFile) {
      let formData = new FormData();
      // this.filesabc.forEach(file => formData.append('video', file, file.name));
      this.selectedFile.forEach((file, index) => {
        formData.append(`img`, file, file.name);
      });
      formData.append('user_id', ((this.currentUserId) ? Number(this.currentUserId) : 0).toString());

      this.http.post('https://www.ttoffer.com/backend/public/api/update/user', formData, { headers: this.getHeaders() }).subscribe(
        (response: any) => {

          // this.UpdateLocalUserData(response.data)
          // this.showSuccessMessage(response.message)
          console.log('File upload successful', response);

        },
        error => {
          console.error('File upload failed', error);
        }
      );

    }
  }
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}

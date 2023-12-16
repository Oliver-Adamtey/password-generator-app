import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
// import { FormsModule } from '@angular/forms';
import {Clipboard} from '@angular/cdk/clipboard';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = 'password-generator-app';

  password= ""
  length= 10;
  useUppercaseLetters = true;
  useLowercaseLetters = true;
  useNumbers = true;
  useSymbols =false;

  onChangeLength(event:Event){
    this.length= parseInt((event.target as HTMLInputElement).value)
  }

  onChangeUseUppercaseLetters(){
    this.useUppercaseLetters= !this.useUppercaseLetters
  }

  onChangeUseLowercaseLetters(){
    this.useLowercaseLetters= !this.useLowercaseLetters
  }

  onChangeUseNumbers(){
    this.useNumbers= !this.useNumbers
  }

  onChangeUseSymbols(){
    this.useSymbols= !this.useSymbols
  }

// copy function

  geneatedPassword: string = '';
  copied: boolean = false;

  constructor(private clipboard: Clipboard) {}

  copyPassword() {
    if (this.password){
      this.clipboard.copy(this.password)
      this.copied = true; 

      setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
  }

  // Strength Logics
  password = 'DefaultPassword';
  
  getStrength(): string {
    const length = this.password.length;
    if (length >= 6 && length <= 8) {
      return 'Too Weak';
    } else if (length > 8 && length <= 14) {
      return 'Weak';
    } else if (length > 14 && length <= 16) {
      return 'Medium';
    } else if (length > 16 && length <= 30) {
      return 'Strong';
    } else {
      return '';
    }
  }

  generatePassword() {
      const uppercaseletters = 'ABCDEFGHIJKLMNOPQRSTUVWYZ';
      const lowercaseletters = 'abcdefghijklmnopqrstuvwyz';
      const numbers = '1234567890';
      const symbols = '!@#$%^&*()-_?¡';

      // Check if none of the checkboxes are selected
      if (!(this.useUppercaseLetters || this.useLowercaseLetters || this.useNumbers || this.useSymbols)) {
        console.log("Please select at least one option"); // Display a message
        this.password = ""; // Clear password field
        return; // Exit function without generating a password
      }
  
      let validChars =''
      if (this.useUppercaseLetters) {
        validChars += uppercaseletters;
      }
      if (this.useLowercaseLetters) {
        validChars+= lowercaseletters;
      }
      if (this.useNumbers) {
        validChars+= numbers;
      }
      if (this.useSymbols) {
        validChars+= symbols;
      }

      if (!validChars) {
        console.log("Please select at least one option"); // Display a message if no checkbox is selected
        this.password = ""; // Clear password field
        return; // Exit function without generating a password
      }  


      let generatedPassword =""
      for (let i = 0; i < this.length; i++) {
        const index = Math.floor(Math.random() * validChars.length);
        generatedPassword+= validChars[index];
      }
      this.password=generatedPassword;
  }
}

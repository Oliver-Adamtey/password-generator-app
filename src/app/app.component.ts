import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {Clipboard} from '@angular/cdk/clipboard';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = 'password-generator-app';

  // Generated Password Holder
  password= ""

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

  //Range Slider 
  passwordLength: number = 0;
  maxPasswordLength: number = 20;
  
  updateLength(event: any){
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 30){
      this.passwordLength = value;
    }
  }
  
  // onChangeLength(event:Event){
  //   this.passwordLength= parseInt((event.target as HTMLInputElement).value)
  // }


  // CheckBox change functions
  useUppercaseLetters = false;
  useLowercaseLetters = false;
  useNumbers = false;
  useSymbols =false;

  onChangeUseUppercaseLetters(){
    this.useUppercaseLetters = !this.useUppercaseLetters
  }

  onChangeUseLowercaseLetters(){
    this.useLowercaseLetters = !this.useLowercaseLetters
  }

  onChangeUseNumbers(){
    this.useNumbers = !this.useNumbers
  }

  onChangeUseSymbols(){
    this.useSymbols = !this.useSymbols
  }

  // Strength Logics
  getStrength(): string {
    const length = this.password.length;
    if (length >= 1 && length <= 5) {
      return 'Too Weak';
    } else if (length > 5 && length <= 9) {
      return 'Weak';
    } else if (length > 9 && length <= 15) {
      return 'Medium';
    } else if (length > 15 && length <= 20) {
      return 'Strong';
    } else {
      return '';
    }
  }

  // Generating Button
  showErrorMessage: boolean = false;
  generatePassword() {
      const uppercaseletters = 'ABCDEFGHIJKLMNOPQRSTUVWYZ';
      const lowercaseletters = 'abcdefghijklmnopqrstuvwyz';
      const numbers = '1234567890';
      const symbols = '!@#$%^&*()-_?¡';
      
      // Check if none of the checkboxes are selected
      if (!(this.useUppercaseLetters || this.useLowercaseLetters || this.useNumbers || this.useSymbols)) {
        console.log("Please select at least one option");
        this.showErrorMessage = true;
        this.password = ""; // Clear password field
        return; // Exit function without generating a password
      } else{
        this.showErrorMessage = false;
      }
  
      //concatenates the characters from checkboxes
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

      //Checks again after concatenation
      if (!validChars) {
        console.log("Please select at least one option");
        this.password = ""; 
        return; 
      }  

      // Loops to generate a password by randomly selecting characters
      let generatedPassword =""
      for (let i = 0; i < this.passwordLength; i++) {
        const index = Math.floor(Math.random() * validChars.length);
        generatedPassword+= validChars[index];
      }
      // assigning it to the password property
      this.password=generatedPassword;
  }
}

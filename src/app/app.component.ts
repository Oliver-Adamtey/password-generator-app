import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import {Clipboard} from '@angular/cdk/clipboard';
// import { PasswordFieldComponent } from './password-field/password-field.component';
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
    const value = parseInt(event.target.value);
    if (value >= 0 && value <= 30){
      this.passwordLength = value;
    }
  }

  getPercentage(): number {
    const value = this.passwordLength;
    const max = this.maxPasswordLength;
    return (value / max) * 100;
  }

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
  // getStrength(): string {
  //   const length = this.password.length;
  //   if (length >= 1 && length <= 5) {
  //     return 'Too Weak';
  //   } else if (length > 5 && length <= 9) {
  //     return 'Weak';
  //   } else if (length > 9 && length <= 15) {
  //     return 'Medium';
  //   } else if (length > 15 && length <= 20) {
  //     return 'Strong';
  //   } else {
  //     return '';
  //   }
  // }

  
  // calculateEffectiveStrength(): string {
  //   const selectedCheckboxes = [this.useUppercaseLetters, this.useLowercaseLetters, this.useNumbers, this.useSymbols].filter(Boolean).length;
  //   const length = this.passwordLength;
  
  //   if (this.password && length >= 1 && length <= 5 && selectedCheckboxes === 1) {
  //     return 'Too Weak';
  //   } else if (this.password && length > 5 && length <= 9 && selectedCheckboxes >= 2) {
  //     return 'Weak';
  //   } else if (this.password && length > 9 && length <= 15 && selectedCheckboxes >= 3) {
  //     return 'Medium';
  //   } else if (this.password && length > 15 && length <= 20 && selectedCheckboxes === 4) {
  //     return 'Strong';
  //   } else {
  //     return '';
  //   }
  // }
  


  calculateEffectiveStrength(): string {
    const selectedCheckboxes = [this.useUppercaseLetters, this.useLowercaseLetters, this.useNumbers, this.useSymbols].filter(Boolean).length;
    const length = this.passwordLength;
  
    if (length >= 1 && length <= 20) {
      if (selectedCheckboxes === 1) {
        return 'Too Weak';
      } else if (selectedCheckboxes === 2 && length >= 1 && length <= 7) {
        return 'Too Weak';
      } else if (selectedCheckboxes === 2 && length > 7 && length <= 20) {
        return 'Weak';
      } else if (selectedCheckboxes === 3 && length >= 1 && length <= 8) {
        return 'Too Weak';
      } else if (selectedCheckboxes === 3 && length > 8 && length <= 10) {
        return 'Weak';
      } else if (selectedCheckboxes === 3 && length > 8 && length <= 20) {
        return 'Medium';
      } else if (selectedCheckboxes === 4 && length >= 1 && length <= 7) {
        return 'Too Weak';
      } else if (selectedCheckboxes === 4 && length > 7 && length <= 10) {
        return 'Weak';
      } else if (selectedCheckboxes === 4 && length > 10 && length <= 20) {
        if (length >= 14) {
          return 'Strong';
        } else {
          return 'Medium';
        }
      }
    }
    return '';
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


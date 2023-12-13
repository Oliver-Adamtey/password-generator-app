import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = 'password-generator-app';

  password= ""
  length= 8;
  useUppercaseLetters =false;
  useLowercaseLetters =false;
  useNumbers =false;
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

  generatePassword() {
      const uppercaseletters = 'ABCDEFGHIJKLMNOPQRSTUVWYZ';
      const lowercaseletters = 'abcdefghijklmnopqrstuvwyz';
      const numbers = '1234567890';
      const symbols = '!@#$%^&*()-_?¡';

        // Check if any of the criteria fail
        if (!(this.length && (this.useUppercaseLetters || this.useLowercaseLetters || this.useNumbers || this.useSymbols))) {
          // Handle the condition here, such as displaying an error message
          console.log("Please select at least one option and provide a valid length");
          // You can also return or exit the function if you want to prevent further execution
          return;
        }
  
      let validChars =''
      if (this.useUppercaseLetters) {
        validChars+= uppercaseletters
      }
      if (this.useLowercaseLetters) {
        validChars+= lowercaseletters
      }
      if (this.useNumbers) {
        validChars+= numbers
      }
      if (this.useSymbols) {
        validChars+= symbols
      }
      let generatedPassword =""
      for (let i = 0; i < this.length; i++) {
        const index = Math.floor(Math.random() * validChars.length)
        generatedPassword+= validChars[index]
      }
      this.password=generatedPassword
  }
}

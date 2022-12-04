import { Component, VERSION } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  persons: string[] = [

  ];

  pairs: any[] = []; //[  ['kasia', 'tomek'] ]
  result: string = '';
  index = 0;

  form = new FormGroup({
    name: new FormControl()
  })


  constructor() {
    let fetchedData = JSON.parse(localStorage.getItem('persons')!);
    console.log(fetchedData);
    if(fetchedData && fetchedData.length) {
      this.persons = [...fetchedData];
      this.prepareData();
    }
  }

  save() {
    localStorage.setItem('persons', JSON.stringify(this.persons));
  }

  clear() {
    localStorage.removeItem('persons');
    this.persons = [];
    this.prepareData();
  }

  addPerson() {
    this.persons.push(this.form.controls['name'].value);

    this.form.reset();
    this.prepareData();
  }

  shuffleArray(array: any[]) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }


  prepareData() {
    this.pairs = [];
    this.shuffleArray(this.persons);

    console.log(this.persons);

    this.persons.forEach((person) => {
      this.pairs.push([person, undefined]);
    });

    console.log(this.pairs);
  }

  randomPresent() {

    this.prepareData();


    this.persons.forEach((person) => {
      const emptyPairs = this.pairs.filter((tab) => {
        return tab[1] === undefined && tab[0] !== person;
      });

      const randomizedPerson =
        emptyPairs[Math.floor(Math.random() * emptyPairs.length)];

      const findPairIndex = this.pairs.findIndex((tab) => {
        return tab[0] === randomizedPerson[0];
      });

      const findPair = this.pairs.find((tab) => {
        return tab[0] === randomizedPerson[0];
      });

      this.pairs[findPairIndex] = [findPair![0], person];
    });

    console.log(this.pairs);
  }
}

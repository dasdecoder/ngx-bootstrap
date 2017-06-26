import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { createGenericTestComponent } from '../ng-bootstrap/test/common';
import { fireEvent } from '../../../scripts/helpers';

import { TimepickerConfig } from '../../timepicker/timepicker.config';
import { TimepickerActions } from '../../timepicker/reducer/timepicker.actions';
import { TimepickerModule } from '../../timepicker/timepicker.module';

const createTestComponent = (html: string) => createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getInputElements(fixtureNativeElement: any) {
  return fixtureNativeElement.querySelectorAll('input') as HTMLInputElement;
}

function getElements(fixtureNativeElement: any, type: string) {
  return fixtureNativeElement.querySelectorAll(type) as HTMLElement;
}

describe('Component: timepicker', () => {
  let fixture: ComponentFixture<TestComponent>;
  let html: string;
  let component: TestComponent;
  let inputHours: HTMLInputElement;
  let inputMinutes: HTMLInputElement;
  let inputSeconds: HTMLInputElement;
  let buttonMeridian: HTMLElement;
  let buttonChanges: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent
      ],
      imports: [
        TimepickerModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        TimepickerConfig,
        TimepickerActions
      ]
    });
  });

  /*validate input fields with default state*/
  xdescribe('validate input fields with default state', () => {
    beforeEach(() => {
      html = `<timepicker [(ngModel)]="myTime"></timepicker>`;

      fixture = createTestComponent(html);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputMinutes = getInputElements(fixture.nativeElement)[1];
    });

    // проверить данные в поле минуты корректные данные
    it('should validate the data in the minutes input with valid data', () => {
      component.myTime = new Date();
      component.myTime.setMinutes(10);

      fireEvent(inputMinutes, 'change');

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputMinutes.value).toBe('10');
        });
    });
    // проверить данные в поле минуты корректные данные с неполным значением
    it('should validate the data in the minutes input with valid data with half value', () => {
      component.myTime = new Date();
      component.myTime.setMinutes(1);

      fireEvent(inputMinutes, 'change');

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputMinutes.value).toBe('01');
        });
    });
    // проверить данные в поле минуты не корректные данные
    it('should validate the data in the minutes input with invalid data', () => {
      //  issue
    });
    // изменить активный инпут после нажатия Enter
    it('should change the active input field after enter click', () => {
      //  issue
    });
    // автоматическая очистить поля при вводе не корректного значения
    it('should auto clean input field after enter invalid value', () => {
      //  issue
    });
    // отобразить ошибки на поеле, после ввода не корректного значения
    it('should display error input field after enter invalid value', () => {
      //  issue
    });
  });

  /*validate input fields with property of 'showMeridian' true*/
  xdescribe('validate input fields with property of showMeridian switch on', () => {
    beforeEach(() => {
      html = `<timepicker [(ngModel)]="myTime"></timepicker>`;

      fixture = createTestComponent(html);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture.nativeElement)[0];
      buttonMeridian = getElements(fixture.nativeElement, 'button')[0];
    });

    // отобразить кнопку AM/PM при состоянии showMeridian по умолчанию
    it('should default state showMeridian display AM/PM button', () => {
      expect(buttonMeridian).toBeTruthy();
    });
    // проверить данные в поле ввода Часы при вормате времени 12h
    it('should validate the data in the hours input at time format 12h', () => {
      component.myTime = new Date();
      component.myTime.setHours(22);

      fireEvent(inputHours, 'change');

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputHours.value).toBe('10');
        });
    });
    // изменить временной период после клика на кнопку AM/PM
    it('should change time period after click on AM/PM button', () => {
      expect(buttonMeridian.textContent.trim()).toBe(component.meridians[0]);

      fireEvent(buttonMeridian, 'click');

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(buttonMeridian.textContent.trim()).toBe(component.meridians[1]);
        });
    });
  });

  /*validate input fields with property of 'showMeridian' false*/
  xdescribe('validate input fields with property of showMeridian switch off', () => {
    beforeEach(() => {
      html = `<timepicker [(ngModel)]="myTime" [showMeridian]="showMeridian" ></timepicker>`;

      fixture = createTestComponent(html);
      fixture.detectChanges();

      component = fixture.componentInstance;
      buttonMeridian = getElements(fixture.nativeElement, 'button')[0];
      inputHours = getInputElements(fixture.nativeElement)[0];
    });

    // не отобразить кнопку AM/PM если showMeridian выключен
    it('should not display AM/PM button if showMeridian switch off', () => {
      expect(buttonMeridian).toBeTruthy();

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          component.showMeridian = false;
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          buttonMeridian = getElements(fixture.nativeElement, 'button')[0];
          expect(buttonMeridian).toBeFalsy();
        });
    });
    // проверить данные в поле часы при формате времени 24h
    it('should validate the data in the hours input at time format 24h', () => {
      component.showMeridian = false;

      component.myTime = new Date();
      component.myTime.setHours(22);

      fireEvent(inputHours, 'change');

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputHours.value).toBe('22');
        });
    });
  });

  /*validate input fields with property of 'max'*/
  xdescribe('validate input fields with property of max', () => {
    beforeEach(() => {
      html = `<timepicker [(ngModel)]="myTime" [max]="maxTime"></timepicker>`;

      fixture = createTestComponent(html);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture.nativeElement)[0];
      inputMinutes = getInputElements(fixture.nativeElement)[1];
    });

    // изменить значение поля ввода на указанное максимальное значение,
    // если оно приывшает указанное максимальное значение, в фотмате времени 12h
    it('should change the input field to specified value if it exceed the specified value', () => {
      let maxTime: Date = new Date();
      maxTime.setHours(17);
      maxTime.setMinutes(30);

      component.maxTime = maxTime;

      component.myTime = new Date();
      component.myTime.setHours(18);
      component.myTime.setMinutes(31);

      fireEvent(inputHours, 'change');

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputHours.value).toBe('05');
          expect(inputMinutes.value).toBe('30');
        });
    });
    // изменить значение поля ввода на указанное максимальное значение,
    // если оно приывшает указанное максимальное значение, в фотмате времени 24h
    it('should change the input field to specified value if it exceed the specified value', () => {
      const maxTime: Date = new Date();
      maxTime.setHours(17);
      maxTime.setMinutes(30);

      component.maxTime = maxTime;

      component.myTime = new Date();
      component.myTime.setHours(18);
      component.myTime.setMinutes(31);

      fireEvent(inputHours, 'change');

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          component.showMeridian = false;
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          inputHours = getInputElements(fixture.nativeElement)[0];
          inputMinutes = getInputElements(fixture.nativeElement)[1];

          expect(inputHours.value).toBe('17');
          expect(inputMinutes.value).toBe('30');
        });
    });
  });

  /*validate input fields with property of 'min'*/
  xdescribe('validate input fields with property of min', () => {
    beforeEach(() => {
      html = `<timepicker [(ngModel)]="myTime" [max]="maxTime"></timepicker>`;

      fixture = createTestComponent(html);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture.nativeElement)[0];
      inputMinutes = getInputElements(fixture.nativeElement)[1];
    });

    // изменить значение поля ввода на указанное минимальное значение,
    // если оно приывшает указанное минимальное значение, в фотмате времени 12h
    it('should not value of the input field less the specified value', () => {
      let minTime: Date = new Date();
      minTime.setHours(17);
      minTime.setMinutes(30);

      component.minTime = minTime;

      component.myTime = new Date();
      component.myTime.setHours(18);
      component.myTime.setMinutes(31);

      fireEvent(inputHours, 'change');

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputHours.value).toBe('05');
          expect(inputMinutes.value).toBe('30');
        });
    });
    // изменить значение поля ввода на указанное минимальное значение,
    // если оно приывшает указанное минимальное значение, в фотмате времени 24h
    it('should change the input field to specified value if it less the specified value', () => {
      const minTime: Date = new Date();
      minTime.setHours(17);
      minTime.setMinutes(30);

      component.minTime = minTime;

      component.myTime = new Date();
      component.myTime.setHours(18);
      component.myTime.setMinutes(31);

      fireEvent(inputHours, 'change');

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          component.showMeridian = false;
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          inputHours = getInputElements(fixture.nativeElement)[0];
          inputMinutes = getInputElements(fixture.nativeElement)[1];

          expect(inputHours.value).toBe('17');
          expect(inputMinutes.value).toBe('30');
        });
    });
  });

  /*display seconds fields with property of 'showSeconds'*/
  xdescribe('display seconds fields with property of showSeconds', () => {
    beforeEach(() => {
      html = `<timepicker [(ngModel)]="myTime" [showSeconds]="showSeconds"></timepicker>`;

      fixture = createTestComponent(html);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputSeconds = getInputElements(fixture.nativeElement)[2];
    });

    // отображать поле секунды если showSeconds выключен
    it('should display seconds field if showMeridian switch off', () => {
      expect(inputSeconds).toBeFalsy();
    });

    // отображать поле секунды если showSeconds включен
    it('should display seconds field if showMeridian switch on', () => {
      expect(inputSeconds).toBeFalsy();

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          component.showSeconds = true;

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          inputSeconds = getInputElements(fixture.nativeElement)[2];

          expect(inputSeconds).toBeTruthy();
        });
    });
    // проверить данные в поле секунды
    it('should validate the data in the seconds input', () => {
      component.myTime = new Date();
      component.myTime.setSeconds(10);

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          component.showSeconds = true;

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          inputSeconds = getInputElements(fixture.nativeElement)[2];

          fireEvent(inputSeconds, 'change');

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputSeconds.value).toBe('10');
        });
    });
  });

  /*input fields with property of 'readonlyInput'*/
  xdescribe('input fields with property of readonlyInput', () => {
    beforeEach(() => {
      html = `<timepicker
                [(ngModel)]="myTime"
                [readonlyInput]="readonlyInput"
                [showSeconds]="showSeconds">
              </timepicker>
      `;

      fixture = createTestComponent(html);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture.nativeElement)[0];
      inputMinutes = getInputElements(fixture.nativeElement)[1];
      inputSeconds = getInputElements(fixture.nativeElement)[2];
      buttonChanges = getElements(fixture.nativeElement, 'a.btn');
    });
    // должна быть возможность ввода значений
    it('should be possible to enter values', () => {
      expect(inputHours.getAttribute('readonly')).toBeFalsy();
      expect(inputMinutes.getAttribute('readonly')).toBeFalsy();

      component.showSeconds = true;

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          inputSeconds = getInputElements(fixture.nativeElement)[2];

          expect(inputSeconds.getAttribute('readonly')).toBeFalsy();
        });
    });
    // должна отображать кнопки изменения времени
    it('should be display is time change buttons', () => {
      expect(buttonChanges).toBeTruthy();
    });
    // не должно быть возможности ввода значений
    it('should be impossible to enter values', () => {
      component.readonlyInput = true;
      component.showSeconds = true;

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          inputSeconds = getInputElements(fixture.nativeElement)[2];

          expect(inputHours.getAttribute('readonly')).toBe('');
          expect(inputMinutes.getAttribute('readonly')).toBe('');
          expect(inputSeconds.getAttribute('readonly')).toBe('');
        });
    });
    // не должны отображаться кнопки изменения времени
    xit('should be not display is time change buttons', () => {

      // какое то тут issue с buttonChanges

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          component.readonlyInput = true;
          component.showSeconds = true;
          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          buttonChanges = getElements(fixture.nativeElement, 'a.btn');
          console.log('buttonChanges', buttonChanges);

          expect(buttonChanges).toBeFalsy();
        });
    });
  });

  /*input fields hour with property of 'hourStep'*/
  describe('input fields hour with property of hourStep', () => {
    beforeEach(() => {
      html = `<timepicker
                [(ngModel)]="myTime"
                [showSeconds]="showSeconds"
                [hourStep]="hourStep"
                [minuteStep]="minuteStep"
                [secondsStep]="secondsStep">
              </timepicker>
      `;

      fixture = createTestComponent(html);
      fixture.detectChanges();

      component = fixture.componentInstance;
      inputHours = getInputElements(fixture.nativeElement)[0];
      inputMinutes = getInputElements(fixture.nativeElement)[1];
      inputSeconds = getInputElements(fixture.nativeElement)[2];
      buttonChanges = getElements(fixture.nativeElement, 'a.btn');
    });
    // добавить в поле ввода часы значение с учетом hourStep инкримент
    it('should add to the hour input field value, hourStep value', () => {
      component.hourStep = 2;

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          component.myTime = new Date();
          component.myTime.setHours(10);

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          fireEvent(inputHours, 'change');
          fireEvent(buttonChanges[0], 'click');

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputHours.value).toBe('12');
        });
    });
    // добавить в поле ввода часы значение с учетом hourStep декримент
    it('should add to the hour input field value, hourStep value', () => {
      component.hourStep = 3;

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          component.myTime = new Date();
          component.myTime.setHours(10);

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          fireEvent(inputHours, 'change');
          fireEvent(buttonChanges[2], 'click');

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputHours.value).toBe('07');
        });
    });
    // вычесть в поле ввода часы значение с учетом minuteStep инкримент
    it('should subtract to the hour input field value, minuteStep value', () => {
      component.minuteStep = 12;

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          component.myTime = new Date();
          component.myTime.setMinutes(10);

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          fireEvent(inputMinutes, 'change');
          fireEvent(buttonChanges[1], 'click');

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputMinutes.value).toBe('22');
        });
    });
    // вычесть в поле ввода часы значение с учетом minuteStep декримент
    it('should subtract to the hour input field value, minuteStep value', () => {
      component.minuteStep = 5;

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          component.myTime = new Date();
          component.myTime.setMinutes(10);

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          fireEvent(inputMinutes, 'change');
          fireEvent(buttonChanges[3], 'click');

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          expect(inputMinutes.value).toBe('05');
        });
    });
    // вычесть в поле ввода часы значение с учетом secondsStep инкримент
    fit('should subtract to the hour input field value, secondsStep value', () => {
      component.showSeconds = true;
      component.secondsStep = 10;

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          component.myTime = new Date();
          component.myTime.setSeconds(35);

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          inputSeconds = getInputElements(fixture.nativeElement)[2];
          buttonChanges = getElements(fixture.nativeElement, 'a.btn');

          fireEvent(inputSeconds, 'change');
          fireEvent(buttonChanges[3], 'click');

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          console.log('inputSeconds.value', inputSeconds.value);
          //expect(inputSeconds.value).toBe('15');
        });
    });
    // вычесть в поле ввода часы значение с учетом secondsStep декримент
    fit('should subtract to the hour input field value, secondsStep value', () => {
      component.showSeconds = true;
      component.secondsStep = 10;

      fixture.detectChanges();
      fixture.whenStable()
        .then(() => {
          component.myTime = new Date();
          component.myTime.setSeconds(35);

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          inputSeconds = getInputElements(fixture.nativeElement)[2];
          buttonChanges = getElements(fixture.nativeElement, 'a.btn');

          fireEvent(inputSeconds, 'change');
          fireEvent(buttonChanges[5], 'click');

          fixture.detectChanges();
          return fixture.whenStable();
        })
        .then(() => {
          console.log('inputSeconds.value', inputSeconds.value);
          //expect(inputSeconds.value).toBe('15');
        });
    });
  });

  /*input fields minute with property of 'minuteStep'*/
  describe('input fields minute with property of minuteStep', () => {
    // добавить в поле ввода часы значение с учетом minuteStep
    it('should add to the minute input field value, minuteStep value', () => {
    });
    // вычесть в поле ввода часы значение с учетом minuteStep
    it('should subtract to the minute input field value, minuteStep value', () => {
    });
  });

  /*default configuration*/
  describe('default configuration', () => {
    // поле должно быть пустым
    it('should be empty input fields', () => {
    });
    // установить время путем нажатия на кнопку изменения времени
    it('should set time in a input field after click on input change button', () => {
    });
  });

  /*hide change button*/
  describe('hide change button', () => {
    // кнопки изменения времени по умолчанию отоброжаются
    it('should display change button in default state', () => {
    });
    // скрыть кнопки изменения времени
    it('should hide change button', () => {
    });
  });

  /*validate 'mousewheel'*/
  describe('validate mousewheel', () => {
    // включить изменение времени колесом мыши
    it('should can change input value with the mouse wheel', () => {
    });
    // отключить изменение времени колесом мыши
    it('should can not change input value with the mouse wheel', () => {
    });
  });

  /*validate 'arrowkeys'*/
  describe('validate arrowkeys', () => {
    // включить изменение времени кнопками вверх вниз
    it('should can change input value with the arrow keys', () => {
    });
    // отключить изменение времени кнопками вверх вниз
    it('should can not change input value with the arrow keys', () => {
    });
  });

  /*custom validate*/
  describe('custom validate', () => {
    // отставить поля не заполненными
    it('should leave the input fields not specified', () => {
    });
    // не верное значение поля
    it('should invalid value in input fields', () => {
    });
    // верное значение поля
    it('should valid value in input fields', () => {
    });
  });
});

@Component({
  template: `
    <timepicker [(ngModel)]="myTime"></timepicker>`
})
class TestComponent {
  myTime: Date;
  hourStep = 1;
  minuteStep = 5;
  secondsStep = 10;
  showMeridian: boolean = true;
  meridians = ['AM', 'PM'];
  readonlyInput: boolean = false;
  mousewheel: boolean = true;
  arrowkeys: boolean = true;
  showSpinners: boolean = true;
  showSeconds: boolean = false;
  maxTime: Date;
  minTime: Date;
}

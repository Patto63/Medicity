import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
  } from 'class-validator';
  
  export function IsCedulaEcuatoriana(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isCedulaEcuatoriana',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: string): boolean {
            if (!/^\d{10}$/.test(value)) return false;
  
            const province = parseInt(value.substring(0, 2));
            if (province < 1 || province > 24) return false;
  
            const thirdDigit = parseInt(value[2]);
            if (thirdDigit >= 6) return false;
  
            const digits = value.split('').map(Number);
            let sum = 0;
  
            for (let i = 0; i < 9; i++) {
              let digit = digits[i];
              if (i % 2 === 0) {
                digit *= 2;
                if (digit > 9) digit -= 9;
              }
              sum += digit;
            }
  
            const verifier = (10 - (sum % 10)) % 10;
            return verifier === digits[9];
          },
  
          defaultMessage(args: ValidationArguments) {
            return `${args.property} no es una cédula ecuatoriana válida`;
          },
        },
      });
    };
  }
  
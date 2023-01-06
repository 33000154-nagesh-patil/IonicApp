import { Pipe, PipeTransform } from '@angular/core';
import { MultipleLanguagesService } from '../services/multiple-languages.service';
@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: MultipleLanguagesService) { }
  transform(value: any, args?: any): any {
    return this.translateService.translate(value);
  }

}

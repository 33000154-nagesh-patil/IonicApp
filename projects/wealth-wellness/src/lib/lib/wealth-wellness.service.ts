import { HttpClient } from '@angular/common/http';
import { R3ExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { Injectable } from '@angular/core';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
// import { buffer } from 'rxjs-compat/operator/buffer';
import * as Rx from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WealthWellnessService {
  constructor(){}
  currentStock = new BehaviorSubject({})
}

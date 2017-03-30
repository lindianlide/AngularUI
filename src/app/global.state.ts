import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class GlobalState {
  // 定义一个Subject对象，其可作为观察者或者被观察者
  private _data = new Subject<Object>();
  // _dataStream$作为一个可观察者对象
  private _dataStream$ = this._data.asObservable();
  // private _dataStream1$ = this._data.asObservable();
  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

  constructor() {
    // 初始时就订阅该对象，data即为next里的参数。
    this._dataStream$.subscribe((data) => this._onEvent(data));
    // this._dataStream1$.subscribe((data) => console.log(222));
  }
  // 触发观察者，event是要触发的key名，value是更改后的属性值
  notifyDataChanged(event, value) {
    let current = this._data[event];
    if (current !== value) {
      this._data[event] = value;
      // 调用next方法就会触发构造函数里的方法,_data的所有可观察者对象都可触发222也可打印
      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  }

  // 注册观察者对象，可以有多处都注册到同一个key（event）
  subscribe(event: string, callback: Function) {
    let subscribers = this._subscriptions.get(event) || [];
    subscribers.push(callback);
    this._subscriptions.set(event, subscribers);
  }

  _onEvent(data: any) {
    let subscribers = this._subscriptions.get(data['event']) || [];
    subscribers.forEach((callback) => {
      // data['data']将作为参数传入函数callback，即ollapsed => { this.isCollapsed = collapsed}
      callback.call(null, data['data']);
    });
  }
}

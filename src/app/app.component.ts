/* ••[1]••••••••••••••••••••••••• app.component.ts •••••••••••••••••••••••••••••• */

import {
	Component,
	EffectRef,
	InputSignal,
	ModelSignal,
	OnInit,
	Signal,
	WritableSignal,
	computed,
	effect,
	input,
	model,
	signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable, interval } from 'rxjs';

@Component({
	imports: [],
	selector: 'app-root',
	standalone: true,
	styleUrl: './app.component.scss',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	// This is how you define a signal
	public readonly numberSignal: WritableSignal<number> = signal(5);

	public readonly stringArraySignal: WritableSignal<Array<string>> = signal([
		'Hello',
		'World',
		'!',
	]);

	// This is how you define a computed signal
	public readonly numberComputed: Signal<number> = computed<number>(
		(): number => this.numberSignal() * 10,
	);

	// This is how you define an effect, effects are great to run "side effects"
	// when some signal change
	public readonly someEffectRef: EffectRef = effect((): void => {
		localStorage.setItem('numberSignalValue', String(this.numberSignal()));
	});

	// This is how you define a input signal
	public readonly stringInputSignal: InputSignal<string> = input<string>('');

	// This is equivalent or syntactic sugar to
	// @Input() public set stringInput(value: string) {
	// 	this._stringInput.set(value)
	// }
	// private readonly _stringInput: WritableSignal<string> = signal<string>('');

	// This is how you define a model signal
	public readonly stringModelSignal: ModelSignal<string> = model<string>('');
	// This is equivalent or syntactic sugar to

	// @Input() public stringModelSignal: string = '';
	// @Output() public stringModelSignalChange: EventEmitter<string> = new EventEmitter<string>();

	// This is how you define an observable from a signal
	public readonly numberComputed$: Observable<unknown> = toObservable<unknown>(
		this.numberComputed,
	);

	// This is how you define a signal from an observable

	public readonly fromObservableSignal: Signal<number | undefined> = toSignal<
		number | undefined
	>(
		// Creates an Observable that emits sequential numbers every specified interval
		// of time, on a specified SchedulerLike
		interval(1000),
	);

	public ngOnInit(): void {
		setTimeout((): void => {
			console.log('%c\nSet timeout complete', 'color: SpringGreen');
			console.log(
				'Update numberSignal value, this automatically update numberComputed',
			);
			console.log('Run numberSignal value, now will also run someEffectRef');
			this.numberSignal.set(7);
		}, 3000);

		setTimeout((): void => {
			console.log('%c\nSecond set timeout complete', 'color: OrangeRed');
			console.log('Update numberSignal value, reusing its existing value');
			console.log(
				'This once again automatically update numberComputed and re run someEffectRef',
			);
			this.numberSignal.update((numberSignalValue: number): number => {
				return numberSignalValue + 13;
			});
		}, 5000);

		this.numberComputed$.subscribe({
			complete: (): void => console.log('✅ - Done'),
			error: (error: Error): void =>
				console.error('❌ - Something wrong occurred: %O', error),
			next: (value: any): void =>
				console.log('✔️ numberComputed$ - Got value %O', value),
		});
	}
}

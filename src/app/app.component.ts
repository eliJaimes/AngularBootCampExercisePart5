/* ••[1]••••••••••••••••••••••••• app.component.ts •••••••••••••••••••••••••••••• */

import {
	Component,
	EffectRef,
	InputSignal,
	OnInit,
	Signal,
	WritableSignal,
	computed,
	effect,
	input,
	signal,
} from '@angular/core';

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

	public ngOnInit(): void {
		setTimeout((): void => {
			console.log('%c\nSet timeout complete', 'color: SpringGreen');
			console.log(
				'Update numberSignal value, this automatically update numberComputed',
			);
			console.log('Run numberSignal value, now will also run someEffectRef');
			this.numberSignal.set(7);
		}, 3000);
	}
}

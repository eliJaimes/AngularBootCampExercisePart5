/* ••[1]••••••••••••••••••••••••• app.component.ts •••••••••••••••••••••••••••••• */

import {
	Component,
	OnInit,
	Signal,
	WritableSignal,
	computed,
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

	public ngOnInit(): void {
		setTimeout((): void => {
			console.log('%c\nSet timeout complete', 'color: SpringGreen');
			console.log(
				'Update numberSignal value, this automatically update numberComputed',
			);
			this.numberSignal.set(7);
		}, 3000);
	}
}

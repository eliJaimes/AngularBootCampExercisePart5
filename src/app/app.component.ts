/* ••[1]••••••••••••••••••••••••• app.component.ts •••••••••••••••••••••••••••••• */

import { Component, WritableSignal, signal } from '@angular/core';

@Component({
	imports: [],
	selector: 'app-root',
	standalone: true,
	styleUrl: './app.component.scss',
	templateUrl: './app.component.html',
})
export class AppComponent {
	// This is how you define a signal
	public readonly numberSignal: WritableSignal<number> = signal(5);

	public readonly stringArraySignal: WritableSignal<Array<string>> = signal([
		'Hello',
		'World',
		'!',
	]);
}

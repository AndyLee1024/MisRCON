// flow-typed signature: 17c364017c187d058b920ab3b5733eaf
// flow-typed version: <<STUB>>/store_v^2.0.12/flow_v0.48.0

declare module 'store' {
	declare interface StoreJSStatic {
		set(key: string, value: any): any,
		get(key: string): any,
		remove(key: string): void,
		clear(): void,
		enabled: boolean,
		disabled: boolean,
		transact(
			key: string,
			defaultValue: any,
			transactionFn?: (val: any) => void
		): void,
		getAll(): any,
		serialize(value: any): string,
		deserialize(value: string): any,
		forEach(command: (key: string, value: any) => void): void
	}
	declare export default StoreJSStatic;
}

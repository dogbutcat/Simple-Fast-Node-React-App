export class ParamFormatGeneric<T>{
	constructor(public InterfaceType:T) { }

	public getLength() {
        var count = 0;
        for (var key in this.InterfaceType) {
            count++;
        }
        return count;
    }
    public toString(): string {
        var paraString = '?';
        for (var key in this.InterfaceType) {
            paraString += key + '=' + this.InterfaceType[key] + '&';
        }
        return paraString.slice(0, -1);
    }
}
export interface MTokenObject {
    result: MExternal

    isValidTokenObject(): boolean
}

export class TokenObject implements MTokenObject {
    result: MExternal;

    constructor(result: MExternal) {
        this.result = result;
    }

    isValidTokenObject(): boolean {
        return this.result.isValidExternal()
    }

}

export interface MExternal {
    data: 'Admin' | 'Medic'

    isValidExternal(): boolean
}

export class External implements MExternal {
    data: "Admin" | "Medic";

    constructor(data: "Admin" | "Medic") {
        this.data = data;
    }

    isValidExternal(): boolean {
        return this.isValidData()
    }

    isValidData(): boolean {
        return (this.data == "Admin" || this.data == "Medic") && this.data != null
    }

}

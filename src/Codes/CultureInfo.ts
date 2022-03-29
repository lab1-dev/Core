/**
 * Provides information about a specific culture (called a locale for unmanaged code development).
 */
export class CultureInfo {
    /**
     * The invariant culture.
     */
    private static _invariantCulture: CultureInfo;

    /**
     * The language of the culture.
     */
    private _language?: string;

    /**
     * The script of the culture.
     */
    private _script: string|null = null;

    /**
     * The region of the culture.
     */
    private _region: string|null = null;

    /**
     * Initializes a new instance of the {@link CultureInfo `CultureInfo`} class.
     *
     * @param name
     * A non case-sensitive predefined {@link CultureInfo `CultureInfo`} name.
     */
    public constructor(name: string) {
        let result = /^(?:(\w{2})(?:[-_](\w{4}))?(?:[-_](\w{2}))?)?$/g.exec(name);

        if (result === null) {
            throw new RangeError("Invalid language-tag.");
        } else if (result[0].length === 0) {
            this.language = "";
        } else {
            this.language = result[1].toLowerCase();

            if (result[2]) {
                this.script = result[2].charAt(0).toUpperCase() + result[2].slice(1).toLocaleLowerCase();
            }

            if (result[3]) {
                this.region = result[3].toUpperCase();
            }
        }
    }

    /**
     * Gets the {@link CultureInfo `CultureInfo`} object that is culture-independent (invariant).
     */
    public static get invariantCulture(): CultureInfo {
        if (!CultureInfo._invariantCulture) {
            CultureInfo._invariantCulture = new CultureInfo("");
        }

        return CultureInfo._invariantCulture;
    }

    /**
     * Gets a value indicating whether the current {@link CultureInfo `CultureInfo`} represents a neutral culture.
     */
    public get isNeutralCulture(): boolean {
        return !this.region;
    }

    /**
     * Gets the culture name.
     */
    public get name(): string {
        let result = this.language;

        if (this.script) {
            result += "-" + this.script;
        }

        if (this.region) {
            result += "-" + this.region;
        }

        return result;
    }

    /**
     * Gets the {@link CultureInfo `CultureInfo`} that represents the parent culture of the current {@link CultureInfo `CultureInfo`}.
     */
    public get parent(): CultureInfo {
        if (this.script === null && this.region === null) {
            return CultureInfo.invariantCulture;
        } else {
            let nameParts = this.name.split("-");
            return new CultureInfo(nameParts.slice(0, nameParts.length - 1).join("-"));
        }
    }

    /**
     * Gets or sets the language of the culture.
     */
    protected get language(): string {
        return this._language!;
    }

    /**
     * @inheritdoc
     */
    protected set language(value: string) {
        this._language = value;
    }

    /**
     * Gets or sets the script of the culture.
     */
    protected get script(): string {
        return this._script!;
    }

    /**
     * @inheritdoc
     */
    protected set script(value: string) {
        this._script = value;
    }

    /**
     * Gets or sets the region of the culture.
     */
    protected get region(): string {
        return this._region!;
    }

    /**
     * @inheritdoc
     */
    protected set region(value: string) {
        this._region = value;
    }

    /**
     * Returns a string which represents the object.
     *
     * @returns
     * A string which represents the object.
     */
    public toString(): string {
        return this.name;
    }

    /**
     * Returns the primitive value of the object.
     *
     * @returns
     * The primitive value of the object.
     */
    public valueOf(): any {
        return this.name;
    }
}
